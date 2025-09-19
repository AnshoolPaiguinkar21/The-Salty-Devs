# 🎨 The Salty Devs - Frontend

This is the **Next.js frontend** for The Salty Devs blog application, built with modern React patterns and TypeScript.

## 🚀 Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Modern, accessible UI components
- **Radix UI** - Headless UI primitives
- **Lucide React** - Beautiful icon library
- **next-themes** - Dark/light mode support

## 🏗️ Project Structure

```
client/src/
├── 📁 app/                    # Next.js App Router
│   ├── 📄 layout.tsx         # Root layout with providers
│   ├── 📄 page.tsx           # Home page
│   ├── 📁 about/             # About page
│   ├── 📁 articles/          # Articles listing
│   └── 📁 categories/        # Categories page
├── 📁 components/            # Reusable components
│   ├── 📁 ui/               # Shadcn/UI components
│   ├── 📁 header/           # Navigation header
│   └── 📁 footer/           # Footer component
├── 📁 lib/                  # Utility functions
└── 📁 styles/               # Global CSS
```

## 🛠️ Development

### **Quick Start (Recommended)**

**From the root directory**, run:

```bash
# Set up the entire project (installs all dependencies, generates Prisma client)
npm run iall:safe

# Start both frontend and backend
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000)
The backend API will be available at [http://localhost:4000](http://localhost:4000)

### **Frontend Only Development**

If you only want to work on the frontend:

```bash
# From the root directory
npm run dev:client

# Or from the client directory
npm run dev
```

**Note:** The frontend requires the backend API to be running for full functionality. Use the complete setup above for the best development experience.

## 🎨 UI Components

This project uses **Shadcn/UI** components built on top of **Radix UI**. Components are:

- ✅ **Accessible** - ARIA compliant and keyboard navigable
- 🎨 **Customizable** - Easy to theme and modify
- 📱 **Responsive** - Mobile-first design approach
- 🌙 **Dark Mode** - Built-in theme switching

## 📱 Features

### **🧭 Navigation**

- **Responsive Header** - Adapts to all screen sizes (mobile to 4K)
- **Mobile Menu** - Hamburger menu with slide-out navigation
- **Dark Mode Toggle** - Available in both desktop and mobile views
- **Smooth Animations** - Tailwind CSS animations for better UX

### **🎨 Design System**

- **Consistent Spacing** - Responsive padding and margins
- **Typography Scale** - Scales from mobile to desktop seamlessly
- **Color Themes** - Light and dark mode support
- **Component Library** - Reusable UI components

### **⚡ Performance**

- **Next.js 15** - Latest performance optimizations
- **App Router** - Faster navigation and better SEO
- **TypeScript** - Compile-time error checking
- **Turbopack** - Ultra-fast bundler for development

## 🔗 API Integration

The frontend consumes the Express.js backend API:

```typescript
// Example API calls (to be implemented)
const API_BASE = 'http://localhost:4000/api';

// Fetch posts
const posts = await fetch(`${API_BASE}/posts`);

// Fetch categories
const categories = await fetch(`${API_BASE}/categories`);
```

## 📚 Learn More

### **Project Resources:**

- [Main README](../README.md) - Full project documentation
- [Backend API](../server/README.md) - API documentation

### **Technology Resources:**

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS
- [Shadcn/UI](https://ui.shadcn.com/) - Component library
- [Radix UI](https://www.radix-ui.com/) - Headless UI primitives
