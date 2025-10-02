const request = require('supertest');
const app = require('../app');

describe('API Tarefas', () => {
  let tarefaId;

  test('GET /tarefas deve retornar status 200 e JSON', async () => {
    const response = await request(app)
      .get('/tarefas')
      .expect(200)
      .expect('Content-Type', /json/);
  });

  test('POST /tarefas deve criar uma tarefa', async () => {
    const novaTarefa = { 
      "nome": "Estudar Node", 
      "concluida": false 
    };
    
    const response = await request(app)
      .post('/tarefas')
      .send(novaTarefa)
      .expect(201)
      .expect('Content-Type', /json/);
    
    tarefaId = response.body.id;
    expect(tarefaId).toBeDefined();
  });

  test('GET /tarefas/:id deve retornar a tarefa criada', async () => {
    const response = await request(app)
      .get(`/tarefas/${tarefaId}`)
      .expect(200)
      .expect('Content-Type', /json/);
  });

  test('GET /tarefas/1 deve retornar 404', async () => {
    const response = await request(app)
      .get('/tarefas/1')
      .expect(404)
      .expect('Content-Type', /json/);
  });

  test('PUT /tarefas/:id deve atualizar a tarefa', async () => {
    const tarefaAtualizada = { 
      "nome": "Estudar Node e Express", 
      "concluida": true 
    };
    
    const response = await request(app)
      .put(`/tarefas/${tarefaId}`)
      .send(tarefaAtualizada)
      .expect(200)
      .expect('Content-Type', /json/);
  });

  test('PUT /tarefas/1 deve retornar 404', async () => {
    const response = await request(app)
      .put('/tarefas/1')
      .send({ "nome": "Teste", "concluida": true })
      .expect(404)
      .expect('Content-Type', /json/);
  });

  test('DELETE /tarefas/:id deve remover a tarefa', async () => {
    await request(app)
      .delete(`/tarefas/${tarefaId}`)
      .expect(204);
  });

  test('DELETE /tarefas/1 deve retornar 404', async () => {
    const response = await request(app)
      .delete('/tarefas/1')
      .expect(404)
      .expect('Content-Type', /json/);
  });
});