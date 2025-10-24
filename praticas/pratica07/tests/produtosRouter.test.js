const supertest = require('supertest');
const app = require('../app'); 
const request = supertest(app);
let idProdutoCriado; 

describe('API /produtos (Prática 7)', () => {
  test('POST /produtos deve retornar 201 e JSON', async () => {
    const response = await request.post('/produtos').send({
      nome: "Laranja",
      preco: 10.0
    });
    expect(response.status).toBe(201);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('nome', 'Laranja');
    expect(response.body).toHaveProperty('preco', 10.0);

    idProdutoCriado = response.body._id;
  });

  test('POST /produtos sem JSON deve retornar 422 e JSON {msg: "..."}', async () => {
    const response = await request.post('/produtos').send({}); // Corpo vazio
    expect(response.status).toBe(422);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
  });

  test('GET /produtos deve retornar 200, JSON e um array', async () => {
    const response = await request.get('/produtos');
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /produtos/:id deve retornar 200 e JSON', async () => {
    const response = await request.get(`/produtos/${idProdutoCriado}`);
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('_id', idProdutoCriado);
    expect(response.body).toHaveProperty('nome', 'Laranja'); // Ainda Laranja, pois PUT não rodou
  });

  test('GET /produtos/0 deve retornar 400 e JSON {msg: "Parâmetro inválido"}', async () => {
    const response = await request.get('/produtos/0'); // ID inválido (formato não-ObjectId)
    expect(response.status).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  test('GET /produtos/000000000000000000000000 deve retornar 404 e JSON {msg: "..."}', async () => {
    const response = await request.get('/produtos/000000000000000000000000'); // ID válido no formato Mongo, mas inexistente
    expect(response.status).toBe(404);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Produto não encontrado');
  });
  
  test('PUT /produtos/:id deve retornar 200 e JSON com valores atualizados', async () => {
    const response = await request.put(`/produtos/${idProdutoCriado}`).send({
      nome: "Laranja Pera",
      preco: 18.00
    });
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('_id', idProdutoCriado);
    expect(response.body).toHaveProperty('nome', 'Laranja Pera');
    expect(response.body).toHaveProperty('preco', 18.00);
  });

  test('PUT /produtos/:id sem JSON deve retornar 422 e JSON {msg: "..."}', async () => {
    const response = await request.put(`/produtos/${idProdutoCriado}`).send({});
    expect(response.status).toBe(422);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
  });
  
  test('PUT /produtos/0 deve retornar 400 e JSON {msg: "Parâmetro inválido"}', async () => {
    const response = await request.put('/produtos/0').send({ nome: "Invalido", preco: 1 });
    expect(response.status).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  test('PUT /produtos/000000000000000000000000 deve retornar 404 e JSON {msg: "..."}', async () => {
    const response = await request.put('/produtos/000000000000000000000000').send({ nome: "Nao Encontrado", preco: 1 });
    expect(response.status).toBe(404);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Produto não encontrado');
  });

  test('DELETE /produtos/:id deve retornar 204 e sem conteúdo', async () => {
    const response = await request.delete(`/produtos/${idProdutoCriado}`);
    expect(response.status).toBe(204);
    expect(response.body).toEqual({}); // Corpo vazio
  });

  test('DELETE /produtos/0 deve retornar 400 e JSON {msg: "Parâmetro inválido"}', async () => {
    const response = await request.delete('/produtos/0');
    expect(response.status).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  test('DELETE /produtos/000000000000000000000000 deve retornar 404 e JSON {msg: "..."}', async () => {
    const response = await request.delete('/produtos/000000000000000000000000');
    expect(response.status).toBe(404);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Produto não encontrado');
  });

});