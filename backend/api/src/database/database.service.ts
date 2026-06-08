import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private supabase: SupabaseClient | null = null;
  private useMock = false;

  // Mock in-memory storage for offline development fallback
  private mockSessions: Record<string, any> = {};
  private mockTelemetry: any[] = [];
  private mockMemory: Record<string, any> = {};
  private mockNodes: any[] = [
    { id: 'd-operasi-bilangan', label: 'Operasi Bilangan & Pecahan', phase: 'D', description: 'Pemahaman dasar perhitungan bilangan bulat, pecahan, desimal, dan aritmetika.' },
    { id: 'd-aljabar-dasar', label: 'Bentuk Aljabar & Operasinya', phase: 'D', description: 'Pengenalan variabel dan penyederhanaan aljabar dasar.' },
    { id: 'd-persamaan-linear-satu', label: 'Persamaan Linear Satu Variabel', phase: 'D', description: 'Pemecahan persamaan linear dengan satu variabel.' },
    { id: 'd-fungsi-dasar', label: 'Relasi & Fungsi Dasar', phase: 'D', description: 'Konsep domain, kodomain, range, dan grafik fungsi sederhana.' },
    { id: 'd-pythagoras', label: 'Teorema Pythagoras', phase: 'D', description: 'Rumus sisi segitiga siku-siku.' },
    { id: 'd-koordinat-kartesius', label: 'Sistem Koordinat Kartesius', phase: 'D', description: 'Pemetaan titik pada koordinat 2D.' },
    { id: 'd-bangun-datar', label: 'Bangun Datar', phase: 'D', description: 'Sifat, keliling, dan luas bangun datar.' },
    { id: 'e-eksponen-logaritma', label: 'Eksponen & Logaritma', phase: 'E', description: 'Operasi bilangan berpangkat, akar, dan logaritma.' },
    { id: 'e-persamaan-linear-dua', label: 'Persamaan Linear Dua Variabel', phase: 'E', description: 'Sistem persamaan linear dua variabel (SPLDV).' },
    { id: 'e-fungsi-kuadrat', label: 'Fungsi Kuadrat', phase: 'E', description: 'Karakteristik grafik fungsi kuadrat.' },
    { id: 'e-relasi-fungsi', label: 'Relasi & Fungsi (Lanjutan)', phase: 'E', description: 'Definisi formal dan sifat fungsi.' },
    { id: 'e-perbandingan-trigonometri', label: 'Perbandingan Trigonometri', phase: 'E', description: 'Nilai sinus, cosinus, tangent.' },
    { id: 'f-matriks', label: 'Operasi Matriks', phase: 'F', description: 'Penjumlahan, perkalian, transpose, determinan, dan invers matriks.' },
    { id: 'f-fungsi-komposisi-invers', label: 'Fungsi Komposisi & Invers', phase: 'F', description: 'Penggabungan fungsi (fog)(x) dan invers f(x).' },
    { id: 'f-limit-fungsi', label: 'Limit Fungsi', phase: 'F', description: 'Limit fungsi aljabar.' },
    { id: 'f-turunan-fungsi', label: 'Turunan Fungsi', phase: 'F', description: 'Turunan fungsi aljabar dan aplikasinya.' }
  ];

  private mockEdges: any[] = [
    { source: 'd-operasi-bilangan', target: 'd-aljabar-dasar', description: 'Operasi dasar dibutuhkan untuk menghitung aljabar' },
    { source: 'd-aljabar-dasar', target: 'd-persamaan-linear-satu', description: 'Aljabar dibutuhkan untuk manipulasi persamaan linear' },
    { source: 'd-aljabar-dasar', target: 'd-fungsi-dasar', description: 'Fungsi dasar dinyatakan dalam variabel aljabar' },
    { source: 'd-persamaan-linear-satu', target: 'e-persamaan-linear-dua', description: 'SPLDV butuh konsep persamaan linear satu variabel' },
    { source: 'd-operasi-bilangan', target: 'e-eksponen-logaritma', description: 'Aritmetika mendasari pangkat pecahan' },
    { source: 'd-fungsi-dasar', target: 'e-relasi-fungsi', description: 'Relasi fungsi dasar mendasari fungsi lanjutan' },
    { source: 'd-fungsi-dasar', target: 'e-fungsi-kuadrat', description: 'Fungsi dasar mendasari pemodelan kuadrat' },
    { source: 'd-pythagoras', target: 'e-perbandingan-trigonometri', description: 'Trigonometri dasar didefinisikan dari sisi segitiga' },
    { source: 'e-relasi-fungsi', target: 'f-fungsi-komposisi-invers', description: 'Fungsi dasar harus dikuasai sebelum komposisi' },
    { source: 'e-fungsi-kuadrat', target: 'f-fungsi-komposisi-invers', description: 'Fungsi kuadrat sering menjadi input komposisi' },
    { source: 'e-eksponen-logaritma', target: 'f-limit-fungsi', description: 'Limit butuh manipulasi bentuk akar' },
    { source: 'e-fungsi-kuadrat', target: 'f-limit-fungsi', description: 'Fungsi kuadrat digunakan dalam limit' },
    { source: 'f-limit-fungsi', target: 'f-turunan-fungsi', description: 'Turunan didefinisikan dari limit' },
    { source: 'e-perbandingan-trigonometri', target: 'f-fungsi-trigonometri', description: 'Perbandingan dasar mendasari grafik trigonometri' },
    { source: 'd-bangun-datar', target: 'f-transformasi-geometri', description: 'Bangun datar adalah objek transformasi' },
    { source: 'd-koordinat-kartesius', target: 'f-vektor', description: 'Vektor dinyatakan sebagai koordinat kartesius' }
  ];

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const url = this.configService.get<string>('NEXT_PUBLIC_SUPABASE_URL') || this.configService.get<string>('SUPABASE_URL');
    const key = this.configService.get<string>('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY') || this.configService.get<string>('SUPABASE_SERVICE_KEY') || this.configService.get<string>('SUPABASE_ANON_KEY');

    if (url && key) {
      try {
        this.supabase = createClient(url, key);
        console.log(`[DatabaseService] Successfully connected to Supabase at: ${url}`);
      } catch (err) {
        console.warn(`[DatabaseService] Failed to initialize Supabase client: ${err.message}. Using mock fallback.`);
        this.useMock = true;
      }
    } else {
      console.warn('[DatabaseService] Supabase credentials not found in environment. Using mock fallback.');
      this.useMock = true;
    }
  }

  isMock(): boolean {
    return this.useMock;
  }

  getClient(): SupabaseClient | null {
    return this.supabase;
  }

  private handleError(error: any) {
    if (error && error.code === 'PGRST205') {
      console.warn('[DatabaseService] Supabase tables not found in schema (PGRST205). Dynamically falling back to mock store.');
      this.useMock = true;
    }
  }

  // --- Concept Graph Operations ---
  async getNodes() {
    if (this.useMock || !this.supabase) {
      return this.mockNodes;
    }
    const { data, error } = await this.supabase.from('concept_nodes').select('*');
    if (error) {
      this.handleError(error);
      console.error('[DatabaseService] Error fetching nodes:', error);
      return this.mockNodes;
    }
    return data;
  }

  async getEdges() {
    if (this.useMock || !this.supabase) {
      return this.mockEdges;
    }
    const { data, error } = await this.supabase.from('concept_edges').select('*');
    if (error) {
      this.handleError(error);
      console.error('[DatabaseService] Error fetching edges:', error);
      return this.mockEdges;
    }
    return data;
  }

  // --- Learning Session Operations ---
  async startSession(studentId: string, nodeId: string) {
    const sessionId = `sess_${Math.random().toString(36).substring(2, 9)}`;
    const session = {
      id: sessionId,
      student_id: studentId,
      active_node_id: nodeId,
      status: 'active',
      started_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (this.useMock || !this.supabase) {
      this.mockSessions[sessionId] = session;
      return session;
    }

    const { data, error } = await this.supabase.from('learning_sessions').insert({
      student_id: studentId,
      active_node_id: nodeId,
      status: 'active',
    }).select().single();

    if (error) {
      this.handleError(error);
      console.error('[DatabaseService] Error starting session in Supabase:', error);
      this.mockSessions[sessionId] = session;
      return session;
    }
    return data;
  }

  async getSession(sessionId: string) {
    if (this.useMock || !this.supabase) {
      return this.mockSessions[sessionId] || null;
    }
    const { data, error } = await this.supabase.from('learning_sessions').select('*').eq('id', sessionId).maybeSingle();
    if (error) {
      this.handleError(error);
      console.error('[DatabaseService] Error getting session:', error);
      return this.mockSessions[sessionId] || null;
    }
    return data;
  }

  async updateSessionStatus(sessionId: string, status: 'active' | 'remediating' | 'completed') {
    if (this.useMock || !this.supabase) {
      if (this.mockSessions[sessionId]) {
        this.mockSessions[sessionId].status = status;
        this.mockSessions[sessionId].updated_at = new Date().toISOString();
      }
      return;
    }
    const { error } = await this.supabase.from('learning_sessions').update({ status, updated_at: new Date().toISOString() }).eq('id', sessionId);
    if (error) {
      this.handleError(error);
      console.error('[DatabaseService] Error updating session:', error);
    }
  }

  // --- Telemetry Operations ---
  async saveTelemetry(sessionId: string, nodeId: string, telemetry: { dwellTimeSeconds: number; backspaceCount: number; confidenceRating?: number; typedCharacters: number }) {
    const telemetryRecord = {
      id: `tel_${Math.random().toString(36).substring(2, 9)}`,
      session_id: sessionId,
      node_id: nodeId,
      dwell_time_seconds: telemetry.dwellTimeSeconds,
      backspace_count: telemetry.backspaceCount,
      confidence_rating: telemetry.confidenceRating || 3,
      typed_characters: telemetry.typedCharacters,
      created_at: new Date().toISOString(),
    };

    if (this.useMock || !this.supabase) {
      this.mockTelemetry.push(telemetryRecord);
      return telemetryRecord;
    }

    const { data, error } = await this.supabase.from('learning_telemetry').insert({
      session_id: sessionId,
      node_id: nodeId,
      dwell_time_seconds: telemetry.dwellTimeSeconds,
      backspace_count: telemetry.backspaceCount,
      confidence_rating: telemetry.confidenceRating,
      typed_characters: telemetry.typedCharacters,
    }).select().single();

    if (error) {
      this.handleError(error);
      console.error('[DatabaseService] Error inserting telemetry:', error);
      this.mockTelemetry.push(telemetryRecord);
      return telemetryRecord;
    }
    return data;
  }

  // --- Learning Memory Operations ---
  async getStudentMemory(studentId: string) {
    if (this.useMock || !this.supabase) {
      if (!this.mockMemory[studentId]) {
        this.mockMemory[studentId] = {
          student_id: studentId,
          history: [],
          error_type: null,
          prerequisite_gaps: [],
          mastery_scores: {},
        };
      }
      return this.mockMemory[studentId];
    }

    const { data, error } = await this.supabase.from('learning_memory').select('*').eq('student_id', studentId).maybeSingle();
    if (error) {
      this.handleError(error);
      console.error('[DatabaseService] Error getting memory:', error);
      return {
        student_id: studentId,
        history: [],
        error_type: null,
        prerequisite_gaps: [],
        mastery_scores: {},
      };
    }
    if (!data) {
      // Create default
      const { data: newMem, error: insertError } = await this.supabase.from('learning_memory').insert({
        student_id: studentId,
        history: [],
        prerequisite_gaps: [],
        mastery_scores: {},
      }).select().single();
      if (insertError) {
        this.handleError(insertError);
        console.error('[DatabaseService] Error inserting default memory:', insertError);
        return {
          student_id: studentId,
          history: [],
          error_type: null,
          prerequisite_gaps: [],
          mastery_scores: {},
        };
      }
      return newMem;
    }
    return data;
  }

  async updateStudentMemory(studentId: string, update: { history?: any[]; error_type?: string; prerequisite_gaps?: string[]; mastery_scores?: Record<string, number> }) {
    if (this.useMock || !this.supabase) {
      const memory = await this.getStudentMemory(studentId);
      if (update.history) memory.history = update.history;
      if (update.error_type !== undefined) memory.error_type = update.error_type;
      if (update.prerequisite_gaps) memory.prerequisite_gaps = update.prerequisite_gaps;
      if (update.mastery_scores) {
        memory.mastery_scores = { ...memory.mastery_scores, ...update.mastery_scores };
      }
      return memory;
    }

    const memory = await this.getStudentMemory(studentId);
    const updatedPayload: any = { updated_at: new Date().toISOString() };
    if (update.history) updatedPayload.history = update.history;
    if (update.error_type !== undefined) updatedPayload.error_type = update.error_type;
    if (update.prerequisite_gaps) updatedPayload.prerequisite_gaps = update.prerequisite_gaps;
    if (update.mastery_scores) {
      updatedPayload.mastery_scores = { ...memory.mastery_scores, ...update.mastery_scores };
    }

    const { data, error } = await this.supabase.from('learning_memory').update(updatedPayload).eq('student_id', studentId).select().single();
    if (error) {
      this.handleError(error);
      console.error('[DatabaseService] Error updating memory:', error);
      return memory;
    }
    return data;
  }
}
