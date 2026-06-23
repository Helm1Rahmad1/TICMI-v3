# Dokumen Konteks: Roadmap & Pelacak Progres Proyek - TICMI-v3

Dokumen ini melacak status implementasi dari fase pengembangan platform TICMI sesuai dengan rencana tahapan pada **Tabel 3 Proposal**.

---

## 1. Ringkasan Status Proyek Saat Ini

*   **Status Repositori**: Pengembangan aktif (50% Completion Milestone tercapai).
*   **Frontend**: Next.js 16.2.6 + React 19 dengan integrasi Vercel AI SDK, visualisasi peta konsep (React Flow), dashboard guru, dan rendering LaTeX (KaTeX) telah selesai diimplementasikan.
*   **Backend & Agent**: NestJS Gateway API, microservice FastAPI AI (LangGraph), dan simulator kognitif lokal telah selesai dibangun dan terintegrasi via WebSocket.
*   **Alat Pendukung**: Dokumentasi arsitektur, peta kurikulum, dan skrip CLI simulator agent lengkap.

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
*   **Status**: 🔄 **BERJALAN (75%)**
    - [x] Setup PostgreSQL Supabase & jalankan skrip DDL `schema.sql`. (Mock fallback & DDL schema siap).
    - [ ] Implementasi autentikasi JWT dan middleware di NestJS.
    - [x] Implementasi Session Logging dan API Telemetri di NestJS. (Endpoints `/api/sessions/start`, `/telemetry`, `/concept-map` siap).
    - [x] Setup FastAPI server & integrasi endpoint ke NestJS. (FastAPI `/ai/chat` diintegrasikan via NestJS WebSockets).

### Tahap 4: Implementasi AI (Agent Layer)
*   **Fokus**: Pengembangan graf LangGraph (nodes, edges, state), prompt agen Socratic & Mastery, ekstraksi PDF materi kurikulum (menggunakan Marker/MinerU), pembuatan embedding, dan setting NeMo Guardrails.
*   **Luaran**: Mesin kognitif LangGraph, repositori vektor Supabase, berkas RAG offline indexer.
*   **Status**: 🔄 **BERJALAN (70%)**
    - [ ] Membuat pipeline ekstraksi PDF Buku Guru/Siswa ke Markdown + LaTeX.
    - [x] Membuat skrip indexer offline (untuk generate embedding BGE-M3/Nomic). (`index_documents.py` siap).
    - [x] Implementasi Supervisor, Error Analysis, & Misconception Agent di LangGraph.
    - [x] Implementasi Routing, Socratic, & Mastery Agent di LangGraph.
    - [ ] Mengonfigurasi NeMo Guardrails untuk proteksi Socratic.

### Tahap 5: Implementasi Frontend
*   **Fokus**: Pembuatan UI Next.js untuk pengerjaan soal, peta konsep interaktif (React Flow), modul chat sokratik (**Teach-Me Mode**), dan dasbor guru.
*   **Luaran**: Aplikasi frontend interaktif dengan visualisasi LaTeX yang fungsional.
*   **Status**:  **SELESAI (100%)**
    - [x] Integrasi Vercel AI SDK (`ai`) untuk mengelola chat streaming di client. (Terintegrasi di package.json, WebSocket loop siap).
    - [x] Membuat komponen peta konsep menggunakan React Flow. (Komponen peta SVG terintegrasi interaktif di `/intelligence/concept-map`).
    - [x] Membuat layout responsive pengerjaan soal & rendering LaTeX (KaTeX). (KaTeX diinstal dan terintegrasi di halaman chat/soal).
    - [x] Membuat Halaman Dashboard Guru (Kisi Heatmap Diagnostik & rekomendasi).

### Tahap 6: Integrasi Sistem
*   **Fokus**: Menyambungkan frontend client ke backend NestJS via REST & WebSocket, menghubungkan NestJS ke FastAPI AI layer, dan sinkronisasi data Supabase.
*   **Luaran**: Aplikasi TICMI terintegrasi yang fungsional dari ujung ke ujung.
*   **Status**: 🔄 **BERJALAN (80%)**
    - [x] Integrasi frontend ke NestJS via REST & WebSocket.
    - [x] Integrasi NestJS gateway ke FastAPI AI layer.
    - [ ] Integrasi penuh data real-time database Supabase (menunggu migrasi tabel produksi).

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
