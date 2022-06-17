const request = require('supertest')
const { expect } = require('chai')
const app = require('../app')
const path = require('path')
/* const { User } = require('../database/models') */

const user = {
    email: 'ncrook0@yolasite.com',
    password: 'Test1234'
}

const newData = {
    name: 'Test new',
    content: 'Test new content',
    image: '/images/imageTest.png',
    categoryId: 1,
}

var token
var idNews

describe('News', () => {
    before((done) => {
        // Login user
        request(app)
        .post('/auth/login')
        .send(user)
        .end((err, res) => {
            expect(res).to.have.property('status', 200)
            token = res.body.body.token
            done()
        })
    })
    /* after( async () => {
        // Delete the user that was created
        const result = await User.destroy({
            where: { email: 'testUser.email@test.com' },
            force: true
        });
        return result
    }) */
    describe('POST /news', () => { 
        it('should create a new news', (done) => {
            request(app)
            .post('/news')
            .set('Authorization', `Bearer ${token}`)
            .field('name', newData.name)
            .field('content', newData.content)
            .field('categoryId', newData.categoryId)
            .attach('image', path.join(__dirname, newData.image))
            .end((err, res) => {
                expect(res).to.have.property('status', 201)
                expect(res.body).to.have.property('message', 'New created')
                idNews = res.body.body.id
                done()
            })
        })
    })
    describe('GET /news', () => { 
        it('should return a list of news',(done) => { 
            request(app)
            .get('/news')
            .end((err, res) => {
                expect(res).to.have.property('status', 200)
                expect(res.body.body.news).to.be.an('array')
                done()
            })
        })
    })
    describe('GET /news/{id}', () => { 
        it('should return a news by id',(done) => { 
            request(app)
            .get(`/news/${idNews}`)
            .end((err, res) => {
                expect(res).to.have.property('status', 200)
                expect(res).to.have.property( 'message', 'successfully retrieved')
                done()
            })
        })
    })
})