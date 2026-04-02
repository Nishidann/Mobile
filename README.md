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
│   │       └── auth.js      # Rotas de usuários e autenticação
│   ├── docker-compose.yml   # Container PostgreSQL
│   ├── .env                 # Variáveis de ambiente
│   ├── setup.sql            # Script do banco + dados iniciais
│   └── package.json
│
└── frontend/                # App Flutter Desktop & Web
    └── lib/
        ├── main.dart            # Menu principal (após autenticação)
        ├── tela_inicial.dart    # Tela de boas-vindas (Login ou Registrar)
        ├── tela_login.dart      # Login do usuário
        ├── tela_registro.dart   # Registro de novo usuário
        ├── tela_cadastro.dart   # Cadastro de usuários
        └── tela_listagem.dart   # Listagem com edição e exclusão
```

---

## ⬇️ Clonar o Repositório

```bash
# Clonar o projeto do GitHub
git clone https://github.com/Nishidann/Mobile.git
cd "aula mobile 2"
```

> **Dica:** Substitua `<url-do-repositorio>` pela URL do seu repositório GitHub.
> Você verá algo como: `git clone https://github.com/seu-usuario/aula-mobile-2.git`

---

## 🚀 Como Executar

### Pré-requisitos

- **Docker** e **Docker Compose** (para banco de dados)
- **Node.js** v14+ (na máquina host para backend)
- **PostgreSQL** (v12+ - pode usar Docker ou máquina local)
- **Flutter SDK** (v3.0+)
- **Git** (para clonar o repositório)

**Sistemas Operacionais Suportados:**

- Linux (Desktop)
- Windows (pode precisar ajustes)
- macOS (pode precisar ajustes)

---

### 📦 Instalar Flutter

#### Verificar se Flutter já está instalado:

```bash
flutter --version
```

Se não estiver instalado, siga os passos abaixo:

#### 1. Download + Instalação

**Linux/Mac:**

```bash
# 1. Faça download do SDK
git clone https://github.com/flutter/flutter.git -b stable
cd flutter
export PATH="$PATH:$(pwd)/bin"

# 2. Adicione ao PATH permanentemente (adicione ao ~/.bashrc ou ~/.zshrc):
echo 'export PATH="$PATH:[caminho-flutter]/bin"' >> ~/.bashrc
source ~/.bashrc
```

**Windows:**

- Download: https://storage.googleapis.com/flutter_infra_release/releases/stable/windows/flutter_windows_3.19.X.zip
- Extraia em `C:\src\flutter`
- Adicione `C:\src\flutter\bin` ao PATH do Windows

#### 2. Verificar instalação:

```bash
flutter doctor
```

Isso mostrará se há dependências faltando. Siga as instruções para resolver qualquer problema.

#### 3. Habilitar Flutter para Linux Desktop:

```bash
flutter config --enable-linux-desktop
flutter doctor
```

**Referência oficial:** https://flutter.dev/docs/get-started/install

---

### 1️⃣ Configurar o PostgreSQL (Local ou Docker)

**Opção A: PostgreSQL Local**

```bash
# Criar o banco de dados
sudo -u postgres psql -c "CREATE DATABASE usuarios_db;"

# Popular com dados iniciais
sudo -u postgres psql -d usuarios_db -f backend/setup.sql
```

**Opção B: PostgreSQL com Docker (opcional)**

```bash
cd backend
docker compose up -d
# Depois execute o setup.sql manualmente
```

### 2️⃣ Configurar Variáveis de Ambiente

O arquivo `backend/.env` já está configurado:

```env
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=usuarios_db
PORT=3000
NODE_ENV=development
```

> **Nota:** Use `sudo -u postgres psql -c "CREATE DATABASE usuarios_db;"` para criar o banco antes

### 3️⃣ Iniciar o Backend

```bash
cd backend
npm install          # Instalar dependências (primeira vez)
npm run dev          # Iniciar com auto-reload
```

> **Certifique-se que o Docker está rodando:** `docker ps` deve mostrar o container `usuarios_db`

✅ Backend rodando em: `http://localhost:3000`  
📚 Swagger/Docs em: `http://localhost:3000/api-docs`

### 4️⃣ Executar o Frontend Flutter

Abra um **novo terminal**:

```bash
cd frontend
flutter pub get                  # Instalar dependências (primeira vez)
flutter create --platforms=linux .  # Adicionar suporte Linux (primeira vez)
flutter run -d linux            # Executar no Linux Desktop
```

✅ Frontend abrirá automaticamente na janela do Linux

> **Dica:** Use `flutter run -d linux --release` para build otimizado

---

## 📡 Endpoints da API

| Método | Rota           | Descrição                |
| ------ | -------------- | ------------------------ |
| POST   | /login         | Autenticar usuário       |
| GET    | /usuarios      | Listar todos os usuários |
| POST   | /usuarios      | Criar novo usuário       |
| PATCH  | /usuarios/{id} | Atualizar usuário        |
| DELETE | /usuarios/{id} | Deletar usuário          |

**Documentação completa:** Acesse `http://localhost:3000/api-docs` (Swagger)

---

## 🎯 Funcionalidades

### Backend

- ✅ Autenticação com login
- ✅ CRUD completo de usuários (Create, Read, Update, Delete)
- ✅ Validação de dados
- ✅ Tratamento de erros
- ✅ Documentação Swagger automática

### Frontend

- ✅ **Tela Inicial** - Escolher entre Login ou Registro
- ✅ **Autenticação** - Email e senha com validação
- ✅ **Registro** - Criar nova conta com confirmação de senha
- ✅ **Menu Principal** - Navegação após login
- ✅ **Cadastro de Usuários** - Adicionar novos usuários
- ✅ **Listagem de Usuários** - Visualizar todos os usuários
- ✅ **Editar Usuários** - Alterar nome e email
- ✅ **Deletar Usuários** - Remover usuários com confirmação
- ✅ **Logout** - Voltar para tela inicial

---

## 👥 Usuários de Teste

| Email           | Senha    |
| --------------- | -------- |
| joao@email.com  | senha123 |
| maria@email.com | senha456 |
| pedro@email.com | senha789 |

---

## ⚠️ Solução de Problemas

### Erro de CORS

O backend já está configurado com CORS habilitado. Se houver problemas:

```javascript
// Em backend/src/server.js está configurado:
const cors = require("cors");
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

### Docker não inicia

```bash
# Verificar se Docker está rodando:
docker ps

# Ver logs do container:
docker compose logs -f postgres

# Parar e remover containers:
docker compose down

# Iniciar novamente:
docker compose up -d
```

---

## 🛠️ Tecnologias

**Backend:**

- Node.js + Express
- PostgreSQL (em Docker)
- Docker & Docker Compose
- Swagger (documentação)
- CORS

**Frontend:**

- Flutter Web
- Pacote HTTP
- Material Design 3

---

## 🐳 Gerenciar Docker

```bash
# Parar o banco de dados:
cd backend && docker compose stop

# Pausar e retomar:
docker compose pause
docker compose unpause

# Ver status dos containers:
docker compose ps

# Remover containers (dados persistem no volume):
docker compose down
```
