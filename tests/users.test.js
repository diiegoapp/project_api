const request = require('supertest');
const app = require('../src/app');

let token;

beforeAll(async () => {
  await request(app)
    .post('/auth/register')
    .send({
      nome: 'Usuario User',
      email: 'user@email.com',
      senha: '123456'
    });

  const loginResponse = await request(app)
    .post('/auth/login')
    .send({
      email: 'user@email.com',
      senha: '123456'
    });

  token = loginResponse.body.token;
});

describe('Users routes', () => {
  test('deve retornar os dados do usuário logado', async () => {
    const response = await request(app)
      .get('/users/me')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.usuario.email).toBe('user@email.com');
  });

  test('deve atualizar nome do usuário', async () => {
    const response = await request(app)
      .put('/users/me')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Novo Nome'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.usuario.nome).toBe('Novo Nome');
  });

  test('deve excluir a conta do usuário', async () => {
    const response = await request(app)
      .delete('/users/me')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.mensagem).toBe('Conta excluída com sucesso');
  });
});