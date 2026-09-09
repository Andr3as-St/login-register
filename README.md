# MERN Authentication Dashboard

A full-stack authentication project built as part of my MERN Stack portfolio. The application provides secure user registration and login, JWT authentication, protected API routes and profile management.

## Tech Stack

- **MongoDB** with Mongoose
- **Express.js** REST API
- **React** frontend
- **Node.js** runtime
- **JWT** authentication
- **bcryptjs** password hashing

## Features

- User registration
- Secure password hashing
- User login
- JWT token generation and authentication
- Protected routes
- User profile updates
- MongoDB persistence
- Centralized API error handling
- Environment-based configuration

## API

| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| POST | `/api/v1/auth/register` | Register a user | No |
| POST | `/api/v1/auth/login` | Log in | No |
| PATCH | `/api/v1/auth/updateUser` | Update user profile | Yes |

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Andr3as-St/login-register.git
cd login-register
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env` and provide your MongoDB connection string and JWT secret.

```bash
cp .env.example .env
```

### 4. Start the API

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

The API runs on `http://localhost:5000` by default.

## Environment Variables

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
JWT_LIFETIME=1d
PORT=5000
NODE_ENV=development
```

Never commit your real `.env` file or credentials to source control.

## Project Structure

```text
login-register/
├── controllers/
├── db/
├── errors/
├── middleware/
├── models/
├── routes/
├── .env.example
├── .gitignore
├── package.json
└── server.js
```

## Roadmap

- Modern React authentication UI
- User dashboard
- Improved validation
- Security middleware
- Automated API tests
- Deployment and live demo

## Author

**Andreas St**  
MERN Stack / Full-Stack JavaScript Developer

GitHub: https://github.com/Andr3as-St
