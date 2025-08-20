The Salty Devs salty-devs-readme
A personal blog and portfolio CMS, built from scratch on the sunny coast of Goa. 🌴

About The Project
This repository contains the source code for "The Salty Devs," a full-stack blog and portfolio platform. The project is built with a modern, decoupled architecture, featuring a Next.js frontend that consumes a custom REST API powered by Node.js and Express.

The goal is to create a performant, SEO-friendly, and easily manageable content platform.

🚀 Tech Stack
This project uses a modern, type-safe stack for both the client and the server.

Area

Technology

Frontend



Backend



🛠️ Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js (v18 or later)

npm

A running PostgreSQL database instance

Installation & Setup
Clone the repository:

git clone https://github.com/your-username/the-salty-devs.git
cd the-salty-devs

Set up the Backend Server:

Navigate to the server directory:

cd server

Install NPM packages:

npm install

Create a .env file by copying the example:

cp .env.example .env

Update the DATABASE_URL in your new .env file with your PostgreSQL connection string.

Run the Prisma migration to create the database tables:

npx prisma migrate dev

Set up the Frontend Client:

Navigate to the client directory from the root:

cd client

Install NPM packages:

npm install

Running the Application
This project is set up to run both the client and server concurrently with a single command from the root directory.

Navigate to the root the-salty-devs folder.

Install root dependencies (if you haven't already):

npm install

Run the development servers:

npm run dev

The Next.js client will be available at http://localhost:3000.

The Express.js server will be running at http://localhost:3001.

📁 Project Structure
This project is a monorepo containing two separate packages:

./client: The Next.js frontend application. This is what the public sees and what the admin uses to manage content.

./server: The Node.js, Express, and Prisma backend. This serves the REST API that the client consumes.

👥 Authors
Frontend: Your Name

Backend: Your Colleague's Name