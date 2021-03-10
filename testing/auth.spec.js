const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('../api/server');


describe.skip('authRouter', () => {
    beforeEach(async () => {
        await db('users').del();
    })
    afterEach(async () => {
        await db('users').del();
    })

    describe('Register', () => {
      it('should return 201 Created (registeration completed)', async () => {
        await request(server)
            .post('/api/auth/register')
            .send({ name: 'test', username: 'testing1', password: 'pass', is_operator: true})
            .then(res => {
                expect(res.status).toBe(201);
            })
        
      });
  
      it('should return a 400 error message because we didnt provide the password', async () => {
        await request(server)
            .post('/api/auth/register')
            .send({ name: 'test', username: 'testing2', is_operator: true })
            .then(res => {
                expect(res.status).toBe(400);
            })
      });
    });
   

    describe('Login', () => {
      it('should return 200 OK', async () => {
        await request(server)
        .post('/api/auth/register')
        .send({ name: 'test', username: 'testing3', password: 'pass', is_operator: true})

        await request(server)
            .post('/api/auth/login')
            .send({ username: 'testing3', password: 'pass'})
            .then(res => {
                expect(res.status).toBe(200);
            })
        
      });
  
      it('should return a 400 error message because we did not provide the password', async () => {
        await request(server)
            .post('/api/auth/register')
            .send({ name: 'test', username: 'testing4', password: 'pass', is_operator: true})

        await request(server)
            .post('/api/auth/login')
            .send({ username: 'testing4' })
            .then(res => {
                expect(res.status).toBe(400);
            })
        
      });
     
    });
  
  });
 