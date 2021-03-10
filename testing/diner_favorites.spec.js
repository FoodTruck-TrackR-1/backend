const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('../api/server');

describe.skip('diners(favorites)Router', () => {
    let token;
    let token2;

    beforeEach(async () => {
        await request(server)
            .post('/api/auth/register')
            .send({ 
                name: 'test', 
                username: 'testing1', 
                password: 'pass', 
                is_operator: true 
            })
            .then(res => {
                console.log(token)
                const token = res.body.token;
            })
        await request(server)
            .set('Authorization', token)
            .post('/api/operators/trucks')
            .send({
                name: "new truck",
                cuisine_type: "cuisine",
                truck_image: "link for photo",
                operator_id: 1
            })  
    })
    afterEach(async () => {
        await db('users').del();
        await db('trucks').del();
        await db('menu_items').del();
        await db('favorites').del();
    })

    describe('Get favorite Trucks', () => {
        it('should give back a 200 code', async () => {
            await request(server)
                .post('/api/auth/register')
                .send({ 
                    name: 'test', 
                    username: 'testing2', 
                    password: 'pass', 
                    is_operator: false 
                })
                .then(res => {
                    token2 = res.body.token;
                })
            await request(server)
                .get('/api/diners/1/favorites')
                .set('Authorization', token2)
                .then(res => {
                    expect(res.status).toBe(200)
                });
        })
    })

    describe('Add new favorite', () => {
        it('should give back a 201 code', async () => {
            await request(server)
                .post('/api/auth/register')
                .send({ 
                    name: 'test', 
                    username: 'testing2', 
                    password: 'pass', 
                    is_operator: false 
                })
                .then(res => {
                    token2 = res.body.token;
                })
            await request(server)
                .post('/api/diners/favorites')
                .set('Authorization', token2)
                .send({
                    truck_id: 1,
	                diner_id: 1
                })
                .then(res => {
                    expect(res.status).toBe(201)
                });
        })
    })
    describe('Remove Favorite', () => {
        it('should give back a 200 code', async () => {
            await request(server)
                .post('/api/auth/register')
                .send({ 
                    name: 'test', 
                    username: 'testing2', 
                    password: 'pass', 
                    is_operator: false 
                })
                .then(res => {
                    token2 = res.body.token;
                })
            await request(server)
                .set('Authorization', token2)
                .delete('/api/diners/favorites/1')
                .then(res => {
                    expect(res.status).toBe(200)
                });
        })
    })
    
})