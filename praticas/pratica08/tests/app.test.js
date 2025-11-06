
const request = require('supertest');
const app = require('../app'); // Importa a instância da aplicação Express

// Variável para armazenar o token
let token;
let tokenRenovado;

describe('Testes da API - Prática 8', () => {

    //Teste de login e armazenamento de token
    test('POST /usuarios/login - Deve logar e retornar um token', async () => {
        const res = await request(app)
            .post('/usuarios/login')
            .send({
                usuario: 'email@exemplo.com',
                senha: 'abcd1234'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        
        //Salva o valor da propriedade "token"
        token = res.body.token; 
    });

    //Teste de rota protegida SEM token
    test('GET /produtos - Não deve autorizar sem token', async () => {
        const res = await request(app)
            .get('/produtos');
            
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('msg', 'Não autorizado');
    });

    //Teste de rota protegida com token INVÁLIDO
    test('GET /produtos - Não deve autorizar com token inválido', async () => {
        const res = await request(app)
            .get('/produtos')
            .set('authorization', 'Bearer 123456789');
            
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('msg', 'Token inválido');
    });

    //Teste de rota protegida com token VÁLIDO
    test('GET /produtos - Deve autorizar com token válido', async () => {
        const res = await request(app)
            .get('/produtos')
            .set('authorization', `Bearer ${token}`); 
            
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    //Teste de renovação de token
    test('POST /usuarios/renovar - Deve renovar o token', async () => {
        const res = await request(app)
            .post('/usuarios/renovar')
            .set('authorization', `Bearer ${token}`); // Usa o token original
            
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');

        //Salva o novo token
        tokenRenovado = res.body.token; 
    });
    
    test('GET /produtos - Deve autorizar com o NOVO token', async () => {
        const res = await request(app)
            .get('/produtos')
            .set('authorization', `Bearer ${tokenRenovado}`); 
            
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

});