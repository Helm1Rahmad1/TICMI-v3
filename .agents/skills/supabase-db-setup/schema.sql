-- ====================================================================
-- TICMI-v3 DATABASE INITIALIZATION SCHEMA (SUPABASE POSTGRESQL + PGVECTOR)
-- ====================================================================

-- 1. Enable Vector Extension for RAG Similarity Search
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Users Table (Student, Teacher, Admin Roles)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Concept Nodes Table (Knowledge Graph Vertices)
CREATE TABLE IF NOT EXISTS concept_nodes (
    id VARCHAR(100) PRIMARY KEY, -- e.g., 'fase-f-komposisi-fungsi'
    label VARCHAR(255) NOT NULL, -- e.g., 'Fungsi Komposisi'
    phase VARCHAR(10) NOT NULL CHECK (phase IN ('D', 'E', 'F', 'F+')),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Concept Edges Table (Knowledge Graph Edges representing Prerequisite Dependencies)
CREATE TABLE IF NOT EXISTS concept_edges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source VARCHAR(100) NOT NULL REFERENCES concept_nodes(id) ON DELETE CASCADE,
    target VARCHAR(100) NOT NULL REFERENCES concept_nodes(id) ON DELETE CASCADE,
    description VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_source_target UNIQUE (source, target)
);

-- 5. Knowledge Embeddings Table (Vector Storage for Socratic Agent Grounding / RAG)
CREATE TABLE IF NOT EXISTS knowledge_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id VARCHAR(100) REFERENCES concept_nodes(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    embedding vector(768) NOT NULL, -- Configured for Nomic-Embed-Text (768). If using BGE-M3, modify to vector(1024)
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for Cosine Similarity Search
CREATE INDEX IF NOT EXISTS knowledge_embeddings_cosine_idx 
ON knowledge_embeddings USING hnsw (embedding vector_cosine_ops);

-- 6. Learning Sessions Table (Tracks student's current learning status)
CREATE TABLE IF NOT EXISTS learning_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    active_node_id VARCHAR(100) NOT NULL REFERENCES concept_nodes(id),
    status VARCHAR(50) NOT NULL CHECK (status IN ('active', 'remediating', 'completed')),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Learning Telemetry Table (Logs student's keystrokes, confidence, and times)
CREATE TABLE IF NOT EXISTS learning_telemetry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES learning_sessions(id) ON DELETE CASCADE,
    node_id VARCHAR(100) NOT NULL REFERENCES concept_nodes(id),
    dwell_time_seconds INTEGER NOT NULL DEFAULT 0, -- Time spent looking/interacting
    backspace_count INTEGER NOT NULL DEFAULT 0, -- Indicates hesitation/error correction
    confidence_rating INTEGER CHECK (confidence_rating BETWEEN 1 AND 5), -- Self-reported confidence rating
    typed_characters INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Learning Memory Table (Long-term Knowledge Tracing updated by Supervisor Agent)
CREATE TABLE IF NOT EXISTS learning_memory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    history JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of objects tracking historical interactions
    error_type VARCHAR(100), -- Latest diagnosed error type
    prerequisite_gaps JSONB NOT NULL DEFAULT '[]'::jsonb, -- List of identified prerequisite gaps
    mastery_scores JSONB NOT NULL DEFAULT '{}'::jsonb, -- Map of concept node id to mastery score (0.0 to 1.0)
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Automatically Update updated_at Triggers for persistence
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_learning_sessions_updated_at BEFORE UPDATE ON learning_sessions 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_learning_memory_updated_at BEFORE UPDATE ON learning_memory 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
