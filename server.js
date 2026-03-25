require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const app = require('./src/app'); // Importa a aplicação Express do arquivo app.js

const PORT = process.env.PORT || 3000; // Define a porta do servidor, usando a variável de ambiente PORT ou 3000 como padrão

app.listen(PORT, () => { // Inicia o servidor e escuta na porta definida
  console.log(`Servidor rodando em http://localhost:${PORT}`); // Imprime uma mensagem no console indicando que o servidor está rodando e em qual URL
}); // Fim do arquivo server.js