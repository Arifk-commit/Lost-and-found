# Lost & Found - Modern MERN Stack Application

A modern, full-stack web application built with the MERN stack to help people report and track lost and found items in their area. This platform serves as a central hub to reunite lost items with their rightful owners.

[![CI/CD](https://github.com/yourusername/Lost-Found-MERN/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/yourusername/Lost-Found-MERN/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🎥 Demo

[Loom Video Walkthrough](https://www.loom.com/share/a8fa5a98a3364a7c970ae5b78e8240c1)

## ✨ Features

- **🔐 Secure Authentication:** JWT-based authentication with bcrypt password hashing
- **📝 Item Reporting:** Report lost or found items with detailed descriptions and images
- **🔍 Smart Search:** Search items by keywords, category, or location
- **👤 User Profiles:** Manage your listings and track item status
- **📸 Image Uploads:** Cloud-based image storage with Cloudinary
- **📱 Responsive Design:** Fully responsive UI that works on all devices
- **⚡ Real-time Updates:** Optimistic UI updates with React Query
- **🔒 Security-First:** Rate limiting, input sanitization, and security headers

## 🚀 Modern Tech Stack

### Frontend
- **React 18** - Latest React with concurrent features
- **Vite** - Lightning-fast build tool (10x faster than CRA)
- **TanStack Query v5** - Powerful data synchronization
- **Material-UI v6** - Modern component library
- **React Router v7** - Client-side routing
- **Formik + Yup** - Form handling and validation
- **Vitest** - Fast unit testing

### Backend
- **Node.js + Express** - Server framework
- **MongoDB + Mongoose** - NoSQL database
- **Pino** - High-performance structured logging
- **Helmet** - Security middleware
- **Zod** - Runtime type validation
- **JWT** - Secure authentication
- **Jest** - Backend testing

### DevOps
- **npm scripts** - Automated workflow
- **ESLint + Prettier** - Code quality tools

## 📋 Prerequisites

- **Node.js** v18 or higher - [Download](https://nodejs.org/)
- **npm** v9 or higher (comes with Node.js)
- **MongoDB** v7 or higher - [Download](https://www.mongodb.com/) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Docker** (optional) - [Download](https://www.docker.com/)

## 🛠️ Quick Start

### Option 1: Automated Setup (Recommended)

**Windows:**
```powershell
.\install.ps1
```

**Linux/Mac:**
```bash
chmod +x install.sh && ./install.sh
```

### Option 2: Manual Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/KcMelek/Lost-Found-MERN.git
   cd Lost-Found-MERN
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Configure environment variables**

   Create `.env` files in both `server` and `client` directories:

   **server/.env:**
   ```env
   NODE_ENV=development
   PORT=4000
   DB=mongodb://localhost:27017/lostfound
   CLIENT_URL=http://localhost:3000
   JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
   JWT_EXPIRE=7d
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   LOG_LEVEL=debug
   ```

   **client/.env:**
   ```env
   VITE_API_URL=http://localhost:4000
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

   The app will be available at:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:4000

### Option 3: Docker

**Development:**
```bash
docker-compose -f docker-compose.dev.yml up
```

**Production:**
```bash
docker-compose up -d
```

## 📚 Documentation

- [Architecture Overview](./ARCHITECTURE.md)
- [Setup Guide](./SETUP.md)
- [Quick Start](./QUICKSTART.md)
- [Changelog](./CHANGELOG.md)

## 🧪 Testing

```bash
# Run all tests
npm test

# Frontend tests
cd client && npm test

# Backend tests
cd server && npm test

# Coverage report
npm run test:coverage
```

## 🎨 Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## 📦 Build for Production

```bash
# Build client
cd client && npm run build

# The build output will be in client/build directory
```

## 🚢 Deployment

1. Build frontend:
   ```bash
   cd client && npm run build
   ```

2. Serve with any static hosting (Netlify, Vercel, etc.)

3. Start backend on your server:
   ```bash
   cd server && npm start
   ```

## 🔧 Available Scripts

### Root
- `npm run install-all` - Install all dependencies
- `npm run dev` - Start both client and server in development mode
- `npm run client` - Start only the client
- `npm run server` - Start only the server
- `npm run build` - Build client for production

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Lint code
- `npm run format` - Format code

### Server
- `npm run dev` - Start with nodemon
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Lint code
- `npm run format` - Format code

## 🏗️ Project Structure

```
lost-found-mern/
├── client/              # React frontend (Vite)
│   ├── src/
│   │   ├── Components/  # React components
│   │   ├── lib/        # Utilities (axios, react-query)
│   │   └── test/       # Test setup
│   └── vite.config.js
├── server/              # Express backend
│   ├── config/         # Configuration
│   ├── controllers/    # Route controllers
│   ├── middlewares/    # Express middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   └── utils/          # Utilities
├── .github/
│   └── workflows/      # CI/CD pipelines
└── docker-compose.yml
```

## 🔐 Security Features

- ✅ Helmet security headers
- ✅ Rate limiting (API + Auth)
- ✅ Input sanitization
- ✅ MongoDB injection prevention
- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ CORS configuration
- ✅ Environment validation

## 🚀 Performance Optimizations

- ⚡ Vite for 10x faster builds
- ⚡ Code splitting and lazy loading
- ⚡ React Query for intelligent caching
- ⚡ Optimized Docker images
- ⚡ Nginx gzip compression
- ⚡ MongoDB connection pooling

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Kc Melek**

- GitHub: [@KcMelek](https://github.com/KcMelek)

## 🙏 Acknowledgments

- Material-UI team for the excellent component library
- TanStack team for React Query
- The Vite team for the amazing build tool
- MongoDB team for the database

## 📞 Support

If you have any questions or need help, please open an issue or contact the maintainer.

---

**⭐ Star this repository if you find it helpful!**
