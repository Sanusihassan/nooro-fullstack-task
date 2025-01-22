# Nooro Fullstack Task Frontend

## Installation and Setup

This guide explains how to set up and run the full-stack application (frontend and API) using Docker Compose.

### Prerequisites

- Docker and Docker Compose installed on your system.


### Steps to Run the Application

1. **Clone the Repository**

   Clone the frontend repository:

   ```bash
   git clone git@github.com:Sanusihassan/nooro-fullstack-task.git nooro-fullstack-task

   cd nooro-fullstack-task
   ```

2. **Clone the API**

   Clone the API into the `api` directory:

   ```bash
   git clone git@github.com:Sanusihassan/nooro-fullstack-task-api.git api
   cd api/; npm i
   ```

3. **Update the API Endpoint**

   Update the API endpoint in the frontend `.env` file. Open or create a `.env.local` file in the root directory of the frontend and add the following line:

   ```env
   NEXT_PUBLIC_API_URL=your-prefered-endpoint
   ```

   ```

   Make sure to replace it with the local API URL (`http://localhost:4000`) to connect the frontend to the API.

4. **Start the Application**

   Start all services using Docker Compose:

   ```bash
   $ docker-compose up --build

   docker-compose exec api npx prisma generate
   docker-compose exec api npx prisma db push
   ```

   This will:
   - Build and start the Next.js frontend at [http://localhost:3000](http://localhost:3000).
   - Build and start the API at [http://localhost:4000](http://localhost:4000).
   - Set up the MySQL database.

5. **Apply Prisma Migrations**

   Access the `api` container and apply Prisma migrations:

   ```bash
   $ docker-compose exec api bash
   $ npx prisma db push
   ```

   If necessary, run migrations:

   ```bash
   $ npx prisma migrate dev
   ```

6. **Access the Application**

   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **API**: [http://localhost:4000](http://localhost:4000)

7. **Stop the Application**

   Stop all running services:

   ```bash
   $ docker-compose down
   ```

### Development and Production Modes

- Development: The `docker-compose.yml` uses hot-reloading for the frontend and API by default.
- Production: Update the `command` section for both `frontend` and `api` services to use the production start commands:

  ```yaml
  command: "npm start"
  ```

### Troubleshooting

- **Database Connection Issues**:
  - Ensure the MySQL container is running.
  - Verify credentials in the `docker-compose.yml` file.
- **Docker Compose Errors**:
  - Rebuild the containers if you encounter issues: `$ docker-compose up --build`.
- **Prisma Issues**:
  - Ensure the migrations are applied correctly: `$ npx prisma migrate dev`.

### Notes

- Use strong passwords for the database in production environments.
- Do not expose sensitive information (like `.env` files) in public repositories.