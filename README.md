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
