# Skill: RAG Document Indexing - TICMI-v3

Skill ini mendeskripsikan langkah-langkah bagi asisten AI atau developer untuk memotong (*chunking*) dokumen kurikulum matematika, menghitung nilai representasi vektor (*embeddings*), dan menyimpannya ke Supabase `pgvector`.

---

## Deskripsi Skill
*   **Nama**: `rag-document-indexing`
*   **Tujuan**: Mengotomatiskan proses ekstraksi bahan ajar/kurikulum agar siap dikueri secara semantik oleh **Socratic Agent** menggunakan teknik Retrieval-Augmented Generation (RAG).
*   **Kapan Digunakan**:
    *   Setelah Anda mengekstrak Buku Guru/Siswa PDF menjadi Markdown + LaTeX.
    *   Saat menambahkan modul materi matematika baru ke dalam database.
    *   Saat asisten AI perlu memperbarui basis pengetahuan kurikulum.

---

## Prasyarat Lingkungan
Sebelum menjalankan skrip indexing, pastikan Anda telah menyiapkan Python virtual environment dan menginstal dependensi yang dibutuhkan:

```bash
# Aktifkan virtual environment di folder agent/ atau backend/ai-service/
# Windows:
venv\Scripts\activate
# Unix/macOS:
source venv/bin/activate

# Instal dependensi
pip install sentence-transformers requests numpy
```

---

## Cara Eksekusi Skrip Indexing

Skrip [index_documents.py](file:///c:/projects/TICMI-v3/.agents/skills/rag-document-indexing/index_documents.py) membutuhkan parameter kredensial Supabase di `.env` atau variabel lingkungan:
*   `SUPABASE_URL`: URL API Supabase Anda (misal `https://xxxx.supabase.co`).
*   `SUPABASE_SERVICE_KEY`: Service Role Key Supabase Anda (untuk bypass RLS saat menulis data).

### Menjalankan Skrip:
```bash
python index_documents.py --dir "./materi-markdown" --node-id "d-operasi-bilangan"
```

### Parameter:
*   `--dir` : Direktori yang berisi file Markdown (`.md`) hasil ekstraksi materi kurikulum.
*   `--node-id` : ID dari `concept_node` yang bersesuaian (misal `d-operasi-bilangan` agar data RAG terikat ke simpul peta konsep yang tepat).
*   `--chunk-size` : (Opsional) Panjang maksimal karakter tiap potongan teks (Default: 800).
*   `--overlap` : (Opsional) Panjang tumpang-tindih karakter antar potongan teks (Default: 100).
