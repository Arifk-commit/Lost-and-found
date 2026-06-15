# 🐛 Chatbot - Server Startup Troubleshooting Guide

## Problem: Server Won't Start (Exit Code 1)

If the server crashes on startup with exit code 1, it's usually an environment configuration issue.

---

## ✅ Solution Steps

### Step 1: Check if `.env` File Exists

The server needs a `.env` file in the `server` directory.

**Location:** `server/.env`

```bash
# Check if file exists
ls server/.env      # Mac/Linux
dir server\.env     # Windows
```

**If it doesn't exist, create it with these values:**

```env
# Basic Configuration
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173

# MongoDB Connection (REQUIRED)
# Use one of these:

# Option 1: Local MongoDB
DB=mongodb://localhost:27017/lost-found

# Option 2: MongoDB Atlas (Cloud)
DB=mongodb+srv://username:password@cluster.mongodb.net/lost-found?retryWrites=true&w=majority

# JWT Configuration (REQUIRED)
JWT_SECRET=your_super_secret_key_must_be_at_least_32_characters_long_here
JWT_EXPIRE=7d

# Cloudinary Configuration (REQUIRED)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Logging
LOG_LEVEL=info
```

### Step 2: Verify MongoDB is Running

Before starting the server, check if MongoDB is running.

**For Local MongoDB:**

**Windows:**
```bash
# Check if MongoDB service is running
Get-Service MongoDB
# If not, start it
Start-Service MongoDB
```

**Mac (with Homebrew):**
```bash
# Check if MongoDB is running
brew services list | grep mongodb
# Start MongoDB
brew services start mongodb-community
```

**Linux:**
```bash
# Check status
sudo systemctl status mongod
# Start MongoDB
sudo systemctl start mongod
```

**Or test connection:**
```bash
# Try connecting to MongoDB
mongosh  # or mongo
# If it connects, MongoDB is running ✅
```

---

### Step 3: Check Environment Variables

Create a diagnostic script to check your setup:

**`server/check-env.js`**
```javascript
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

console.log('📋 Environment Variables Check:');
console.log('================================\n');

const required = [
  'NODE_ENV',
  'PORT',
  'DB',
  'CLIENT_URL',
  'JWT_SECRET',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET'
];

let allGood = true;

required.forEach(key => {
  const value = process.env[key];
  if (value) {
    const masked = key === 'JWT_SECRET' || key.includes('SECRET') || key.includes('KEY')
      ? '***' + value.slice(-4)
      : value;
    console.log(`✅ ${key}: ${masked}`);
  } else {
    console.log(`❌ ${key}: MISSING`);
    allGood = false;
  }
});

console.log('\n' + (allGood ? '✅ All variables set!' : '❌ Some variables missing!'));
process.exit(allGood ? 0 : 1);
```

**Run it:**
```bash
cd server
node check-env.js
```

---

### Step 4: Start Server with Verbose Output

Add this script to `server/package.json`:

```json
{
  "scripts": {
    "dev": "nodemon app.js",
    "debug": "NODE_DEBUG=http,mongodb NODE_ENV=development nodemon app.js",
    "start": "node app.js"
  }
}
```

Then run:
```bash
npm run debug
```

This shows detailed connection information.

---

### Step 5: Common Errors & Fixes

#### Error: "MongoDB connection string is required"
**Cause:** Missing `DB` environment variable
**Fix:** Add `DB=mongodb://localhost:27017/lost-found` to `.env`

#### Error: "JWT secret must be at least 32 characters"
**Cause:** `JWT_SECRET` is too short
**Fix:** Use a longer string:
```env
JWT_SECRET=your_super_secret_jwt_key_must_be_at_least_32_characters_long_here_12345
```

#### Error: "Cannot connect to MongoDB"
**Cause:** MongoDB service not running
**Fix:** Start MongoDB (see Step 2)

#### Error: "EADDRINUSE: address already in use :::5000"
**Cause:** Port 5000 is already in use
**Fix:** Change PORT in `.env`:
```env
PORT=5001
# or kill the process using port 5000
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000
```

#### Error: "Cannot find module"
**Cause:** Dependencies not installed or path wrong
**Fix:** 
```bash
cd server
npm install
npm run dev
```

---

## 🔍 Debug the Chatbot API Directly

Once server is running, test these endpoints:

```bash
# Check if server is alive
curl http://localhost:5000/health

# Send message to chatbot
curl -X POST http://localhost:5000/api/chatbot/message \
  -H "Content-Type: application/json" \
  -d '{"message": "I lost my phone"}'

# Get suggestions
curl http://localhost:5000/api/chatbot/suggestions
```

---

## 📝 Complete `.env` Template

Copy this and fill in your values:

```env
# ==================== ENVIRONMENT ====================
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173

# ==================== DATABASE ====================
# For local MongoDB:
DB=mongodb://localhost:27017/lost-found

# For MongoDB Atlas (fill in username, password, cluster):
# DB=mongodb+srv://username:password@cluster.mongodb.net/lost-found?retryWrites=true&w=majority

# ==================== JWT ====================
JWT_SECRET=your_super_secret_jwt_key_must_be_at_least_32_characters_long_here
JWT_EXPIRE=7d

# ==================== CLOUDINARY ====================
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# ==================== LOGGING ====================
LOG_LEVEL=info
```

---

## 🚀 Quick Fix Summary

If server won't start:

1. ✅ Check `.env` exists in `server/` folder
2. ✅ Add all required variables to `.env`
3. ✅ Ensure MongoDB is running
4. ✅ Check port 5000 is not in use
5. ✅ Run `npm install` in server folder
6. ✅ Run `npm run dev`

---

## ✨ Verify Chatbot Works

1. **Server is running:**
   ```
   ✅ Server running on PORT: 5000
   ✅ Database connected successfully
   ```

2. **Frontend is running:**
   ```
   Open http://localhost:5173
   ```

3. **Chatbot responds:**
   - Click the blue button
   - Type a message
   - Bot should respond (not static!)

---

## 📞 Still Not Working?

1. **Check server terminal output** - Look for error messages
2. **Run `npm run debug`** - Get verbose output
3. **Test `.env` file** - Run `node check-env.js`
4. **Restart MongoDB** - Stop and start the service
5. **Check MongoDB connection** - Try `mongosh` command
6. **Look at package.json** - Ensure all scripts exist
7. **Clear node_modules** - `rm -rf node_modules && npm install`

---

**Once server starts correctly, the chatbot will be fully dynamic and responsive!** ✨

