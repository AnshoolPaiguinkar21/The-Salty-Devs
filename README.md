
-----

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

2.  **Set up the Backend Server:**

      * Navigate to the server directory:
        ```sh
        cd server
        ```
      * Install NPM packages:
        ```sh
        npm install
        ```
      * Create a `.env` file by copying the example:
        ```sh
        cp .env.example .env
        ```
      * Update the `DATABASE_URL` in your new `.env` file with your PostgreSQL connection string.
      * Run the Prisma migration to create the database tables:
        ```sh
        npx prisma migrate dev
        ```

3.  **Set up the Frontend Client:**

      * Navigate to the client directory from the root:
        ```sh
        cd client
        ```
      * Install NPM packages:
        ```sh
        npm install
        ```

### Running the Application

This project is set up to run both the client and server concurrently with a single command from the **root directory**.

1.  **Navigate to the root `the-salty-devs` folder.**
2.  **Install root dependencies (if you haven't already):**
    ```sh
    npm install
    ```
3.  **Run the development servers:**
    ```sh
    npm run dev
    ```
      * The Next.js client will be available at `http://localhost:3000`.
      * The Express.js server will be running at `http://localhost:3001`.

-----

## 📁 Project Structure

This project is a monorepo containing two separate packages:

  * `./client`: The Next.js frontend application. This is what the public sees and what the admin uses to manage content.
  * `./server`: The Node.js, Express, and Prisma backend. This serves the REST API that the client consumes.

-----

## 👥 Authors

  * **Frontend:** [Rhythm Naik](https://github.com/Rhythmstay4u)
  * **Backend:** [Anshool Paiguinkar](https://github.com/colleague-username)