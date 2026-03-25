const request = require('supertest');
const app = require('../src/app');

let token;

beforeAll(async () => {
  await request(app)
    .post('/auth/register')
    .send({
      nome: 'Usuário Tasks',
      email: 'tasks@email.com',
      senha: '123456'
    });

  const loginResponse = await request(app)
    .post('/auth/login')
    .send({
      email: 'tasks@email.com',
      senha: '123456'
    });

  token = loginResponse.body.token;
});

describe('Tasks routes', () => {
  test('deve criar uma tarefa', async () => {
    const response = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        titulo: 'Estudar testes'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.tarefa.titulo).toBe('Estudar testes');
  });

  test('deve listar tarefas com paginação', async () => {
    const response = await request(app)
      .get('/tasks?page=1&limit=10')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.meta).toBeDefined();
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test('deve filtrar tarefas por título', async () => {
    const response = await request(app)
      .get('/tasks?titulo=testes')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});