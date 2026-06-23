# Panduan Generate Commit Message Git

Instruksi ini digunakan oleh agen AI untuk secara akurat menghasilkan pesan commit (*commit message*) Git berdasarkan kondisi kerja terbaru (*working tree*) di repositori ini.

---

## 1. Langkah Pengumpulan Konteks Working Tree

Sebelum membuat pesan commit, Anda **wajib** mengumpulkan informasi perubahan menggunakan perintah Git berikut secara berurutan di terminal:

1.  **Cek status perubahan file (secara ringkas)**:
    ```bash
    git status --porcelain
    ```
2.  **Cek detail perubahan yang sudah di-stage (siap commit)**:
    ```bash
    git diff --cached
    ```
3.  **Cek detail perubahan yang belum di-stage (opsional, jika tidak ada staged changes)**:
    ```bash
    git diff
    ```

---

## 2. Aturan & Format Commit Message

Setelah menganalisis output dari perintah di atas, formulasikan pesan commit dengan aturan berikut:

### Format Wajib:
1.  **Satu baris Title menggunakan standar Conventional Commits**:
    ```text
    type(scope): short summary in lowercase
    ```
    *   **Tipe (`type`) yang diizinkan**:
        *   `feat`: Penambahan fitur baru.
        *   `fix`: Perbaikan bug/error.
        *   `docs`: Perubahan dokumentasi saja (seperti file `.md`).
        *   `style`: Perubahan format kode, semicolon, atau styling UI tanpa mengubah logika.
        *   `refactor`: Perubahan struktur kode tanpa mengubah fungsi luar.
        *   `test`: Penambahan atau perbaikan unit test.
        *   `chore`: Pemeliharaan tugas rutin, update library dependencies, atau konfigurasi build.
    *   **Cakupan (`scope`)**: Tentukan folder atau modul utama yang paling dominan diubah (misal: `frontend`, `backend`, `ai-service`, `docs`, `config`).
    *   **Deskripsi ringkas**: Berisi ringkasan perubahan dalam bentuk kalimat aktif.

2.  **Bullet Points Detail Perubahan (3-6 poin)**:
    *   Fokus pada dampak (*impact*) dari perubahan tersebut dan alasan/konteks teknis di balik perubahan.
    *   Gunakan tanda hubung `-` sebagai bullets.

3.  **Bahasa**: Gunakan **Bahasa Indonesia** yang baku, ringkas, dan profesional.

4.  **Anti-Fluff**: Hindari kata-kata tidak bermakna atau generik seperti "update code", "perbaikan file", atau "cleaning". Sebutkan nama kelas, fungsi, endpoint, atau visual UI yang terpengaruh secara spesifik.

5.  **Pengelompokan**: Jika ada perubahan lintas file/fitur yang berbeda arah, kelompokkan poin perubahan berdasarkan section atau alur logic (flow).

6.  **Konfigurasi**: Sertakan perubahan penting pada config file (seperti `.env`, `package.json`, `next.config.ts`) jika ada.

7.  **Output Bersih**: Cukup tampilkan isi pesan commit final saja tanpa basa-basi proses, teks intro ("Ini adalah commit message Anda:"), atau command git commit. Hal ini mempermudah pengguna untuk langsung menyalin (*copy-paste*).

---

## 3. Konteks Tambahan Proyek

*   **Nama Proyek**: TICMI-v3 (Teach Intelligent Concept Mapping Interaction)
*   **Prefered Scopes**: `frontend`, `backend`, `ai-service`, `docs`, `config`
*   **Gaya Penulisan**: Ringkas, profesional, teknis, dan mudah dibaca oleh reviewer/dosen penguji.

---

## Contoh Output Target

```text
feat(frontend): integrasi rendering latex katex pada halaman tugas dan teach-me

- Menambahkan komponen client-side Latex.tsx yang aman terhadap SSR Next.js menggunakan library KaTeX.
- Mengganti visualisasi plaintext formula matematika f(x) dan g(x) pada student assignments page ke bentuk LaTeX.
- Memperbarui chat bubble di teach-me page agar memproses string di antara pembatas $ secara dinamis.
- Memperbarui file package.json dengan menambahkan library dependency katex.
```
