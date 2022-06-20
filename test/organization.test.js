const { expect } = require('chai')
const request = require('supertest')
const app = require('../app')
const { Organization } = require('../database/models')

const dummyOrganizations = [
    {
      name: 'Organization 1',
      image: '/images/Organization1.png',
      address: 'Organization address 1',
      phone: '46536538',
      email: 'organization1@email.com',
      facebookUrl: 'www.organizationfacebookUrl1.com',
      instagramUrl: 'www.organizationinstagramUrl1.com',
      linkedinUrl: 'www.organizationlinkedinUrl1.com',
      welcomeText: 'Organization welcomeText 1',
      aboutUsText: 'Organization aboutUsText 1',
    },
  ]

describe('Organizations', () => {
    let authToken;

    before(async () => {

        request(app)
        .post('/auth/login')
        .send({
            email: 'ncrook0@yolasite.com',
            password: 'Test1234'
        })
        .end((err, res) => {
            expect(res).to.have.property('status', 200)
            expect(res.body.body).to.have.property('token')
            authToken = res.body.body.token
        })
        await Organization.bulkCreate(dummyOrganizations)
        
    })

    after(async () => {
        await Organization.destroy({ where: { name: 'Organization 3' },force: true })
    })

    describe('GET /organization/public', () => {
        it('should return a list of Organizations', async () => {
            
            const response = await (await request(app)
                .get('/organization/public'))
            expect(response).to.have.property('status', 200)
            expect(response.body.body).to.be.instanceOf(Array)
            })
        }
    )

    describe('POST /organization/public', () => {
        it('should update a Organization', async () => {
            const response = await (await request(app)
                .post('/organization/public')
                .set('Authorization','Bearer '+authToken)
                .send({
                    name: 'Organization 3',
                    welcomeText: 'Welcome Organization 3!!!',
                    email: 'organization3@email.com',
                    image:'/images/imageTest.png'
                }))
            expect(response).to.have.property('status', 200)
            expect(response.body.body).to.have.property('name', 'Organization 3')
            expect(response.body.body).to.have.property('welcomeText', 'Welcome Organization 3!!!')
            expect(response.body.body).to.have.property('email', 'organization3@email.com')
            expect(response.body.body).to.have.property('image')
            }
        )}
    )

    describe('POST /organization/public without token', () => {
        it('should return a 401 error', async () => {
            const response = await (await request(app)
                .post('/organization/public')
                .field('name', 'Organization 3')
                .field('welcameText', 'Organization 3')
                .field('email', 'Organization3@email.com'))
            expect(response).to.have.property('status', 401)
            expect(response.body).to.have.property('message', 'No authorization header')
            }
        )}
    )

    describe('POST /organization/public with invalid token', () => {
        it('should return a 401 error', async () => {
            const response = await (await request(app)
                .post('/organization/public')
                .set('Authorization','Bearer '+'invalidtoken')
                .field('name', 'Organization 3')
                .field('welcameText', 'Organization 3')
                .field('email', 'Organization3@email.com'))
            expect(response).to.have.property('status', 401)
            expect(response.body).to.have.property('message', 'jwt malformed')
            }
        )}
    )

})

