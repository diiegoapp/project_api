const express = require('express');
const swaggerUi = require('swagger-ui-express');

const authRoutes = require('./routes/auth.routes');
const tasksRoutes = require('./routes/tasks.routes');
const usersRoutes = require('./routes/users.routes');
const swaggerSpec = require('./config/swagger');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'API funcionando com auth, users e tasks 🚀' });
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);
app.use('/users', usersRoutes);

app.use(errorHandler);

module.exports = app;