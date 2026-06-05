# Dokumen Konteks: Project Overview - TICMI-v3

Dokumen ini berisi gambaran umum proyek, metodologi pedagogi, dan target metrik keberhasilan untuk platform **TICMI** (*Teach Intelligent Concept Mapping Interaction*).

---

## 1. Visi & Masalah Utama

Kualitas pendidikan matematika tingkat SMA di Indonesia sangat bergantung pada penguasaan **materi prasyarat** (fondasi dasar SMP/Fase D dan Kelas X/Fase E). Asesmen Nasional menunjukkan capaian numerasi SMA masih bervariasi dan terdapat kesenjangan pemahaman konsep dasar yang lebar.

Kegagalan siswa dalam memecahkan soal Fase F (Kelas XI dan XII) seperti *Fungsi Komposisi*, *Invers*, atau *Operasi Matriks* sering kali bukan karena kompleksitas materi itu sendiri, melainkan lemahnya konsep prasyarat dasar seperti operasi aljabar pecahan atau operasi bilangan bulat.

Platform konvensional (LMS) hanya menyesuaikan tingkat kesulitan soal berdasarkan status benar/salah tanpa mendiagnosis akar kesalahan secara adaptif. TICMI dirancang untuk:
*   Mendeteksi letak miskonsepsi dasar secara otomatis.
*   Mengarahkan siswa ke materi prasyarat yang bolong (*prerequisite-aware routing*).
*   Memvalidasi pemahaman ulang siswa melalui dialog interaktif sokratik (*Student-as-Teacher*).

---

## 2. Metodologi Pedagogi (Kognitif)

TICMI menolak metode *spoon-feeding* (di mana AI langsung menyajikan jawaban akhir/pembahasan baris demi baris ketika siswa salah). Sebaliknya, sistem menggunakan dua paradigma kognitif berikut:

### A. Productive Struggle
Proses di mana siswa berupaya memecahkan tantangan kognitif secara aktif dan membangun kembali struktur pemahamannya sendiri secara mandiri. AI menuntun dengan memberikan petunjuk (*hint*) dan pertanyaan penuntun (*scaffolding*) adaptif.

### B. Student-as-Teacher (Teach-Me Mode)
Mengacu pada **Protege Effect** dan literatur *learning by teaching*. 
*   Ketika terdeteksi kesenjangan konsep prasyarat, sistem mengaktifkan **Teach-Me Mode**.
*   Siswa bertindak sebagai **Guru** yang menjelaskan suatu konsep kepada **AI** (yang memposisikan dirinya sebagai siswa/murid yang bertanya).
*   Menjelaskan konsep kepada orang lain terbukti secara ilmiah memperkuat retensi memori, memicu transfer pengetahuan, dan mengungkap celah pemahaman yang tidak disadari.

---

## 3. Target Metrik Evaluasi (KPI Proyek)

Keberhasilan implementasi TICMI diukur menggunakan metrik teknis dan pedagogis berikut (sesuai Tabel 2 Proposal):

| No | Aspek Evaluasi | Metrik | Cara Pengukuran | Target Minimal |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **Kebergunaan Aplikasi** | *System Usability Scale* (SUS) | Kuesioner SUS (10 pertanyaan) diisi siswa/guru setelah mencoba aplikasi | **Skor SUS $\ge 70$** |
| 2 | **Akurasi Diagnosis Sistem** | *Accuracy* | Membandingkan diagnosis agen AI dengan evaluasi guru matematika | **$\ge 75\%$** |
| 3 | **Ketepatan Deteksi Miskonsepsi**| *Precision* | Ketepatan sistem dalam menandai jenis miskonsepsi tertentu | **$\ge 75\%$** |
| 4 | **Kelengkapan Deteksi** | *Recall* | Kemampuan sistem mendeteksi miskonsepsi yang benar-benar ada | **$\ge 70\%$** |
| 5 | **Keseimbangan Performa** | *F1-score* | Kombinasi harmonis dari Precision dan Recall | **$\ge 72\%$** |
| 6 | **Kesepakatan Sistem & Guru** | *Cohen's Kappa* | Mengukur konsistensi antara klasifikasi AI dan guru | **$\ge 0,61$** |
| 7 | **Efektivitas Pembelajaran** | *Pre-test & Post-test* | Perbandingan nilai tes sebelum dan sesudah menggunakan TICMI | **Peningkatan $\ge 10\%$** |
| 8 | **Efektivitas Teach-Me Mode** | Tingkat Validasi Konsep | Persentase siswa yang berhasil memperbaiki konsep di mode "Teach Me" | **$\ge 70\%$** |
| 9 | **Efisiensi Pendidik** | Waktu Analisis | Pengurangan waktu guru menganalisis kelas secara manual | **Pengurangan $\ge 25\%$** |
| 10| **Performa Sistem** | Waktu Respons AI | Waktu dari submit respon hingga respons awal AI muncul | **$\le 10$ detik** |
| 11| **Kualitas RAG** | Relevansi Konteks | Evaluasi keselarasan dokumen kurikulum yang di-retrieve dengan topik | **$\ge 75\%$ Relevan** |
| 12| **Dukungan LaTeX** | Keberhasilan Rendering | Rendering notasi matematika di frontend (soal, hint, chat) | **$\ge 90\%$ Berhasil** |
