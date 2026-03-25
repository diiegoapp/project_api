const request = require('supertest');
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '../banco.db');

let app;

beforeAll(() => {
  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
  }

  require('../src/database/connection');
  app = require('../src/app');
});

describe('Auth routes', () => {
  test('deve cadastrar um usuário', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        nome: 'Diego',
        email: 'diego@email.com',
        senha: '123456'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.mensagem).toBe('Usuário cadastrado com sucesso');
    expect(response.body.usuario.email).toBe('diego@email.com');
  });

  test('deve fazer login com sucesso', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'diego@email.com',
        senha: '123456'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.mensagem).toBe('Login realizado com sucesso');
    expect(response.body.token).toBeDefined();
  });

  test('deve bloquear login com senha errada', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'diego@email.com',
        senha: '000000'
      });

    expect(response.statusCode).toBe(401);
  });
});