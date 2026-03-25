// Exemplo de como consumir a API de login do backend

// 1. FAZER LOGIN
async function login(email, senha) {
  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        senha: senha,
      }),
    });

    const data = await response.json();

    if (data.success) {
      console.log('Login bem-sucedido!');
      console.log('Usuário:', data.usuario);
      // Salvar token ou dados do usuário no localStorage
      localStorage.setItem('usuario', JSON.stringify(data.usuario));
      return data.usuario;
    } else {
      console.error('Erro:', data.message);
      return null;
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return null;
  }
}

// 2. BUSCAR LISTA DE USUÁRIOS
async function buscarUsuarios() {
  try {
    const response = await fetch('http://localhost:3000/usuarios', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.success) {
      console.log('Usuários:', data.usuarios);
      return data.usuarios;
    } else {
      console.error('Erro:', data.message);
      return [];
    }
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return [];
  }
}

// 3. CRIAR NOVO USUÁRIO
async function criarUsuario(nome, email, senha) {
  try {
    const response = await fetch('http://localhost:3000/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: nome,
        email: email,
        senha: senha,
      }),
    });

    const data = await response.json();

    if (data.success) {
      console.log('Usuário criado:', data.usuario);
      return data.usuario;
    } else {
      console.error('Erro:', data.message);
      return null;
    }
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return null;
  }
}

// EXEMPLOS DE USO:
// login('joao@email.com', 'senha123');
// buscarUsuarios();
// criarUsuario('Novo Usuario', 'novo@email.com', 'senha123');
