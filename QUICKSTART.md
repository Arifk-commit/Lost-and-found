# My Lost & Found MERN Project - Quick Reference

## 🚀 Quick Start Commands

### Option 1: Using My PowerShell Script (Recommended for Windows)
```powershell
# This will install all the dependencies for me
.\install.ps1

# Then, I'll create the environment files
cd server
copy .env.example .env
cd ..\client
copy .env.example .env
cd ..
```

### Option 2: Manual Installation
```powershell
# IMPORTANT: First, I need to install the root dependencies
npm install

# Then, I can install the server & client dependencies
npm run install-all

# OR, I can install them one by one
cd server
npm install
cd ..\client
npm install
cd ..
```

### Option 3: Using My Bash Script (for Linux/Mac)
```bash
# I'll make the script executable first
chmod +x install.sh

# Then, I'll run the installation
./install.sh
```

## 🏃 Running My Application

### Development Mode (Both Server & Client)
```powershell
npm run dev
```

### Server Only
```powershell
npm run server
# OR
cd server
npm run dev
```

### Client Only
```powershell
npm run client
# OR
cd client
npm start
```

### Production Build
```powershell
# I'll build the client first
npm run build

# Then, I'll start the server
npm start
```

## 📝 My Environment Setup

### Server (.env)
```env
PORT=4000
NODE_ENV=development
DB=mongodb://localhost:27017/lost-found
JWT_SECRET=my_super_secret_key_here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

### Client (.env)
```env
REACT_APP_API_URL=http://localhost:4000
REACT_APP_FIREBASE_API_KEY=my_key
REACT_APP_FIREBASE_AUTH_DOMAIN=my_domain
REACT_APP_FIREBASE_PROJECT_ID=my_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=my_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=my_sender_id
REACT_APP_FIREBASE_APP_ID=my_app_id
```

## 🔧 Common Commands I Use

### Package Management
```powershell
# To update my dependencies
npm update

# To check for outdated packages
npm outdated

# To install a specific package
cd client  # or server
npm install package-name
```

### Database
```powershell
# To start MongoDB locally
mongod

# To connect to the MongoDB shell
mongosh
```

### Testing
```powershell
# To run my client tests
cd client
npm test
```

### Code Quality
```powershell
# To format my code with Prettier
npm run format

# To lint my code
npm run lint
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Health Check**: http://localhost:4000/health

## 📦 Key Dependency Versions I'm Using

### Client
- React: 18.3.1
- React Router: 7.1.3
- Material-UI: 6.3.1
- Firebase: 11.1.0
- Axios: 1.7.9

### Server
- Express: 4.21.2
- Mongoose: 8.9.3
- JWT: 9.0.2
- Nodemon: 3.1.9

## 🐛 Troubleshooting Tips

### Port Already in Use
```powershell
# On Windows, I can find and kill the process on a specific port
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Module Not Found
```powershell
# I can clear the cache and reinstall everything
rm -rf node_modules package-lock.json
npm install
```

### MongoDB Connection Issues
1. I'll make sure MongoDB is running.
2. I'll double-check the DB connection string in my `.env` file.
3. If I'm using MongoDB Atlas, I'll make sure my IP is whitelisted.

### CORS Issues
1. I'll verify the `CLIENT_URL` in my server's `.env` file.
2. I'll check the CORS configuration in `server/app.js`.

## 📚 Additional Resources I Find Helpful

- [React Documentation](https://react.dev/)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Material-UI Documentation](https://mui.com/)
- [Firebase Documentation](https://firebase.google.com/docs)

## 🔄 My Update Process

To update to the latest dependencies:
```powershell
# I'll check for updates first
npm outdated

# Then, I'll update to the latest compatible versions
npm update

# Or, I can update to the very latest versions (which might have breaking changes)
npx npm-check-updates -u
npm install
```

---
Last Updated by me: February 2026
