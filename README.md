# MERN Authentication Dashboard

A portfolio-ready full-stack authentication application built with MongoDB, Express, React, Node.js and JWT.

## Features

- Register and login
- Secure bcrypt password hashing
- JWT-based protected API routes
- Persistent frontend session
- Protected React routes
- User dashboard
- Profile editing
- Centralized API error handling
- CORS configuration
- Environment-based configuration

## Stack

**Frontend:** React, Vite, React Router, Axios  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs

## API

| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| POST | `/api/v1/auth/register` | Register | No |
| POST | `/api/v1/auth/login` | Login | No |
| GET | `/api/v1/auth/me` | Current user | Yes |
| PATCH | `/api/v1/auth/me` | Update profile | Yes |
| GET | `/api/v1/health` | Health check | No |

## Run locally

Backend:
```bash
npm install
cp .env.example .env
npm run dev
```

Frontend:
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Backend defaults to port `5000`; Vite frontend defaults to `5173`.

## Project structure

```text
login-register/
├── controllers/
├── db/
├── errors/
├── middleware/
├── models/
├── routes/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   └── package.json
├── .env.example
├── package.json
└── server.js
```

## Author

**Andreas St** — MERN Stack / Full-Stack JavaScript Developer
