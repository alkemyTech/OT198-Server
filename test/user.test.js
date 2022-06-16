const { expect } = require('chai')
const request = require('supertest')
const app = require('../app')
const { User } = require('../database/models')

describe('User', () => { 
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdE5hbWUiOiJOaWtpdGEiLCJsYXN0TmFtZSI6IkNyb29rIiwiZW1haWwiOiJuY3Jvb2swQHlvbGFzaXRlLmNvbSIsInBob3RvIjoiaHR0cDovL2R1bW15aW1hZ2UuY29tLzE5NngxMDAucG5nL2ZmNDQ0NC9mZmZmZmYiLCJyb2xlSWQiOjEsImNyZWF0ZWRBdCI6IjIwMjItMDYtMTZUMjA6MTI6NTMuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjItMDYtMTZUMjA6MTI6NTMuMDAwWiIsImRlbGV0ZWRBdCI6bnVsbH0sImlhdCI6MTY1NTQxMjEyNSwiZXhwIjoxNjU1NDk4NTI1fQ.C-SAW1zCtfScsQ8GgYAS07H1_DWrhS-BVooCMR_qWtg'
    beforeEach(async () => {
        request(app)
            .post('/auth/login')
            .send({
                email: 'ncrook0@yolasite.com',
                password: 'Test1234'
         })
        .end((err, res) => {
            expect(res).to.have.property('status', 200)
            expect(res.body.body).to.have.property('token')
            token = res.body.body.token
        })
    })
    describe('GET /users', () => {
        it('should return a list of users', async () => {

            const res = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${token}`)
            expect(res).to.have.property('status', 200)
            expect(res.body.body).to.be.an('array')
        })
    })

    describe('PUT /users/:id', () => {
        it('should update a user', async () => {
            const res = await request(app)
            .put('/users/1')
            .set('Authorization', `Bearer ${token}`)
            .send({
                firstName: 'Test',
                lastName: 'Test',
                email: 'ncrook0@yolasite.com',
                password: 'Test1234',
            })
            expect(res).to.have.property('status', 200)
            expect(res.body.body).to.have.property('firstName', 'Test')
            expect(res.body.body).to.have.property('lastName', 'Test')
        })
    })

    describe('DELETE /users/:id', () => {
        it('should delete a user', async () => {
            const res = await request(app)
            .delete('/users/4')
            .set('Authorization', `Bearer ${token}`)
            expect(res).to.have.property('status', 200)
            expect(res.body.body).to.have.property('message', 'User deleted')
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
            .set('Authorization', `Bearer ${token}`)
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
            .set('Authorization', `Bearer ${token}`)
            expect(res).to.have.property('status', 404)
            expect(res.body).to.have.property('message', 'User not found')
        })
    })
    describe('PUT /users/:id with out body', () => {
        it('should return a 400 error', async () => {
            const res = await request(app)
            .put('/users/100')
            .set('Authorization', `Bearer ${token}`)
            expect(res).to.have.property('status', 400)
            expect(res.body).to.have.property('errors').to.be.an('array')
        })
    })
})