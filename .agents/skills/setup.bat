@echo off
SETLOCAL EnableDelayedExpansion
echo ===================================================
echo   TICMI-v3 Project Environment Setup (Windows)
echo ===================================================

:: 1. Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH. Please install Node.js.
    exit /b 1
) else (
    for /f "tokens=*" %%v in ('node -v') do set NODE_VER=%%v
    echo [OK] Node.js version: !NODE_VER!
)

:: 2. Check Python
where python >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Python is not installed or not in PATH. Please install Python 3.9+.
    exit /b 1
) else (
    for /f "tokens=*" %%v in ('python --version') do set PY_VER=%%v
    echo [OK] Python version: !PY_VER!
)

echo.
echo ===================================================
echo   1. Setting up Next.js Frontend
echo ===================================================
cd /d "%~dp0\..\..\frontend"
if exist package.json (
    echo [INFO] Installing frontend dependencies...
    call npm install
    if not exist .env (
        if exist .env.example (
            copy .env.example .env
            echo [OK] Copied .env.example to .env
        ) else (
            echo DB_HOST=localhost > .env
            echo [OK] Created default .env
        )
    )
) else (
    echo [WARN] frontend/package.json not found!
)

echo.
echo ===================================================
echo   2. Setting up NestJS Backend API
echo ===================================================
cd /d "%~dp0\..\..\backend\api"
if exist package.json (
    echo [INFO] Installing backend API dependencies...
    call npm install
    if not exist .env (
        if exist .env.example (
            copy .env.example .env
            echo [OK] Copied .env.example to .env
        ) else (
            echo PORT=3001 > .env
            echo [OK] Created default .env
        )
    )
) else (
    echo [WARN] backend/api/package.json not found!
)

echo.
echo ===================================================
echo   3. Setting up FastAPI AI Service
echo ===================================================
cd /d "%~dp0\..\..\backend\ai-service"
echo [INFO] Creating Python virtual environment...
python -m venv venv
if %ERRORLEVEL% neq 0 (
    echo [WARN] Failed to create venv. Make sure python-venv is available.
) else (
    echo [OK] Virtual environment created in backend/ai-service/venv
    echo [INFO] Activating virtual environment and installing dependencies...
    call venv\Scripts\activate.bat
    python -m pip install --upgrade pip
    if exist requirements.txt (
        pip install -r requirements.txt
    ) else (
        echo [INFO] Creating default requirements.txt...
        echo fastapi>=0.110.0 > requirements.txt
        echo uvicorn>=0.28.0 >> requirements.txt
        echo langgraph>=0.0.10 >> requirements.txt
        echo langchain-core>=0.1.0 >> requirements.txt
        pip install -r requirements.txt
    )
    deactivate
)
if not exist .env (
    if exist .env.example (
        copy .env.example .env
        echo [OK] Copied .env.example to .env
    ) else (
        echo DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres > .env
        echo [OK] Created default .env
    )
)

echo.
echo ===================================================
echo   4. Setting up Python Agent (Embeddings / Indexing)
echo ===================================================
cd /d "%~dp0\..\..\agent"
echo [INFO] Creating Python virtual environment...
python -m venv venv
if %ERRORLEVEL% neq 0 (
    echo [WARN] Failed to create venv.
) else (
    echo [OK] Virtual environment created in agent/venv
    echo [INFO] Activating virtual environment and installing dependencies...
    call venv\Scripts\activate.bat
    python -m pip install --upgrade pip
    if exist requirements.txt (
        pip install -r requirements.txt
    ) else (
        echo [INFO] Creating default requirements.txt...
        echo langchain-community>=0.0.20 > requirements.txt
        echo sentence-transformers>=2.5.0 >> requirements.txt
        echo numpy>=1.22.0 >> requirements.txt
        pip install -r requirements.txt
    )
    deactivate
)

echo.
echo ===================================================
echo   Setup Complete!
echo ===================================================
echo Anda sekarang dapat menjalankan:
echo  - Frontend: cd frontend ^&^& npm run dev
echo  - Backend API: cd backend/api ^&^& npm run start:dev
echo  - AI Service: cd backend/ai-service ^&^& venv\Scripts\activate ^&^& uvicorn main:app --reload
echo ===================================================
pause
