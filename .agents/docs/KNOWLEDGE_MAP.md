# Dokumen Konteks: Peta Kurikulum & Konsep Matematika SMA - TICMI-v3

Dokumen ini mendeskripsikan struktur dependensi vertikal materi prasyarat matematika SMA (Kurikulum Merdeka), representasi visual di frontend, serta peta data pendidik.

---

## 1. Pohon Dependensi Vertikal Kurikulum

Keunggulan platform TICMI adalah kemampuannya menelusuri rantai konsep secara vertikal melintasi berbagai fase kurikulum (Fase D $\rightarrow$ Fase E $\rightarrow$ Fase F/F+). 

### Struktur Prasyarat Materi Matematika (Sesuai Gambar 8 Proposal):

```
       Fase F / F+ (Kelas XI - XII - Target Utama)
       ┌───────────────────────┬───────────────────────┐
       │   Turunan Fungsi      │    Operasi Matriks    │
       └──────────┬────────────┘───────────┬───────────┘
                  │                        │
                  ▼                        ▼
       Fase E (Kelas X - Prasyarat Menengah)
       ┌───────────────────────┬───────────────────────┐
       │     Fungsi Kuadrat    │  Eksponen & Logaritma │
       └──────────┬────────────┘───────────┬───────────┘
                  │                        │
                  ▼                        ▼
       Fase D (Kelas VII - IX - Prasyarat Dasar)
       ┌───────────────────────┬───────────────────────┐
       │ Relasi & Fungsi Dasar │ Operasi Bil. & Aljabar│
       └───────────────────────┴───────────────────────┘
```

### Pemetaan Lengkap Sub-Materi Per Fase:
*   **Fase D (SMP, Kelas VII-IX)**:
    *   *Aritmetika*: Operasi Bilangan Bulat & Pecahan.
    *   *Aljabar*: Bentuk Aljabar & Operasinya, Persamaan Linear Satu Variabel.
    *   *Geometri*: Relasi & Fungsi Dasar, Teorema Pythagoras, Bangun Datar, Sistem Koordinat Kartesius.
*   **Fase E (SMA, Kelas X)**:
    *   *Aljabar*: Eksponen & Logaritma, Persamaan Linear Dua Variabel.
    *   *Fungsi & Geometri*: Fungsi Kuadrat, Relasi & Fungsi, Perbandingan Trigonometri.
*   **Fase F / Fase F+ (SMA, Kelas XI-XII)**:
    *   *Aljabar & Fungsi*: Matriks, Fungsi Logaritma & Eksponensial, Polinomial, Fungsi Komposisi & Invers, Vektor.
    *   *Kalkulus*: Limit Fungsi, Turunan Fungsi.
    *   *Geometri*: Fungsi Trigonometri, Transformasi Geometri.
    *   *Statistika*: Statistika Inferensial.

---

## 2. Representasi Visual Frontend (React Flow Node States)

Peta konsep visual interaktif disajikan kepada siswa menggunakan **React Flow** sebagai grafik pohon konsep terstruktur. Jika sistem mendeteksi kesenjangan kompetensi, warna simpul (*node status*) akan berubah secara dinamis berdasarkan 3 kondisi:

| Warna Simpul | Status Kognitif | Deskripsi Perilaku Sistem |
| :--- | :--- | :--- |
| 🔴 **Merah** | **Celah Kritis (Misconception)** | Terdeteksi kesalahan konsep prasyarat kritis oleh *Error Analysis Agent*. Akses materi utama Fase F diblokir sementara. |
| 🟡 **Kuning Berkedip** | **Masa Inkubasi Remediasi** | Modul remediasi sedang aktif. Siswa diharuskan membuka **Teach-Me Mode** untuk menyelesaikan dialog interaktif dengan AI. |
| 🟢 **Hijau** | **Pemahaman Tervalidasi** | Penjelasan konseptual siswa telah disetujui secara koheren oleh *Mastery Agent*. Siswa diizinkan kembali ke materi utama Fase F. |

---

## 3. Peta Pendidik (Executive Diagnostic Heatmap)

Beban kerja guru matematika dalam mendeteksi kesenjangan konsep diminimalkan melalui **Executive Dashboard Heatmap** yang menampilkan visualisasi data padat satu kelas.

### Matriks Visualisasi Heatmap:
*   **Sumbu Y (Vertikal)**: Identitas Siswa (Daftar nama siswa dalam satu kelas).
*   **Sumbu X (Horizontal)**: Klaster Konsep Kurikulum (Mulai dari Fase D, E, hingga Fase F).
*   **Grid Cell**: Warna sel mewakili status pemahaman masing-masing siswa pada materi tersebut (Merah/Kuning/Hijau).
*   **Analisis Guru**: Guru dapat melihat pola miskonsepsi agregat kelas secara instan. 
    *   *Contoh*: Jika 80% grid sel pada kolom **"Operasi Bilangan Bulat & Pecahan (Fase D)"** berwarna merah ketika kelas sedang mempelajari **"Determinan Matriks (Fase F)"**, dasbor AI akan menyarankan guru untuk mengulas kembali operasi bilangan bulat secara klasikal sebelum melanjutkan materi matriks.
