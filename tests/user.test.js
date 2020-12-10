const app = require('../app')
const request = require('supertest')
const {User, sequelize} = require('../models')
const {queryInterface} = sequelize

describe('User Routes Test', () => {
  const userData = {
    email: 'admin@mail.com',
    password: '1234'
  }

  const userData2 = {
    email: 'adminfake@mail.com',
    password: '1234'
  }
  
  const userData3 = {
    email: 'admin@mail.com',
    password: '1234fake'
  }
  
  const userData4 = {
    email: '',
    password: ''
  }
  
  describe('POST /login/admin - admin authentication process', () => {
    beforeAll(done => {
      User.create(userData)
      .then(_ => {
        done()
      }).catch((err) => {
        done(err)
      });
    })

    afterAll(done => {
      queryInterface
        .bulkDelete('Users', {})
        .then(() => done())
        .catch(err => done(err))
    })

    test('200 Success login - should return access_token', done => {
      request(app)
      .post('/login/admin')
      .send(userData)
      .then((result) => {
        const {body, status} = result
        expect(status).toBe(200)
        expect(body).toHaveProperty('access_token', expect.any(String))
        done()
      }).catch((err) => {
        done(err)
      });
    })

    test('400 Failed login - should return access_token', done => {
      request(app)
      .post('/login/admin')
      .send(userData2)
      .then((result) => {
        const {body, status} = result
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'email or password is incorrect')
        done()
      }).catch((err) => {
        done(err)
      });
    })

    test('400 Failed login - should return access_token', done => {
      request(app)
      .post('/login/admin')
      .send(userData3)
      .then((result) => {
        const {body, status} = result
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'email or password is incorrect')
        done()
      }).catch((err) => {
        done(err)
      });
    })

    test('400 Failed login - should return access_token', done => {
      request(app)
      .post('/login/admin')
      .send(userData4)
      .then((result) => {
        const {body, status} = result
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'complete all forms')
        done()
      }).catch((err) => {
        done(err)
      });
    })

  })
})
