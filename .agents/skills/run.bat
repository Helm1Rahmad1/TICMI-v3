@echo off
title TICMI-v3 Launcher
echo =========================================================
echo             TICMI-v3 MULTI-SERVICE LAUNCHER
echo =========================================================
echo Meluncurkan semua layanan secara otomatis...
echo.

:: 1. Jalankan FastAPI AI Service
echo [1/3] Meluncurkan FastAPI AI Service (Port 8000)...
start "FastAPI AI Service (Port 8000)" cmd /k "cd /d %~dp0..\..\backend\ai-service && venv\Scripts\activate && python main.py"
timeout /t 2 /nobreak >nul

:: 2. Jalankan NestJS Gateway
echo [2/3] Meluncurkan NestJS Gateway API (Port 3001)...
start "NestJS Gateway API (Port 3001)" cmd /k "cd /d %~dp0..\..\backend\api && npm run start:dev"
timeout /t 2 /nobreak >nul

:: 3. Jalankan Next.js Frontend
echo [3/3] Meluncurkan Next.js Frontend (Port 3000)...
start "Next.js Frontend (Port 3000)" cmd /k "cd /d %~dp0..\..\frontend && npm run dev"
echo.

echo =========================================================
echo Semua layanan berhasil diluncurkan!
echo - Frontend   : http://localhost:3000
echo - Gateway API : http://localhost:3001
echo - AI Service  : http://localhost:8000
echo =========================================================
echo Tekan tombol apa saja untuk menutup launcher ini (layanan akan tetap berjalan di window terpisah).
pause >nul
