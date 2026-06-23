import { Controller, Post, Get, Body, Param, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Controller('api/sessions')
export class SessionsController {
  constructor(private db: DatabaseService) {}

  @Post('start')
  @HttpCode(HttpStatus.CREATED)
  async startSession(@Body() body: { studentId: string; nodeId: string }) {
    // Generate UUID if mock/empty studentId
    const studentId = body.studentId || 'std_default_dev';
    const nodeId = body.nodeId || 'f-fungsi-komposisi-invers';

    console.log(`[SessionsController] Starting session for student ${studentId} on concept node ${nodeId}`);
    const session = await this.db.startSession(studentId, nodeId);
    return session;
  }

  @Post(':id/telemetry')
  @HttpCode(HttpStatus.OK)
  async saveTelemetry(
    @Param('id') sessionId: string,
    @Body() body: { nodeId: string; dwellTimeSeconds: number; backspaceCount: number; confidenceRating?: number; typedCharacters: number }
  ) {
    console.log(`[SessionsController] Saving telemetry for session ${sessionId}, node ${body.nodeId}`);
    const telemetry = await this.db.saveTelemetry(sessionId, body.nodeId, {
      dwellTimeSeconds: body.dwellTimeSeconds,
      backspaceCount: body.backspaceCount,
      confidenceRating: body.confidenceRating,
      typedCharacters: body.typedCharacters,
    });
    return { success: true, telemetry };
  }

  @Get('concept-map')
  async getConceptMap(@Query('studentId') studentId: string) {
    const activeStudentId = studentId || 'std_default_dev';
    console.log(`[SessionsController] Loading concept map details for student ${activeStudentId}`);

    const [nodes, edges, memory] = await Promise.all([
      this.db.getNodes(),
      this.db.getEdges(),
      this.db.getStudentMemory(activeStudentId),
    ]);

    const masteryScores = memory.mastery_scores || {};
    const gaps = memory.prerequisite_gaps || [];

    // Map status/color onto concept nodes
    const enrichedNodes = nodes.map(node => {
      let status = 'gray'; // Locked or untouched
      let score = masteryScores[node.id] || 0.0;

      // Determine status color:
      // Green = Mastered (score >= 0.8)
      // Red = Prerequisite Gap identified (in gaps list)
      // Yellow = Currently active/remediating
      if (score >= 0.8) {
        status = 'green';
      } else if (gaps.includes(node.id)) {
        status = 'red';
      } else if (score > 0 && score < 0.8) {
        status = 'yellow';
      }

      return {
        ...node,
        status,
        score,
      };
    });

    return {
      nodes: enrichedNodes,
      edges: edges,
      studentMemory: memory,
    };
  }

  @Get('student-dashboard')
  async getStudentDashboard(@Query('studentId') studentId: string) {
    const activeStudentId = studentId || 'std_default_dev';
    console.log(`[SessionsController] Loading student dashboard details for student ${activeStudentId}`);

    const [profile, activeSession, conceptMapData] = await Promise.all([
      this.db.getStudentProfile(activeStudentId),
      this.db.getActiveSession(activeStudentId),
      this.getConceptMap(activeStudentId),
    ]);

    const nodes = conceptMapData.nodes || [];
    const totalNodes = nodes.length;
    const greenNodes = nodes.filter(n => n.status === 'green').length;
    const masteryPercentage = totalNodes > 0 ? Math.round((greenNodes / totalNodes) * 100) : 0;

    return {
      profile,
      activeSession,
      masteryPercentage,
      conceptMapData,
    };
  }
}
