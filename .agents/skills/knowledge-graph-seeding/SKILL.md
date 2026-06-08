# Skill: Knowledge Graph Seeding - TICMI-v3

Skill ini mendeskripsikan instruksi dan langkah-langkah untuk melakukan *seeding* (pengisian data awal) kurikulum matematika Fase D, E, dan F ke dalam tabel database Supabase (`concept_nodes` dan `concept_edges`).

---

## Deskripsi Skill
*   **Nama**: `knowledge-graph-seeding`
*   **Tujuan**: Mengisi struktur grafik pengetahuan matematika (Kurikulum Merdeka) agar visualisasi pohon konsep pada frontend (React Flow) dan logika penelusuran prasyarat pada backend (LangGraph) dapat berfungsi langsung dengan data riil.
*   **Kapan Digunakan**:
    *   Setelah membuat skema database utama (`schema.sql`).
    *   Saat asisten AI perlu memvalidasi relasi dependensi antar topik matematika.
    *   Saat mereset database lokal untuk testing.

---

## Cara Eksekusi

### Metode A: Supabase Dashboard SQL Editor
1.  Salin seluruh kode SQL yang ada di [seed.sql](file:///c:/projects/TICMI-v3/.agents/skills/knowledge-graph-seeding/seed.sql).
2.  Buka dashboard Supabase, masuk ke **SQL Editor**, buat query baru, lalu tempel kode SQL tersebut.
3.  Klik **Run** untuk memasukkan data simpul (*nodes*) dan garis (*edges*) prasyarat kurikulum.

### Metode B: Prisma Seed Script (Jika diimplementasikan di NestJS)
Jika NestJS menggunakan Prisma ORM, Anda dapat memicu seeding data melalui prisma seed:
1.  Buat file `prisma/seed.ts`.
2.  Picu pembacaan data SQL atau JSON yang bersesuaian dengan berkas `seed.sql`.
3.  Jalankan perintah:
    ```bash
    npx prisma db seed
    ```
