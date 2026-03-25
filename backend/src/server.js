const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Habilita CORS para todas as origens
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota raiz
app.get('/', (req, res) => {
  res.json({ message: 'API de Usuários - Backend Node.js', docs: '/api-docs' });
});

// Rotas de autenticação (API)
app.use('/', authRoutes);

// Rota 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada',
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📚 Swagger disponível em http://localhost:${PORT}/api-docs`);
});
