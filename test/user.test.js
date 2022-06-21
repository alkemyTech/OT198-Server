const { expect } = require('chai')
const request = require('supertest')
const app = require('../app')
const { User } = require('../database/models')

const newUser =  [
    {
        firstName:'testUsers1',
        lastName:'testUsers1',
        email: 'untest@test.com1',
        password:'Test1234',
        roleId: 1,
    },
    {
        firstName:'testUsers2',
        lastName:'testUsers2',
        email: 'untest2@test.com',
        password:'Test1234',
        roleId: 2
    }
]
let token
describe('Users', () => {
    beforeEach(async () => {
      request(app)
        .post('/auth/login')
        .send({
          email: 'uatterbury2@eepurl.com',
          password: 'Test1234'
        })
        .end((err, res) => {
          expect(res).to.have.property('status', 200)
          expect(res.body.body).to.have.property('token')
          token = res.body.body.token
        })
        console.log('Este es el token!! :', token)
      await User.bulkCreate(newUser)
    })
    after(async () => {
      await User.destroy({ where: { email: 'untest2@test.com' } })
    })
    describe('GET /users', () => {
        it('should return a list of users', async () => {
            const res = await request(app)
            .get('/users')
            .set('Authorization', 'Bearer '+token)
            .expect(200)
            expect(res.body.body).to.be.instanceOf(Array)
        })
    })

    describe('PUT /users/:id', () => {
        it('should update a user', async () => {
            const res = await request(app)
            .put('/users/3')
            .set('Authorization', 'Bearer '+token)
            .send({
                firstName: 'Test',
                lastName: 'Test',
            })
            .expect(200)
            expect(res.body.body).to.have.property('firstName', 'Test')
            expect(res.body.body).to.have.property('lastName', 'Test')
        })
    })

    describe('DELETE /users/:id', () => {
        it('should delete a user', async () => {
            const res = await request(app)
            .delete('/users/6')
            .set('Authorization', 'Bearer '+token)
            .expect(200)
            expect(res.body).to.have.property('message', 'User deleted')
        })
    })

    //ERRORES
    describe('GET /users sin token', () => {
        it('should return a 401 error', async () => {
            const res = await request(app)
            .get('/users')
            expect(res).to.have.property('status', 401)
        }) 
    })
    describe('PUT /users/:id id invalid', () => {
        it('should return a 404 error', async () => {
            const res = await request(app)
            .put('/users/100')
            .set('Authorization', 'Bearer '+token)
            .send({
                firstName: 'Test',
                lastName: 'Test',
                email: 'ncrook0@yolasite.com',
                password: 'Test1234',
            })
            expect(res).to.have.property('status', 404)
            expect(res.body).to.have.property('message', 'User not found')
        })
    })
    describe('DELETE /users/:id id invalid', () => {
        it('should return a 404 error', async () => {
            const res = await request(app)
            .delete('/users/100')
            .set('Authorization', 'Bearer '+token)
            expect(res).to.have.property('status', 404)
            expect(res.body).to.have.property('message', 'User not found')
        })
    })
    describe('PUT /users/:id with out body', () => {
        it('should return a 400 error', async () => {
            const res = await request(app)
            .put('/users/100')
            .set('Authorization', 'Bearer '+token)
            expect(res).to.have.property('status', 400)
            expect(res.body).to.have.property('errors').to.be.an('array')
        })
    })
})