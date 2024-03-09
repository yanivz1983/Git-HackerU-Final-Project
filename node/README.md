# Node.js Server-Side README

## Overview

This Node.js server-side codebase manages users and cards for an online platform. Users can create accounts, log in, verify their email addresses, request new verification codes, reset passwords, and update their details. Additionally, the server handles card-related functionalities such as creation, retrieval, deletion, and user interactions with cards.

## Table of Contents

### User Routes

- [GET /users](#get-users)
- [POST /users](#post-users)
- [POST /users/request-new-code](#post-usersrequest-new-code)
- [POST /users/verify](#post-usersverify)
- [GET /users/:id](#get-usersid)
- [PATCH /users/:id](#patch-usersid)
- [DELETE /users/:id](#delete-usersid)
- [POST /users/login](#post-userslogin)
- [POST /users/forgot-password](#post-usersforgot-password)
- [POST /users/reset-password/:userId/:token](#post-usersreset-passworduseridtoken)
- [POST /users/contact-us](#post-userscontact-us)

### Card Routes

- [POST /cards](#post-cards)
- [GET /cards](#get-cards)
- [GET /cards/my-cards](#get-cardsmy-cards)
- [GET /cards/:id](#get-cardsid)
- [DELETE /cards/:id](#delete-cardsid)
- [PATCH /cards/:id](#patch-cardsid)
- [POST /cards/:id/add-to-cart](#post-cardsidadd-to-cart)
- [POST /cards/order-confirmation](#post-cardsorder-confirmation)

### Server Configuration

- [Middleware](#middleware)
- [Rate Limiting](#rate-limiting)
- [Running the Server](#running-the-server)

## User Routes

### GET /users

- **Description**: Retrieve all users.
- **Authorization**: Requires admin privileges.
- **Response**: Returns an array of user objects.

### POST /users

- **Description**: Create a new user.
- **Authorization**: Requires admin or user privileges.
- **Response**: Returns the created user with a success message.

### POST /users/request-new-code

- **Description**: Request a new verification code.
- **Authorization**: None required.
- **Response**: Returns a success message with the user ID.

### POST /users/verify

- **Description**: Verify a user's account.
- **Authorization**: None required.
- **Response**: Returns a success message with the user ID.

### GET /users/:id

- **Description**: Retrieve user details by ID.
- **Authorization**: Requires admin or user privileges.
- **Response**: Returns the user object.

### PATCH /users/:id

- **Description**: Update user details.
- **Authorization**: Requires admin privileges.
- **Response**: Returns the updated user.

### DELETE /users/:id

- **Description**: Delete a user.
- **Authorization**: Requires admin privileges.
- **Response**: Returns the deleted user.

### POST /users/login

- **Description**: User login.
- **Authorization**: None required.
- **Response**: Returns a JWT token on successful login.

### POST /users/forgot-password

- **Description**: Request a password reset link.
- **Authorization**: None required.
- **Response**: Returns a success message.

### POST /users/reset-password/:userId/:token

- **Description**: Reset user password.
- **Authorization**: None required.
- **Response**: Returns a success message.

### POST /users/contact-us

- **Description**: Submit a contact form.
- **Authorization**: None required.
- **Response**: Returns a success message.

## Card Routes

### POST /cards

- **Description**: Create a new card.
- **Authorization**: Requires admin or business user privileges.
- **Response**: Returns the created card.

### GET /cards

- **Description**: Retrieve all cards.
- **Authorization**: None required.
- **Response**: Returns an array of card objects.

### GET /cards/my-cards

- **Description**: Retrieve cards created by the authenticated user.
- **Authorization**: Requires admin or business user privileges.
- **Response**: Returns an array of card objects.

### GET /cards/:id

- **Description**: Retrieve card details by ID.
- **Authorization**: None required.
- **Response**: Returns the card object.

### DELETE /cards/:id

- **Description**: Delete a card.
- **Authorization**: Requires admin, business, or card owner privileges.
- **Response**: Returns the deleted card.

### PATCH /cards/:id

- **Description**: Update card details.
- **Authorization**: Requires admin, business, or card owner privileges.
- **Response**: Returns the updated card.

### POST /cards/:id/add-to-cart

- **Description**: Add a card to the user's cart.
- **Authorization**: Requires user privileges.
- **Response**: Returns a success message with the updated card.

### POST /cards/order-confirmation

- **Description**: Send order confirmation email.
- **Authorization**: None required.
- **Response**: Returns a success message.

## Server Configuration

### Middleware

- **Logger**: Utilizes a logging system for tracking server activities.
- **Validation**: Employs Joi for request body validation.
- **Authentication**: Validates user tokens for authorized access.
- **File Upload**: Handles file uploads using Multer.

### Rate Limiting

- **Window**: 24 hours.
- **Max Requests**: 5000.
- **Message**: "Too many requests from this IP, please try again later."

### Running the Server

1. Install dependencies: `npm install`.
2. Set environment variables using a `.env` file.
3. Start the server: `npm start`.
4. Access the server at [http://localhost:8080](http://localhost:8080).

Feel free to explore and contribute to the codebase!
