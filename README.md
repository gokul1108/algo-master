# AlgoMaster

A full-stack competitive programming platform built with **Next.js 16**, **Prisma**, and **Judge0** for real-time code execution. Practice coding problems, write solutions in multiple languages, and get instant feedback — all in the browser.

## Features

- **Interactive Code Editor** — Monaco-based editor with syntax highlighting for Python, JavaScript, and Java
- **Real-time Code Execution** — Solutions are evaluated via [Judge0](https://judge0.com) with batch test case submission
- **Problem Management** — Admin users can create problems with examples, test cases, code snippets, and editorial solutions
- **Authentication** — Powered by [Clerk](https://clerk.com) with role-based access (User / Admin)
- **Dark / Light Mode** — Theme toggle with `next-themes`
- **Dockerized** — One-command setup with Docker Compose (app + PostgreSQL)



## Getting Started

### Prerequisites

- Node.js 20+
- Docker & Docker Compose (for database, or a standalone PostgreSQL instance)
- A [Clerk](https://clerk.com) account (publishable + secret keys)
- A [Judge0](https://judge0.com) instance URL

### Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/algo_master

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

JUDGE0_API_URL=http://localhost:2358
```

### Run with Docker Compose

```bash
docker compose up -d
```

This starts the Next.js app on [http://localhost:3000](http://localhost:3000) and PostgreSQL on port 5432.

### Run Locally (without Docker)

```bash
# Install dependencies
npm install

# Start a local PostgreSQL (or use Docker for just the DB)
docker compose up db -d

# Generate Prisma client & run migrations
npx prisma generate
npx prisma migrate dev

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start development server           |
| `npm run build`   | Create production build            |
| `npm run start`   | Start production server            |
| `npm run lint`    | Run ESLint                         |

## License

This project is private and not licensed for redistribution.
