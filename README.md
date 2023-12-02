# Advanced Inventory Management API

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Setup](#project-setup)

## Overview

Welcome to the Advanced Inventory Management API!

This project is a RESTful API service that allows product inventory management with additional complexity in data retrieval.

The service handles CRUD operations across products, sales and suppliers and provides an endpoint for a complex report that aggregates data in a specific way, such as calculating replenishment needs based on historical sales data.

## Features

This application includes the following features:

- CRUD for products
- CRUD for suppliers
- CRUD for sales
- Complex report with calculation replenishment needs based on historical sales data

## Project Setup

To get started with this project, follow these instructions:

1. Clone the repository:

git clone https://github.com/msalvatti/aima.git

2. Navigate to the project directory:

cd aima

3. Install dependencies:

npm install

4. Create the docker image for database - (Make sure you have the docker app installed and started)

npm run docker:create

5. Start the docker image of database - (Make sure you have the docker app installed and started)

npm run docker:start

6. Configure .env file:

Use the .env.example file to create .env file, fill the variables according the variables descriptions.

7. Create the database

npm run createdb

8. Create the migration

npm run migratedb

9. Populate the database

npm run seeddb

10. Build application:

npm run build

11. Run tests:

npm test

12. Run application:

npm run start

13. Use the postman collection

In the postman folder, the collection and environment was made available to test all endpoints through postman, just import the collection file and import the environment file into your postman to use it.