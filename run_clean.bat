@echo off
title TICMI-v3 Clean Launcher
echo =========================================================
echo             TICMI-v3 CLEAN LAUNCHER AND REBUILD
echo =========================================================
echo.

:: 1. Mematikan service lama yang mungkin nyangkut di port
echo [1/3] Mematikan service lama di port 3000, 3001, dan 8000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do (
    echo Menghentikan proses di Port 3000 - PID: %%a
    taskkill /f /pid %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3001 ^| findstr LISTENING') do (
    echo Menghentikan proses di Port 3001 - PID: %%a
    taskkill /f /pid %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8000 ^| findstr LISTENING') do (
    echo Menghentikan proses di Port 8000 - PID: %%a
    taskkill /f /pid %%a >nul 2>&1
)
echo Port berhasil dibersihkan!
echo.

:: 2. Menghapus Cache Next.js (.next)
echo [2/3] Menghapus cache Next.js (.next)...
if exist "frontend\.next" (
    rmdir /s /q "frontend\.next"
    echo Cache .next berhasil dihapus.
) else (
    echo Cache .next tidak ditemukan. Lanjut...
)
echo.

:: 3. Meluncurkan semua layanan secara fresh
echo [3/3] Meluncurkan semua layanan secara fresh...
echo.
echo Meluncurkan FastAPI AI Service (Port 8000)...
start "FastAPI AI Service (Port 8000)" cmd /k "cd /d backend\ai-service && venv\Scripts\activate && python main.py"
timeout /t 2 /nobreak >nul

echo Meluncurkan NestJS Gateway API (Port 3001)...
start "NestJS Gateway API (Port 3001)" cmd /k "cd /d backend\api && npm run start:dev"
timeout /t 2 /nobreak >nul

echo Meluncurkan Next.js Frontend (Port 3000)...
start "Next.js Frontend (Port 3000)" cmd /k "cd /d frontend && npm run dev"
echo.

echo =========================================================
echo Semua layanan berhasil diluncurkan ulang secara BERSIH!
echo - Frontend   : http://localhost:3000
echo - Gateway API : http://localhost:3001
echo - AI Service  : http://localhost:8000
echo =========================================================
echo Tekan tombol apa saja untuk menutup launcher ini.
pause >nul
