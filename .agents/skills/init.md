# AI Agent Initialization Guide - TICMI-v3

Selamat datang, Agent! Berkas ini (`.agents/skills/init.md`) adalah instruksi sistem dan panduan konteks proyek **TICMI-v3** yang harus Anda baca dan ikuti sebelum menulis kode atau melakukan modifikasi.

---

## 1. Tentang Proyek (Project Context)

TICMI (*Teach Intelligent Concept Mapping Interaction*) adalah platform pembelajaran matematika adaptif berbasis **Multi-Agent AI** dengan pendekatan *Student-as-Teacher* melalui fitur **Teach-Me Mode**.
*   **Tujuan**: Mengatasi kesenjangan numerasi siswa dengan menguji dan mereparasi konsep prasyarat secara sokratik (Fase D & E) sebelum mereka melanjutkan materi utama (Fase F/F+).
*   **Pedagogi Utama**: *Student-as-Teacher* (siswa mengajarkan konsep matematika ke AI yang bertindak sebagai murid) dan *Socratic Scaffolding* (AI menuntun proses rekonstruksi logika siswa tanpa memberikan jawaban langsung).

---

## 2. Struktur Proyek (Directory Layout)

*   `frontend/`: Aplikasi web interaktif berbasis **Next.js 16.2.6** (React 19) dan TailwindCSS.
*   `backend/api/`: Gateway API utama berbasis **NestJS (Node.js)** untuk menangani bisnis, autentikasi, dan sinkronisasi sesi WebSocket.
*   `backend/ai-service/`: Microservice Python berbasis **FastAPI** untuk mengorkestrasikan Multi-Agent AI menggunakan **LangGraph**.
*   `agent/`: Utilitas backend Python untuk *embeddings* dan *indexing* dokumen kurikulum ke pangkalan data vektor.

### Alat Otomatisasi & Script (`.agents/skills/`)
*   **`setup.bat`** (Windows) / **`setup.sh`** (Unix): Membantu menginisialisasi lingkungan pengembangan dengan menginstal dependensi npm dan membuat Python virtual environment secara otomatis di semua service.
*   **`run.bat`**: Launcher sekali klik untuk memicu ketiga server lokal (FastAPI, NestJS Gateway, dan Next.js Frontend) secara paralel di jendela terminal Command Prompt yang berbeda.

---

## 3. Aturan & Fitur Next.js 16.2 Agentic Support

Proyek ini memanfaatkan fitur **Next.js 16.2 Agentic Support**. Harap perhatikan aturan main berikut:

### A. Rujukan Dokumentasi Lokal (Bukan Halusinasi)
Next.js 16.2 menyertakan berkas dokumentasi internal langsung di dalam paket.
*   **PENTING**: Bacalah panduan di `node_modules/next/dist/docs/` sebelum menulis kode Next.js.
*   Gunakan aturan di `frontend/AGENTS.md` sebagai pembatas agar kode tidak melanggar batasan versi Next.js 16.2.

### B. Debugging via Terminal (Browser-to-Terminal)
*   Fitur `logging.browserToTerminal: true` telah aktif pada `frontend/next.config.ts`.
*   Semua log dari browser (`console.log`, `console.warn`, `console.error`) akan diteruskan langsung ke terminal pengembangan Anda. Gunakan ini untuk mendiagnosis masalah runtime klien secara instan tanpa perlu membuka browser secara manual.

### C. Vercel AI SDK (`ai`)
*   Frontend menggunakan library **Vercel AI SDK** (`npm i ai`) untuk menangani interaksi real-time dengan LLM, state management, streaming chat, dan interaksi *Human-in-the-Loop* (HITL).
*   Gunakan adapter LLM resmi (seperti `@ai-sdk/openai`, `@ai-sdk/google`, dll.) untuk memanggil model.

---

## 4. Panduan Eksekusi AI (Multi-Agent Control)

Dalam memodifikasi atau mengembangkan fungsionalitas AI pada FastAPI/LangGraph di `backend/ai-service`:
1.  Pahami topologi Multi-Agent AI yang terdiri dari 6 agen utama:
    *   **Supervisor**: Mengelola memori sesi (*Learning Memory*) dan mengalihkan alur kognitif.
    *   **Error Analysis**: Klasifikasi error (*Local Error* vs *Prerequisite GAP*).
    *   **Misconception**: Analisis akar miskonsepsi berdasarkan *Knowledge Graph*.
    *   **Routing**: Menentukan simpul materi prasyarat target dan mengambil referensi RAG.
    *   **Socratic**: Memberikan bimbingan sokratik bertahap (*scaffolding*).
    *   **Mastery**: Memvalidasi tingkat pemahaman konseptual siswa di *Teach-Me Mode*.
2.  Pastikan **NeMo Guardrails** dikonfigurasi untuk mencegah agen Socratic membocorkan rumus atau jawaban langsung.
3.  Simpan dan cari koordinat *embeddings* menggunakan pencarian kemiripan kosinus (*cosine similarity*) Supabase `pgvector`.

---

## 5. Sumber Daya & Konteks Tambahan

Silakan merujuk pada dokumen-dokumen berikut untuk memahami detail proyek:
*   [PROJECT_OVERVIEW.md](file:///c:/projects/TICMI-v3/.agents/docs/PROJECT_OVERVIEW.md): Deskripsi visi, pedagogi, dan Key Performance Indicators (KPI).
*   [ARCHITECTURE.md](file:///c:/projects/TICMI-v3/.agents/docs/ARCHITECTURE.md): Arsitektur tiga lapis decoupled dan detail alur kognitif LangGraph.
*   [KNOWLEDGE_MAP.md](file:///c:/projects/TICMI-v3/.agents/docs/KNOWLEDGE_MAP.md): Peta kurikulum matematika SMA (Fase D, E, F) dan skema warna visualisasi peta konsep.
*   [PROGRESS.md](file:///c:/projects/TICMI-v3/.agents/docs/PROGRESS.md): Checklist progres pengerjaan dan roadmap proyek.
*   [DEMO_GUIDE.md](file:///c:/projects/TICMI-v3/.agents/docs/DEMO_GUIDE.md): Panduan skenario dan langkah-langkah untuk merekam video demo.
*   [Supabase SQL Schema](file:///c:/projects/TICMI-v3/.agents/skills/supabase-db-setup/schema.sql): Skema database PostgreSQL yang harus dipatuhi.
