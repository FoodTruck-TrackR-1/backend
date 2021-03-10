const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('../api/server');

describe.skip('operators(menu)Router', () => {
    let token;

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
                
                token = res.body.token;
                console.log(token);
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
        })
        afterEach(async () => {
            await db('users').del();
            await db('trucks').del();
            await db('menu_items').del();
        })

    describe('Get Trucks Menu', () => {
        it('should give back 200 code', async() => {
            await request(server)
                .get('/api/operators/trucks/1/menu')
                .set('Authorization', token)
                .then(res => {
                    expect(res.status).toBe(200);
                })
        })
    })
    describe('Add New Menu Item', () => {
        it('should give back 201 code', async() => {
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
                .then(res => {
                    expect(res.status).toBe(201);
                })
        })
    })
    describe('Updating Menu Item', () => {
        it('should give back 200 code', async() => {
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
            await request(server)
                .put('/api/operators/trucks/menu/1')
                .set('Authorization', token)
                .send({
                    item_name: "Updated Item",
                    item_description: "nice little description of food item",
                    item_photo: "photo link",
                    item_price: 25,
                    truck_id: 1
                })
                .then(res => {
                    expect(res.status).toBe(200);
                })
                
        })
    })
    describe('Removing Menu Item', () => {
        it('should give back 200 code', async() => {
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
            await request(server)
                .delete('/api/operators/trucks/menu/1')
                .set('Authorization', token)
                .then(res => {
                    expect(res.status).toBe(200);
                })
                
        })
    })


})