# Skill: Test Agent Workflow - TICMI-v3

Skill ini mendeskripsikan langkah-langkah bagi asisten AI atau developer untuk menguji alur orkestrasi Multi-Agent AI (LangGraph loop) secara lokal menggunakan skrip simulasi interaktif CLI sebelum server FastAPI diaktifkan.

---

## Deskripsi Skill
*   **Nama**: `test-agent-workflow`
*   **Tujuan**: Mensimulasikan logika transisi state-machine LangGraph (Supervisor, Error Analysis, Routing, Socratic, Mastery Agent) agar developer dapat melihat visualisasi alur berpikir AI dan interaksi **Teach-Me Mode** secara real-time di terminal.
*   **Kapan Digunakan**:
    *   Sebelum mulai mengode sirkuit graph LangGraph ril di FastAPI.
    *   Saat asisten AI perlu memahami cara penanganan input siswa dan transisi status simpul.
    *   Saat ingin menguji respons Socratic secara interaktif di baris perintah.

---

## Cara Menjalankan Simulasi

Skrip [test_agents.py](file:///c:/projects/TICMI-v3/.agents/skills/test-agent-workflow/test_agents.py) ditulis dalam Python murni dan tidak membutuhkan dependensi eksternal yang rumit (dapat dijalankan langsung).

### Langkah Eksekusi:
1.  Buka terminal, masuk ke direktori folder skill:
    ```bash
    cd .agents/skills/test-agent-workflow
    ```
2.  Jalankan skrip testing:
    ```bash
    python test_agents.py
    ```

---

## Skenario Simulasi yang Dapat Dicoba

Anda dapat memasukkan jawaban simulasi berikut untuk menguji percabangan agen:

### Skenario A: Prerequisite GAP (Siswa mengalami gap materi dasar)
1.  Sistem menyajikan soal: "Selesaikan komposisi $(f \circ g)(x)$ jika $f(x) = \frac{1}{x}$ dan $g(x) = x - 2$."
2.  Masukkan jawaban salah yang menunjukkan gap prasyarat, misal:
    *   *Input*: `Hasilnya 1/x - 2 karena saya kurang mengerti penjumlahan aljabar pecahan.`
3.  **Hasil Agen**:
    *   `Error Analysis Agent` mendeteksi kesalahan prasyarat aljabar/bilangan bulat.
    *   `Routing Agent` memetakan ke simpul `d-operasi-bilangan` (Fase D).
    *   `Socratic Agent` aktif dan masuk ke **Teach-Me Mode**. Anda akan diminta menjelaskan konsep tersebut ke AI.

### Skenario B: Local Error (Kesalahan materi utama saja)
1.  Sistem menyajikan soal yang sama.
2.  Masukkan jawaban salah yang murni kesalahan kalkulasi lokal, misal:
    *   *Input*: `Hasilnya 1 / (x - 2) tapi saya salah menulis notasi fungsinya saja.`
3.  **Hasil Agen**:
    *   `Error Analysis Agent` menandai sebagai `local_error`.
    *   Sistem menyajikan `Feedback Langsung` tanpa perlu masuk ke mode remediasi Sokratik.
