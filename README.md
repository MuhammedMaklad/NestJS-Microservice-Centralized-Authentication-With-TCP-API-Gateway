# NestJS Microservice with Centralized Authentication

This project is a monorepo that demonstrates a microservice architecture using NestJS. It features a centralized authentication service, an API gateway, and a user service, all communicating via TCP.

## Features

-   **Microservice Architecture:** The application is split into separate services for authentication, user management, and a gateway.
-   **Centralized Authentication:** A dedicated `auth` service handles user authentication and token validation.
-   **API Gateway:** A single entry point (`gateway`) for all client requests, routing them to the appropriate microservice.
-   **TCP Communication:** Microservices communicate with each other using TCP for high performance.
-   **Database:** Uses PostgreSQL with Prisma for object-relational mapping.
-   **Containerized:** The entire application is containerized using Docker and can be orchestrated with Docker Compose.

## Technologies Used

-   [NestJS](https://nestjs.com/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Docker](https://www.docker.com/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [Prisma](https://www.prisma.io/)
-   [JWT (JSON Web Tokens)](https://jwt.io/) for authentication

## Architecture Overview

The application consists of three main services:

1.  **API Gateway (`gateway`):**
    -   The public-facing entry point for all incoming HTTP requests.
    -   Listens on port `3001`.
    -   Responsible for request validation and forwarding requests to the appropriate downstream services (`auth` or `user`).
    -   It includes an `AuthGuard` that intercepts requests to protected routes, extracts the JWT from the `Authorization` header, and validates it by communicating with the `auth` service.

2.  **Authentication Service (`auth`):**
    -   A TCP microservice responsible for all authentication-related logic.
    -   Listens on port `4000`.
    -   Handles user registration, login (issuing JWTs), and token validation.

3.  **User Service (`user`):**
    -   A TCP microservice for managing user data.
    -   Listens on port `4001`.
    -   Handles CRUD (Create, Read, Update, Delete) operations for users.

All services are connected on the same Docker network (`app-network`) and communicate with each other via TCP.

## Getting Started

### Prerequisites

-   [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine.
-   A `.env` file in the root directory with the necessary environment variables (e.g., for the database connection).

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd NestJS-Microservice-Centralized-Authentication-With-TCP-API-Gateway
    ```

### Running the Application

You can run the entire application using Docker Compose:

```bash
docker-compose up -d
```

This command will build the images for each service and start the containers in detached mode.

The following services will be available:

-   **API Gateway:** `http://localhost:3001`
-   **User Service:** `http://localhost:3002` (primarily for internal or direct service-to-service communication if needed)
-   **PostgreSQL Database:** `localhost:5432`

## Project Structure

```
.
├── apps
│   ├── auth          # Authentication microservice
│   ├── gateway       # API Gateway
│   └── user          # User management microservice
├── libs
│   ├── database      # Shared Prisma schema and database library
│   └── shared        # Shared DTOs, entities, and interfaces
├── docker-compose.yml
└── package.json
```

## API Endpoints

The main API is exposed through the **API Gateway**. While the exact endpoints are defined in the controllers, here is a general overview:

-   `POST /auth/register`: Register a new user.
-   `POST /auth/login`: Log in and receive a JWT.
-   `GET /users`: Get a list of users (protected route).
-   `GET /users/:id`: Get a single user by ID (protected route).

To access protected routes, you must include a valid JWT in the `Authorization` header:

```
Authorization: Bearer <your-jwt>
```
