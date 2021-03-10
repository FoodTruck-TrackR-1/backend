const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('../api/server');

describe('operators(trucks)Router', () => {
    let operator_id;
    let token;
    
     beforeEach(async () => {
       await db.migrate 
        .rollback()
        .then(() => db.migrate.latest())
        .then(() => db.seed.run());
        
    await request(server)
        .post('/api/auth/register')
        .send({ 
            name: 'test', 
            username: 'testing1', 
            password: 'pass', 
            is_operator: true 
        })
        .then(res => {
            
            operator_id = res.body
            token = res.body.token;
        })
        .catch(error => console.log(error))  
    })
  

    describe.skip('Get Owned Trucks', () => {
        it('should give back a 200 code', async () => {
            await request(server)
                .get('/api/operators/1/trucks')
                .set('Authorization', token)
                .then(res => {
                    expect(res.status).toBe(200);
                })
        })
    })

    describe('Find Specific Truck', () => {
        it('should give back a 200 code', async () => {
            await request(server)
                .get('/api/operators/trucks/1')
                .set('Authorization', token)
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })
    })
    describe('Add a Truck', () => {
        it('should give back a 201 code', async () => {
            await request(server)
                .post('/api/operators/trucks')
                .set('Authorization', token)
                .send({
                    name: "new truck",
                    cuisine_type: "cuisine",
                    truck_image: "link for photo",
                    operator_id: 1
                })
                .then(res => {
                    expect(res.status).toBe(201);
                })
        })
    })
    describe('Update Truck', () => {
        it('should give back a 200 code', async () => {
            const id = await request(server)
                .post('/api/operators/trucks')
                .set('Authorization', token)
                .send({
                    name: "new truck",
                    cuisine_type: "cuisine",
                    truck_image: "link for photo",
                    operator_id: 1
                })
                .then(res => {
                    return res
                })
             
            await request(server)
                .put(`/api/operators/trucks/1`)
                .set('Authorization', token)
                .send({
                    name: "New Changes to The Truck",
                    cuisine_type: "cuisine", 
                    truck_image: "link for photo",
                    operator_id: 1
                })
                .then(res => {
                    expect(res.status).toBe(200);
                })
        })
    })
    describe('Remove Truck', () => {
        it('should give back 200 code', async() => {
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
                .delete('/api/operators/trucks/1')
                .set('Authorization', token)
                .then(res => {
                    expect(res.status).toBe(200);
                })
        })
    })
    
   




})