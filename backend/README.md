# The Digital Daily Backend

Backend setup for a Medium-like publishing platform built with Hono, Prisma, and Cloudflare Workers.

This project is designed for content workflows such as:
- account and profile management
- article creation, editing, and publishing
- post feeds and content discovery
- comments, reactions, and future moderation features

## Prerequisites

- Node.js 20+
- npm
- A Cloudflare account
- A database connection string compatible with Prisma

## Setup

Install dependencies:

```bash
npm install
```

Configure your database connection for local development and deployment. Use your Cloudflare environment or Wrangler configuration to provide `DATABASE_URL`.

If you change Wrangler bindings, regenerate the worker types:

```bash
npm run cf-typegen
```

## Development

Start the local worker runtime:

```bash
npm run dev
```

If your TypeScript types change after updating the worker config, run type generation again before restarting the app.

## Deployment

Deploy the worker to Cloudflare:

```bash
npm run deploy
```

## Project Notes

- The worker entry point is `src/index.ts`.
- `Hono` should be instantiated with the generated `CloudflareBindings` type when your worker bindings are in use.
- Prisma is configured for the PostgreSQL adapter pattern used by Prisma 7.
- Keep secrets out of the repository. Store production values in Cloudflare/Wrangler configuration instead.

## Typical Startup Flow

1. Install dependencies with `npm install`.
2. Set `DATABASE_URL` for your environment.
3. Run `npm run cf-typegen` if bindings changed.
4. Start local development with `npm run dev`.
5. Deploy with `npm run deploy` when ready.
