# Pettech API

A REST API for a pet shop, built to practice Node.js with TypeScript. It manages users, people, addresses, categories and products, with JWT authentication.

## Tech Stack

- **Node.js** + **TypeScript**
- **Fastify** — HTTP server
- **PostgreSQL** — accessed with the `pg` driver (raw SQL) and with **TypeORM**
- **Zod** — validation of environment variables and request data
- **@fastify/jwt** + **bcryptjs** — authentication and password hashing
- **ESLint** + **Prettier** — code style

## Architecture

The project follows a layered structure:

```
src/
├── http/
│   ├── controllers/   # routes and input validation (Zod)
│   └── middlewares/   # JWT validation
├── use-cases/         # business rules
│   ├── factory/       # build each use case with its repository
│   └── errors/        # domain errors
├── repositories/      # data access interfaces
│   ├── pg/            # raw SQL implementations (user, person, address)
│   └── typeorm/       # TypeORM implementations (product, category)
├── entities/          # domain entities and interfaces
├── lib/               # database connections (pg and TypeORM) and migrations
└── env/               # environment variable loading and validation
```

Controllers depend only on the repository interfaces, so changing how the database is accessed does not affect the business rules.

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Create the environment file and fill in the values
cp .env.example .env

# 3. Run the migrations
npm run migrate

# 4. Start the server in development mode
npm run start:dev
```

The server runs at `http://localhost:3000` (or on the port set in `PORT`).

> The `user`, `person` and `address` tables are accessed via raw SQL and must exist in the database before using those routes.

### Environment Variables

| Variable            | Description                                                    |
| ------------------- | -------------------------------------------------------------- |
| `PORT`              | Server port (default: `3000`)                                  |
| `NODE_ENV`          | `development`, `production` or `test` (default: `development`) |
| `DATABASE_HOST`     | PostgreSQL host                                                |
| `DATABASE_PORT`     | PostgreSQL port                                                |
| `DATABASE_USER`     | Database user                                                  |
| `DATABASE_PASSWORD` | Database password                                              |
| `DATABASE_NAME`     | Database name                                                  |
| `JWT_SECRET`        | Key used to sign JWT tokens                                    |

If any required variable is missing or invalid, the server will not start.

### Scripts

| Command             | Description                                 |
| ------------------- | ------------------------------------------- |
| `npm run start:dev` | Development server (watch mode)             |
| `npm run build`     | Builds the project into `build/`            |
| `npm start`         | Runs the production build                   |
| `npm run migrate`   | Runs the TypeORM migrations                 |

## Authentication

All routes require a JWT token, except user registration and sign-in.

1. Create a user with `POST /user`
2. Sign in with `POST /user/signin` to get the token
3. Send the token in all other requests:

```
Authorization: Bearer <token>
```

The token expires after 10 minutes.

## Routes

### User

| Method | Route          | Auth | Description                              |
| ------ | -------------- | :--: | ---------------------------------------- |
| POST   | `/user`        |  —   | Creates a user                           |
| POST   | `/user/signin` |  —   | Signs in and returns the token           |
| GET    | `/user/:id`    |  ✔   | Gets a user and their person data        |

```json
// POST /user  and  POST /user/signin
{ "username": "joao", "password": "mypassword" }
```

### Person

| Method | Route     | Auth | Description       |
| ------ | --------- | :--: | ----------------- |
| POST   | `/person` |  ✔   | Creates a person  |

```json
{
  "cpf": "12345678900",
  "name": "João Silva",
  "birth": "1990-05-20",
  "email": "joao@email.com",
  "user_id": 1
}
```

### Address

| Method | Route                                        | Auth | Description                         |
| ------ | -------------------------------------------- | :--: | ----------------------------------- |
| POST   | `/address`                                   |  ✔   | Creates an address                  |
| GET    | `/address/person/:personId?page=1&limit=10`  |  ✔   | Lists a person's addresses          |

```json
{
  "street": "Rua das Flores, 123",
  "city": "São Paulo",
  "state": "SP",
  "zip_code": "01000-000",
  "person_id": 1
}
```

### Category

| Method | Route       | Auth | Description         |
| ------ | ----------- | :--: | ------------------- |
| POST   | `/category` |  ✔   | Creates a category  |

```json
{ "name": "Pet Food" }
```

### Product

| Method | Route                         | Auth | Description                   |
| ------ | ----------------------------- | :--: | ----------------------------- |
| GET    | `/product?page=1&limit=10`    |  ✔   | Lists products (paginated)    |
| GET    | `/product/:id`                |  ✔   | Gets a product                |
| POST   | `/product`                    |  ✔   | Creates a product             |
| PUT    | `/product/:id`                |  ✔   | Updates a product             |
| DELETE | `/product/:id`                |  ✔   | Deletes a product             |

```json
// POST /product  and  PUT /product/:id
{
  "name": "Premium Dog Food 10kg",
  "description": "Food for adult dogs",
  "image_url": "https://example.com/dog-food.jpg",
  "price": 189.9,
  "categories": [{ "id": 1, "name": "Pet Food" }]
}
```

## Author

Raphael De Santi
