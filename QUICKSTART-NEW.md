# 🚀 Quick Start Guide - Modernized MERN Stack

## Instant Setup (1 Minute)

### Option 1: Automated Installation
```powershell
# Windows
.\install.ps1
```

```bash
# Linux/Mac
chmod +x install.sh && ./install.sh
```

### Option 2: Manual Setup
```bash
npm run install-all
```

## Environment Setup

### 1. Server Configuration (`server/.env`)
```env
NODE_ENV=development
PORT=4000
DB=mongodb://localhost:27017/lostfound
CLIENT_URL=http://localhost:3000
JWT_SECRET=change-this-to-a-random-32-character-string
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
LOG_LEVEL=debug
```

### 2. Client Configuration (`client/.env`)
```env
VITE_API_URL=http://localhost:4000
```

## Start Development

### Quick Start (Both Servers)
```bash
npm run dev
```
- Frontend: http://localhost:3000
- Backend: http://localhost:4000

### Individual Servers
```bash
# Backend only
npm run server

# Frontend only
npm run client
```

### Docker (Everything Included)
```bash
# Development with hot reload
docker-compose -f docker-compose.dev.yml up

# Production
docker-compose up -d
```

## Essential Commands

### Development
| Command | Description |
|---------|-------------|
| `npm run dev` | Start both servers |
| `npm run server` | Backend only (port 4000) |
| `npm run client` | Frontend only (port 3000) |
| `npm run install-all` | Install all dependencies |

### Testing
| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:ui` | Open test UI dashboard |
| `npm run test:coverage` | Generate coverage report |

### Code Quality
| Command | Description |
|---------|-------------|
| `npm run lint` | Check code style |
| `npm run lint:fix` | Auto-fix linting issues |
| `npm run format` | Format code with Prettier |

### Build & Deploy
| Command | Description |
|---------|-------------|
| `npm run build` | Build frontend for production |
| `docker-compose build` | Build Docker images |
| `docker-compose up -d` | Start in production mode |

## Project Structure

```
lost-found-mern/
├── client/              # React + Vite frontend
│   ├── src/
│   │   ├── Components/  # React components
│   │   ├── lib/        # axios, react-query setup
│   │   └── test/       # Test configuration
│   ├── vite.config.js  # Vite configuration
│   └── package.json
│
├── server/              # Express backend
│   ├── config/         # logger, env validation
│   ├── controllers/    # Route handlers
│   ├── middlewares/    # Security, auth, errors
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   ├── utils/          # Helper functions
│   └── package.json
│
└── docker-compose.yml  # Container orchestration
```

## API Endpoints

### Authentication
- `POST /users/register` - Create account
- `POST /users/login` - Login
- `POST /users/refresh` - Refresh token
- `GET /users/profile` - Get profile (auth required)
- `PUT /users/profile` - Update profile (auth required)

### Items
- `GET /Items` - Get all items
- `GET /Items/:id` - Get item by ID
- `POST /Items` - Create item (auth required)
- `PUT /Items/:id` - Update item (auth required)
- `DELETE /Items/:id` - Delete item (auth required)

### System
- `GET /health` - Health check

## Key Features

### Frontend
- ⚡ **Vite** - 10x faster than CRA
- 🔄 **React Query** - Smart data fetching
- 🎨 **Material-UI v6** - Modern components
- 📱 **Responsive** - Mobile-first design
- 🧪 **Vitest** - Fast testing

### Backend
- 🛡️ **Security** - Helmet, rate limiting
- 📊 **Logging** - Pino structured logs
- ✅ **Validation** - Zod type checking
- 🚀 **Performance** - Connection pooling
- 🐳 **Docker** - Easy deployment

## Common Tasks

### Adding a New Component
```javascript
// client/src/Components/MyComponent.jsx
import React from 'react';

export default function MyComponent() {
  return <div>My Component</div>;
}
```

### Creating an API Endpoint
```javascript
// server/routes/myRoutes.js
import express from 'express';
const router = express.Router();

router.get('/my-endpoint', (req, res) => {
  res.json({ message: 'Hello World' });
});

export default router;
```

### Using React Query
```javascript
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';

function MyComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ['items'],
    queryFn: () => api.get('/Items').then(res => res.data)
  });

  if (isLoading) return <div>Loading...</div>;
  return <div>{JSON.stringify(data)}</div>;
}
```

## Environment Variables Reference

### Server Variables
| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| NODE_ENV | No | development | Environment mode |
| PORT | No | 4000 | Server port |
| DB | Yes | - | MongoDB connection string |
| CLIENT_URL | No | http://localhost:3000 | Frontend URL |
| JWT_SECRET | Yes | - | Secret for JWT (32+ chars) |
| JWT_EXPIRE | No | 7d | Token expiration |
| CLOUDINARY_* | Yes | - | Image upload credentials |
| LOG_LEVEL | No | info | Logging level |

### Client Variables
| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| VITE_API_URL | No | http://localhost:4000 | Backend API URL |
| VITE_FIREBASE_* | Yes | - | Firebase config |

## Troubleshooting

### Issue: Port already in use
```bash
# Windows
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:4000 | xargs kill -9
```

### Issue: MongoDB not running
```bash
# Start MongoDB
# Windows: Start MongoDB service
# Linux: sudo systemctl start mongod
# Mac: brew services start mongodb-community
```

### Issue: Dependencies not installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Performance Tips

1. **Use React Query** for all API calls
2. **Enable lazy loading** for routes
3. **Optimize images** before upload
4. **Use production build** for deployment
5. **Enable caching** with nginx

## Security Checklist

- [ ] Change JWT_SECRET to random string (32+ chars)
- [ ] Use HTTPS in production
- [ ] Set NODE_ENV=production
- [ ] Configure CORS properly
- [ ] Enable rate limiting
- [ ] Use environment variables for secrets
- [ ] Regular dependency updates

## Next Steps

1. ✅ Set up environment variables
2. ✅ Start MongoDB
3. ✅ Run `npm run dev`
4. ✅ Open http://localhost:3000
5. 📖 Read ARCHITECTURE.md for details
6. 🧪 Write tests for your code
7. 🚀 Deploy with Docker

## Resources

- 📖 [Full Documentation](README.NEW.md)
- 🏗️ [Architecture Guide](ARCHITECTURE.md)
- 🔄 [Migration Guide](MIGRATION.md)
- 📝 [Modernization Summary](MODERNIZATION-SUMMARY.md)

## Support

Need help? Check:
1. This quick start guide
2. Full documentation
3. Error logs (`server/logs/`)
4. GitHub issues
5. Contact the team

---

**Ready to code! 🎉**
