import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../database/database.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Keep track of socket-to-session associations
  private socketSessions: Record<string, { sessionId: string; studentId: string }> = {};

  constructor(
    private db: DatabaseService,
    private configService: ConfigService
  ) {}

  handleConnection(client: Socket) {
    console.log(`[ChatGateway] Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`[ChatGateway] Client disconnected: ${client.id}`);
    delete this.socketSessions[client.id];
  }

  @SubscribeMessage('join_session')
  async handleJoinSession(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string }
  ) {
    const { sessionId } = data;
    console.log(`[ChatGateway] Socket ${client.id} joining session ${sessionId}`);

    const session = await this.db.getSession(sessionId);
    if (!session) {
      client.emit('error', { message: 'Session not found' });
      return;
    }

    this.socketSessions[client.id] = {
      sessionId,
      studentId: session.student_id,
    };

    client.join(sessionId);
    client.emit('joined', { sessionId, status: session.status, activeNodeId: session.active_node_id });
  }

  @SubscribeMessage('send_message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { message: string }
  ) {
    const association = this.socketSessions[client.id];
    if (!association) {
      client.emit('error', { message: 'Not joined to any active session' });
      return;
    }

    const { sessionId, studentId } = association;
    const studentMessage = data.message;
    console.log(`[ChatGateway] Message from student ${studentId} in session ${sessionId}: "${studentMessage}"`);

    // 1. Retrieve current student learning memory
    const memory = await this.db.getStudentMemory(studentId);
    const history = memory.history || [];

    // 2. Prepare payload for FastAPI AI Service
    const aiServiceUrl = this.configService.get<string>('AI_SERVICE_URL') || 'http://localhost:8000';
    const payload = {
      sessionId,
      studentId,
      message: studentMessage,
      history: history,
      telemetry: {}, // Pass telemetry if needed
    };

    let reply = 'Maaf, sistem AI sedang tidak dapat merespons. Silakan coba lagi.';
    let responseData: any = null;

    try {
      console.log(`[ChatGateway] Proxying request to FastAPI: ${aiServiceUrl}/ai/chat`);
      const response = await fetch(`${aiServiceUrl}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        responseData = await response.json();
        reply = responseData.reply;
        console.log(`[ChatGateway] Received reply from FastAPI: "${reply}"`);
      } else {
        const errorText = await response.text();
        console.error(`[ChatGateway] FastAPI error: ${response.status} - ${errorText}`);
      }
    } catch (err) {
      console.error(`[ChatGateway] Connection to FastAPI failed:`, err.message);
      // Generate a mock response locally if FastAPI is offline
      responseData = this.generateLocalMockResponse(studentMessage, memory);
      reply = responseData.reply;
    }

    // 3. Update database state based on AI analysis
    const updatedHistory = [...history, { role: 'user', content: studentMessage }];
    const memoryUpdate: any = {};

    if (responseData) {
      updatedHistory.push({ role: 'assistant', content: reply });
      memoryUpdate.history = updatedHistory;

      // Handle prerequisite gap detection
      if (responseData.errorType === 'prerequisite_gap' && responseData.diagnosedGapNodeId) {
        const gapNodeId = responseData.diagnosedGapNodeId;
        const currentGaps = Array.isArray(memory.prerequisite_gaps) ? memory.prerequisite_gaps : [];
        
        if (!currentGaps.includes(gapNodeId)) {
          memoryUpdate.prerequisite_gaps = [...currentGaps, gapNodeId];
          memoryUpdate.error_type = 'prerequisite_gap';
        }
        
        // Update session status to remediating
        await this.db.updateSessionStatus(sessionId, 'remediating');
        
        // Emit concept map status update to client
        this.server.to(sessionId).emit('concept_status_update', {
          nodeId: gapNodeId,
          status: 'red',
        });
      }

      // Handle gap resolution / mastery update
      if (responseData.masteryAchieved && responseData.resolvedGapNodeId) {
        const resolvedNodeId = responseData.resolvedGapNodeId;
        const currentGaps = Array.isArray(memory.prerequisite_gaps) ? memory.prerequisite_gaps : [];
        memoryUpdate.prerequisite_gaps = currentGaps.filter(id => id !== resolvedNodeId);
        
        const currentScores = memory.mastery_scores || {};
        memoryUpdate.mastery_scores = { ...currentScores, [resolvedNodeId]: 1.0 };
        memoryUpdate.error_type = null;

        // Set session status back to active
        await this.db.updateSessionStatus(sessionId, 'active');

        // Emit concept map status update to client
        this.server.to(sessionId).emit('concept_status_update', {
          nodeId: resolvedNodeId,
          status: 'green',
        });
      }
    }

    // Persist learning memory
    await this.db.updateStudentMemory(studentId, memoryUpdate);

    // 4. Send back message response to student client
    client.emit('agent_response', {
      text: reply,
      agentType: responseData?.agentType || 'socratic',
      masteryAchieved: responseData?.masteryAchieved || false,
    });
  }

  // Fallback offline simulator if FastAPI service is not running
  private generateLocalMockResponse(message: string, memory: any) {
    const text = message.toLowerCase();
    const currentGaps = memory.prerequisite_gaps || [];

    // If student mentions fractional operations or algebraic division errors (gap)
    if (text.includes('1/x - 2') || text.includes('pecahan') || text.includes('penyederhanaan aljabar')) {
      return {
        reply: '🤖 [Kiko (AI Murid)]: "Tunggu dulu... kenapa 1/(x-2) itu tidak sama dengan 1/x - 2? Saya bingung cara menyamakan penyebut pecahan aljabar. Bisa jelaskan aturannya, Kak?"',
        errorType: 'prerequisite_gap',
        diagnosedGapNodeId: 'd-operasi-bilangan',
        agentType: 'socratic',
        masteryAchieved: false,
      };
    }

    // If Socratic mode is active and student explains common denominators correctly
    if (currentGaps.includes('d-operasi-bilangan') && 
        (text.includes('penyebut') || text.includes('kali silang') || text.includes('samakan') || text.includes('faktor'))) {
      return {
        reply: '🤖 [Kiko (AI Murid)]: "Oh begitu! Jadi penyebutnya harus dikalikan dahulu menjadi satu kesatuan baru kita sesuaikan pembilangnya. Terima kasih Kak, sekarang saya paham!"',
        errorType: null,
        agentType: 'mastery',
        masteryAchieved: true,
        resolvedGapNodeId: 'd-operasi-bilangan',
      };
    }

    // Default reply
    return {
      reply: '🤖 [Kiko (AI Murid)]: "Saya masih bingung konsep ini. Bisakah Kakak memberikan contoh sederhana atau trik untuk memahaminya?"',
      errorType: null,
      agentType: 'socratic',
      masteryAchieved: false,
    };
  }
}
