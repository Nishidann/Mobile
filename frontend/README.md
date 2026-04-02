# Frontend Flutter Web - Sistema de Usuários

Aplicativo Flutter Web para cadastro e listagem de usuários integrado com backend Node.js.

## 🛠️ Tecnologias

- **Flutter** - Framework multiplataforma
- **Dart** - Linguagem de programação
- **HTTP** - Pacote para requisições à API
- **Material Design 3** - Design system

## 📋 Pré-requisitos

- Flutter SDK v3.0+
- Chrome ou outro navegador moderno
- Backend Node.js rodando em `http://localhost:3000`

## 🚀 Como Executar

### 1. Instalar Dependências e Adicionar Suporte Linux

```bash
flutter pub get
flutter create --platforms=linux .
```

### 2. Executar no Linux Desktop

```bash
flutter run -d linux
```

### 3. Modo Desenvolvimento com Hot Reload

Flutter suporta hot reload por padrão. Salve o arquivo e veja as mudanças imediatamente!

## 📱 Telas Disponíveis

1. **tela_inicial.dart** - Tela de boas-vindas com opções de Login ou Registro
2. **tela_login.dart** - Login de usuários com email e senha
3. **tela_registro.dart** - Criação de nova conta
4. **main.dart** - Menu principal com navegação (após autenticação)
5. **tela_cadastro.dart** - Cadastro de novos usuários
6. **tela_listagem.dart** - Listagem, edição e exclusão de usuários

## 🔗 API Endpoints

- `POST /login` - Autenticar usuário
- `GET /usuarios` - Listar usuários
- `POST /usuarios` - Criar novo usuário
- `PATCH /usuarios/{id}` - Atualizar usuário
- `DELETE /usuarios/{id}` - Deletar usuário

## 🎯 Funcionalidades

### Tela Inicial

- Escolha entre **ENTRAR** (se já tem conta) ou **CRIAR CONTA** (novo usuário)
- Design moderno com gradient azul
- Acesso fácil às duas opções principais

### Registrar Novo Usuário

- Preencha nome completo, email e senha
- Confirmação de senha obrigatória (deve conferir)
- Senha mínima de 6 caracteres
- Validação de email duplicado (retorna erro se já existe)
- Após registrar com sucesso, volta para a tela inicial

### Login

- Entre com email e senha cadastrados
- Visualize/oculte a senha com ícone
- Usuários de teste disponíveis para testar
- Após login bem-sucedido, vai para o menu principal com seu nome exibido

### Menu Principal

- Bem-vindo com seu nome na barra superior
- Botão de logout (superior direito) para sair
- Opções para:
  - **CADASTRAR USUÁRIO** - Adicionar novo usuário ao sistema
  - **LISTAR USUÁRIOS** - Ver, editar ou deletar usuários

### Cadastro de Usuários

- Crie novos usuários com nome, email e senha
- Validação automática de email duplicado
- Feedback visual de sucesso/erro

### Listagem

- Visualize todos os usuários cadastrados
- Avatar com primeira letra do nome
- **Editar** (menu ⋮): Altere nome e email
- **Deletar** (menu ⋮): Remove usuário com confirmação
- **Recarregar**: Botão de refresh para atualizar lista
- Logout: Retorna para tela inicial

## 👤 Usuários de Teste

Use qualquer um destes usuários para fazer login:

| Email           | Senha    | Nome           |
| --------------- | -------- | -------------- |
| joao@email.com  | senha123 | João Silva     |
| maria@email.com | senha456 | Maria Santos   |
| pedro@email.com | senha789 | Pedro Oliveira |

## 📚 Recursos

- [Documentação Flutter](https://flutter.dev/docs)
- [Pacote HTTP](https://pub.dev/packages/http)
- [Material Design 3](https://m3.material.io/)
