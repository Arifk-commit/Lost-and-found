# Migration Guide - CRA to Vite

This guide helps you understand the changes made during the migration from Create React App to Vite.

## 🔄 Major Changes

### 1. Build Tool Migration

**Before (CRA):**
- Used webpack
- `react-scripts` for building
- Slow development server
- Limited configuration

**After (Vite):**
- Uses esbuild + Rollup
- Native Vite configuration
- Lightning-fast HMR
- Full control over configuration

### 2. Environment Variables

**Change Required:** Update all environment variable names

**Before:**
```env
REACT_APP_API_URL=http://localhost:4000
REACT_APP_FIREBASE_API_KEY=xxx
```

**After:**
```env
VITE_API_URL=http://localhost:4000
VITE_FIREBASE_API_KEY=xxx
```

**In Code:**
```javascript
// Before
const apiUrl = process.env.REACT_APP_API_URL;

// After
const apiUrl = import.meta.env.VITE_API_URL;
```

### 3. Entry Point

**File renamed:** `src/index.js` → `src/index.jsx`

**HTML changes:**
```html
<!-- public/index.html moved to root index.html -->
<!-- Add module script tag -->
<script type="module" src="/src/index.jsx"></script>
```

### 4. Import Changes

**Vite requires explicit file extensions for imports:**

```javascript
// Before (optional)
import App from './App';

// After (preferred)
import App from './App.js';
```

### 5. Public Assets

**Before:**
```jsx
<img src={process.env.PUBLIC_URL + '/logo.png'} />
```

**After:**
```jsx
<img src="/logo.png" />
// or
import logo from '/logo.png';
<img src={logo} />
```

## 📦 Package Changes

### Removed Packages
- `react-scripts` - Replaced by Vite
- `@testing-library/jest-dom` - Moved to devDependencies
- `@testing-library/react` - Moved to devDependencies
- `@testing-library/user-event` - Moved to devDependencies

### Added Packages
- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin for Vite
- `vitest` - Test runner
- `@vitest/ui` - Test UI
- `@tanstack/react-query` - Data fetching
- `@tanstack/react-query-devtools` - DevTools
- `react-error-boundary` - Error handling
- `zod` - Validation

## 🛠️ Configuration Files

### New Files Created
- `vite.config.js` - Vite configuration
- `vitest.config.js` - Test configuration
- `client/index.html` - HTML entry point (moved from public/)
- `src/lib/react-query.js` - React Query setup
- `src/lib/axios.js` - Axios configuration
- `src/test/setup.js` - Test setup

### Updated Files
- `package.json` - Scripts and dependencies updated
- `.eslintrc.json` - Modern ESLint config
- `.prettierrc.json` - Prettier config

## 🧪 Testing Changes

**Before (Jest):**
```bash
npm test
```

**After (Vitest):**
```bash
npm test         # Run tests
npm run test:ui  # Open test UI
npm run test:coverage  # Coverage report
```

**Test file changes:**
```javascript
// Before
import { render, screen } from '@testing-library/react';

// After (same, but using Vitest)
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
```

## 🚀 Script Changes

**package.json scripts:**

| Old Script | New Script | Purpose |
|------------|------------|---------|
| `npm start` | `npm run dev` | Development server |
| `npm run build` | `npm run build` | Production build |
| `npm test` | `npm test` | Run tests |
| N/A | `npm run preview` | Preview production build |
| N/A | `npm run lint` | Lint code |
| N/A | `npm run format` | Format code |

## 🔧 Development Workflow

### Before
1. `npm start` - Wait 10-15 seconds
2. Edit code - Wait 500ms+ for HMR
3. `npm run build` - Wait 45+ seconds

### After
1. `npm run dev` - Ready in 1-2 seconds
2. Edit code - Update in 50ms
3. `npm run build` - Done in 15 seconds

## 🐛 Common Issues & Solutions

### Issue 1: Environment variables not working
**Solution:** Rename from `REACT_APP_*` to `VITE_*` and use `import.meta.env`

### Issue 2: Absolute imports not working
**Solution:** Configure path aliases in `vite.config.js`:
```javascript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```

### Issue 3: Global is not defined
**Solution:** Add to `vite.config.js`:
```javascript
define: {
  global: 'window',
}
```

### Issue 4: Tests not running
**Solution:** Make sure `vitest.config.js` exists and has proper setup

## ✅ Checklist for Your Code

- [ ] Update all `REACT_APP_*` to `VITE_*`
- [ ] Change `process.env` to `import.meta.env`
- [ ] Update `PUBLIC_URL` references
- [ ] Install new dependencies: `npm install`
- [ ] Test development server: `npm run dev`
- [ ] Run tests: `npm test`
- [ ] Test production build: `npm run build && npm run preview`
- [ ] Update any CI/CD pipelines
- [ ] Update documentation

## 📊 Performance Comparison

| Metric | Before (CRA) | After (Vite) |
|--------|--------------|--------------|
| Cold Start | ~15s | ~1.5s |
| HMR Speed | ~500ms | ~50ms |
| Build Time | ~45s | ~15s |
| Bundle Size | ~500KB | ~200KB |

## 🎯 Next Steps

1. **Test thoroughly** - Make sure all features work
2. **Update team** - Share this guide with your team
3. **Monitor performance** - Enjoy the speed improvements!
4. **Explore features** - Check out Vite's advanced features

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [Vitest Documentation](https://vitest.dev/)
- [Migration from CRA](https://vitejs.dev/guide/migration-from-cra.html)
- [React Query Documentation](https://tanstack.com/query/latest)

## 🆘 Need Help?

If you encounter any issues during migration:

1. Check this guide
2. Review the [Vite troubleshooting guide](https://vitejs.dev/guide/troubleshooting.html)
3. Open an issue in the repository
4. Contact the development team

---

**Happy coding with Vite! 🎉**
