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

### 1. Instalar Dependências

```bash
flutter pub get
```

### 2. Executar no Navegador

```bash
# Em chrome (padrão)
flutter run -d chrome

# Em outra porta
flutter run -d chrome --web-port=9000
```

### 3. Modo Desenvolvimento com Hot Reload

Flutter Web suporta hot reload por padrão. Salve o arquivo e veja as mudanças imediatamente!

## 📱 Telas Disponíveis

1. **main.dart** - Menu principal com navegação
2. **tela_cadastro.dart** - Cadastro de novos usuários
3. **tela_listagem.dart** - Listagem de todos os usuários

## 🔗 API Endpoints

- `GET /usuarios` - Listar usuários
- `POST /usuarios` - Criar novo usuário
- `POST /login` - Autenticar usuário

## 📚 Recursos

- [Documentação Flutter](https://flutter.dev/docs)
- [Pacote HTTP](https://pub.dev/packages/http)
- [Material Design 3](https://m3.material.io/)
