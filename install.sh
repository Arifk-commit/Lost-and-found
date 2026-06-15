#!/bin/bash

# Lost & Found MERN - Setup Script for Unix/Linux/Mac
# Run this script to install all dependencies

echo "========================================"
echo "Lost & Found MERN - Dependency Installer"
echo "========================================"
echo ""

# Check if Node.js is installed
echo "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "✗ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version)
echo "✓ Node.js is installed: $NODE_VERSION"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "✗ npm is not installed"
    exit 1
fi

NPM_VERSION=$(npm --version)
echo "✓ npm is installed: v$NPM_VERSION"

echo ""
echo "Installing Server Dependencies..."
cd server
npm install
if [ $? -eq 0 ]; then
    echo "✓ Server dependencies installed successfully"
else
    echo "✗ Failed to install server dependencies"
    exit 1
fi

echo ""
echo "Installing Client Dependencies..."
cd ../client
npm install
if [ $? -eq 0 ]; then
    echo "✓ Client dependencies installed successfully"
else
    echo "✗ Failed to install client dependencies"
    exit 1
fi

cd ..

echo ""
echo "========================================"
echo "Installation Complete!"
echo "========================================"
echo ""
echo "Next Steps:"
echo "1. Configure environment variables:"
echo "   - Copy server/.env.example to server/.env"
echo "   - Copy client/.env.example to client/.env"
echo "   - Update the values in both .env files"
echo ""
echo "2. Start the application:"
echo "   Server: cd server && npm run dev"
echo "   Client: cd client && npm start"
echo ""
echo "For more information, see SETUP.md"
