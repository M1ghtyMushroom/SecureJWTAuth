# Secure JWT Authentication API

This project is a backend API that implements JWT (JSON Web Token) authentication. It's built with Express.js, MongoDB, and Mongoose.

## Features

- User registration and login
- Secure password hashing with bcrypt
- JWT for user authentication
- Middleware for route protection and authorization

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Create your `config.env` file add your MongoDB connection string and JWT secret, like so:<br>
`DB=your_mongodb_uri`<br>
`JWT_SECRET=your_jwt_secret`<br>
`JWT_EXPIRES_IN=90d`<br>
`JWT_COOKIE_EXPIRES_IN=90`<br>
5. Run the application with `npm start`

## Usage

The main entry point of the application is `src/app.js`. This file sets up the Express application, mounts the `auth` router, and handles any unhandled routes.

- **Auth Router**: Defines the routes for user authentication. These routes use the `auth` controller and `auth` middleware.

- **Auth Controller**: Contains the logic for user registration and login. It uses the `User` model to interact with the MongoDB database.

- **Auth Middleware**: Used to protect routes. It checks if the request has a valid JWT and if the user associated with the JWT exists.

- **User Model**: Defines the schema for users and includes methods for password hashing and checking if a password has been changed after a JWT was issued.

Feel at liberty to examine the code and employ it as a starting point for your individual projects.

Wishing you an enjoyable coding experience! 🌟
