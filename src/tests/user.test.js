import app from "../app.js"
import User from "../models/userModel.js";
import request from 'supertest';

const register = {nome: "Pedro", email: "pedro@gmail.com", senha: "Pedro12#"};
const login = {email: "pedro@gmail.com", senha: "Pedro12#"}
const wrongLogin = {email: "pedro@gmail.com", senha: "Luiz21@"}

describe('POST /user/register', () => {
  beforeAll(async () => {
    await User.sync({force: true})
  })

  it('Se o programa consegue criar um novo usuário corretamente.', async () => {
    const res = await request(app).post('/user/register')
      .send(register)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
  })

  it("Testar se seu programa não criar um usuário com um email existente.", async () => {
    const res = await request(app).post('/user/register')
      .send(register)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(403, {message: "Já existe um usuario com este email"})
  })

  it("Testar se a senha enviada combina com a senha no banco de dados.", async () => {
    const res = await request(app).post('/user/login')
    .send(login)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, {message: "Usuario logado com sucesso!"})
  })

  it("Testar se, mandando uma senha errada, seu programa não combina com a senha no banco de dados.", async () => {
    const res = await request(app).post('/user/login')
    .send(wrongLogin)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(403, {message: "A senha não condiz!"})
  })

  it("Testar se seu programa consegue listar todos os usuários.", async () => {
    const res = await request(app).get('/user/list')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
  })

  it.only("Testar se seu programa consegue encontrar um usuário pelo email.", async () => {
    const res = await request(app).get('/user/getEmail/pedro@gmail.com')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)

    console.log(res)
  })
})