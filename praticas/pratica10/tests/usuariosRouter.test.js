const request = require('supertest');
const app = require('../app');

let id;
let token;

describe('Testando recuso do /usuario',() =>{
    test('Retornar 201 e um JSON com email e id', async () => {
        const res = await request(app)
            .post('/usuarios')
            .send({email: "usuarios@email.com", senha: "kayavieira0190"});
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('email', 'usuario@email.com');
        id = res.body._id;
    });

    test('Retornar 200 e um token de autenticação', async() => {
        const res = await request(app)
            .post('/usuarios/login')
            .send({ usuario: 'usuario@email.com', senha: "kayavieira0190"});

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token;
    });

    test('Retornar 401 com credenciais invalidas', async () => {
        const res = await request(app)
            .post('usuarios/login')
            .send({usuario: "usuario@email.com", senha: "errada"});

        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveroperty('msg', 'Credenciais inválidas');
    });

    test('Retornar 200 e o novo Token', async () => {
        const res = await request(app)
            .post('/usuarios/renovar')
            .set('Autorization', `Bearer ${token}`);
    });

    test('Retornar 401 com token inválido', async () => {
        const res = await request(app)
            .post('/usuarios/renovar')
            .set('Autorization', 'Bearer 1234567890')
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('msg', 'Token inválido');
    });

    test('Retornar 204 ao deletar usuario', async () => {
        const res = await request(app)
            .delete('/usuarios')
            .set('Autorization', `Bearer ${token}`)
            .send({ usuario: "usuario@email.com"})

        expect(res.statusCode).toEqual(204);
    });
});