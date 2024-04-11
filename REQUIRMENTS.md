# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

-   Index
    `get` /products
-   Show
    `get` /products/:id
-   Create [token required]
    `post` <JWT> token required

#### Users

-   Index
    /users `GET` <JWT> token required
-   Show
    /users/:id `GET` <JWT> token required
-   Create /users `post`
    /users `POST` <JWT> token required

#### Orders

-   Index
-   `get` '/orders' <JWT> token required
-   createProductOrder
-   `post`/orders/:id/products <JWT> token required
-   show order
-   `get` /orders/:id <JWT> token required

## Data Shapes

#### Product

-   id SERIAL PRIMARY KEY,
-   name VARCHAR(50) NOT NULL,
-   price INT NOT NULL

#### User

-   id (integr serial primary key)NOT NULL
-   firstName(varchar 50 letters) NOT NULL
-   lastName(varchar 50 letters) NOT NULL
-   password_digest VARCHAR(256) NOT NULL

#### Orders

-   id SERIAL PRIMARY KEY,
-   status VARCHAR(20),
-   user_id INT REFERENCES users(id)

#### OrdersProducts

-   id SERIAL PRIMARY KEY,
-   order_id bigint REFERENCES orders(id),
-   product_id bigint REFERENCES products(id),
-   quantity INT
