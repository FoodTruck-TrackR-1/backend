const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('../api/server');

describe.skip('diners(menu)Router', () => {
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
                token = res.body.token;
            })
        await request(server)
            .post('/api/operators/trucks')
            .set('Authorization', token)
            .send({
                name: "new truck",
                cuisine_type: "cuisine",
                truck_image: "link for photo",
                operator_id: 1
            })  
        await request(server)
            .post('/api/operators/trucks/menu')
            .set('Authorization', token)
            .send({
                item_name: "food item",
                item_description: "nice little description of food item",
                item_photo: "photo link",
                item_price: 25,
                truck_id: 1
            })
    })
    afterEach(async () => {
        
        await db('users').del();
        await db('trucks').del();
        await db('menu_items').del();
    })

    describe('Get Trucks Menu', () => {
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
                .get('/api/diners/truck/1/menu')
                .set('Authorization', token2)
                .then(res => {
                    expect(res.status).toBe(200)
                });
        })
    })

})