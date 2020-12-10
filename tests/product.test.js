const app = require('../app')
const request = require('supertest')
const {sequelize, User, Product} = require('../models')
const {queryInterface} = sequelize
const {signToken} = require('../helpers/jwt')

describe('Product Routes Test', () => {
  let adminToken, fakeAdminToken, user2Product, userId1, userId2
  admin = {
    id: 1,
    username: 'admin',
    email: 'admin@mail.com',
    password: '1234',
    role: 'admin'
  }

  fakeAdmin = {
    id: 2,
    username: 'fake_admin',
    email: 'not_admin@mail.com',
    password: 'fake_1234',
    role: 'fake_admin'
  }

  beforeAll(done => {
    User.create(admin)
    .then(({id}) => {
      userId1 = id
      adminToken = signToken(admin)
      return User.create(fakeAdmin)
    })
    .then(id => {
      userId2 = id
      fakeAdminToken = signToken(fakeAdmin)
      done()
    })
    .catch(err => {
      done(err)
    })
  })

  afterAll(done => {
    queryInterface
    .bulkDelete('Users', {})
    .then(() => queryInterface.bulkDelete('Products', {}))
    .then(() => done())
    .catch(err => done(err))
  })

  describe('POST /Products - create new product', () => {
    const newProduct = {
      name: 'Pillow',
      price: 2e5,
      image_url: 'https://image.freepik.com/free-psd/square-pillow-mockup_177774-16.jpg',
      stock: 5
    }

    const newProduct2 = {
      name: '',
      price: 2e5,
      image_url: 'https://image.freepik.com/free-psd/square-pillow-mockup_177774-16.jpg',
      stock: 5
    }

    const newProduct3 = {
      name: 'Pillow',
      price: '',
      image_url: 'https://image.freepik.com/free-psd/square-pillow-mockup_177774-16.jpg',
      stock: 5
    }

    const newProduct4 = {
      name: 'Pillow',
      price: 2e5,
      image_url: '',
      stock: 5
    }

    const newProduct5 = {
      name: 'Pillow',
      price: 2e5,
      image_url: 'https://image.freepik.com/free-psd/square-pillow-mockup_177774-16.jpg',
      stock: ''
    }

    const newProduct6 = {
      name: 'Pillow',
      price: -5,
      image_url: 'https://image.freepik.com/free-psd/square-pillow-mockup_177774-16.jpg',
      stock: 5
    }

    const newProduct7 = {
      name: 'Pillow',
      price: 2e5,
      image_url: 'https://image.freepik.com/free-psd/square-pillow-mockup_177774-16.jpg',
      stock: -10
    }

    const newProduct8 = {
      name: 'Pillow',
      price: 2e5,
      image_url: 'fakeurl',
      stock: 10
    }

    const newProduct9 = {
      name: 'Pillow',
      price: 'one thousand',
      image_url: 'fakeurl.jpg',
      stock: 10
    }

    const newProduct10 = {
      name: 'Pillow',
      price: 20000,
      image_url: 'fakeurl.jpg',
      stock: 'ten'
    }

    const newProduct11 = {
      name: '_Pillow',
      price: 20000,
      image_url: 'https://image.freepik.com/free-psd/square-pillow-mockup_177774-16.jpg',
      stock: 10
    }

    afterEach(done => {
      queryInterface
      .bulkDelete('Products', {})
      .then(() => done())
      .catch(err => done(err))
    })

    test('201 Success post Product - should create new Product', done => {
      const {name, price, image_url, stock} = newProduct
      request(app)
      .post('/products')
      .send(newProduct)
      .set('access_token', adminToken)
      .then((result) => {
        const {body, status} = result
        expect(status).toBe(201)
        expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('name', name)
        expect(body).toHaveProperty('price', price)
        expect(body).toHaveProperty('image_url', image_url)
        expect(body).toHaveProperty('stock', stock)
        done()
      }).catch((err) => {
        done(err)
      });
    })

    test('400 Failed post Product - should return error if name is null', done => {
      request(app)
      .post('/products')
      .send(newProduct2)
      .set('access_token', adminToken)
      .then((result) => {
        const {body, status} = result
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Validation notEmpty on name failed')
        done()
      }).catch((err) => {
        done(err)
      });
    })

    test('400 Failed post Product - should return error if price is null', done => {
      request(app)
      .post('/products')
      .send(newProduct3)
      .set('access_token', adminToken)
      .then((result) => {
        const {body, status} = result
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Validation notEmpty on price failed')
        done()
      }).catch((err) => {
        done(err)
      });
    })

    test('400 Failed post Product - should return error if image_url is null', done => {
      request(app)
      .post('/products')
      .send(newProduct4)
      .set('access_token', adminToken)
      .then((result) => {
        const {body, status} = result
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Validation notEmpty on image_url failed')
        done()
      }).catch((err) => {
        done(err)
      });
    })

    test('400 Failed post Product - should return error if stock is null', done => {
      request(app)
      .post('/products')
      .send(newProduct5)
      .set('access_token', adminToken)
      .then((result) => {
        const {body, status} = result
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Validation notEmpty on stock failed')
        done()
      }).catch((err) => {
        done(err)
      });
    })

    test('400 Failed post Product - should return error if price minus', done => {
      request(app)
      .post('/products')
      .send(newProduct6)
      .set('access_token', adminToken)
      .then((result) => {
        const {body, status} = result
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Validation min on price failed')
        done()
      }).catch((err) => {
        done(err)
      });
    })

    test('400 Failed post Product - should return error if stock minus', done => {
      request(app)
      .post('/products')
      .send(newProduct7)
      .set('access_token', adminToken)
      .then((result) => {
        const {body, status} = result
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Validation min on stock failed')
        done()
      }).catch((err) => {
        done(err)
      });
    })

    test('400 Failed post Product - should return error if format url invalid', done => {
      request(app)
      .post('/products')
      .send(newProduct8)
      .set('access_token', adminToken)
      .then((result) => {
        const {body, status} = result
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Validation isUrl on image_url failed')
        done()
      }).catch((err) => {
        done(err)
      });
    })

    test('400 Failed post Product - should return error if type data price not numeric', done => {
      request(app)
      .post('/products')
      .send(newProduct9)
      .set('access_token', adminToken)
      .then((result) => {
        const {body, status} = result
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Validation isNumeric on price failed')
        done()
      }).catch((err) => {
        done(err)
      });
    })

    test('400 Failed post Product - should return error if type data stock not numeric', done => {
      request(app)
      .post('/products')
      .send(newProduct10)
      .set('access_token', adminToken)
      .then((result) => {
        const {body, status} = result
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Validation isNumeric on stock failed')
        done()
      }).catch((err) => {
        done(err)
      });
    })

    test('407 Failed post Product - should return error if access_token not provided', done => {
      request(app)
      .post('/products')
      .send(newProduct10)
      .then((result) => {
        const {body, status} = result
        expect(status).toBe(407)
        expect(body).toHaveProperty('message', 'Authentication required')
        done()
      }).catch((err) => {
        done(err)
      });
    })

    test('400 Failed post Product - should return error if not authorized', done => {
      request(app)
      .post('/products')
      .send(newProduct)
      .set('access_token', fakeAdminToken)
      .then((result) => {
        const {body, status} = result
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', 'You are not authorized')
        done()
      }).catch((err) => {
        done(err)
      });
    })

    test('400 Failed post Product - should return error if name product only allow characters', done => {
      request(app)
      .post('/products')
      .send(newProduct11)
      .set('access_token', adminToken)
      .then((result) => {
        const {body, status} = result
        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Validation isAlphanumeric on name failed')
        done()
      }).catch((err) => {
        done(err)
      });
    })

  })

  describe('GET /Products - show all products', () => {
    test('200 Success Show Product - should show all products', done => {
      request(app)
      .get('/products')
      .then((result) => {
        const {body, status} = result
        expect(status).toBe(200)
        expect(body).toHaveProperty('products', expect.any(Array))
        done()
      }).catch((err) => {
        done(err)
      });
    })
  })

  describe('GET /Products/:id - show product', () => {
    const productContent = {
      name: 'Pillow',
      price: 2e5,
      image_url: 'https://image.freepik.com/free-psd/square-pillow-mockup_177774-16.jpg',
      stock: 5
    }

    beforeAll(done => {
      Product.create({
        ...productContent,
        UserId: userId2
      })
      .then((result) => {
        user2Product = result
        done()
      }).catch((err) => {
        done(err)
      });
    })

    test('200 Success Show Product By Id - should show product by id', done => {
      request(app)
      .get('/products/'+ user2Product.id)
      .set('access_token', adminToken)
      .then((result) => {
        const {body, status} = result
        expect(status).toBe(200)
        expect(body).toHaveProperty('product', expect.any(Object))
        done()
      }).catch((err) => {
        done(err)
      });

    })
  })

  describe('PUT /Products/:id - update a product', () => {
    const productContent = {
      name: 'Pillow',
      price: 200000,
      image_url: 'https://image.freepik.com/free-psd/square-pillow-mockup_177774-16.jpg',
      stock: 5
    }

    const updatedContent = {
      name: 'Cap',
      price: 100000,
      image_url: 'https://image.freepik.com/free-psd/cap-mockup_1310-498.jpg',
      stock: 10
    }

    beforeAll(done => {
      Product.create({
        ...productContent,
        UserId: userId2
      })
      .then((result) => {
        user2Product = result
        done()
      }).catch((err) => {
        done(err)
      });
    })

    test.skip('200 Success Update Product - should update a Product if authorized', done => {
      request(app)
      .put(`/products/${user2Product.id}}`)
      .send(updatedContent)
      .set('access_token', adminToken)
      .then((result) => {
        const {body, status} = result
        const {name, price, image_url, stock} = updatedContent
        expect(status).toBe(200)
        // expect(body).toHaveProperty('id', expect.any(Number))
        expect(body).toHaveProperty('name', name)
        expect(body).toHaveProperty('price', price)
        expect(body).toHaveProperty('image_url', image_url)
        expect(body).toHaveProperty('stock', stock)
        // expect(body).toHaveProperty('UserId', userId2)
        done()
      }).catch((err) => {
        done(err)
      });
    })
  })

  describe('DELETE /Product/:id - delete a product', () => {
    test.skip('200 Success Delete - should delete a product', done  => {
      request(app)
      .delete(`/products/.id}`)
      .set('access_token', adminToken)
      .then((result) => {
        const {body, status} = result
        expect(status).toBe(200)
        expect(body).toHaveProperty('message', 'Delete product successfuly')
        done()
      }).catch((err) => {
        done(err)
      });
    })
  })

})