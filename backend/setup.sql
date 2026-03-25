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

-- Inserir usuários de teste
INSERT INTO usuarios (nome, email, senha) VALUES
  ('João Silva', 'joao@email.com', 'senha123'),
  ('Maria Santos', 'maria@email.com', 'senha456'),
  ('Pedro Oliveira', 'pedro@email.com', 'senha789')
ON CONFLICT (email) DO NOTHING;
