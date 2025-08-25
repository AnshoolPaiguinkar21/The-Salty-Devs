
# The Salty Devs

A personal blog and portfolio CMS, built from scratch on the sunny coast of Goa. 🌴

## About The Project

This repository contains the source code for "The Salty Devs," a full-stack blog and portfolio platform. The project is built with a modern, decoupled architecture, featuring a Next.js frontend that consumes a custom REST API powered by Node.js and Express.

The goal is to create a performant, SEO-friendly, and easily manageable content platform.

-----

## 🚀 Tech Stack

This project uses a modern, type-safe stack for both the client and the server.

| Area      | Technology                                                                                                                                      |
| :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** |     |
| **Backend** |     |

-----

## 🛠️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

  * Node.js (v18 or later)
  * npm
  * A running PostgreSQL database instance

### Installation & Setup

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/the-salty-devs.git
    cd the-salty-devs
    ```

2.  **Install root dependencies:**
    ```sh
    npm install
    ```

3.  **Install all project dependencies and generate Prisma client:**
    ```sh
    npm run iall
    ```
    This command will:
    - Install server dependencies
    - Install client dependencies
    - Generate the Prisma client for database access

4.  **Set up environment variables:**
    - Navigate to the server directory and create a `.env` file:
      ```sh
      cd server
      cp .env.example .env
      ```
    - Update the `DATABASE_URL` in your `.env` file with your PostgreSQL connection string
    - Run Prisma migration to create database tables:
      ```sh
      npx prisma migrate dev
      cd ..
      ```

### Running the Application

From the **root directory**, run:

```sh
npm run dev
```

This will start both the client and server concurrently:
- **Next.js client**: `http://localhost:3000`
- **Express.js server**: `http://localhost:3001`

-----

## 📁 Project Structure

This project is a monorepo containing two separate packages:

  * `./client`: The Next.js frontend application. This is what the public sees and what the admin uses to manage content.
  * `./server`: The Node.js, Express, and Prisma backend. This serves the REST API that the client consumes.

-----

## 👥 Authors

  * **Frontend:** [Rhythm Naik](https://github.com/Rhythmstay4u)
  * **Backend:** [Anshool Paiguinkar](https://github.com/AnshoolPaiguinkar21)