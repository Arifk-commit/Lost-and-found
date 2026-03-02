# Lost & Found MERN - Setup Script for Windows
# Run this script to install all dependencies

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Lost & Found MERN - Dependency Installer" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js is not installed. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✓ npm is installed: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ npm is not installed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Installing Server Dependencies..." -ForegroundColor Yellow
Set-Location -Path "server"
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Server dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install server dependencies" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Installing Client Dependencies..." -ForegroundColor Yellow
Set-Location -Path "..\client"
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Client dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to install client dependencies" -ForegroundColor Red
    exit 1
}

Set-Location -Path ".."

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Installation Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Configure environment variables:" -ForegroundColor White
Write-Host "   - Copy server/.env.example to server/.env" -ForegroundColor Gray
Write-Host "   - Copy client/.env.example to client/.env" -ForegroundColor Gray
Write-Host "   - Update the values in both .env files" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Start the application:" -ForegroundColor White
Write-Host "   Server: cd server && npm run dev" -ForegroundColor Gray
Write-Host "   Client: cd client && npm start" -ForegroundColor Gray
Write-Host ""
Write-Host "For more information, see SETUP.md" -ForegroundColor Cyan
