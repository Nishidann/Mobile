const express = require('express');
const router = express.Router();
const pool = require('../config/database');

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 usuario:
 *                   type: object
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro no servidor
 */
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      success: false,
      message: 'Email e senha são obrigatórios',
    });
  }

  try {
    const resultado = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1 AND senha = $2',
      [email, senha]
    );

    if (resultado.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Email ou senha inválidos',
      });
    }

    const usuario = resultado.rows[0];
    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao processar login',
    });
  }
});

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Erro no servidor
 */
router.get('/usuarios', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT id, nome, email FROM usuarios');
    res.json({
      success: true,
      usuarios: resultado.rows,
    });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar usuários',
    });
  }
});

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro no servidor
 */
router.post('/usuarios', async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({
      success: false,
      message: 'Nome, email e senha são obrigatórios',
    });
  }

  try {
    const resultado = await pool.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email',
      [nome, email, senha]
    );

    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso',
      usuario: resultado.rows[0],
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    
    // Tratamento de email duplicado
    if (error.code === '23505' && error.constraint === 'usuarios_email_key') {
      return res.status(400).json({
        success: false,
        message: 'Este email já está cadastrado',
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Erro ao criar usuário',
    });
  }
});

/**
 * @swagger
 * /usuarios/{id}:
 *   patch:
 *     summary: Atualiza informações de um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João Silva Atualizado
 *               email:
 *                 type: string
 *                 example: joao_novo@email.com
 *               senha:
 *                 type: string
 *                 example: nova_senha123
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.patch('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  // Validação básica
  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'ID inválido',
    });
  }

  if (!nome && !email && !senha) {
    return res.status(400).json({
      success: false,
      message: 'Pelo menos um campo (nome, email ou senha) deve ser atualizado',
    });
  }

  try {
    // Verificar se usuário existe
    const verificacao = await pool.query(
      'SELECT id FROM usuarios WHERE id = $1',
      [id]
    );

    if (verificacao.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado',
      });
    }

    // Construir query dinâmica para atualizar apenas os campos fornecidos
    const campos = [];
    const valores = [];
    let indice = 1;

    if (nome) {
      campos.push(`nome = $${indice}`);
      valores.push(nome);
      indice++;
    }

    if (email) {
      campos.push(`email = $${indice}`);
      valores.push(email);
      indice++;
    }

    if (senha) {
      campos.push(`senha = $${indice}`);
      valores.push(senha);
      indice++;
    }

    campos.push(`updated_at = CURRENT_TIMESTAMP`);

    const query = `UPDATE usuarios SET ${campos.join(', ')} WHERE id = $${indice} RETURNING id, nome, email`;
    
    const resultado = await pool.query(query, [...valores, id]);

    res.json({
      success: true,
      message: 'Usuário atualizado com sucesso',
      usuario: resultado.rows[0],
    });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);

    // Tratamento de email duplicado
    if (error.code === '23505' && error.constraint === 'usuarios_email_key') {
      return res.status(400).json({
        success: false,
        message: 'Este email já está cadastrado',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar usuário',
    });
  }
});

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Deleta um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params;

  // Validação básica
  if (!id || isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'ID inválido',
    });
  }

  try {
    // Verifcar e deletar usuário
    const resultado = await pool.query(
      'DELETE FROM usuarios WHERE id = $1 RETURNING id, nome, email',
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado',
      });
    }

    res.json({
      success: true,
      message: 'Usuário deletado com sucesso',
      usuario: resultado.rows[0],
    });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar usuário',
    });
  }
});

module.exports = router;
