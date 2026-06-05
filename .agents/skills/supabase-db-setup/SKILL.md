# Skill: Supabase Database Setup - TICMI-v3

Skill ini mendeskripsikan langkah-langkah bagi asisten AI atau developer untuk menyiapkan pangkalan data Supabase PostgreSQL beserta ekstensi `pgvector` dan skema tabel relasional pendukung platform TICMI.

---

## Deskripsi Skill
*   **Nama**: `supabase-db-setup`
*   **Tujuan**: Menyiapkan dan menginisialisasi skema tabel pangkalan data relasional dan vektor untuk melacak peta konsep (*Knowledge Graph*), telemetri belajar siswa, *session memory* agen kognitif, dan penyimpanan berkas rujukan untuk RAG (*embeddings*).
*   **Kapan Digunakan**:
    *   Saat asisten AI perlu memvalidasi struktur database proyek.
    *   Saat melakukan inisialisasi lingkungan lokal Supabase untuk pertama kalinya.
    *   Saat menulis query SQL/ORM pada backend NestJS atau FastAPI dan perlu menyesuaikan model data dengan skema ril.

---

## Langkah Penerapan Skema

Anda dapat menerapkan skema database ini melalui salah satu dari cara berikut:

### Metode A: Supabase Dashboard (SQL Editor)
1.  Buka **Dashboard Supabase** Anda.
2.  Navigasikan ke menu **SQL Editor**.
3.  Salin seluruh isi berkas [schema.sql](file:///c:/projects/TICMI-v3/.agents/skills/supabase-db-setup/schema.sql) ke editor.
4.  Klik tombol **Run** untuk mengeksekusi dan membuat tabel-tabel.

### Metode B: Supabase CLI (Local Development)
Jika Anda menggunakan Supabase CLI untuk pengembangan lokal:
1.  Inisialisasi supabase (jika belum):
    ```bash
    supabase init
    ```
2.  Buat file migrasi baru:
    ```bash
    supabase migration new setup_ticmi_schema
    ```
3.  Salin isi berkas `schema.sql` ke dalam berkas migrasi baru yang terbuat di folder `supabase/migrations/`.
4.  Terapkan migrasi ke database lokal:
    ```bash
    supabase db reset
    ```

---

## Struktur Tabel yang Terbuat

1.  **Ekstensi**: `vector` (untuk pgvector).
2.  **`users`**: Tabel profil pengguna (murid, guru, admin).
3.  **`concept_nodes` & `concept_edges`**: Struktur pohon konsep matematika Fase D, E, F.
4.  **`knowledge_embeddings`**: Data potongan teks materi kurikulum beserta koordinat vektor 768-dimensi (bisa diubah ke 1024) untuk keperluan RAG Socratic Agent.
5.  **`learning_sessions`**: Pengelolaan sesi belajar aktif siswa.
6.  **`learning_telemetry`**: Pencatatan metrik logistik pengerjaan soal (waktu tunggu/dwell time, backspace, tingkat keyakinan/confidence rating).
7.  **`learning_memory`**: Memori jangka panjang siswa yang dibaca dan diperbarui oleh Supervisor Agent untuk melacak penguasaan konsep (*mastery score*).
