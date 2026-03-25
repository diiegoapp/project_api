const swaggerJsdoc = require('swagger-jsdoc'); // Importa swagger-jsdoc para gerar especificação OpenAPI

const options = { // Configurações para geração da documentação Swagger
  definition: { // Definição da especificação OpenAPI
    openapi: '3.0.0', // Versão do OpenAPI
    info: { // Informações da API
      title: 'Minha API de Estudos', // Título da API
      version: '1.0.0', // Versão da API
      description: 'API de autenticação e tarefas com Node.js, JWT e SQLite' // Descrição da API
    },
    servers: [ // Lista de servidores para testar a API
      {
        url: 'http://localhost:3000' // URL do servidor local
      }
    ],
    components: { // Componentes reutilizáveis na documentação
      securitySchemes: { // Esquemas de segurança
        bearerAuth: { // Esquema Bearer para JWT
          type: 'http', // Tipo HTTP
          scheme: 'bearer', // Esquema Bearer
          bearerFormat: 'JWT' // Formato do token
        }
      }
    }
  },
  apis: ['./src/routes/*.js'] // Caminhos para arquivos com anotações Swagger
};

const swaggerSpec = swaggerJsdoc(options); // Gera especificação OpenAPI a partir das opções

module.exports = swaggerSpec; // Exporta especificação para uso no app