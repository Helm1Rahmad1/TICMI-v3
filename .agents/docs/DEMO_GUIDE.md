# Panduan Demonstrasi Video (E2E) - TICMI-v3

Dokumen ini memandu Anda langkah-demi-langkah untuk menjalankan platform **TICMI-v3** secara lokal dan merekam video demonstrasi yang meyakinkan (50% Completion Milestone).

---

## 1. Persiapan & Menjalankan Service

Anda dapat meluncurkan ketiga service sekaligus menggunakan batch file **`run.bat`** yang berada di folder `.agents/skills/run.bat`, atau menjalankannya secara manual di 3 terminal terpisah:

### Terminal 1: FastAPI AI Service
```bash
cd backend/ai-service
venv\Scripts\activate
python main.py
```
*Layanan ini akan aktif di port `8000` (`http://localhost:8000`).*

### Terminal 2: NestJS Gateway API
```bash
cd backend/api
npm run start:dev
```
*Layanan ini akan aktif di port `3001` (`http://localhost:3001`).*

### Terminal 3: Next.js Frontend App
```bash
cd frontend
npm run dev
```
*Aplikasi web akan aktif di port `3000` (`http://localhost:3000`).*

---

## 2. Skenario & Alur Perekaman Video Demo

Ikuti rute pengerjaan berikut agar visualisasi kognitif dan interaksi agen AI terlihat sempurna:

### Bagian A: Alur Siswa (Socratic Remediation)
1. Buka browser di **`http://localhost:3000`**. Anda akan melihat splash screen animasi premium.
2. Di halaman **Login**, pastikan tab **Siswa** terpilih. Masukkan email default:
   * **Email**: `siswa@sekolah.sch.id`
   * **Password**: `bebas` (diisi apa saja karena bypass autentikasi)
   * Klik **Masuk**.
3. Di Dashboard Siswa, klik **Buka Peta Konsep** atau kunjungi menu Concept Map. Tunjukkan node **"Fungsi Komposisi & Invers"** yang sedang dipelajari dan node prasyarat **"Operasi Bilangan & Pecahan"** yang awalnya abu-abu/terkunci.
4. Kembali ke Dashboard, lalu pada bagian **Misi hari ini**, klik tugas **"Quiz Fungsi Komposisi"** (tindakan ini akan mengarahkan Anda ke halaman Kuis di `/student/assignments`).
5. Anda akan disajikan soal:
   * *Selesaikan komposisi fungsi jika $f(x) = 1/x$ dan $g(x) = x - 2$. Tentukan $(f \circ g)(x)$.*
6. Masukkan jawaban salah yang mencerminkan miskonsepsi prasyarat: **`1/x - 2`**. Lalu set tingkat keyakinan (confidence) ke nilai tinggi (misal 80%).
7. Klik **Kirim Jawaban**.
8. **Transisi Kognitif**:
   * Sistem secara otomatis mendeteksi **Prerequisite Gap** (celah prasyarat Fase D/E).
   * Muncul notifikasi merah **"Celah Konsep Terdeteksi"** di bawah kolom jawaban dengan penjelasan detail.
   * Node **"Operasi Bilangan & Pecahan"** pada Concept Map di latar belakang telah berubah menjadi **Merah**.
   * Klik tombol merah **Mulai Sesi Teach-Me** di bawah notifikasi (atau tombol di bar bawah) untuk masuk ke mode Teach-Me dan mulai mengajari AI Student (**Kiko**).
9. Di Teach-Me Mode, Kiko akan bertanya:
   * *"Halo Kak! Saya sedang mencoba menyelesaikan limit dan komposisi pecahan, tapi saya bingung kenapa $\frac{1}{x-2}$ itu tidak sama dengan $\frac{1}{x} - 2$. Bisa bantu jelaskan cara menyamakan penyebut pecahan aljabar?"*
10. Berperanlah sebagai Guru dan ketik penjelasan di kolom chat:
    * **Penjelasan**: *"Kita harus menyamakan penyebutnya dahulu sebelum mengurangkannya."* (Pastikan mengandung kata kunci **penyebut** atau **samakan**).
11. **Penyelesaian**:
    * Kiko akan merespons dengan gembira bahwa dia telah paham.
    * Progress pemahaman naik menjadi **100%**.
    * Simpul peta konsep **"Operasi Bilangan & Pecahan"** berubah menjadi **Hijau** (Dikuasai).
    * Anda akan diarahkan kembali ke peta konsep yang sudah terupdate secara visual.

### Bagian B: Alur Guru (Diagnostic Dashboard)
1. **Transisi Peran (Logout & Login Kembali)**:
   * Di menu navigasi bawah, pilih tab **Profil** (ikon bintang `Kamu`).
   * Scroll ke bawah dan klik tombol merah **Keluar / Ganti Peran**. Ini akan mengarahkan Anda kembali ke halaman Login.
   * Pada halaman Login, klik tab **Guru** (ikon 📋) untuk mengubah peran.
   * Masukkan email guru default: **`guru@sekolah.sch.id`** (Password bebas).
   * Klik tombol **Masuk sebagai Guru**.
2. Tunjukkan **Diagnostic Heatmap** kelas:
   * Anda bisa melihat grid baris-kolom berisi daftar siswa dan topik matematika.
   * Sel berwarna merah menunjukkan celah kritis siswa tertentu.
3. Tunjukkan panel **Live Aktivitas** di Dashboard Guru:
   * Log real-time akan menampilkan aktivitas siswa secara langsung (misal: *"Devin Pradana baru saja menyelesaikan kuis"*).
4. Tunjukkan panel **AI Rekomendasi**:
   * AI menyarankan tindakan kelas yang spesifik, seperti *"Sisipkan remediasi eksponen 10-min"* atau *"Pair-teach Devin & Hesti"*.

---

## 3. Catatan Penyempurnaan Teknis (Offline Fallback)
* Jika koneksi internet ke API LLM terputus, backend NestJS & FastAPI secara otomatis mendeteksi kegagalan koneksi dan menggunakan simulasi respons lokal berbasis aturan (*rule-based simulator*).
* Hal ini memastikan demo Anda berjalan **100% aman dan lancar** tanpa adanya delay atau error koneksi LLM yang tidak di inginkan selama perekaman video.

---

## 4. Kepatuhan Ketentuan Lomba LIDM VII 2026 (Divisi 1 ITDP)

Cabang **Inovasi Teknologi Digital Pendidikan (ITDP)** dengan subtema **"Teknologi Digital untuk Ekosistem Pendidikan Berdampak dan Berintegritas"** menetapkan beberapa aturan spesifik untuk video demonstrasi (milestone minimal 50% pengerjaan):

### A. Spesifikasi Teknis Video
*   **Format & Resolusi**: MP4 720p atau 1080p.
*   **Durasi**: Maksimum **3 menit** (di luar intro dan subtitle).
*   **Kelengkapan**: Wajib mencantumkan **intro** dan **subtitle** penjelasan.
*   **Format Judul Video (YouTube)**:
    `LIDM 2026 - ITDP - [Kode PT] - [Nama Tim] - [Judul Karya] - Proposal`

### B. Tips Pengambilan Demo untuk Nilai Maksimal (Bobot Penilaian ITDP)
Saat merekam video, pastikan Anda menyorot aspek-aspek berikut untuk memenuhi kriteria penilaian juri:
1.  **Dampak Ekosistem Pendidikan (Bobot 20%)**: Tekankan bagaimana platform TICMI-v3 mendeteksi celah secara personal untuk siswa dan membantu guru menyusun rencana pengajaran adaptif klasikal melalui dasbor guru.
2.  **Aspek Permasalahan (Bobot 20%)**: Jelaskan di awal video bahwa masalah utama numerasi SMA adalah kelemahan konsep prasyarat dasar (Fase D/E), bukan materi Fase F itu sendiri.
3.  **Idea & Tingkat Kecerdasan (Bobot 25%)**: Tunjukkan orkestrasi Multi-Agent AI menggunakan **LangGraph** (Supervisor, Error Analysis, Misconception, Routing, Socratic, dan Mastery) yang membedakan platform ini dengan LMS linier biasa.
4.  **Aspek Pengembangan & Teknis (Bobot 25%)**: Tunjukkan fungsionalitas visualisasi Concept Map (React Flow) yang berubah warna secara real-time dan rendering formula LaTeX yang presisi.
5.  **Rencana & Target Validasi (Bobot 10%)**: Tunjukkan adanya rencana pengukuran usabilitas sistem (skor target SUS $\ge 70$) dan kepuasan guru.

