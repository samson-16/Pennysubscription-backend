# Subscription Tracker API

Subscription Tracker is an Express-based REST API for managing user accounts and their recurring subscriptions. It uses MongoDB with Mongoose for persistence and JWT for authentication tokens.

## Features

- User registration with password hashing and JWT issuance
- Basic sign-in and sign-out endpoints (placeholders for future enhancements)
- Subscription model with validation for frequency, renewal dates, and categorisation
- Centralised error handling middleware for consistent API responses

## Prerequisites

- Node.js 22.x (LTS) and npm
- A MongoDB instance (Atlas or self-hosted)
- Whitelisted IP or VPN access if connecting to MongoDB Atlas

## Getting Started

1. Install dependdencies:
   ```bash
   npm install
   ```
2. Create an environment file based on `.env.development.local` and adjust the values as needed:
   ```bash
   cp .env.development.local .env.development.local
   ```
   Update the copied file with your secrets (see [Environment Variables](#environment-variables)).
3. Start the development server with hot reload:
   ```bash
   npm run dev
   ```
   The API is available at `http://localhost:5000` by default.

## Environment Variables

The app loads environment variables from `.env.<NODE_ENV>.local`. For development, populate `.env.development.local` with:
     |

> **MongoDB Atlas tip:** Ensure your machine's IP address is added to the Atlas Network Access allowlist, otherwise connections will fail with `MongooseServerSelectionError`.

## Project Structure

```text
app.js
config/
  env.js
controllers/
  auth.controller.js
middlewares/
  error.middleware.js
models/
  subscription.model.js
  user.model.js
routes/
  auth.routes.js
  subscription.routes.js
  user.routes.js
databse/
  mongodb.js
```

## Available Scripts

- `npm run dev` – start the API with nodemon for automatic restart on changes
- `npm start` – run the API once using Node

## API Overview

- `POST /api/v1/auth/sign-up` – create a new user account
- `POST /api/v1/auth/sign-in` – placeholder for user login
- `POST /api/v1/auth/sign-out` – placeholder for session termination
- `GET /api/v1/users` – fetch all users (stub response)
- `POST /api/v1/users` – create user (stub response)
- `GET /api/v1/users/:id` – fetch a user by id (stub response)
- `PUT /api/v1/users/:id` – update a user (stub response)
- `DELETE /api/v1/users/:id` – delete a user (stub response)
- `GET /api/v1/subscriptions` – list subscriptions (stub response)
- `GET /api/v1/subscriptions/:id` – get subscription details (stub response)
- `POST /api/v1/subscriptions` – create subscription (stub response)
- `PUT /api/v1/subscriptions` – update subscriptions (stub response)
- `DELETE /api/v1/subscriptions` – delete subscriptions (stub response)
- `GET /api/v1/subscriptions/user/:id` – get subscriptions for a user (stub response)
- `PUT /api/v1/subscriptions/:id/cancel` – cancel a subscription (stub response)

## Error Handling

All unhandled errors are processed by `middlewares/error.middleware.js`, which standardises responses for validation issues, duplicate keys, casting errors, and unexpected exceptions.

## Next Steps

- Implement full authentication flow (sign-in, sign-out) and secure protected routes
- Flesh out subscription controller logic and integrate with `Subscription` model
- Add unit/integration tests and CI linting
- Document detailed API schemas (OpenAPI/Swagger) once endpoints stabilise
