import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private supabase: SupabaseClient | null = null;
  private useMock = false;

  // Mock in-memory storage for offline development fallback
  private mockSessions: Record<string, any> = {
    'default_session': {
      id: 'default_session',
      student_id: 'std_default_dev',
      active_node_id: 'd-operasi-bilangan',
      status: 'active',
      started_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  };
  private mockTelemetry: any[] = [];
  private mockMemory: Record<string, any> = {
    'std_default_dev': {
      student_id: 'std_default_dev',
      history: [],
      error_type: null,
      prerequisite_gaps: [],
      mastery_scores: {
        'd-operasi-bilangan': 0.9,
        'd-bilangan-berpangkat': 0.9,
        'd-geometri-datar': 0.9,
        'd-pythagoras': 0.9,
        'd-spldv': 0.9,
        'd-relasi-fungsi': 0.9,
        'd-transformasi-geometri': 0.9,
        'd-statistika-peluang': 0.9,
        'd-aljabar-linear': 0.9,
        'e-eksponen-logaritma': 0.9,
        'e-barisan-deret': 0.9,
        'e-trigonometri-dasar': 0.9,
        'e-spl-sptl': 0.9,
        'e-fungsi-kuadrat': 0.9,
        'e-statistika-data': 0.9,
        'f-matriks': 0.9
      },
    }
  };
  private mockNodes: any[] = [
    { id: 'd-bilangan-berpangkat', label: 'Bilangan Berpangkat & Bentuk Akar', phase: 'D', description: 'Sifat-sifat eksponen, bilangan bulat, rasional, dan bentuk akar.' },
    { id: 'd-aljabar-linear', label: 'Bentuk Aljabar & Persamaan Linear', phase: 'D', description: 'Manipulasi aljabar, persamaan dan pertidaksamaan linear satu variabel.' },
    { id: 'd-geometri-datar', label: 'Bangun Datar, Garis, Sudut, & Kesebangunan', phase: 'D', description: 'Sifat geometri, sudut, garis sejajar/berpotongan, dan kesebangunan segitiga.' },
    { id: 'd-pythagoras', label: 'Teorema Pythagoras', phase: 'D', description: 'Hubungan panjang sisi-sisi pada segitiga siku-siku dan tripel Pythagoras.' },
    { id: 'd-spldv', label: 'Sistem Persamaan Linear Dua Variabel', phase: 'D', description: 'Model matematika dan penyelesaian SPLDV (grafik, substitusi, eliminasi).' },
    { id: 'd-relasi-fungsi', label: 'Relasi, Fungsi, & Persamaan Garis Lurus', phase: 'D', description: 'Konsep relasi, fungsi, domain, range, serta representasi fungsi linear.' },
    { id: 'd-transformasi-geometri', label: 'Transformasi Geometri Dasar', phase: 'D', description: 'Translasi, refleksi, rotasi, dan dilatasi pada bidang Kartesius.' },
    { id: 'd-statistika-peluang', label: 'Statistika Data & Peluang Dasar', phase: 'D', description: 'Pengumpulan data, pemusatan/penyebaran data, dan peluang empirik/teoretik dasar.' },
    { id: 'd-operasi-bilangan', label: 'Operasi Bilangan & Pecahan', phase: 'D', description: 'Pemahaman dasar perhitungan bilangan bulat, pecahan, desimal, dan aritmetika.' },
    { id: 'e-eksponen-logaritma', label: 'Fungsi Eksponen & Logaritma', phase: 'E', description: 'Grafik, sifat, dan aplikasi fungsi eksponen serta logaritma.' },
    { id: 'e-barisan-deret', label: 'Barisan & Deret Aritmetika & Geometri', phase: 'E', description: 'Pola bilangan, rumus suku ke-n, dan jumlah deret.' },
    { id: 'e-trigonometri-dasar', label: 'Perbandingan Trigonometri', phase: 'E', description: 'Sinus, kosinus, tangen pada segitiga siku-siku dan sudut berelasi.' },
    { id: 'e-spl-sptl', label: 'Sistem Persamaan & Pertidaksamaan Linear', phase: 'E', description: 'SPLDV, SPLTV, dan sistem pertidaksamaan linear dua variabel.' },
    { id: 'e-fungsi-kuadrat', label: 'Persamaan & Fungsi Kuadrat', phase: 'E', description: 'Karakteristik, grafik, pemfaktoran, dan aplikasi fungsi kuadrat.' },
    { id: 'e-statistika-data', label: 'Representasi & Interpretasi Data', phase: 'E', description: 'Histogram, diagram pencar, ukuran pemusatan dan penyebaran data berkelompok.' },
    { id: 'f-fungsi-komposisi-invers', label: 'Fungsi Komposisi & Invers', phase: 'F', description: 'Operasi komposisi (fog)(x) dan invers fungsi f^{-1}(x).' },
    { id: 'f-lingkaran', label: 'Lingkaran', phase: 'F', description: 'Persamaan lingkaran, garis singgung, dan tali busur.' },
    { id: 'f-statistika-inferensial', label: 'Regresi Linear & Korelasi', phase: 'F', description: 'Analisis hubungan antar variabel, garis regresi, dan koefisien korelasi.' },
    { id: 'f-matriks', label: 'Matriks & Operasinya', phase: 'F', description: 'Jenis, operasi, determinan, invers matriks, dan transformasi matriks.' },
    { id: 'f-vektor', label: 'Vektor', phase: 'F', description: 'Vektor pada bidang/ruang, hasil kali titik, dan proyeksi.' },
    { id: 'f-transformasi-lanjut', label: 'Transformasi Geometri dengan Matriks', phase: 'F', description: 'Komposisi transformasi geometri menggunakan perkalian matriks.' },
    { id: 'f-polinomial', label: 'Polinomial / Suku Banyak', phase: 'F', description: 'Operasi, pembagian, teorema sisa, dan teorema faktor.' },
    { id: 'f-trigonometri-lanjut', label: 'Fungsi & Aturan Trigonometri Lanjut', phase: 'F', description: 'Grafik fungsi trigonometri, identitas, aturan sinus/cosinus, dan luas daerah.' },
    { id: 'f-anuitas', label: 'Anuitas, Bunga Majemuk, & Investasi', phase: 'F', description: 'Pemodelan keuangan, anuitas, pinjaman, dan investasi jangka panjang.' },
    { id: 'f-peluang-majemuk', label: 'Kaidah Pencacahan & Peluang Majemuk', phase: 'F', description: 'Permutasi, kombinasi, peluang kejadian majemuk, saling lepas/bebas, dan bersyarat.' }
  ];

  private mockEdges: any[] = [
    { source: 'd-operasi-bilangan', target: 'd-aljabar-linear', description: 'Operasi dasar aritmetika diperlukan sebelum manipulasi bentuk aljabar.' },
    { source: 'd-operasi-bilangan', target: 'e-eksponen-logaritma', description: 'Aritmetika mendasari pangkat pecahan.' },
    { source: 'd-bilangan-berpangkat', target: 'e-eksponen-logaritma', description: 'Sifat eksponen dan akar menjadi fondasi aljabar fungsi eksponen dan logaritma.' },
    { source: 'd-bilangan-berpangkat', target: 'e-barisan-deret', description: 'Pola eksponen dasar diperlukan untuk memahami deret geometri.' },
    { source: 'd-pythagoras', target: 'e-trigonometri-dasar', description: 'Perbandingan sisi segitiga siku-siku mutlak membutuhkan Teorema Pythagoras.' },
    { source: 'd-geometri-datar', target: 'e-trigonometri-dasar', description: 'Konsep kesebangunan segitiga adalah dasar dari perbandingan trigonometri.' },
    { source: 'd-spldv', target: 'e-spl-sptl', description: 'SPLDV adalah kasus dasar yang perlu dikuasai sebelum generalisasi ke SPLTV dan pertidaksamaan.' },
    { source: 'd-aljabar-linear', target: 'd-spldv', description: 'Bentuk aljabar dan persamaan linear mendasari sistem persamaan linear dua variabel.' },
    { source: 'd-aljabar-linear', target: 'e-spl-sptl', description: 'Manipulasi aljabar linear diperlukan untuk eliminasi dan substitusi sistem persamaan.' },
    { source: 'd-relasi-fungsi', target: 'e-fungsi-kuadrat', description: 'Konsep domain, range, dan pemetaan fungsi adalah prasyarat fungsi kuadrat.' },
    { source: 'd-aljabar-linear', target: 'e-fungsi-kuadrat', description: 'Teknik faktorisasi dan manipulasi aljabar dasar.' },
    { source: 'd-statistika-peluang', target: 'e-statistika-data', description: 'Pumusatan dan penyebaran data dasar dikembangkan ke data berkelompok.' },
    { source: 'e-fungsi-kuadrat', target: 'f-fungsi-komposisi-invers', description: 'Memahami karakteristik fungsi, domain, range, dan invers dari fungsi kuadrat.' },
    { source: 'd-pythagoras', target: 'f-lingkaran', description: 'Persamaan lingkaran diturunkan dari konsep jarak kuadrat/Pythagoras.' },
    { source: 'd-geometri-datar', target: 'f-lingkaran', description: 'Sifat-sifat geometri lingkaran, sudut pusat, dan keliling.' },
    { source: 'e-statistika-data', target: 'f-statistika-inferensial', description: 'Regresi dan korelasi membutuhkan interpretasi diagram pencar.' },
    { source: 'e-statistika-data', target: 'f-peluang-majemuk', description: 'Logika himpunan dan dasar statistika diperlukan untuk peluang majemuk.' },
    { source: 'd-spldv', target: 'f-matriks', description: 'Matriks dikembangkan sebagai alat komputasi untuk menyelesaikan sistem persamaan linear.' },
    { source: 'd-pythagoras', target: 'f-vektor', description: 'Panjang vektor dan hasil kali titik menggunakan fondasi Pythagoras.' },
    { source: 'd-geometri-datar', target: 'f-vektor', description: 'Vektor pada bidang koordinat Kartesius.' },
    { source: 'd-transformasi-geometri', target: 'f-transformasi-lanjut', description: 'Konsep translasi, refleksi, rotasi, dan dilatasi dasar.' },
    { source: 'f-matriks', target: 'f-transformasi-lanjut', description: 'Transformasi geometri direpresentasikan menggunakan perkalian matriks.' },
    { source: 'd-aljabar-linear', target: 'f-polinomial', description: 'Operasi aljabar dan manipulasi suku banyak.' },
    { source: 'e-fungsi-kuadrat', target: 'f-polinomial', description: 'Fungsi kuadrat adalah kasus khusus polinomial derajat 2.' },
    { source: 'e-trigonometri-dasar', target: 'f-trigonometri-lanjut', description: 'Perbandingan dasar, sudut berelasi, dan identitas trigonometri.' },
    { source: 'e-barisan-deret', target: 'f-anuitas', description: 'Anuitas dan bunga majemuk dimodelkan menggunakan deret geometri.' },
    { source: 'e-eksponen-logaritma', target: 'f-anuitas', description: 'Fungsi eksponen untuk pertumbuhan uang.' }
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
    return this.mockNodes;
  }

  async getEdges() {
    return this.mockEdges;
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

  async getStudentProfile(studentId: string) {
    if (this.useMock || !this.supabase) {
      return {
        id: studentId,
        name: 'Devin',
        email: 'siswa@sekolah.sch.id',
        role: 'student',
        streak: 18,
        xp: 320,
      };
    }

    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(studentId);
    if (!isUuid) {
      return {
        id: studentId,
        name: 'Devin',
        email: 'siswa@sekolah.sch.id',
        role: 'student',
        streak: 18,
        xp: 320,
      };
    }

    const { data, error } = await this.supabase.from('users').select('id, name, email, role').eq('id', studentId).maybeSingle();
    if (error) {
      this.handleError(error);
      console.error('[DatabaseService] Error getting student profile:', error);
      return {
        id: studentId,
        name: 'Devin',
        email: 'siswa@sekolah.sch.id',
        role: 'student',
        streak: 18,
        xp: 320,
      };
    }
    
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      streak: 18,
      xp: 320,
    };
  }

  async getActiveSession(studentId: string) {
    if (this.useMock || !this.supabase) {
      const activeSession = Object.values(this.mockSessions).find(
        (s: any) => s.student_id === studentId && (s.status === 'active' || s.status === 'remediating')
      );
      return activeSession || null;
    }

    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(studentId);
    if (!isUuid) {
      const activeSession = Object.values(this.mockSessions).find(
        (s: any) => s.student_id === studentId && (s.status === 'active' || s.status === 'remediating')
      );
      return activeSession || null;
    }

    const { data, error } = await this.supabase
      .from('learning_sessions')
      .select('*')
      .eq('student_id', studentId)
      .in('status', ['active', 'remediating'])
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      this.handleError(error);
      console.error('[DatabaseService] Error getting active session:', error);
      return null;
    }
    return data;
  }
}
