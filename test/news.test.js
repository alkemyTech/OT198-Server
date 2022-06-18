const request = require('supertest')
const { expect } = require('chai')
const app = require('../app')
const path = require('path')
const { New, Category } = require('../database/models')

// User with Admin role
const user = {
    email: 'ncrook0@yolasite.com',
    password: 'Test1234'
}

const newData = {
    name: 'Test new',
    content: 'Test new content',
    image: '/images/imageTest.png',
}

var token
var idNews

describe('News', () => {
    // Login user
    before((done) => {
        request(app)
        .post('/auth/login')
        .send(user)
        .end((err, res) => {
            expect(res).to.have.property('status', 200)
            token = res.body.body.token
            done()
        })
    })
    // Create a new category
    before((done) => { 
        request(app)
        .post('/categories')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: 'Test category',
            description: 'Test description'
        })
        .end((err, res) => {
            expect(res).to.have.property('status', 201)
            expect(res.body).to.have.property('message', 'Category created')
            newData.categoryId = res.body.body.id
            done()
        })
    })
    // Delete data that was created
    after( async () => {
        const removeNews = await New.destroy({
            where: { id: idNews },
            force: true
        })
        const removeCategory = await Category.destroy({
            where: { id: newData.categoryId },
            force: true
        })
        return removeNews && removeCategory
    })
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
                expect(res.body).to.have.property( 'message', 'successfully retrieved')
                done()
            })
        })
    })
})