# Storefront Backend Project

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
- supertest for routes testing

## Database

- databases should be created using the following command:

```sql
CREATE DATABASE storedev; -- For development
CREATE DATABASE storetest; -- For testing
```

- the users: postgres
- password: 6365
- host: localhost
- port: 5432 `database port`

## Creating the .env file

For testing purposes, you can create a .env file according to the following variables:

- POSTGRES_HOST=localhost `host of the backend`
- POSTGRES_DB=storedev `dev database`
- POSTGRES_DB_TEST=storetest `testing database`
- POSTGRES_USER=postgres `username database`
- POSTGRES_PASSWORD=password `database password`
- BCRYPT_PASSWORD=1The_2Super_3Dragon
- SALT_ROUNDS=15
- TOKEN_SECRET=HelloItsMe
- ENV=test `A variable to switch between dev and test database`
- PORT=3000 `the open port for the server`

## Scripts used in this project

1. prettier => format the code
2. lint => check the .ts files for errors
3. build => compile ts to js
4. test => compile and run jasmine tests
5. startdev => run the server on uncompiled TS
6. start => run the server on compiled JS

## Essential packages used in this project

The following commands and packages should be installed before running the project.

### Dev dependencies:

- npm i @types/bcrypt --save-dev
- npm i @types/db-migrate-base --save-dev
- npm i @types/express --save-dev
- npm i @types/jasmine --save-dev
- npm i @types/jsonwebtoken --save-dev
- npm i @types/pg --save-dev
- npm i @types/supertest --save-dev
- npm i @typescript-eslint/eslint-plugin --save-dev
- npm i @typescript-eslint/parser --save-dev
- npm i db-migrate-pg --save-dev
- npm i eslint --save-dev
- npm i eslint-config-prettier --save-dev
- npm i eslint-plugin-prettier --save-dev
- npm i jasmine --save-dev
- npm i jasmine-spec-reporter --save-dev
- npm i nodemon --save-dev
- npm i prettier --save-dev
- npm i supertest --save-dev
- npm i typescript --save-dev

### Project dependencies:

- npm i jsonwebtoken
- npm i express
- npm i pg
- npm i dotenv
- npm i body-parser
- npm i bcrypt
