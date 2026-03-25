# 📋 API de Gerenciamento de Tarefas

Uma API REST completa para gerenciamento de tarefas pessoais, construída com Node.js, Express e SQLite. Inclui autenticação JWT, validação de dados com Zod e documentação automática com Swagger.

## 🚀 Tecnologias

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

- **Backend**: Node.js + Express
- **Banco de Dados**: SQLite3
- **Autenticação**: JWT (JSON Web Tokens)
- **Criptografia**: bcrypt para senhas
- **Validação**: Zod schemas
- **Documentação**: Swagger/OpenAPI
- **Testes**: Jest + Supertest

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

## 🔧 Instalação

1. **Clone o repositório**
   ```bash
   git clone [https://github.com/seu-usuario/project_api.git](https://github.com/diiegoapp/project_api)
   cd project_api
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   Crie um arquivo `.env` na raiz do projeto:
   ```env
   PORT=3000
   JWT_SECRET=sua_chave_secreta_super_segura_aqui
   ```

4. **Inicie o servidor**
   ```bash
   # Modo desenvolvimento (com nodemon)
   npm run dev

   # Modo produção
   npm start
   ```

O servidor estará rodando em `http://localhost:3000`

## 📖 Documentação da API

### 📋 Endpoints Principais

#### 🔐 Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/auth/register` | Registrar novo usuário |
| `POST` | `/auth/login` | Fazer login |
| `GET` | `/auth/perfil` | Obter dados do usuário autenticado |

#### ✅ Tarefas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/tasks` | Criar nova tarefa |
| `GET` | `/tasks` | Listar tarefas do usuário |
| `PUT` | `/tasks/:id` | Atualizar tarefa |
| `DELETE` | `/tasks/:id` | Excluir tarefa |

### 🔍 Documentação Interativa

Acesse `http://localhost:3000/docs` para visualizar a documentação completa da API com Swagger UI, onde você pode:

- Explorar todos os endpoints
- Testar as requisições diretamente
- Ver os schemas de dados
- Analisar as respostas

## 🏗️ Estrutura do Projeto

```
project_api/
├── src/
│   ├── app.js                 # Configuração principal da aplicação
│   ├── database/
│   │   └── connection.js      # Conexão com banco SQLite
│   ├── middlewares/
│   │   ├── auth.middleware.js # Middleware de autenticação JWT
│   │   ├── error.middleware.js # Tratamento de erros
│   │   └── validate.middleware.js # Validação com Zod
│   ├── routes/
│   │   ├── auth.routes.js     # Rotas de autenticação
│   │   └── tasks.routes.js    # Rotas de tarefas
│   ├── controllers/
│   │   ├── auth.controller.js # Controllers de auth
│   │   └── tasks.controller.js # Controllers de tarefas
│   ├── services/
│   │   ├── auth.service.js    # Lógica de negócio - auth
│   │   └── tasks.service.js   # Lógica de negócio - tarefas
│   ├── schemas/
│   │   ├── auth.schema.js     # Schemas Zod para auth
│   │   └── tasks.schema.js    # Schemas Zod para tarefas
│   └── config/
│       └── swagger.js         # Configuração Swagger
├── tests/                     # Testes automatizados
├── server.js                  # Ponto de entrada da aplicação
├── package.json
├── .env                       # Variáveis de ambiente
└── README.md
```

## 🧪 Testes

Execute os testes automatizados:

```bash
npm test
```

## 📝 Como Usar

### 1. Registrar um usuário
```bash
POST /auth/register
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "minha_senha_segura"
}
```

### 2. Fazer login
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "senha": "minha_senha_segura"
}
```

**Resposta:**
```json
{
  "mensagem": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Criar uma tarefa (use o token no header)
```bash
POST /tasks
Authorization: Bearer SEU_TOKEN_JWT
Content-Type: application/json

{
  "titulo": "Estudar Node.js"
}
```

### 4. Listar tarefas
```bash
GET /tasks
Authorization: Bearer SEU_TOKEN_JWT
```

## 🔒 Segurança

- **JWT**: Tokens de autenticação com expiração de 1 hora
- **bcrypt**: Hash de senhas com salt rounds
- **Validação**: Schemas Zod para entrada de dados
- **SQL Injection**: Prevenção com prepared statements

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Diego Paiva** - [GitHub](https://github.com/diego-paiva)

---

⭐ **Dê uma estrela se este projeto te ajudou!**

📧 **Dúvidas?** Abra uma issue ou entre em contato!
