# ecommerce_server

List of available endpoints: 
* POST /register
* POST /login/admin
* POST /login/customer
----
* GET /products
* GET /products/:id
* POST /products
* PUT /products/:id
* DELETE /products/:id
----
* GET /banners
* GET /banners/:id
* GET /banners/active
* POST /banners
* PUT /banners/:id
* DELETE /banners/:id
----
* GET /carts
* GET /carts/history
* POST /carts
* DELETE /carts
* DELETE /carts/:id
----
**Register**
----
Customer register

* **URL** <br />
  /register

* **Method** <br />
  `POST`

* **Data Params**
  ```javascript
  {
    username: 'string'
    email: 'string'
    password: 'string'
  }
  ```

* **Success Response**
  * **Code:** 201 <br />
    **Content:**
    ```javascript
    {
      access_token: 'string',
      user: {
        id: integer,
        username: 'string',
        email: 'string',
        role: 'string'
      }
    }
    ```

* **Error Response**
  * **Code:** 400 <br />
    **Content:**
    ```javascript
    {
      msg: 'validation errors'
    }
    ```
    OR

  * **Code:** 500 <br />
    **Content:**
    ```javascript
    {
      msg: 'Internal Server Error'
    }
    ```

* **Sample Call**
  ```javascript
  axios({
    method: 'POST',
    url: '/register',
    data: payload
  })
  ```
----

**Login Admin**
----
Admin login to cms site

* **URL** <br />
  /login/admin

* **Method** <br />
  `POST`

* **Data Params**
  ```javascript
  {
    email: 'string',
    password: 'string'
  }
  ```

* **Success Response**
  * **Code:** 200 <br />
    **Content:**
    ```javascript
    {
      access_token: 'string'
    }
    ```

* **Error Response**
  * **Code:** 401 <br />
    **Content:**
    ```javascript
    {
      msg: 'email or password is incorrect'
    }
    ```

    OR

  * **Code:** 500 <br />
    **Content:**
    ```javascript
    {
      msg: 'Internal Server Error'
    }
    ```
  
* **Sample Call**
  ```javascript
  axios({
    method: 'POST',
    url: 'login/admin',
    data: payload
  })
  ```
----

**Login Customer**
----
Customer login

* **URL** <br />
  /login/customer

* **Method** <br />
  `POST`

* **Data Params**
  ```javascript
  {
    email: 'string',
    password: 'string'
  }
  ```

* **Success Response**
  * **Code:** 200 <br />
  * **Content:**
  ```javascript
  {
    access_token: 'string',
    user: {
      id: integer,
      username: 'string',
      email: 'string',
      role: 'string'
    }
  }
  ```

* **Error Response**
  * **Code:** 401 <br />
  * **Content:**
    ```javascript
    {
      msg: 'incorrect email or password'
    }
    ```

    OR
  
  * **Code:** 500 <br />
  * **Content:**
    ```javascript
    {
      msg: 'Internal Server Error'
    }
    ```

* **Sample Call**
  ```javascript
  axios({
    method: 'POST',
    url: '/login/customer',
    data: payload
  })
  ```
----

**Read Products**
----
Returns all products in the database

* **URL** <br />
  /products

* **Method** <br />
  `GET`

* **Data Params**
  * **Headers**
    ```javascript 
    access_token: 'string'
    ```

* **Success Response**
  * **Code:** 200 <br />
    **Content:**
    ```javascript
    [
      {
        id: integer,
        name: 'string',
        image_url: 'string',
        price: integer,
        stock: integer
      },
      {
        ...
      }
    ]
    ```

* **Error Response**
  * **Code:** 401 <br />
    **Content:**
    ```javascript
    {
      msg: 'Authentication Failed'
    }
    ```

    OR

  * **Code:** 500 <br />
    **Content:**
    ```javascript
    {
      msg: 'Internal Server Error'
    }
    ```

* **Sample Call**
  ```javascript
  axios({
    method: 'GET',
    url: '/products',
    headers: {
      access_token: token
    }
  })
  ```
----

**Read Product By ID**
----
Returns data of one product

* **URL** <br />
  /products/:id

* **Method** <br />
  `GET`

* **Data Params**
  * **Headers**
    ```javascript 
    access_token: 'string'
    ```

* **Success Response**
  * **Code:** 200 <br />
    **Content:**
    ```javascript
    {
      id: integer,
      name: 'string',
      image_url: 'string',
      price: integer,
      stock: integer
    }
    ```

* **Error Response**
  * **Code:** 401 <br />
    **Content:**
    ```javascript
    {
      msg: 'Authentication Failed'
    }
    ```

    OR

  * **Code:** 404 <br />
    **Content:**
    ```javascript
    {
      msg: 'Product is not found'
    }
    ```
    
    OR

  * **Code:** 500 <br />
    **Content:**
    ```javascript
    {
      msg: 'Internal Server Error'
    }
    ```

* **Sample Call**
  ```javascript
  axios({
    method: 'GET',
    url: `/products/${id}`,
    headers: {
      access_token: token
    }
  })
  ```
----

**Add Product**
----

* **URL** <br />
  /products

* **Method** <br />
  `POST`

* **Data Params**
  * **Headers** <br />
    `access_token: 'string'`

  * **Data**
    ```javascript
    {
      name: 'string',
      image_url: 'string',
      stock: integer,
      price: integer
    }
    ```

* **Success Response**
  * **Code:** 201 <br />
    **Content:**
    ```javascript
    {
      id: integer
      name: 'string',
      image_url: 'string',
      stock: integer,
      price: integer
    }
    ```

* **Error Response**
  * **Code:** 400 <br />
    **Content**
    ```javascript
    {
      msg: 'validation errors'
    }
    ```

    OR
  
  * **Code:** 401 <br />
    **Content**
    ```javascript
    {
      msg: 'Not Authorized'
    }

    OR
    
    {
      msg: 'Authenticaton Failed'
    }
    ```

    OR
  
  * **Code:** 500 <br />
    **Content:**
    ```javascript
    {
      msg: 'Internal Server Error'
    }
    ```

* **Sample Call**
  ```javascript
  axios({
    method: 'POST',
    url: '/products',
    headers: {
      access_token: token
    },
    data: payload
  })
  ```
----

**Edit Product Data**
----
Edit a product's data

* **URL** <br />
  /products/:id

* **Method** <br />
  `PUT`

* **Data Params**
  * **Headers** <br />
    `access_token: 'string'`
  
  * **Data**
    ```javascript
    {
      name: 'string',
      image_url: 'string',
      stock: integer,
      price: integer
    }
    ```

* **Success Response**
  * **Code:** 201 <br />
    **Content:**
    ```javascript
    {
      id: integer
      name: 'string',
      image_url: 'string',
      stock: integer,
      price: integer
    }
    ```

* **Error Response**
  * **Code:** 400 <br />
    **Content**
    ```javascript
    {
      msg: 'validation errors'
    }
    ```

    OR
  
  * **Code:** 401 <br />
    **Content**
    ```javascript
    {
      msg: 'Not Authorized'
    }

    OR
    
    {
      msg: 'Authenticaton Failed'
    }
    ```

    OR
  
  * **Code:** 404 <br />
    **Content:**
    ```javascript
    {
      msg: 'Edit Product Failed'
    }
    ```
    OR
  
  * **Code:** 500 <br />
    **Content:**
    ```javascript
    {
      msg: 'Internal Server Error'
    }
    ```

* **Sample Call**
  ```js
  axios({
    method: 'PUT',
    url: `/products/${payload.id}`,
    headers: {
      access_token: token
    },
    data: payload.product
  })
  ```
----

**Delete Product**
----
Delete a product

* **URL** <br />
  /products/:id

* **Method** <br />
  `DELETE`

* **Data Params**
  * **Headers** <br />
    `access_token: 'string'`

* **Success Response**

  **Code:** 200 <br />
  **Content:**
  ```javascript
  {
    msg: 'Product Successfully Deleted'
  }
  ```

* **Error Response**

  * **Code:** 401 <br />
    **Content:** 
      ```javascript
      {
        msg: 'Not Authorized'
      }
      OR
      {
        msg: 'Authentication Failed'
      }
      ```

      OR

  * **Code:** 500 <br />
    **Content:**
    ```js
    {
      msg: 'Internal Server Error'
    }
    ```
    OR

  * **Code:** 404 <br />
    **Content:**
    ```js
    {
      msg: 'Product not found'
    }
    ```

* **Sample Call**
  ```js
  axios({
    method: 'DELETE',
    url: `/banners/${id}`,
    headers: {
      access_token: token
    }
  })
  ```
----

**Read Banners**
----
Returns data of all banners

* **URL** <br />
  /banners

* **Method** <br />
  `GET`

* **Data Params**
  * **Headers** <br />
    `access_token: 'string'`
  
* **Success Response**

  * **Code:** 200 <br />
    **Content:**
    ```js
    [
      {
        id: integer,
        image_url: 'link',
        status: 'string'
      },
      {
        ...
      }
    ]
    ```
  
* **Error Response**

  * **Code:** 401 <br />
    **Content:** 
      ```javascript
      {
        msg: 'Authentication Failed'
      }
      ```

      OR

  * **Code:** 500 <br />
    **Content:**
      ```js
      {
        msg: 'Internal Server Error'
      }
      ```

* **Sample Call**
  ```js
  axios({
    method: 'GET',
    url: '/banners',
    headers: {
      access_token: token
    }
  })
  ```
----

**Read Banner By ID**
----
* **URL** <br />
  /banners/:id

* **Method** <br />
  `GET`

* **Data Params**
  * **Headers** <br />
    `access_token: 'string'`
  
* **Success Response**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
      id: integer,
      image_url: 'link',
      status: 'string'
    }
    ```
  
* **Error Response**

  * **Code:** 404 <br />
    **Content:** 
      ```javascript
      {
        msg: 'Banner not found'
      }
      ```

      OR

  * **Code:** 401 <br />
    **Content:** 
      ```javascript
      {
        msg: 'Authentication Failed'
      }
      ```

      OR

  * **Code:** 500 <br />
    **Content:**
      ```js
      {
        msg: 'Internal Server Error'
      }
      ```

* **Sample Call**
  ```js
  axios({
    method: 'GET',
    url: `/banners/${id}`,
    headers: {
      access_token: token
    }
  })
  ```
----

**Read Active Banner**
----
* **URL** <br />
  /banners/active

* **Method** <br />
  `GET`

* **Data Params**
  * **Headers** <br />
    `access_token: 'string'`
  
* **Success Response**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
      id: integer,
      image_url: 'link',
      status: 'string'
    }
    ```
  
* **Error Response**

  * **Code:** 401 <br />
    **Content:** 
      ```javascript
      {
        msg: 'Authentication Failed'
      }
      OR
      {
        msg: 'Not Authorized'
      }
      ```

      OR

  * **Code:** 500 <br />
    **Content:**
      ```js
      {
        msg: 'Internal Server Error'
      }
      ```
----

**Add Banner**
----
Add a new banner

* **URL** <br />
  /banners

* **Method** <br />
  `POST`

* **Data Params**
  * **Headers**
    `access_token: 'string'`
  
  * **Data**
    ```js
    {
      image_url: 'string',
      status: 'string'
    }
    ```

* **Success Response**
  * **Code:** 201 <br />
    **Content:**
    ```javascript
    {
      id: integer
      image_url: 'string',
      status: 'string'
    }
    ```

* **Error Response**
  * **Code:** 400 <br />
    **Content**
    ```javascript
    {
      msg: 'validation errors'
    }
    ```

    OR
  
  * **Code:** 401 <br />
    **Content**
    ```javascript
    {
      msg: 'Not Authorized'
    }

    OR
    
    {
      msg: 'Authenticaton Failed'
    }
    ```

    OR
  
  * **Code:** 500 <br />
    **Content:**
    ```javascript
    {
      msg: 'Internal Server Error'
    }
    ```
* **Sample Call**
  ```js
  axios({
    method: 'POST',
    url: '/banners',
    headers: {
      access_token: token
    },
    data: payload
  })
  ```
----

**Edit Banner's Data**
----
Edit a banner's data

* **URL** <br />
  /banners/:id

* **Method** <br />
  `PUT`

* **Data Params**
  * **Headers** <br />
    `access_token: 'string'`
  
  * **Data**
    ```javascript
    {
      status: 'string',
      image_url: 'string',
    }
    ```

* **Success Response**
  * **Code:** 201 <br />
    **Content:**
    ```javascript
    {
      id: integer
      status: 'string',
      image_url: 'string',
    }
    ```

* **Error Response**
  * **Code:** 400 <br />
    **Content**
    ```javascript
    {
      msg: 'validation errors'
    }
    ```

    OR
  
  * **Code:** 401 <br />
    **Content**
    ```javascript
    {
      msg: 'Not Authorized'
    }

    OR
    
    {
      msg: 'Authenticaton Failed'
    }
    ```

    OR
  
  * **Code:** 404 <br />
    **Content:**
    ```javascript
    {
      msg: 'Edit Banner Failed'
    }
    ```
    OR
  
  * **Code:** 500 <br />
    **Content:**
    ```javascript
    {
      msg: 'Internal Server Error'
    }
    ```

* **Sample Call**
  ```js
  axios({
    method: 'PUT',
    url: `/banners/${payload.id}`,
    headers: {
      access_token: token
    },
    data: payload.banner
  })
  ```
----

**Delete Banner**
----

* **URL** <br />
  /banners/:id

* **Method** <br />
  `DELETE`

* **Data Params**
  * **Headers** <br />
    `access_token: 'string'`

* **Success Response**

  **Code:** 200 <br />
  **Content:**
  ```javascript
  {
    msg: 'Banner Successfully Deleted'
  }
  ```

* **Error Response**

  * **Code:** 401 <br />
    **Content:** 
      ```javascript
      {
        msg: 'Not Authorized'
      }
      OR
      {
        msg: 'Authentication Failed'
      }
      ```

      OR

  * **Code:** 500 <br />
    **Content:**
    ```js
    {
      msg: 'Internal Server Error'
    }
    ```
    OR

  * **Code:** 404 <br />
    **Content:**
    ```js
    {
      msg: 'Banner not found'
    }
    ```

* **Sample Call**
  ```js
  axios({
    method: 'DELETE',
    url: `/banners/${id}`,
    headers: {
      access_token: token
    }
  })
  ```
----

**Fetch Cart**
----
Returns carts data that belongs to user

* **URL** <br />
  /carts

* **Method** <br />
  `GET`

* **Data Params**
  * **Headers**
    ```js
    access_token: 'string'
    ```

* **Success Response**
  * **Code:** 200
    **Content:**
    ```js
    [
      {
        id: integer,
        ProductId: integer,
        UserId: integer,
        quantity: integer,
        Product: {
          name: 'string',
          image_url: 'string',
          stock: integer,
          price: integer
        }
      },
      {
        ...
      }
    ]
    ```

* **Error Response**
  * **Code:** 401 <br />
    **Content:**
    ```js
    {
      msg: 'Authentication Failed'
    }
    ```
    
    OR
  
  * **Code:** 500 <br />
    **Content:**
    ```js
    {
      msg: 'Internal Server Error'
    }
    ```

* **Sample Call**
  ```js
  axios({
    method: 'GET',
    url: '/carts',
    headers: {
      access_token: token
    }
  })
  ```
----

**Fetch History**
----
Returns History of User

* **URL** <br/>
  /carts/history

* **Method** <br />
  `GET`

* **Data Params**
  * **Headers**
  ```js
  access_token: 'string'
  ```

* **Success Response**
  * **Code:** 200
    **Content:**
    ```js
    [
      {
        id: integer,
        ProductId: integer,
        UserId: integer,
        quantity: integer,
        Product: {
          name: 'string',
          image_url: 'string',
          stock: integer,
          price: integer
        }
      },
      {
        ...
      }
    ]
    ```

* **Error Response**
  * **Code:** 401 <br />
    **Content:**
    ```js
    {
      msg: 'Authentication Failed'
    }
    ```
    
    OR
  
  * **Code:** 500 <br />
    **Content:**
    ```js
    {
      msg: 'Internal Server Error'
    }
    ```

* **Sample Call**
  ```js
  axios({
    method: 'GET',
    url: '/carts/history',
    headers: {
      access_token: token
    }
  })
  ```
----

**Update Cart**
----

* **URL** <br />
  /carts

* **Method** <br />
  `POST`

* **Data Params** 
  * **Headers**
    ```js
    access_token: 'string'
    ```
  
  * **Data**
    ```js
    {
      ProductId: integer,
      quantity: integer
    }
    ```

* **Success Response**
  * **Code:** 201 OR 200 <br />
    **Content:**
    ```js
    {
      id: integer,
      ProductId: integer,
      UserId: integer,
      quantity: integer
    }
    ```

* **Error Response**
  * **Code:** 400 <br />
    **Content:**
    ```js
    {
      msg: 'Limit Reached'
    }
    OR
    {
      msg: 'Validation Errors'
    }
    ```
    OR
  * **Code:** 401 <br />
    **Content:**
    ```js
    {
      msg: 'Not Authorized'
    }
    OR
    {
      msg: 'Authentication Failed'
    }
    ```
  * **Code:** 500 <br />
    **Content**
    ```js
    {
      msg: 'Internal Server Error'
    }
    ```

* **Sample Call**
  ```js
  axios({
    method: 'POST',
    url: '/carts',
    headers: {
      access_token: token
    },
    data: {
      ProductId: id,
      quantity: 1
    }
  })
  ```
----

**Checkout**
----

* **URL** <br />
  /carts/checkout

* **Method** <br />
  `DELETE`

* **Data Params**
  * **Headers**
    ```js
    access_token: 'string'
    ```

* **Success Respone**
  * **Code:** 200 <br />
    **Content:**
    ```js
    {
      msg: 'Checked Out Successfully'
    }
    ```
  
* **Error Response**
  * **Code:** 401 <br />
    **Content**
    ```js
    {
      msg: 'Authentication Failed'
    }
    ```
    OR
  * **Code:** 400 <br />
    **Content:**
    ```js
    {
      msg: 'Checkout failed'
    }
    ```

* **Sample Call**
  ```js
  axios({
    method: 'DELETE',
    url: '/carts/checkout',
    headers: {
      access_token: token
    }
  })
  ```
----

**Delete Cart**
----
Remove Cart according to id

* **URL** <br />
  /carts/:id

* **Method** <br />
  `DELETE`

* **Data Params**
  * **Headers**
    ```js
    access_token: 'string'
    ```

* **Success Response**
  * **Code:** 200 <br />
    **Content**
    ```js
    {
      msg: 'Remove cart success'
    }
    ```

* **Error Response**
  * **Code:** 404 <br />
    **Content:**
    ```js
    {
      msg: 'Delete Cart Failed'
    }
    ```
    OR
  * **Code:** 401 <br />
    **Content**
    ```js
    {
      msg: 'Not Authorized'
    }
    OR
    {
      msg: 'Authentication Failed'
    }
    ```
    OR
  * **Code:** 500 <br />
    **Content:**
    ```js
    {
      msg: 'Internal Server Error'
    }
    ```

* **Sample Call**
  ```js
  axios({
    method: 'DELETE',
    url: `/carts/${id}`,
    headers: {
      access_token: token
    }
  })
  ```