# Task Management Application

A full-stack Task Management application built with a modern, premium UI. This project allows an administrator to log in, view employee tasks, add new tasks, toggle their completion status, and delete them.

## Features

- **Admin Authentication**: Simple hardcoded login system (`admin` / `admin123`).
- **CRUD Operations**: Full Create, Read, Update, and Delete capabilities for tasks.
- **Modern UI**: Clean, glassmorphism-inspired design with responsive layouts and smooth animations.
- **Cloud Database**: Integrated with PostgreSQL for robust data persistence.
- **Serverless Ready**: Configured for instant deployment to Vercel.

## Tech Stack

- **Frontend**: HTML5, Vanilla CSS3 (with CSS Variables), Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (using the `pg` package)
- **Hosting**: Vercel

## Local Development Setup

To run this project locally on your machine:

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed on your computer.
- A PostgreSQL database (e.g., [Neon.tech](https://neon.tech/), [Supabase](https://supabase.com/)).

### 2. Installation
Clone the repository and install the required dependencies:
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory of the project and add your PostgreSQL connection string:
```env
DATABASE_URL=postgres://user:password@hostname:5432/databasename
```

### 4. Running the App
Start the local Express server:
```bash
node server.js
```
The application will be available at `http://localhost:3000`. Navigate to `/login.html` to log in.

## Deployment to Vercel

This project is pre-configured with a `vercel.json` file for easy deployment to Vercel's serverless platform.

1. Push your code to a GitHub repository.
2. Go to the [Vercel Dashboard](https://vercel.com/dashboard) and create a new project by importing your repository.
3. In the Vercel setup screen, open the **Environment Variables** section.
4. Add your `DATABASE_URL`.
5. Click **Deploy**. Vercel will automatically route traffic and host the static files!
