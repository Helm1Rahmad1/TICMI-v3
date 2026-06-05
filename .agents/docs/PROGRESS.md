# Dokumen Konteks: Roadmap & Pelacak Progres Proyek - TICMI-v3

Dokumen ini melacak status implementasi dari fase pengembangan platform TICMI sesuai dengan rencana tahapan pada **Tabel 3 Proposal**.

---

## 1. Ringkasan Status Proyek Saat Ini

*   **Status Repositori**: Scaffolding awal.
*   **Frontend**: Next.js 16.2.6 + React 19 telah diinisialisasi. Konfigurasi `browserToTerminal` dan integrasi Vercel AI SDK telah ditambahkan.
*   **Backend & Agent**: Folder `backend/api`, `backend/ai-service`, `agent/embeddings`, dan `agent/indexing` telah dibuat dengan file `.gitkeep` (belum ada kode bisnis).
*   **Alat Pendukung**: Folder `.agents/` (skills & docs) telah dibuat untuk memandu AI developer dan menyediakan otomatisasi setup.

---

## 2. Roadmap & Tahapan Pengembangan (Tabel 3)

Berikut adalah status pengerjaan fitur TICMI secara keseluruhan:

### Tahap 1: Analisis Kebutuhan
*   **Fokus**: Identifikasi masalah pembelajaran numerasi, aktor pengguna (Siswa, Guru, Admin), dan kebutuhan fungsionalitas.
*   **Luaran**: Dokumen Kebutuhan Sistem & Proposal LIDM.
*   **Status**:  **SELESAI (100%)**

### Tahap 2: Perancangan Sistem
*   **Fokus**: Penyusunan arsitektur decoupled tiga lapis, alur kognitif multi-agent, pemetaan database relasional & vektor.
*   **Luaran**: Diagram arsitektur, diagram orkestrasi agen, dan berkas DDL SQL.
*   **Status**:  **SELESAI (100%)**

### Tahap 3: Implementasi Backend & Database
*   **Fokus**: Pembuatan REST & WebSocket server di NestJS, REST endpoints di FastAPI, setup tabel & indeks pgvector di Supabase.
*   **Luaran**: Gateway API, modul autentikasi JWT, database migrations, dan WebSocket gateway.
*   **Status**: ⏳ **BELUM MULAI (0%)**
    - [ ] Setup PostgreSQL Supabase & jalankan skrip DDL `schema.sql`.
    - [ ] Implementasi autentikasi JWT dan middleware di NestJS.
    - [ ] Implementasi Session Logging dan API Telemetri di NestJS.
    - [ ] Setup FastAPI server & integrasi endpoint ke NestJS.

### Tahap 4: Implementasi AI (Agent Layer)
*   **Fokus**: Pengembangan graf LangGraph (nodes, edges, state), prompt agen Socratic & Mastery, ekstraksi PDF materi kurikulum (menggunakan Marker/MinerU), pembuatan embedding, dan setting NeMo Guardrails.
*   **Luaran**: Mesin kognitif LangGraph, repositori vektor Supabase, berkas RAG offline indexer.
*   **Status**: ⏳ **BELUM MULAI (0%)**
    - [ ] Membuat pipeline ekstraksi PDF Buku Guru/Siswa ke Markdown + LaTeX.
    - [ ] Membuat skrip indexer offline (untuk generate embedding BGE-M3/Nomic).
    - [ ] Implementasi Supervisor, Error Analysis, & Misconception Agent di LangGraph.
    - [ ] Implementasi Routing, Socratic, & Mastery Agent di LangGraph.
    - [ ] Mengonfigurasi NeMo Guardrails untuk proteksi Socratic.

### Tahap 5: Implementasi Frontend
*   **Fokus**: Pembuatan UI Next.js untuk pengerjaan soal, peta konsep interaktif (React Flow), modul chat sokratik (**Teach-Me Mode**), dan dasbor guru.
*   **Luaran**: Aplikasi frontend interaktif dengan visualisasi LaTeX yang fungsional.
*   **Status**: ⏳ **BELUM MULAI (0%)**
    - [ ] Integrasi Vercel AI SDK (`ai`) untuk mengelola chat streaming di client.
    - [ ] Membuat komponen peta konsep menggunakan React Flow.
    - [ ] Membuat layout responsive pengerjaan soal & rendering LaTeX (KaTeX).
    - [ ] Membuat Halaman Dashboard Guru (Kisi Heatmap Diagnostik & rekomendasi).

### Tahap 6: Integrasi Sistem
*   **Fokus**: Menyambungkan frontend client ke backend NestJS via REST & WebSocket, menghubungkan NestJS ke FastAPI AI layer, dan sinkronisasi data Supabase.
*   **Luaran**: Aplikasi TICMI terintegrasi yang fungsional dari ujung ke ujung.
*   **Status**: ⏳ **BELUM MULAI (0%)**

### Tahap 7: Pengujian Teknis (Q&A)
*   **Fokus**: Uji fungsi sistem secara end-to-end, latensi respons AI (target $\le 10$ detik), keakuratan parsing rumus LaTeX, dan verifikasi stabilitas WebSocket.
*   **Luaran**: Laporan Pengujian Teknis.
*   **Status**: ⏳ **BELUM MULAI (0%)**

### Tahap 8: Validasi Pedagogis & Evaluasi Pengguna
*   **Fokus**: Pengujian di lapangan, perbandingan pre-test/post-test siswa, kuesioner System Usability Scale (SUS) (target skor $\ge 70$), dan analisis durasi stuck-time siswa.
*   **Luaran**: Data evaluasi dampak pembelajaran dan skor kepuasan (SUS).
*   **Status**: ⏳ **BELUM MULAI (0%)**

### Tahap 9: Penyempurnaan & Peluncuran
*   **Fokus**: Perbaikan bug, optimasi prompt LLM, simplifikasi alur UI/UX berdasarkan masukan pengujian lapangan.
*   **Luaran**: Prototipe Final TICMI.
*   **Status**: ⏳ **BELUM MULAI (0%)**
