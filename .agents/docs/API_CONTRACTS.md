# Dokumen Konteks: API & WebSocket Contracts - TICMI-v3

Dokumen ini mendeskripsikan rancangan kontrak API REST dan komunikasi WebSocket untuk platform TICMI. Karena backend masih berupa *scaffolding* kosong, dokumen ini berfungsi sebagai cetak biru (*blueprint*) saat tim mulai mengembangkan kode NestJS dan FastAPI.

---

## 1. Antarmuka Login Frontend (Status Saat Ini)

Saat ini, halaman login di frontend (`frontend/src/app/login/page.tsx`) masih menggunakan **Mock Login**.
*   **Kredensial**: Anda dapat memasukkan **email bebas** dan **kata sandi bebas** (asal tidak kosong).
*   **Peran (Role)**: 
    *   Pilih opsi **Siswa** $\rightarrow$ Akan diarahkan ke `/student`.
    *   Pilih opsi **Guru** $\rightarrow$ Akan diarahkan ke `/teacher`.

---

## 2. Kontrak API REST (NestJS Backend API)

NestJS akan berjalan di port `3001` (atau sesuai konfigurasi `.env`) sebagai API Gateway utama.

### A. Autentikasi (`/api/auth`)

#### 1. POST `/api/auth/register` (Pendaftaran Pengguna)
*   **Request Body**:
    ```json
    {
      "email": "siswa@sekolah.sch.id",
      "password": "password123",
      "name": "Devin Pradana",
      "role": "student" // 'student' | 'teacher'
    }
    ```
*   **Response (201)**:
    ```json
    {
      "message": "User registered successfully",
      "userId": "uuid-v4-string"
    }
    ```

#### 2. POST `/api/auth/login` (Masuk Sistem)
*   **Request Body**:
    ```json
    {
      "email": "siswa@sekolah.sch.id",
      "password": "password123"
    }
    ```
*   **Response (200)**:
    ```json
    {
      "token": "jwt-token-string",
      "user": {
        "id": "uuid-v4-string",
        "email": "siswa@sekolah.sch.id",
        "name": "Devin Pradana",
        "role": "student"
      }
    }
    ```

---

### B. Manajemen Sesi & Materi (`/api/sessions`)

#### 1. POST `/api/sessions/start` (Mulai Sesi Pembelajaran)
*   **Headers**: `Authorization: Bearer <token>`
*   **Request Body**:
    ```json
    {
      "nodeId": "fase-f-matriks"
    }
    ```
*   **Response (201)**:
    ```json
    {
      "sessionId": "session-uuid",
      "status": "active",
      "activeNodeId": "fase-f-matriks"
    }
    ```

#### 2. POST `/api/sessions/:id/telemetry` (Kirim Log Telemetri)
Mengirimkan data dwell time dan interaksi keyboard siswa saat mengetik solusi.
*   **Request Body**:
    ```json
    {
      "dwellTimeSeconds": 45,
      "backspaceCount": 12,
      "confidenceRating": 4,
      "typedCharacters": 150
    }
    ```
*   **Response (200)**:
    ```json
    { "success": true }
    ```

---

## 3. Komunikasi WebSocket (Sesi Interaktif Sokratik)

Digunakan untuk interaksi real-time dua arah antara Frontend Next.js dan NestJS (kemudian dilanjutkan ke FastAPI/LangGraph).

*   **Endpoint WS**: `ws://localhost:3001/chat`

### A. Events dari Client (Frontend $\rightarrow$ Backend)
#### 1. `join_session`
Menggabungkan koneksi ke sesi pembelajaran aktif.
```json
{
  "sessionId": "session-uuid"
}
```

#### 2. `send_message`
Mengirim jawaban atau penjelasan siswa pada mode "Teach-Me".
```json
{
  "message": "Matriks determinannya 0 karena baris satu kelipatan baris dua."
}
```

### B. Events dari Server (Backend $\rightarrow$ Client)
#### 1. `agent_response`
AI streaming respons atau pertanyaan sokratik baru.
```json
{
  "text": "Mengapa kelipatan baris membuat nilai determinan menjadi nol? Coba jelaskan secara geometris.",
  "isStreaming": false,
  "agentType": "socratic" // 'socratic' | 'mastery' | 'supervisor'
}
```

#### 2. `concept_status_update`
Pembaruan status kelulusan materi prasyarat.
```json
{
  "nodeId": "fase-d-operasi-pecahan",
  "status": "green" // 'red' | 'yellow' | 'green'
}
```

---

## 4. REST API Mikro (FastAPI AI-Service)

FastAPI berjalan secara internal (tidak terekspos ke publik) di port `8000` sebagai orkestrator LangGraph.

#### POST `/ai/chat` (Orkestrasi Agen)
*   **Request Body**:
    ```json
    {
      "sessionId": "session-uuid",
      "studentId": "student-uuid",
      "message": "Matriks determinannya 0 karena...",
      "history": [
        {"role": "user", "content": "..."}
      ],
      "telemetry": {
        "dwellTimeSeconds": 45,
        "backspaceCount": 12
      }
    }
    ```
*   **Response (200)**:
    ```json
    {
      "reply": "Mengapa kelipatan baris...",
      "errorType": "prerequisite_gap",
      "diagnosedGapNodeId": "fase-d-operasi-pecahan",
      "remediationActive": true
    }
    ```
