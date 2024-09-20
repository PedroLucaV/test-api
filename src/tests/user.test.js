import app from "../app.js"
import request from 'supertest';

it('Se o programa consegue criar um novo usuário corretamente.', async () => {
  const res = await request(app).post('/user/register')
    .send({nome: "Pedro", email: "pedro@gmail.com", senha: "Pedro12#"})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)
})