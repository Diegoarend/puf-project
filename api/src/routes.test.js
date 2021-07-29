import request from 'supertest'
import { app } from './server-setup'

const server = app.listen()

describe ('User routes', () => {
  it('should return not found with wrong password', async () => {
    //prepare 
    const email='diegoaw@codar.me'
    const password ='1234567'
   
    //execution
    const result = await request(server).get('/login').auth(email , password)
    console.log(result)
    //explication
    expect(result.status).toBe(404)

  })
  it('should return not found with wrong email', async () => {
    //prepare 
    const email='okw@codar.me'
    const password ='123456'
 
    //execution
    const result = await request(server).get('/login').auth(email , password)
    //explication
    expect(result.status).toBe(404)

  })
})