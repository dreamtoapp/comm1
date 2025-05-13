# Prisma Workflow Rules

## Schema Changes

After making any changes to the `prisma/schema.prisma` file, the following commands should be run in sequence to ensure the Prisma Client is updated and the changes are applied to the development database:

1.  **Generate Prisma Client:**
    ```bash
    npx prisma generate
    ```
    This command updates the Prisma Client (`@prisma/client`) based on the latest schema definitions.

2.  **Push Schema Changes to Database:**
    ```bash
    npx prisma db push
    ```
    This command synchronizes the database schema with the Prisma schema. It's suitable for development environments as it applies changes directly without creating migration files. For production, a migration-based workflow (`prisma migrate dev`, `prisma migrate deploy`) is typically preferred.

**Combined Command:**
These can be run together:
```bash
npx prisma generate && npx prisma db push
```

**Important Considerations:**
*   Ensure any running development servers (e.g., Next.js dev server) are stopped before running these commands, especially `prisma db push`, to avoid file locking issues or conflicts with database connections.
*   Review the output of `prisma db push` carefully to understand the changes being applied to the database.
*   For production environments, always use `prisma migrate` to create and apply migrations for better control and safety.
