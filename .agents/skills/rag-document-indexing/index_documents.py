#!/usr/bin/env python3
import os
import sys
import argparse
import json
import requests
from sentence_transformers import SentenceTransformer

# Load .env variables manually to keep script light and zero-config
def load_env():
    env_path = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'backend', 'ai-service', '.env')
    if not os.path.exists(env_path):
        env_path = os.path.join(os.getcwd(), '.env')
    
    if os.path.exists(env_path):
        with open(env_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, val = line.split('=', 1)
                    os.environ[key.strip()] = val.strip()

def split_text(text, chunk_size=800, overlap=100):
    """Simple character-based recursive splitter to avoid external dependencies like LangChain."""
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        chunks.append(chunk)
        start += (chunk_size - overlap)
    return chunks

def index_directory(directory, node_id, chunk_size, overlap):
    # Load Supabase config
    supabase_url = os.environ.get('SUPABASE_URL')
    supabase_key = os.environ.get('SUPABASE_SERVICE_KEY') or os.environ.get('SUPABASE_ANON_KEY')

    if not supabase_url or not supabase_key:
        print("[ERROR] SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in environment variables or .env file.")
        sys.exit(1)

    print(f"[INFO] Initializing embedding model: nomic-ai/nomic-embed-text-v1.5 (dimension 768)...")
    # Using a standard 768-dimension transformer matching the vector(768) in our schema.sql
    try:
        model = SentenceTransformer('nomic-ai/nomic-embed-text-v1.5', trust_remote_code=True)
    except Exception as e:
        print(f"[WARN] Failed to load Nomic. Falling back to all-mpnet-base-v2 (please adjust schema vector dimension if needed): {e}")
        model = SentenceTransformer('all-mpnet-base-v2')

    # Find markdown files
    md_files = [f for f in os.listdir(directory) if f.endswith('.md')]
    if not md_files:
        print(f"[WARN] No markdown files (.md) found in directory: {directory}")
        return

    headers = {
        "apikey": supabase_key,
        "Authorization": f"Bearer {supabase_key}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
    }

    supabase_endpoint = f"{supabase_url.rstrip('/')}/rest/v1/knowledge_embeddings"

    for file_name in md_files:
        file_path = os.path.join(directory, file_name)
        print(f"[INFO] Reading file: {file_name}...")
        
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Split content into overlapping chunks
        chunks = split_text(content, chunk_size, overlap)
        print(f"[INFO] Split file into {len(chunks)} chunks.")

        payload = []
        for i, chunk in enumerate(chunks):
            print(f"[INFO] Embedding chunk {i+1}/{len(chunks)}...")
            # Generate vector embedding coordinates
            embedding = model.encode(chunk).tolist()
            
            # Format payload for PostgREST
            payload.append({
                "node_id": node_id,
                "content": chunk,
                "embedding": embedding,
                "metadata": {
                    "source_file": file_name,
                    "chunk_index": i,
                    "character_count": len(chunk)
                }
            })

        # Batch upload to Supabase
        print(f"[INFO] Uploading chunks to Supabase...")
        response = requests.post(supabase_endpoint, headers=headers, json=payload)
        
        if response.status_code in (200, 201, 204):
            print(f"[OK] Successfully indexed {file_name} for node {node_id}.")
        else:
            print(f"[ERROR] Failed to upload to Supabase: Status {response.status_code} - {response.text}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Index markdown math curriculum files to Supabase pgvector.")
    parser.add_argument("--dir", required=True, help="Directory containing markdown files.")
    parser.add_argument("--node-id", required=True, help="Concept node ID (e.g., d-operasi-bilangan).")
    parser.add_argument("--chunk-size", type=int, default=800, help="Max characters per chunk.")
    parser.add_argument("--overlap", type=int, default=100, help="Overlap characters between chunks.")
    
    args = parser.parse_args()
    
    if not os.path.exists(args.dir):
        print(f"[ERROR] Directory does not exist: {args.dir}")
        sys.exit(1)

    load_env()
    index_directory(args.dir, args.node-id, args.chunk_size, args.overlap)
