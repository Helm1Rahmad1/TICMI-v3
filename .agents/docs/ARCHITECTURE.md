# Dokumen Konteks: Arsitektur Sistem & Orkestrasi Agen - TICMI-v3

Dokumen ini mendeskripsikan secara teknis arsitektur tiga lapis (*Three-Tier Decoupled Architecture*) dan alur orkestrasi Multi-Agent AI (*Graph-Based Cognitive Control*) berbasis LangGraph pada platform TICMI.

---

## 1. Arsitektur Tiga Lapis (Three-Tier Decoupled)

TICMI dirancang secara terpisah (*decoupled*) untuk menjamin reusabilitas kode, skalabilitas, dan toleransi kegagalan (*fault tolerance*) jika terjadi gangguan pada API LLM eksternal.

```mermaid
graph TD
    subgraph Frontend Client (Next.js 16.2)
        UI[Antarmuka Pengguna]
        RF[React Flow Concept Map]
        KT[KaTeX LaTeX Renderer]
        VSDK[Vercel AI SDK Client]
    end

    subgraph Backend API (NestJS)
        GW[API Gateway & Auth]
        WS[WebSocket Manager]
        DB[Database Interface]
    end

    subgraph AI/Agent Layer (FastAPI + LangGraph)
        LG[Orkestrasi LangGraph]
        NIM[NVIDIA NIM / OpenRouter LLM]
        GR[NeMo Guardrails]
    end

    subgraph Database (Supabase)
        PG[PostgreSQL Relational Data]
        VEC[pgvector Knowledge Embeddings]
    end

    UI <-->|HTTP REST & WebSocket| GW
    GW <-->|HTTP REST| LG
    GW <-->|SQL / Realtime| PG
    LG <-->|API Calls| NIM
    LG <-->|Cosine Similarity Search| VEC
    LG -.->|Guardrails Enforcement| GR
```

### A. Lapisan Antarmuka (Frontend Client - Next.js)
*   **Framework**: Next.js 16.2.6 & React 19.
*   **State Management AI**: **Vercel AI SDK** (`ai`) digunakan untuk mengelola status streaming chat interaktif dan tool calling.
*   **Visualisasi Peta Konsep**: **React Flow** digunakan untuk rendering pohon konsep matematika secara dinamis.
*   **Rendering LaTeX**: **KaTeX** digunakan untuk menampilkan notasi, simbol, dan persamaan matematika di sisi klien secara real-time.
*   **Komunikasi**: Kombinasi REST API (untuk data statis/awal) dan WebSocket (untuk komunikasi asinkron dua arah dengan Socratic Agent).

### B. Lapisan Logika Bisnis & Gateway (Backend API - NestJS)
*   **Framework**: NestJS (Node.js).
*   **Fungsi**: API Gateway utama, autentikasi berbasis JSON Web Token (JWT), manajemen sesi WebSocket antara client dan AI service, serta persistensi data relasional ke database.

### C. Lapisan Orkestrasi Agen (AI/Agent Layer - FastAPI)
*   **Framework**: FastAPI (Python) khusus sebagai microservice orkestrasi AI.
*   **Orkestrator**: **LangGraph** (State Machine) untuk mengatur transisi antar agen AI guna menghindari infinite loop.
*   **LLM Gateway**: NVIDIA NIM dan OpenRouter (memanggil model Llama-3 atau Mistral).
*   **Guardrails**: **NeMo Guardrails** dipasang untuk memotong output LLM jika mencoba memberikan solusi prosedural atau jawaban langsung ke siswa sebelum lulus validasi.

---

## 2. Topologi Orkestrasi Multi-Agent (LangGraph)

Alur kognitif TICMI tidak menggunakan model ReAct loop linier tunggal yang rentan terhadap halusinasi prosedural, melainkan menggunakan pola **Supervisor Pattern** digabungkan dengan **Routing Pattern** melalui graph berarah.

### Alur Kerja Transisi Agen (Workflow Detail)

1.  **State Initialization & Supervisor Agent**:
    *   *Trigger*: Siswa mengirimkan jawaban soal beserta telemetri belajar (dwell time, backspace, dll.).
    *   *Aksi*: Supervisor Agent menginisiasi status sesi baru, lalu membaca dan memperbarui *Learning Memory* siswa di database.
    *   *Transisi*: Menuju **Diagnostic Team** (Error Analysis & Misconception Agent).

2.  **Error Analysis Agent**:
    *   *Aksi*: Menganalisis dan mengklasifikasikan kesalahan siswa menjadi dua kategori:
        1.  *Local Error* (Fase F): Kesalahan teknis pada materi kelas XI/XII yang sedang dipelajari.
        2.  *Prerequisite GAP* (Fase D/E): Kesalahan konseptual mendasar dari materi SMP/Kelas X.
    *   *Transisi*: Menuju **Misconception Agent**.

3.  **Misconception Agent**:
    *   *Aksi*: Melakukan penelusuran topologis pada *Knowledge Graph* untuk memetakan akar miskonsepsi (simpul materi prasyarat mana saja yang bolong).
    *   *Transisi*: Menuju decision node **ERROR TYPE?**.

4.  **Decision Node: ERROR TYPE?**:
    *   Jika **Local Error** (Fase F) $\rightarrow$ Rute **Feedback Langsung** (AI menyajikan hint singkat/umpan balik langsung) $\rightarrow$ Menuju **Mastery Check**.
    *   Jika **Prerequisite GAP** (Fase D/E) $\rightarrow$ Rute **Routing Agent** $\rightarrow$ Remediasi Sokratik.

5.  **Routing Agent (RAG Grounding)**:
    *   *Aksi*: Menentukan simpul materi prasyarat target dan jalur remediasinya. Menjalankan query pencarian kemiripan kosinus (*cosine similarity*) ke Supabase `pgvector` untuk mengambil 5 dokumen materi kurikulum teratas yang paling relevan.
    *   *Transisi*: Menuju **Socratic Agent**.

6.  **Socratic Agent**:
    *   *Aksi*: Memformulasikan pertanyaan penuntun (*scaffolding*) dan petunjuk bertahap kepada siswa berdasarkan grounding RAG. Output dibatasi secara ketat oleh *NeMo Guardrails* (tidak boleh menyajikan jawaban langsung).
    *   *Transisi*: Mengaktifkan **Teach-Me Mode** pada sisi klien.

7.  **Teach-Me Mode & Mastery Agent**:
    *   *Aksi*: Siswa bertindak sebagai guru dan mengetik penjelasan konseptual versinya sendiri ke AI. **Mastery Agent** memvalidasi argumen metakognitif siswa untuk menilai konsistensi logikanya dan memastikan bebas miskonsepsi.
    *   *Transisi*: Menuju **Mastery Check**.

8.  **Decision Node: MASTERY CHECK**:
    *   Jika **Belum Paham** $\rightarrow$ Kembali ke **Socratic Agent** untuk memberikan pertanyaan probing baru.
    *   Jika **Sudah Paham** $\rightarrow$ Menyusun hasil akhir sesi pembelajaran, memperbarui *Concept Map* siswa ke warna **Hijau**, mengirimkan analitik ke Dashboard Guru, dan mengembalikan kontrol ke modul utama Fase F.
