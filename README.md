# The Salty Devs - A Blog WebApp

A personal blog and portfolio CMS, built from scratch on the sunny coast of Goa. 🌴

## About The Project

This repository contains the source code for "The Salty Devs," a full-stack blog and portfolio platform. The project is built with a modern, decoupled architecture, featuring a Next.js frontend that consumes a custom REST API powered by Node.js and Express.

The goal is to create a performant, SEO-friendly, and easily manageable content platform.

---

## 🚀 Tech Stack

This project uses a modern, type-safe stack for both the client and the server.

| **Area**     | **Technology**        | **Purpose**                                         |
| :----------- | :-------------------- | :-------------------------------------------------- |
| **Frontend** | Next.js 15 + React 19 | Server-side rendering, routing, and React framework |
|              | TypeScript            | Type safety and better developer experience         |
|              | Tailwind CSS          | Utility-first CSS framework for styling             |
|              | Shadcn/UI + Radix UI  | Modern, accessible UI components                    |
|              | Lucide React          | Beautiful, customizable icons                       |
| **Backend**  | Node.js + Express.js  | Server runtime and web framework                    |
|              | TypeScript            | Type safety across the entire stack                 |
|              | Prisma ORM            | Database toolkit and query builder                  |
|              | PostgreSQL            | Relational database for data persistence            |
|              | JWT + bcrypt          | Authentication and password security                |
| **DevTools** | ESLint                | Code linting and formatting                         |
|              | Concurrently          | Run multiple npm scripts simultaneously             |
|              | npm-check-updates     | Keep dependencies up to date                        |

---

## 🛠️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm
- A running PostgreSQL database instance

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

    **🟢 Recommended (Safe Updates):**

    ```sh
    npm run iall:safe
    ```

    **🔍 Check Updates First (Recommended):**

    ```sh
    npm run check:updates  # See what would be updated
    npm run iall:safe      # Apply safe updates (minor/patch only)
    ```

    **⚠️ All Available Update Options:**

    ```sh
    npm run iall:patch     # Safest - patch updates only (bug fixes)
    npm run iall:safe      # Safe - minor + patch updates (new features, no breaking changes)
    npm run iall           # Risky - all updates including major (can break project)
    npm run check:updates  # Check only - shows available updates without installing
    ```

    These commands will:

    - Update packages to latest compatible versions
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

---

## 📁 Project Structure

This project is a monorepo containing two separate packages:

```
The-Salty-Devs/
├── 📁 client/                    # Next.js Frontend Application
│   ├── 📁 src/
│   │   ├── 📁 app/              # App Router pages (Next.js 13+)
│   │   │   ├── 📄 layout.tsx    # Root layout component
│   │   │   ├── 📄 page.tsx      # Home page
│   │   │   ├── 📁 about/        # About page
│   │   │   ├── 📁 articles/     # Articles listing page
│   │   │   └── 📁 categories/   # Categories page
│   │   ├── 📁 components/       # Reusable UI components
│   │   │   ├── 📁 ui/           # Shadcn/UI components
│   │   │   ├── 📁 header/       # Navigation header
│   │   │   └── 📁 footer/       # Footer component
│   │   ├── 📁 lib/              # Utility functions
│   │   └── 📁 styles/           # Global CSS styles
│   ├── 📄 package.json          # Client dependencies
│   ├── 📄 tailwind.config.js    # Tailwind CSS configuration
│   └── 📄 next.config.ts        # Next.js configuration
├── 📁 server/                    # Express.js Backend API
│   ├── 📁 src/
│   │   ├── 📁 api/              # Feature-based API modules
│   │   │   ├── 📁 User/         # User management (CRUD + Auth)
│   │   │   ├── 📁 Post/         # Blog post management
│   │   │   ├── 📁 Comments/     # Comment system
│   │   │   └── 📁 Category/     # Category management
│   │   ├── 📁 routes/           # API route definitions
│   │   ├── 📁 utils/            # Shared utilities & middleware
│   │   ├── 📄 app.ts            # Express app configuration
│   │   └── 📄 server.ts         # Server entry point
│   ├── 📁 prisma/               # Database configuration
│   │   ├── 📄 schema.prisma     # Database schema definition
│   │   └── 📁 migrations/       # Database migration files
│   └── 📄 package.json          # Server dependencies
├── 📄 package.json               # Root package with scripts
└── 📄 README.md                  # This file
```

### **Architecture Overview:**

- **🎨 Frontend**: Next.js with App Router, TypeScript, and Tailwind CSS
- **🔧 Backend**: Express.js REST API with TypeScript and Prisma ORM
- **🗄️ Database**: PostgreSQL with Prisma for type-safe database access
- **🔐 Authentication**: JWT-based auth with bcrypt password hashing

---

## � API Documentation

The backend provides a comprehensive REST API for managing blog content. All endpoints return JSON responses.

### **Base URL**

```
http://localhost:3001/api
```

### **Available Endpoints**

#### **👤 Users** (`/api/user`)

| Method   | Endpoint           | Description         | Auth Required |
| -------- | ------------------ | ------------------- | ------------- |
| `GET`    | `/api/user`        | Get all users       | ❌            |
| `GET`    | `/api/user/:id`    | Get user by ID      | ❌            |
| `POST`   | `/api/user`        | Create new user     | ❌            |
| `PUT`    | `/api/user/:id`    | Update user         | ✅            |
| `DELETE` | `/api/user/:id`    | Delete user         | ✅            |
| `POST`   | `/api/user/signin` | User authentication | ❌            |

#### **📝 Posts** (`/api/posts`)

| Method   | Endpoint         | Description             | Auth Required |
| -------- | ---------------- | ----------------------- | ------------- |
| `GET`    | `/api/posts`     | Get all published posts | ❌            |
| `GET`    | `/api/posts/:id` | Get post by ID          | ❌            |
| `POST`   | `/api/posts`     | Create new post         | ✅            |
| `PUT`    | `/api/posts/:id` | Update post             | ✅            |
| `DELETE` | `/api/posts/:id` | Delete post             | ✅            |

#### **💬 Comments** (`/api/comments`)

| Method   | Endpoint            | Description        | Auth Required |
| -------- | ------------------- | ------------------ | ------------- |
| `GET`    | `/api/comments`     | Get all comments   | ❌            |
| `GET`    | `/api/comments/:id` | Get comment by ID  | ❌            |
| `POST`   | `/api/comments`     | Create new comment | ✅            |
| `PUT`    | `/api/comments/:id` | Update comment     | ✅            |
| `DELETE` | `/api/comments/:id` | Delete comment     | ✅            |

#### **🏷️ Categories** (`/api/categories`)

| Method   | Endpoint              | Description                   | Auth Required |
| -------- | --------------------- | ----------------------------- | ------------- |
| `GET`    | `/api/categories`     | Get all categories with posts | ❌            |
| `GET`    | `/api/categories/:id` | Get category by ID            | ❌            |
| `POST`   | `/api/categories`     | Create new category           | ✅            |
| `PUT`    | `/api/categories/:id` | Update category               | ✅            |
| `DELETE` | `/api/categories/:id` | Delete category               | ✅            |

### **Database Schema**

The application uses the following data models:

```typescript
// User Model
User {
  id: string (UUID)
  email: string (unique)
  password: string (hashed)
  name: string?
  role: Role (ADMIN | USER)
  bio: string?
  createdAt: DateTime
  updatedAt: DateTime
  posts: Post[]
  comments: Comment[]
}

// Post Model
Post {
  id: string (UUID)
  title: string
  content: string?
  published: boolean
  author: User
  authorId: string
  createdAt: DateTime
  updatedAt: DateTime
  publishedAt: DateTime?
  imageURL: string?
  views: number
  comments: Comment[]
  category: Category[]
}

// Comment Model
Comment {
  id: string (UUID)
  content: string
  createdAt: DateTime
  editedAt: DateTime
  author: User
  authorId: string
  post: Post
  postId: string
}

// Category Model
Category {
  id: string (UUID)
  name: string
  posts: Post[]
}
```

---

## 🚀 Development Scripts

| Script           | Command                  | Description                                      |
| ---------------- | ------------------------ | ------------------------------------------------ |
| **Development**  | `npm run dev`            | Start both client and server in development mode |
|                  | `npm run dev:client`     | Start only the Next.js client                    |
|                  | `npm run dev:server`     | Start only the Express server                    |
| **Installation** | `npm run check:updates`  | Check for available package updates              |
|                  | `npm run iall:patch`     | Install patch updates only (safest)              |
|                  | `npm run iall:safe`      | Install minor + patch updates (recommended)      |
|                  | `npm run iall`           | Install all updates including major (risky)      |
| **Database**     | `npx prisma migrate dev` | Run database migrations                          |
|                  | `npx prisma studio`      | Open Prisma Studio (database GUI)                |
|                  | `npx prisma generate`    | Generate Prisma client                           |

---

## �👥 Authors

- **Frontend Developer:** [Rhythm Naik](https://github.com/Rhythmstay4u)
- **Backend Developer:** [Anshool Paiguinkar](https://github.com/AnshoolPaiguinkar21)

---

## 🤝 Contributing

### **Development Workflow**

1. **Clone the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Install dependencies**: `npm run iall:safe`
4. **Start development**: `npm run dev`
5. **Make your changes**
6. **Test thoroughly**
7. **Commit and push**
8. **Create a Pull Request**

### **Code Standards**

- ✅ **TypeScript** - All code must be type-safe
- ✅ **ESLint** - Follow linting rules
- ✅ **Consistent naming** - Use camelCase for variables, PascalCase for components
- ✅ **Comments** - Document complex logic
- ✅ **Git commits** - Use conventional commit messages

### **Before Committing**

```bash
# Check for updates safely
npm run check:updates

# Apply safe updates if needed
npm run iall:safe

# Test the application
npm run dev
```

---

## 📄 License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Mentor** - For providing the tech stack and guidance
- **AI Assistance** - For project ideation and problem-solving
- **Open Source Community** - For the amazing tools and libraries

---

**Built with ❤️ on the sunny coast of Goa 🌴**
