# Sistema de Gerenciamento de Usuários

Aplicação fullstack com **Backend Node.js** e **Frontend Flutter Web** para cadastro e listagem de usuários.

## 📁 Estrutura do Projeto

```
aula mobile 2/
├── backend/                 # API REST Node.js
│   ├── src/
│   │   ├── server.js        # Servidor Express
│   │   ├── config/
│   │   │   ├── database.js  # Conexão PostgreSQL
│   │   │   └── swagger.js   # Documentação API
│   │   └── routes/
│   │       └── auth.js      # Rotas de usuários
│   ├── .env                 # Variáveis de ambiente
│   ├── setup.sql            # Script do banco
│   └── package.json
│
└── front_usuarios/          # App Flutter Web
    └── lib/
        ├── main.dart            # Tela principal (menu)
        ├── tela_cadastro.dart   # Cadastro de usuários
        └── tela_listagem.dart   # Listagem de usuários
```

---

## 🚀 Como Executar

### Pré-requisitos

- **Node.js** v14+
- **PostgreSQL** instalado e rodando
- **Flutter SDK** (será instalado se necessário)

---

### 1️⃣ Configurar o Banco de Dados

```bash
# Criar banco e tabelas
cd backend
psql -U postgres -f setup.sql
```

### 2️⃣ Configurar Variáveis de Ambiente

Edite o arquivo `backend/.env`:

```env
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui
DB_HOST=localhost
DB_PORT=5432
DB_NAME=usuarios_db
PORT=3000
```

### 3️⃣ Iniciar o Backend

```bash
cd backend
npm install          # Instalar dependências (primeira vez)
npm run dev          # Iniciar com auto-reload
```

✅ Backend rodando em: `http://localhost:3000`  
📚 Swagger/Docs em: `http://localhost:3000/api-docs`

### 4️⃣ Iniciar o Frontend Flutter

Abra um **novo terminal**:

```bash
cd front_usuarios
flutter pub get      # Instalar dependências (primeira vez)
flutter run -d chrome
```

✅ Frontend abrirá automaticamente no Chrome

---

## 📡 Endpoints da API

| Método | Rota        | Descrição              |
|--------|-------------|------------------------|
| GET    | /usuarios   | Listar todos usuários  |
| POST   | /usuarios   | Criar novo usuário     |
| POST   | /login      | Autenticar usuário     |

### Exemplo de Cadastro (POST /usuarios)

```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456"
}
```

---

## 🎯 Funcionalidades do App Flutter

1. **Tela Principal** - Menu com navegação
2. **Cadastrar Usuário** - Formulário com validação + envio POST
3. **Listar Usuários** - Busca GET + exibição em lista
4. **Tratamento de Erros** - Mensagens amigáveis se servidor offline

---

## 👥 Usuários de Teste

| Email             | Senha     |
|-------------------|-----------|
| joao@email.com    | senha123  |
| maria@email.com   | senha456  |
| pedro@email.com   | senha789  |

---

## ⚠️ Solução de Problemas

### Erro de CORS
O backend já está configurado com CORS habilitado. Se houver problemas:
```javascript
// Em backend/src/server.js está configurado:
const cors = require('cors');
app.use(cors());
```

### Flutter não encontrado
```bash
# Se flutter não estiver no PATH, use o caminho completo:
~/flutter/bin/flutter run -d chrome
```

### Porta em uso
```bash
# Backend em outra porta:
PORT=3001 npm run dev

# Flutter em outra porta:
flutter run -d chrome --web-port=9000
```

---

## 🛠️ Tecnologias

**Backend:**
- Node.js + Express
- PostgreSQL
- Swagger (documentação)
- CORS

**Frontend:**
- Flutter Web
- Pacote HTTP
- Material Design 3
