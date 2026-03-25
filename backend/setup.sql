-- Criar a tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar índice para busca mais rápida
CREATE INDEX IF NOT EXISTS idx_email ON usuarios(email);

-- NOTA: Usuários podem ser criados através da interface de registro em /register
-- ou via POST /usuarios na API
