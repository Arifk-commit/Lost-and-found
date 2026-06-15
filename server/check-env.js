import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '.env');

console.log('\n🔍 Environment Check for Chatbot Server\n');
console.log('=' .repeat(50));

// Check if .env exists
if (!fs.existsSync(envPath)) {
  console.log('\n❌ ERROR: .env file not found!');
  console.log(`   Expected location: ${envPath}`);
  console.log('\n   Create a .env file with these variables:');
  console.log(`
DB=mongodb://localhost:27017/lost-found
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000
JWT_SECRET=lost&found@2026-01-minimum-32-characters-required
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=khanarif
CLOUDINARY_API_KEY=536456254275415
CLOUDINARY_API_SECRET=mkf-tWKGST9710Yz40Esyy-L-XY
LOG_LEVEL=debug
  `);
  process.exit(1);
}

console.log('\n✅ .env file found\n');

// Load environment variables
dotenv.config({ path: envPath });

const required = [
  { name: 'NODE_ENV', type: 'enum', values: ['development', 'production', 'test'] },
  { name: 'PORT', type: 'port', min: 1024 },
  { name: 'DB', type: 'string', minLength: 10 },
  { name: 'CLIENT_URL', type: 'url' },
  { name: 'JWT_SECRET', type: 'string', minLength: 32 },
  { name: 'JWT_EXPIRE', type: 'string' },
  { name: 'CLOUDINARY_CLOUD_NAME', type: 'string' },
  { name: 'CLOUDINARY_API_KEY', type: 'string' },
  { name: 'CLOUDINARY_API_SECRET', type: 'string' },
];

let allGood = true;
const checks = [];

required.forEach(({ name, type, values, minLength, min }) => {
  const value = process.env[name];
  let status = '❌';
  let message = 'MISSING';
  
  if (value) {
    if (type === 'enum' && values && !values.includes(value)) {
      message = `INVALID (must be: ${values.join(', ')})`;
      allGood = false;
    } else if (type === 'url') {
      try {
        new URL(value);
        status = '✅';
        message = 'Valid';
      } catch {
        message = 'INVALID URL';
        allGood = false;
      }
    } else if (type === 'port') {
      const port = parseInt(value, 10);
      if (port >= (min || 0) && port <= 65535) {
        status = '✅';
        message = `Valid (${port})`;
      } else {
        message = 'INVALID PORT';
        allGood = false;
      }
    } else if (minLength && value.length < minLength) {
      message = `TOO SHORT (need ${minLength} chars, have ${value.length})`;
      allGood = false;
    } else {
      status = '✅';
      const masked = name.includes('SECRET') || name.includes('KEY') || name.includes('PASSWORD')
        ? '***' + value.slice(-4)
        : value.length > 50 ? value.slice(0, 47) + '...' : value;
      message = masked;
    }
  } else {
    allGood = false;
  }
  
  checks.push({ name, status, message });
});

// Print results
console.log('Variable Check:');
console.log('-'.repeat(50));
checks.forEach(({ name, status, message }) => {
  console.log(`${status} ${name.padEnd(30)} ${message}`);
});

console.log('\n' + '='.repeat(50));

if (allGood) {
  console.log('\n✅ All environment variables are correctly configured!\n');
  console.log('Next steps:');
  console.log('  1. Make sure MongoDB is running');
  console.log('  2. Run: npm run dev');
  console.log('  3. Server should start on PORT ' + process.env.PORT);
} else {
  console.log('\n❌ Some environment variables are missing or invalid!');
  console.log('\nPlease fix the issues above in your .env file.\n');
  process.exit(1);
}
