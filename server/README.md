# 🔧 The Salty Devs - Backend API

This is the **Express.js backend** for The Salty Devs blog application, providing a comprehensive REST API with TypeScript and Prisma ORM.

## 🚀 Tech Stack

- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **TypeScript** - Type safety and better developer experience
- **Prisma ORM** - Next-generation database toolkit
- **PostgreSQL** - Robust relational database
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing and security
- **express-validator** - Input validation middleware

## 🏗️ Project Structure

```
server/src/
├── 📁 api/                    # Feature-based API modules
│   ├── 📁 User/              # User management
│   │   ├── 📄 user.services.ts    # Business logic
│   │   ├── 📄 user.controller.ts  # Request handlers
│   │   └── 📄 user.routes.ts      # Route definitions
│   ├── 📁 Post/              # Blog post management
│   ├── 📁 Comments/          # Comment system
│   └── 📁 Category/          # Category management
├── 📁 routes/                # Main route aggregation
├── 📁 utils/                 # Shared utilities
├── 📁 middlewares/           # Custom middleware
├── 📄 app.ts                 # Express app configuration
└── 📄 server.ts              # Server entry point
```

## 🛠️ Development

### **Quick Start (Recommended)**

**From the root directory**, run:

```bash
# Set up the entire project (installs all dependencies, generates Prisma client)
npm run iall:safe

# Start both backend and frontend
npm run dev
```

The backend API will be available at [http://localhost:3001](http://localhost:3001)
The frontend will be available at [http://localhost:3000](http://localhost:3000)

### **Backend Only Development**

If you only want to work on the backend:

```bash
# From the root directory
npm run dev:server

# Or from the server directory
npm run dev
```

**Note:** Make sure you have set up your `.env` file and run database migrations before starting the server.

## 🔌 API Endpoints

### **Base URL:** `http://localhost:3001/api`

#### **👤 Users** (`/api/user`)

- `GET /api/user` - Get all users
- `GET /api/user/:id` - Get user by ID
- `POST /api/user` - Create new user
- `PUT /api/user/:id` - Update user
- `DELETE /api/user/:id` - Delete user
- `POST /api/user/signin` - User authentication

#### **📝 Posts** (`/api/posts`)

- `GET /api/posts` - Get all published posts
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

#### **💬 Comments** (`/api/comments`)

- `GET /api/comments` - Get all comments
- `GET /api/comments/:id` - Get comment by ID
- `POST /api/comments` - Create new comment
- `PUT /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Delete comment

#### **🏷️ Categories** (`/api/categories`)

- `GET /api/categories` - Get all categories with posts
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

## 🗄️ Database

### **Setup**

1. **Create PostgreSQL database**
2. **Set DATABASE_URL in .env file** (copy from .env.example)
3. **Run migrations:**
   ```bash
   cd server
   npx prisma migrate dev
   ```

**Note:** The Prisma client is automatically generated when you run `npm run iall` commands from the root directory, so you don't need to run `npx prisma generate` manually during initial setup.

### **Useful Commands**

```bash
npx prisma studio          # Open database GUI
npx prisma migrate reset    # Reset database
npx prisma db push         # Push schema changes
```

## 🔐 Authentication

The API uses **JWT (JSON Web Tokens)** for authentication:

1. **Sign in** via `POST /api/user/signin`
2. **Receive JWT token** in response
3. **Include token** in Authorization header: `Bearer <token>`
4. **Protected routes** validate the token

## 📚 Learn More

### **Project Resources:**

- [Main README](../README.md) - Full project documentation
- [Frontend](../client/README.md) - Next.js frontend

### **Technology Resources:**

- [Express.js Documentation](https://expressjs.com/) - Web framework
- [Prisma Documentation](https://www.prisma.io/docs) - Database toolkit
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) - Database
