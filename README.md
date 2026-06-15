# 🎓 Campus Lost & Found

<div align="center">

**A Modern MERN Stack Platform for College Lost & Found Management**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.11-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

</div>

---

## 📖 About

Campus Lost & Found is a comprehensive web application designed specifically for **college campuses** to streamline the process of reporting, tracking, and recovering lost items. Built with modern technologies and a beautiful user interface, this platform serves as a centralized hub where students can quickly report lost or found items, search through listings, and reconnect items with their rightful owners.

Our mission is to reduce the frustration of losing belongings on campus and create a more connected, helpful community within colleges and universities.

---

## ✨ Key Features

### 🔐 **Secure Authentication**
- JWT-based authentication with custom token validation
- Secure user registration and login
- Protected routes and profile management
- Session management with auto-refresh

### 📝 **Item Management**
- **Report Lost Items**: Post detailed reports with images, descriptions, and contact information
- **Report Found Items**: Help others by reporting items you've found on campus
- **My Listings**: Manage all your posted items in one place
- **Delete & Update**: Full control over your listings with edit and delete capabilities

### 🔍 **Smart Search & Filter**
- Real-time search across all listings
- Filter by item type (Lost/Found)
- Category-based filtering
- Responsive search results with modern card layouts

### 🎨 **Modern UI/UX**
- **Tailwind CSS v4**: Latest design system with custom color palette
- **Glassmorphism Effects**: Premium frosted-glass aesthetic
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Perfect experience on mobile, tablet, and desktop
- **Material-UI Integration**: Enhanced components with custom theming
- **Hero Icons & Lucide React**: Beautiful, consistent iconography

### 🖼️ **Media Management**
- Cloudinary integration for image uploads
- High-quality image storage and delivery
- Image optimization for fast loading
- Multiple image support per listing

### 📱 **User Experience**
- Intuitive navigation with modern navbar
- Professional footer with quick links
- Contact functionality for item inquiries
- Toast notifications for user feedback
- Loading states and error handling

---

## 🛠️ Tech Stack

### **Frontend**
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI Framework |
| Vite | 5.4.11 | Build Tool & Dev Server |
| Tailwind CSS | v4 | Styling & Design System |
| Material-UI | 6.3.1 | Enhanced Components |
| React Router | 7.1.3 | Client-side Routing |
| Axios | 1.7.9 | HTTP Client |
| Formik | 2.4.6 | Form Management |
| Yup | 1.4.0 | Form Validation |
| Framer Motion | 11.15.0 | Animations |
| @heroicons/react | 2.2.0 | Icons |
| lucide-react | Latest | Additional Icons |

### **Backend**
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | Latest | Runtime Environment |
| Express | 4.21.2 | Web Framework |
| MongoDB | Atlas | Database |
| Mongoose | 8.9.3 | ODM |
| JWT | Latest | Authentication |
| Bcrypt | 5.1.1 | Password Hashing |
| Cloudinary | Latest | Image Storage |
| Multer | 1.4.5-lts.1 | File Uploads |
| Pino | 9.5.0 | Structured Logging |
| Helmet | 8.0.0 | Security Headers |
| Zod | 3.24.1 | Schema Validation |
| Express Rate Limit | 7.4.1 | Rate Limiting |

---

## 🚀 Getting Started

### **Prerequisites**

Ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB Atlas Account** - [Sign Up](https://www.mongodb.com/cloud/atlas)
- **Cloudinary Account** - [Sign Up](https://cloudinary.com/)

### **Installation**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Arifk-commit/Lost-and-found.git
   cd Lost-and-found
   ```

2. **Quick Setup (Recommended)**
   
   **Windows (PowerShell):**
   ```powershell
   .\install.ps1
   ```
   
   **macOS/Linux:**
   ```bash
   chmod +x install.sh
   ./install.sh
   ```

3. **Manual Setup**

   **Server Setup:**
   ```bash
   cd server
   npm install
   ```

   **Client Setup:**
   ```bash
   cd ../client
   npm install
   ```

### **Configuration**

1. **Server Environment Variables**

   Create a `.env` file in the `server` directory:
   ```env
   PORT=4000
   MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/lost-found
   JWT_SECRET=your_super_secret_jwt_key_here
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   NODE_ENV=development
   ```

2. **Client Environment Variables**

   Create a `.env` file in the `client` directory:
   ```env
   VITE_API_URL=http://localhost:4000
   ```

### **Running the Application**

1. **Start the Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   Server runs on: `http://localhost:4000`

2. **Start the Frontend Client**
   ```bash
   cd client
   npm run dev
   ```
   Client runs on: `http://localhost:3000`

3. **Access the Application**
   
   Open your browser and navigate to `http://localhost:3000`

---

## 📚 API Documentation

### **Authentication Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/users/register` | Register a new user | ❌ |
| POST | `/api/users/login` | Login user | ❌ |
| POST | `/api/users/renew` | Refresh JWT token | ✅ |
| PUT | `/api/users/update` | Update user profile | ✅ |

### **Item Management Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/items/create` | Create new item listing | ✅ |
| GET | `/api/items` | Get all items | ❌ |
| GET | `/api/items/:id` | Get item by ID | ❌ |
| PUT | `/api/items/update/:id` | Update item listing | ✅ |
| DELETE | `/api/items/delete/:id` | Delete item listing | ✅ |

**Note:** Authentication uses a custom `token` header (not `Authorization: Bearer`)

---

## 🎨 Design System

### **Color Palette**
- **Primary**: `#3b82f6` (Blue) - Main brand color
- **Secondary**: `#ef4444` (Red) - Lost items, alerts
- **Accent**: `#22c55e` (Green) - Found items, success states
- **Neutral**: Tailwind's default gray scale

### **Design Principles**
- **Spacing**: 8px base unit system
- **Border Radius**: 12-20px for modern, soft appearance
- **Shadows**: Soft, layered shadows for depth
- **Typography**: System fonts with professional hierarchy
- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Animations**: Smooth transitions with Framer Motion

---

## 📂 Project Structure

```
Lost-and-found/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── Components/       # React components
│   │   │   ├── HomeModern.jsx
│   │   │   ├── NavbarModern.jsx
│   │   │   ├── LoginModern.jsx
│   │   │   ├── SignupModern.jsx
│   │   │   ├── LostItemModern.jsx
│   │   │   ├── MyListingsModern.jsx
│   │   │   ├── LostItemsModern.jsx
│   │   │   ├── FoundItemsModern.jsx
│   │   │   ├── ItemPage.jsx
│   │   │   └── FooterModern.jsx
│   │   ├── App.js            # Main app component
│   │   ├── index.js          # Entry point
│   │   ├── theme.js          # MUI theme configuration
│   │   ├── constraints.js    # App constants
│   │   └── index.css         # Global styles
│   ├── public/               # Static assets
│   ├── package.json
│   └── vite.config.js        # Vite configuration
│
├── server/                    # Backend Node.js application
│   ├── controllers/          # Route controllers
│   │   ├── Items/
│   │   │   ├── CreateItem.js
│   │   │   ├── getAllItems.js
│   │   │   ├── getItemById.js
│   │   │   ├── updateItem.js
│   │   │   └── deleteItem.js
│   │   └── User/
│   │       ├── CreateUser.js
│   │       ├── LoginUser.js
│   │       ├── renewToken.js
│   │       └── UpdateUser.js
│   ├── models/               # Mongoose models
│   │   ├── Item.js
│   │   └── User.js
│   ├── routes/               # API routes
│   │   ├── ItemRoutes.js
│   │   └── userRoutes.js
│   ├── middlewares/          # Custom middleware
│   │   ├── validateToken.js
│   │   └── upload.js
│   ├── config/               # Configuration files
│   │   └── cloudinary.js
│   ├── app.js                # Express app setup
│   └── package.json
│
├── README.md                  # This file
├── SETUP.md                   # Detailed setup guide
├── QUICKSTART.md              # Quick start guide
├── CHANGELOG.md               # Version history
├── install.ps1                # Windows installation script
└── install.sh                 # Unix installation script
```

---

## 🎯 Use Cases

### **For Students**
- Quickly report lost belongings (phones, wallets, IDs, keys)
- Browse found items to check if someone found your lost item
- Contact finders/owners through the platform
- Manage all your listings in one dashboard

### **For Campus Administration**
- Reduce lost & found desk workload
- Digital record of all lost/found items
- Better tracking and analytics
- Improved student services

### **For Good Samaritans**
- Easy way to report found items
- Help fellow students recover their belongings
- Build a helpful campus community

---

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt with salt rounds
- **Helmet Integration**: Security headers protection
- **Rate Limiting**: Prevent API abuse
- **Input Validation**: Zod schema validation
- **XSS Protection**: Sanitized inputs and outputs
- **Secure Headers**: CORS and security best practices

---

## 🌟 Future Enhancements

- [ ] Email notifications for item matches
- [ ] SMS alerts for high-value items
- [ ] AI-powered image matching
- [ ] Multi-campus support
- [ ] Mobile app (React Native)
- [ ] Admin dashboard with analytics
- [ ] Chat functionality between users
- [ ] QR code generation for items
- [ ] Integration with campus ID systems

---

## 👥 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🤝 Acknowledgments

- Built with ❤️ for college communities
- Designed to solve real campus problems
- Inspired by the need for better campus connectivity

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact the development team
- Check the documentation in `/docs`

---

<div align="center">

**Made with ❤️ for College Campuses**

⭐ Star this repo if you find it helpful!

</div>
