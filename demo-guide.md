# Panduan Demonstrasi Video (E2E) - TICMI-v3

Dokumen ini memandu Anda langkah-demi-langkah untuk menjalankan platform **TICMI-v3** secara lokal dan merekam video demonstrasi yang meyakinkan (50% Completion Milestone).

---

## 1. Persiapan & Menjalankan Service

Buka 3 jendela terminal terpisah di komputer Anda dan jalankan perintah berikut:

### Terminal 1: FastAPI AI Service
```bash
cd c:\projects\TICMI-v3\backend\ai-service
venv\Scripts\activate
python main.py
```
*Layanan ini akan aktif di port `8000` (`http://localhost:8000`).*

### Terminal 2: NestJS Gateway API
```bash
cd c:\projects\TICMI-v3\backend\api
npm run start:dev
```
*Layanan ini akan aktif di port `3001` (`http://localhost:3001`).*

### Terminal 3: Next.js Frontend App
```bash
cd c:\projects\TICMI-v3\frontend
npm run dev
```
*Aplikasi web akan aktif di port `3000` (`http://localhost:3000`).*

---

## 2. Skenario & Alur Perekaman Video Demo

Ikuti rute pengerjaan berikut agar visualisasi kognitif dan interaksi agen AI terlihat sempurna:

### Bagian A: Alur Siswa (Socratic Remediation)
1. Buka browser di **`http://localhost:3000`**. Anda akan melihat splash screen animasi premium LIDM 2026.
2. Di halaman **Login**, pastikan tab **Siswa** terpilih. Masukkan email default:
   * **Email**: `siswa@sekolah.sch.id`
   * **Password**: `bebas` (diisi apa saja karena bypass autentikasi)
   * Klik **Masuk**.
3. Di Dashboard Siswa, klik **Buka Peta Konsep** atau kunjungi menu Concept Map. Tunjukkan node **"Fungsi Komposisi & Invers"** yang sedang dipelajari dan node prasyarat **"Operasi Bilangan & Pecahan"** yang awalnya abu-abu/terkunci.
4. Kembali ke Dashboard, lalu klik tugas **"Quiz matriks 2x2"** atau **"Assignments"** di sidebar.
5. Anda akan disajikan soal:
   * *Selesaikan komposisi fungsi jika $f(x) = 1/x$ dan $g(x) = x - 2$. Tentukan $(f \circ g)(x)$.*
6. Masukkan jawaban salah yang mencerminkan miskonsepsi prasyarat: **`1/x - 2`**. Lalu set tingkat keyakinan (confidence) ke nilai tinggi (misal 80%).
7. Klik **Kirim Jawaban**.
8. **Transisi Kognitif**:
   * Sistem secara otomatis mendeteksi **Prerequisite Gap** (celah prasyarat Fase D/E).
   * Node **"Operasi Bilangan & Pecahan"** pada Concept Map akan berubah menjadi **Merah**.
   * Siswa dialihkan ke **Teach-Me Mode** untuk mengajari AI Student (**Kiko**).
9. Di Teach-Me Mode, Kiko akan bertanya:
   * *"Halo Kak! ... kenapa 1/(x-2) tidak sama dengan 1/x - 2? Bisa bantu jelaskan cara menyamakan penyebut pecahan aljabar?"*
10. Berperanlah sebagai Guru dan ketik penjelasan di kolom chat:
    * **Penjelasan**: *"Kita harus menyamakan penyebutnya dahulu sebelum mengurangkannya."* (Pastikan mengandung kata kunci **penyebut** atau **samakan**).
11. **Penyelesaian**:
    * Kiko akan merespons dengan gembira bahwa dia telah paham.
    * Progress pemahaman naik menjadi **100%**.
    * Simpul peta konsep **"Operasi Bilangan & Pecahan"** berubah menjadi **Hijau** (Dikuasai).
    * Anda akan diarahkan kembali ke peta konsep yang sudah terupdate secara visual.

### Bagian B: Alur Guru (Diagnostic Dashboard)
1. Buka sidebar lalu pilih menu **Guru** (atau logout dan login kembali sebagai tab **Guru** dengan email `guru@sekolah.sch.id`).
2. Tunjukkan **Diagnostic Heatmap** kelas:
   * Anda bisa melihat grid baris-kolom berisi daftar siswa dan topik matematika.
   * Sel berwarna merah menunjukkan celah kritis siswa tertentu.
3. Tunjukkan panel **Live Aktivitas** di Dashboard Guru:
   * Log real-time akan menampilkan aktivitas siswa (misal: *"Devin Pradana baru saja menguasai Operasi Bilangan"*).
4. Tunjukkan panel **AI Rekomendasi**:
   * AI menyarankan tindakan kelas yang spesifik, seperti *"Sisipkan remediasi eksponen 10-min"* atau *"Pair-teach Devin & Hesti"*.

---

## 3. Catatan Penyempurnaan Teknis (Offline Fallback)
* Jika koneksi internet ke API LLM terputus, backend NestJS & FastAPI secara otomatis mendeteksi kegagalan koneksi dan menggunakan simulasi respons lokal berbasis aturan (*rule-based simulator*).
* Hal ini memastikan demo Anda berjalan **100% aman dan lancar** tanpa adanya delay atau error koneksi LLM yang tidak diinginkan selama perekaman video.
