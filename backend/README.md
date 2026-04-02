# Backend de Autenticação com Node.js, Express e PostgreSQL

Backend simples para autenticação de usuários com login, desenvolvido com Express, PostgreSQL e Swagger.

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **PostgreSQL** - Banco de dados relacional
- **Swagger** - Documentação de API
- **dotenv** - Gerenciamento de variáveis de ambiente

## 📋 Pré-requisitos

- Node.js (v14+)
- PostgreSQL (v12+)
- npm ou yarn

## 🚀 Instalação e Configuração

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Banco de Dados

Execute os comandos abaixo para criar o banco de dados e as tabelas:

```bash
# Criar o banco de dados
sudo -u postgres psql -c "CREATE DATABASE usuarios_db;"

# Popular com tabelas e dados de teste
sudo -u postgres psql -d usuarios_db -f setup.sql
```

Se pedir a senha, digite a senha do seu usuário do sistema.

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=3000
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=usuarios_db
NODE_ENV=development
```

### 4. Iniciar o Servidor

```bash
# Modo desenvolvimento (com auto-reload)
npm run dev

# Modo produção
npm start
```

O servidor rodará em `http://localhost:3000`

## 📚 Documentação da API

Acesse a documentação Swagger em: `http://localhost:3000/api-docs`

### Endpoints Disponíveis

#### 1. Login

```http
POST /login
Content-Type: application/json

{
  "email": "joao@email.com",
  "senha": "senha123"
}
```

**Resposta de sucesso (200):**

```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com"
  }
}
```

#### 2. Listar Usuários

```http
GET /usuarios
```

**Resposta (200):**

```json
{
  "success": true,
  "usuarios": [
    {
      "id": 1,
      "nome": "João Silva",
      "email": "joao@email.com"
    },
    {
      "id": 2,
      "nome": "Maria Santos",
      "email": "maria@email.com"
    }
  ]
}
```

#### 3. Criar Novo Usuário

```http
POST /usuarios
Content-Type: application/json

{
  "nome": "Novo Usuário",
  "email": "novo@email.com",
  "senha": "senha123"
}
```

**Resposta de sucesso (201):**

```json
{
  "success": true,
  "message": "Usuário criado com sucesso",
  "usuario": {
    "id": 4,
    "nome": "Novo Usuário",
    "email": "novo@email.com"
  }
}
```

#### 4. Atualizar Usuário

```http
PATCH /usuarios/1
Content-Type: application/json

{
  "nome": "João Silva Atualizado",
  "email": "joao_novo@email.com",
  "senha": "nova_senha123"
}
```

**Resposta de sucesso (200):**

```json
{
  "success": true,
  "message": "Usuário atualizado com sucesso",
  "usuario": {
    "id": 1,
    "nome": "João Silva Atualizado",
    "email": "joao_novo@email.com"
  }
}
```

**Notas:**

- Você pode atualizar apenas alguns campos (não precisa enviar todos)
- O campo `updated_at` é atualizado automaticamente

#### 5. Deletar Usuário

```http
DELETE /usuarios/1
```

**Resposta de sucesso (200):**

```json
{
  "success": true,
  "message": "Usuário deletado com sucesso",
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com"
  }
}
```

## 👤 Usuários de Teste

O banco já vem com 3 usuários de teste:

| Email           | Senha    | Nome           |
| --------------- | -------- | -------------- |
| joao@email.com  | senha123 | João Silva     |
| maria@email.com | senha456 | Maria Santos   |
| pedro@email.com | senha789 | Pedro Oliveira |

## 🔧 Estrutura do Projeto

```
├── src/
│   ├── config/
│   │   ├── database.js       # Configuração PostgreSQL
│   │   └── swagger.js        # Configuração Swagger
│   ├── routes/
│   │   └── auth.js           # Rotas de login e usuários
│   └── server.js             # Servidor principal
├── setup.sql                 # Script para criar BD e tabelas
├── .env                      # Variáveis de ambiente
├── package.json
└── README.md
```

## 📝 Notas Importantes

- **Segurança**: Em produção, as senhas devem ser criptografadas (ex: bcrypt)
- **CORS**: Para consumir esta API em um frontend, configure CORS conforme necessário
- **Validação**: Adicione validações mais robustas em produção

## 🐛 Solução de Problemas

### Erro: "database usuarios_db does not exist"

Execute os comandos para criar o banco:

```bash
sudo -u postgres psql -c "CREATE DATABASE usuarios_db;"
sudo -u postgres psql -d usuarios_db -f setup.sql
```

### Erro: "password authentication failed"

- Defina a senha do usuário postgres:

```bash
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'postgres';"
```

- Confirme que o `.env` tem `DB_PASSWORD=postgres`

### Erro: "connect ECONNREFUSED"

- Verifique se PostgreSQL está rodando: `sudo systemctl status postgresql`
- Confirme as credenciais em `.env`
- Use `localhost` como DB_HOST

## 📧 Contato

Desenvolvido como backend para tela de login mobile.
