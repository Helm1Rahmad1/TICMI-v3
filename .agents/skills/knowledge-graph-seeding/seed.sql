-- ====================================================================
-- TICMI-v3 KNOWLEDGE GRAPH SEEDING DATA
-- ====================================================================

-- 1. Seeding Concept Nodes (Fase D, E, F/F+)
INSERT INTO concept_nodes (id, label, phase, description) VALUES
-- Fase D (SMP / Kelas VII-IX)
('d-operasi-bilangan', 'Operasi Bilangan Bulat & Pecahan', 'D', 'Pemahaman dasar tentang perhitungan bilangan bulat, pecahan, desimal, dan operasi aritmetika dasar.'),
('d-aljabar-dasar', 'Bentuk Aljabar & Operasinya', 'D', 'Pengenalan variabel, koefisien, konstanta, serta penyederhanaan operasi aljabar dasar.'),
('d-persamaan-linear-satu', 'Persamaan Linear Satu Variabel', 'D', 'Pemecahan persamaan linear dengan satu variabel tidak diketahui.'),
('d-fungsi-dasar', 'Relasi & Fungsi Dasar', 'D', 'Konsep relasi, fungsi, domain, kodomain, range, serta penyajian grafik fungsi sederhana.'),
('d-pythagoras', 'Teorema Pythagoras', 'D', 'Rumus hubungan sisi-sisi segitiga siku-siku dan penerapannya.'),
('d-koordinat-kartesius', 'Sistem Koordinat Kartesius', 'D', 'Pemetaan titik pada koordinat 2D (X, Y) untuk keperluan representasi grafis.'),
('d-bangun-datar', 'Bangun Datar', 'D', 'Sifat-sifat geometris, perhitungan luas, dan keliling bangun datar dua dimensi.'),

-- Fase E (SMA / Kelas X)
('e-eksponen-logaritma', 'Eksponen & Logaritma', 'E', 'Operasi bilangan berpangkat, bentuk akar, serta konsep logaritma dasar.'),
('e-persamaan-linear-dua', 'Persamaan Linear Dua Variabel', 'E', 'Sistem persamaan linear dua variabel (SPLDV) dan metode eliminasinya.'),
('e-fungsi-kuadrat', 'Fungsi Kuadrat', 'E', 'Analisis karakteristik grafik fungsi kuadrat, titik puncak, dan pemodelan matematika.'),
('e-relasi-fungsi', 'Relasi & Fungsi (Lanjutan)', 'E', 'Definisi formal fungsi, fungsi linear, sifat-sifat fungsi (injektif, surjektif, bijektif).'),
('e-perbandingan-trigonometri', 'Perbandingan Trigonometri', 'E', 'Nilai sinus, cosinus, tangent pada segitiga siku-siku dan sudut-sudut istimewa.'),

-- Fase F / F+ (SMA / Kelas XI-XII)
('f-matriks', 'Operasi Matriks', 'F', 'Konsep matriks, penjumlahan, perkalian, transpose, determinan, dan invers matriks.'),
('f-fungsi-komposisi-invers', 'Fungsi Komposisi & Invers', 'F', 'Operasi penggabungan fungsi (fog)(x) dan pencarian invers dari suatu fungsi f(x).'),
('f-limit-fungsi', 'Limit Fungsi', 'F', 'Konsep limit fungsi aljabar pada titik tertentu dan ketakhinggaan.'),
('f-turunan-fungsi', 'Turunan Fungsi', 'F', 'Rumus dasar turunan, sifat-sifat turunan, dan aplikasinya pada fungsi aljabar.'),
('f-statistika-inferensial', 'Statistika Inferensial', 'F', 'Konsep distribusi probabilitas binomial, normal, dan uji hipotesis.'),
('f-fungsi-trigonometri', 'Fungsi Trigonometri', 'F', 'Identitas, persamaan, dan grafik fungsi trigonometri tingkat lanjut.'),
('f-transformasi-geometri', 'Transformasi Geometri', 'F', 'Translasi, refleksi, rotasi, dan dilatasi pada bidang 2D menggunakan matriks.'),
('f-vektor', 'Vektor', 'F', 'Operasi vektor pada dimensi dua (R2) dan tiga (R3), dot product, cross product.')
ON CONFLICT (id) DO UPDATE SET
    label = EXCLUDED.label,
    phase = EXCLUDED.phase,
    description = EXCLUDED.description;

-- 2. Seeding Concept Edges (Prerequisite Dependencies)
INSERT INTO concept_edges (source, target, description) VALUES
-- Fase D -> Fase D
('d-operasi-bilangan', 'd-aljabar-dasar', 'Operasi bilangan dibutuhkan untuk menghitung ekspresi aljabar'),
('d-aljabar-dasar', 'd-persamaan-linear-satu', 'Aljabar dibutuhkan untuk manipulasi persamaan linear'),
('d-aljabar-dasar', 'd-fungsi-dasar', 'Fungsi dasar dinyatakan dalam variabel aljabar'),

-- Fase D -> Fase E
('d-persamaan-linear-satu', 'e-persamaan-linear-dua', 'SPLDV membutuhkan pemahaman dasar persamaan linear satu variabel'),
('d-operasi-bilangan', 'e-eksponen-logaritma', 'Operasi aritmetika pecahan mendasari pangkat pecahan'),
('d-fungsi-dasar', 'e-relasi-fungsi', 'Relasi fungsi dasar mendasari fungsi lanjutan'),
('d-fungsi-dasar', 'e-fungsi-kuadrat', 'Fungsi dasar mendasari pemodelan kuadrat'),
('d-pythagoras', 'e-perbandingan-trigonometri', 'Trigonometri dasar didefinisikan dari sisi segitiga siku-siku'),

-- Fase E -> Fase F
('e-relasi-fungsi', 'f-fungsi-komposisi-invers', 'Fungsi dasar harus dikuasai sebelum menyusun komposisi'),
('e-fungsi-kuadrat', 'f-fungsi-komposisi-invers', 'Fungsi kuadrat sering menjadi input komposisi'),
('e-eksponen-logaritma', 'f-limit-fungsi', 'Limit membutuhkan manipulasi pangkat dan bentuk akar'),
('e-fungsi-kuadrat', 'f-limit-fungsi', 'Fungsi kuadrat digunakan dalam limit aljabar'),
('f-limit-fungsi', 'f-turunan-fungsi', 'Turunan didefinisikan menggunakan limit fungsi'),
('e-perbandingan-trigonometri', 'f-fungsi-trigonometri', 'Perbandingan dasar segitiga mendasari grafik trigonometri analitis'),
('d-bangun-datar', 'f-transformasi-geometri', 'Bangun datar adalah objek utama transformasi geometri'),
('d-koordinat-kartesius', 'f-vektor', 'Vektor dinyatakan sebagai koordinat kartesius berarah')
ON CONFLICT (source, target) DO NOTHING;
