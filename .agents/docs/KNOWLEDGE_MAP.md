# Dokumen Konteks: Peta Kurikulum & Konsep Matematika SMA - TICMI-v3

Dokumen ini mendeskripsikan struktur dependensi vertikal materi prasyarat matematika SMA (Kurikulum Merdeka), representasi visual di frontend, serta peta data pendidik.

---

## 1. Pohon Dependensi Vertikal Kurikulum

Keunggulan platform TICMI adalah kemampuannya menelusuri rantai konsep secara vertikal melintasi berbagai fase kurikulum (Fase D $\rightarrow$ Fase E $\rightarrow$ Fase F/F+) secara hierarkis dari bawah ke atas.

Dalam model kognitif platform ini, dependensi direpresentasikan dengan format **Materi Target $\rightarrow$ Prerequisite (Materi Lebih Awal)**. Tanda panah ($\rightarrow$) menunjukkan arah penelusuran kesenjangan konsep (*dependency tracing*), di mana simpul yang ditunjuk adalah materi dasar yang harus dipahami terlebih dahulu sebelum dapat melanjutkan.

Berikut adalah pemetaan kurikulum lengkap hasil ekstraksi buku paket matematika kelas 7-12:

### A. Daftar Simpul Konsep (Nodes)
#### Fase D (SMP, Kelas VII-IX)
*   **d-bilangan-berpangkat** — Bilangan Berpangkat & Bentuk Akar
    *   *Deskripsi*: Sifat-sifat eksponen, bilangan bulat, rasional, dan bentuk akar.
*   **d-aljabar-linear** — Bentuk Aljabar & Persamaan Linear
    *   *Deskripsi*: Manipulasi aljabar, persamaan dan pertidaksamaan linear satu variabel.
*   **d-geometri-datar** — Bangun Datar, Garis, Sudut, & Kesebangunan
    *   *Deskripsi*: Sifat geometri, sudut, garis sejajar/berpotongan, dan kesebangunan segitiga.
*   **d-pythagoras** — Teorema Pythagoras
    *   *Deskripsi*: Hubungan panjang sisi-sisi pada segitiga siku-siku dan tripel Pythagoras.
*   **d-spldv** — Sistem Persamaan Linear Dua Variabel
    *   *Deskripsi*: Model matematika dan penyelesaian SPLDV (grafik, substitusi, eliminasi).
*   **d-relasi-fungsi** — Relasi, Fungsi, & Persamaan Garis Lurus
    *   *Deskripsi*: Konsep relasi, fungsi, domain, range, serta representasi fungsi linear.
*   **d-transformasi-geometri** — Transformasi Geometri Dasar
    *   *Deskripsi*: Translasi, refleksi, rotasi, dan dilatasi pada bidang Kartesius.
*   **d-statistika-peluang** — Statistika Data & Peluang Dasar
    *   *Deskripsi*: Pengumpulan data, pemusatan/penyebaran data, dan peluang empirik/teoretik dasar.

#### Fase E (SMA, Kelas X)
*   **e-eksponen-logaritma** — Fungsi Eksponen & Logaritma
    *   *Deskripsi*: Grafik, sifat, dan aplikasi fungsi eksponen serta logaritma.
*   **e-barisan-deret** — Barisan & Deret Aritmetika & Geometri
    *   *Deskripsi*: Pola bilangan, rumus suku ke-n, dan jumlah deret.
*   **e-trigonometri-dasar** — Perbandingan Trigonometri
    *   *Deskripsi*: Sinus, kosinus, tangen pada segitiga siku-siku dan sudut berelasi.
*   **e-spl-sptl** — Sistem Persamaan & Pertidaksamaan Linear
    *   *Deskripsi*: SPLDV, SPLTV, dan sistem pertidaksamaan linear dua variabel.
*   **e-fungsi-kuadrat** — Persamaan & Fungsi Kuadrat
    *   *Deskripsi*: Karakteristik, grafik, pemfaktoran, dan aplikasi fungsi kuadrat.
*   **e-statistika-data** — Representasi & Interpretasi Data
    *   *Deskripsi*: Histogram, diagram pencar, ukuran pemusatan dan penyebaran data berkelompok.

#### Fase F/F+ (SMA, Kelas XI-XII)
*   **f-fungsi-komposisi-invers** — Fungsi Komposisi & Invers
    *   *Deskripsi*: Operasi komposisi (fog)(x) dan invers fungsi f^{-1}(x).
*   **f-lingkaran** — Lingkaran
    *   *Deskripsi*: Persamaan lingkaran, garis singgung, dan tali busur.
*   **f-statistika-inferensial** — Regresi Linear & Korelasi
    *   *Deskripsi*: Analisis hubungan antar variabel, garis regresi, dan koefisien korelasi.
*   **f-matriks** — Matriks & Operasinya
    *   *Deskripsi*: Jenis, operasi, determinan, invers matriks, dan transformasi matriks.
*   **f-vektor** — Vektor
    *   *Deskripsi*: Vektor pada bidang/ruang, hasil kali titik, dan proyeksi.
*   **f-transformasi-lanjut** — Transformasi Geometri dengan Matriks
    *   *Deskripsi*: Komposisi transformasi geometri menggunakan perkalian matriks.
*   **f-polinomial** — Polinomial / Suku Banyak
    *   *Deskripsi*: Operasi, pembagian, teorema sisa, dan teorema faktor.
*   **f-trigonometri-lanjut** — Fungsi & Aturan Trigonometri Lanjut
    *   *Deskripsi*: Grafik fungsi trigonometri, identitas, aturan sinus/cosinus, dan luas daerah.
*   **f-anuitas** — Anuitas, Bunga Majemuk, & Investasi
    *   *Deskripsi*: Pemodelan keuangan, anuitas, pinjaman, dan investasi jangka panjang.
*   **f-peluang-majemuk** — Kaidah Pencacahan & Peluang Majemuk
    *   *Deskripsi*: Permutasi, kombinasi, peluang kejadian majemuk, saling lepas/bebas, dan bersyarat.

### B. Daftar Hubungan Prasyarat (Edges) - Target $\rightarrow$ Prerequisite
Format: **Materi Target $\rightarrow$ Prerequisite (Materi Lebih Awal)**
*   **Fase E $\rightarrow$ Fase D**:
    *   `Fungsi Eksponen & Logaritma` $\rightarrow$ `Bilangan Berpangkat & Bentuk Akar`
    *   `Barisan & Deret Aritmetika & Geometri` $\rightarrow$ `Bilangan Berpangkat & Bentuk Akar`
    *   `Perbandingan Trigonometri` $\rightarrow$ `Teorema Pythagoras` & `Bangun Datar, Garis, Sudut, & Kesebangunan`
    *   `Sistem Persamaan & Pertidaksamaan Linear` $\rightarrow$ `Sistem Persamaan Linear Dua Variabel` & `Bentuk Aljabar & Persamaan Linear`
    *   `Persamaan & Fungsi Kuadrat` $\rightarrow$ `Relasi, Fungsi, & Persamaan Garis Lurus` & `Bentuk Aljabar & Persamaan Linear`
    *   `Representasi & Interpretasi Data` $\rightarrow$ `Statistika Data & Peluang Dasar`
*   **Fase F/F+ $\rightarrow$ Fase E/D**:
    *   `Fungsi Komposisi & Invers` $\rightarrow$ `Persamaan & Fungsi Kuadrat` (dan juga secara implisit memerlukan konsep fungsi dasar).
    *   `Lingkaran` $\rightarrow$ `Teorema Pythagoras` & `Bangun Datar, Garis, Sudut, & Kesebangunan` (Fase D)
    *   `Regresi Linear & Korelasi` $\rightarrow$ `Representasi & Interpretasi Data` (Fase E)
    *   `Kaidah Pencacahan & Peluang Majemuk` $\rightarrow$ `Representasi & Interpretasi Data` (Fase E)
    *   `Matriks & Operasinya` $\rightarrow$ `Sistem Persamaan Linear Dua Variabel` (Fase D)
    *   `Vektor` $\rightarrow$ `Teorema Pythagoras` & `Bangun Datar, Garis, Sudut, & Kesebangunan` (Fase D)
    *   `Transformasi Geometri dengan Matriks` $\rightarrow$ `Transformasi Geometri Dasar` (Fase D) & `Matriks & Operasinya` (Fase F)
    *   `Polinomial / Suku Banyak` $\rightarrow$ `Bentuk Aljabar & Persamaan Linear` (Fase D) & `Persamaan & Fungsi Kuadrat` (Fase E)
    *   `Fungsi & Aturan Trigonometri Lanjut` $\rightarrow$ `Perbandingan Trigonometri` (Fase E)
    *   `Anuitas, Bunga Majemuk, & Investasi` $\rightarrow$ `Barisan & Deret Aritmetika & Geometri` (Fase E) & `Fungsi Eksponen & Logaritma` (Fase E)

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
