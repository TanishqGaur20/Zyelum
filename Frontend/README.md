# Business Application

A full-stack web application built with Next.js and Express.js.

## Admin Panel Access

The admin panel is accessible at http://localhost:3000/admin/testimonials

Note: This is a demonstration admin panel without authentication. In a production environment, proper authentication and authorization should be implemented.

## Overview

This project is a modern web application that demonstrates a scalable architecture using Next.js for the frontend and Express.js for the backend. It implements best practices for both development and deployment.

## Tech Stack

### Frontend

- Next.js
- TypeScript
- React Testing Library
- Jest

### Backend

- Express.js
- Node.js
- CORS
- dotenv

## Project Structure

````plaintext
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── styles/
│   │   ├── __tests__/
│   │   └── main.tsx
│   └── public/
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── server.js
├── .github/
│   └── workflows/
│       └── ci-cd.yml
└── package.json


## Running the Application
### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
````

2. Install dependencies:

```bash
npm install
```

3. Start the backend server:

```bash
npm run dev
```

The backend will be running on http://localhost:5000

### Frontend Setup

1. Open a new terminal and navigate to the project root

Navigate to frontend directory

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm run dev
```

The frontend will be accessible at http://localhost:3000

## Admin Panel Access

The admin panel is accessible at http://localhost:3000/admin

Note: This is a demonstration admin panel without authentication. In a production environment, proper authentication and authorization should be implemented.
