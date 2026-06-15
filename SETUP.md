## My Setup Instructions

### Quick Start

1.  **Clone and Install**
    ```bash
    # First, I'll install the server dependencies
    cd server
    npm install
    
    # Then, I'll install the client dependencies
    cd ../client
    npm install
    ```

2.  **Set Up Environment Variables**
    ```bash
    # For the server
    cd server
    cp .env.example .env
    # I'll need to edit the .env file with my MongoDB URI and JWT secret
    
    # For the client
    cd ../client
    cp .env.example .env
    # Here, I'll edit the .env file with my Firebase and API configurations
    ```

3.  **Run the App**
    ```bash
    # In one terminal, I'll start the server
    cd server
    npm run dev
    
    # In another terminal, I'll start the client
    cd client
    npm start
    ```

### Dependencies I've Updated (as of February 2026)

**Client:**
- React 18.3.1
- React Router DOM 7.1.3
- Material-UI 6.3.1
- Firebase 11.1.0
- Axios 1.7.9
- I've also updated all other dependencies to their latest stable versions.

**Server:**
- Express 4.21.2
- Mongoose 8.9.3
- JWT 9.0.2
- Nodemon 3.1.9 (as a dev dependency)
- I removed the deprecated body-parser since it's now built into Express.

### Notes on Migrating

If I were upgrading from an older version, here's what I'd look out for:

1.  **React Router v7**: I might need to update my route definitions.
2.  **MUI v6**: I'd check for any changes to the component APIs.
3.  **Firebase v11**: I'd update the Firebase initialization if I'm using the modular SDK.
4.  **Mongoose v8**: The connection options `useNewUrlParser` and `useUnifiedTopology` are now on by default.
5.  **jwt-decode v4**: This now uses ES modules, so I'd need to update my imports.

### Config Files I've Added

- I added `.env.example` files for both the client and server.
- I also added `.gitignore` files, a `.prettierrc` for code formatting, and an `.eslintrc.json` for linting.

I can access the app at:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000
