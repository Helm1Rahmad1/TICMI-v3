#!/bin/bash
set -e

echo "==================================================="
echo "  TICMI-v3 Project Environment Setup (Unix/macOS)"
echo "==================================================="

# 1. Check Node.js
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed. Please install Node.js."
    exit 1
else
    echo "[OK] Node.js version: $(node -v)"
fi

# 2. Check Python
if ! command -v python3 &> /dev/null; then
    echo "[ERROR] Python 3 is not installed. Please install Python 3.9+."
    exit 1
else
    echo "[OK] Python version: $(python3 --version)"
fi

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

echo ""
echo "==================================================="
echo "  1. Setting up Next.js Frontend"
echo "==================================================="
cd "$SCRIPT_DIR/../../frontend"
if [ -f package.json ]; then
    echo "[INFO] Installing frontend dependencies..."
    npm install
    if [ ! -f .env ]; then
        if [ -f .env.example ]; then
            cp .env.example .env
            echo "[OK] Copied .env.example to .env"
        else
            echo "DB_HOST=localhost" > .env
            echo "[OK] Created default .env"
        fi
    fi
else
    echo "[WARN] frontend/package.json not found!"
fi

echo ""
echo "==================================================="
echo "  2. Setting up NestJS Backend API"
echo "==================================================="
cd "$SCRIPT_DIR/../../backend/api"
if [ -f package.json ]; then
    echo "[INFO] Installing backend API dependencies..."
    npm install
    if [ ! -f .env ]; then
        if [ -f .env.example ]; then
            cp .env.example .env
            echo "[OK] Copied .env.example to .env"
        else
            echo "PORT=3001" > .env
            echo "[OK] Created default .env"
        fi
    fi
else
    echo "[WARN] backend/api/package.json not found!"
fi

echo ""
echo "==================================================="
echo "  3. Setting up FastAPI AI Service"
echo "==================================================="
cd "$SCRIPT_DIR/../../backend/ai-service"
echo "[INFO] Creating Python virtual environment..."
python3 -m venv venv
echo "[OK] Virtual environment created in backend/ai-service/venv"
echo "[INFO] Activating virtual environment and installing dependencies..."
source venv/bin/activate
pip install --upgrade pip
if [ -f requirements.txt ]; then
    pip install -r requirements.txt
else
    echo "[INFO] Creating default requirements.txt..."
    echo "fastapi>=0.110.0" > requirements.txt
    echo "uvicorn>=0.28.0" >> requirements.txt
    echo "langgraph>=0.0.10" >> requirements.txt
    echo "langchain-core>=0.1.0" >> requirements.txt
    pip install -r requirements.txt
fi
deactivate

if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "[OK] Copied .env.example to .env"
    else
        echo "DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres" > .env
        echo "[OK] Created default .env"
    fi
fi

echo ""
echo "==================================================="
echo "  4. Setting up Python Agent (Embeddings / Indexing)"
echo "==================================================="
cd "$SCRIPT_DIR/../../agent"
echo "[INFO] Creating Python virtual environment..."
python3 -m venv venv
echo "[OK] Virtual environment created in agent/venv"
echo "[INFO] Activating virtual environment and installing dependencies..."
source venv/bin/activate
pip install --upgrade pip
if [ -f requirements.txt ]; then
    pip install -r requirements.txt
else
    echo "[INFO] Creating default requirements.txt..."
    echo "langchain-community>=0.0.20" > requirements.txt
    echo "sentence-transformers>=2.5.0" >> requirements.txt
    echo "numpy>=1.22.0" >> requirements.txt
    pip install -r requirements.txt
fi
deactivate

echo ""
echo "==================================================="
echo "  Setup Complete!"
echo "==================================================="
echo "Anda sekarang dapat menjalankan:"
echo " - Frontend: cd frontend && npm run dev"
echo " - Backend API: cd backend/api && npm run start:dev"
echo " - AI Service: cd backend/ai-service && source venv/bin/activate && uvicorn main:app --reload"
echo "==================================================="
