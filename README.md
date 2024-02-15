# Project Fantasy Blacksmith

# Context
This is a CRUD project made with layered architecture, simulating a blacksmith store with: orders and products.

Along with the login route with validations, it's possible to: 
  - GET orders and products;
  - POST orders and products.

## Used technologies

Back-end:
> Developed using: Typescript, Docker, NodeJS, ExpressJS, MYSQL, Sequelize, JWT

Tests:

> Developed using: Chai, Sinon

## Installing Dependencies

> After cloning the project

```bash
cd fantasy-blacksmith
npm install
``` 
## Running the application with Docker

  > Create database and run migrations and seeders
  
  ```
  npm run db:reset
  ```
  > Run docker containers
  ```
  docker compose up -d --build
  ```
## Running tests

> Test
```
npm run test
```
> Coverage
```
npm run coverage
```
