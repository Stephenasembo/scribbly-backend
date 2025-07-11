# Scribbly Backend

> Api backend service for a blogging platform with admin and user interfaces.

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Feature](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Authentication](#api-authentication)
- [Future Improvements](#future-improvements)
- [Related Repositories](#related-repositories)
- [Author](#author)
- [License](#license)

---

## Project Overview

Scribbly is a full stack blog application with a RESTful backend API service that serves two separate frontend clients:

- **Scribbly Client:** For general users to read posts and write and edit comments on posts.
- **Scribbly Admin:** For authors to create, edit, publish and delete posts and comments.

> This repository contains only the backend service.

### Current Status

- The API is still under development.
- The service is currently running **locally only.**

---

## Project Structure

```
scribbly-backend/
├── config/       # Authentication configurations
├── controllers/   # Route handlers
├── middleware/    # Authentication and resource  access authorization
├── prisma/        # Prisma migrations
├── routes/        # REST API endpoints
├── services/      # Data model queries
├── utils/         # Helper functions
├── app.js         # Express app setup
```

## Features

### Blog Posts

- **CRUD:** Admins can create, read, edit and delete posts.
- **Publish/Unpublish posts:** Admin can toggle post's published status.

### Comments

- **CRUD:** Both users and admins can create and edit their own comments. Only admins can delete users' comments.

### Users

- **Registration:** New users can be registered to the database.
- **Login:** Users are authenticated locally.
- **Roles:** Users are either regular users or admins.

### Authentication

- **JWT Authentication:** Authenticated users are given a jwt token on successful login or registration.
- **Protected routes:** Admin routes are protected by role based access authentication.

## Tech Stack

```
| Language    | JavaScript(ES6+) |
| Framework   | Expressjs        |
| ORM         | Prisma           |
| Database    | PostgreSQL       |
| Auth        | JWT + Passportjs |
```

## Getting Started

1. Clone the repo to your local machine.

```bash
git clone https://github.com/Stephenasembo/scribbly-backend.git
cd scribbly-backend
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables
   Create a .env file in the root of the project

```bash
touch .env
```

Provide environment variables for:

```
- DATABASE_URL      # PostgreSQL connection string.
- PORT              # Port for the server to run on.
- SALT              # Integer for hashing program(<10).
- SECRET            # JWT signature secret code.
- ADMIN_CODE        # Passcode for promotion of users to  admins
```

4. Apply migrations

```bash
npx prisma migrate dev --name init
```

5. Start the development server

```bash
npm run dev
```

## API Authentication

All protected routes require an `Authorization` header with a Bearer token for authorization:

```
Authorization: Bearer <your-jwt-token>
```

## Future Improvements

- Form input validation.
- Deploy API server.
- API documentation.
- Rate limiting.

## Related Repositories

These front end repositories are part of Scribbly project and will be added soon.

- [Scribbly Client](https://github.com/Stephenasembo/scribbly-client)
- [Scribbly Admin](https://github.com/Stephenasembo/scribbly-admin)

## Author

**Stephen Asembo**

## License

This project is licensed under the MIT License.
