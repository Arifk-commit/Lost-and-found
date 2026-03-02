# Lost & Found

This is a web application I developed using the MERN stack. It's a platform to help people report and track lost and found items in their area. My main goal was to create a simple way to reunite lost items with their rightful owners.

With this app, you can create an account, post a report for a lost or found item, and search for items that others have reported nearby. It acts as a central hub for these reports, making it easier to track and recover things you've lost. You can also leave comments on reports to provide more information and increase the chances of a successful recovery.

## Demo

Here's a quick walkthrough of the application:
[Loom Video](https://www.loom.com/share/a8fa5a98a3364a7c970ae5b78e8240c1)

## What It Does

*   **User Accounts:** I've set up secure registration and login.
*   **Item Reporting:** You can easily report lost or found items with details and pictures.
*   **Item Search:** I included a search feature to find items by keywords, category, or location.
*   **Your Profile:** You can manage your own listings and see the status of your items.
*   **Image Uploads:** You can upload images of items to help with identification.
*   **Responsive Design:** I designed the app to work well on different devices.

## What You'll Need

Before you start, make sure you have these installed:

*   **Node.js:** (v14 or higher) - [https://nodejs.org/](https://nodejs.org/)
*   **npm:** (comes with Node.js)
*   **MongoDB:** (Community Edition or a cloud service like MongoDB Atlas) - [https://www.mongodb.com/](https://www.mongodb.com/)

## How to Get It Running

Here’s how to get the project set up on your machine:

1.  **Clone the Project:**

    ```bash
    git clone https://github.com/KcMelek/Lost-Found-MERN.git
    cd Lost-Found-MERN
    ```

2.  **Set Up the Server:**

    ```bash
    cd server
    npm install
    ```

3.  **Configure Server Environment:**

    *   Create a `.env` file in the `server` directory.
    *   Add these variables, replacing the placeholders with your own values:

        ```
        PORT=5000
        MONGO_URI=mongodb://localhost:27017/lostfounddb
        JWT_SECRET=your_jwt_secret_key
        ```
        *   `PORT`: The port my server will run on.
        *   `MONGO_URI`: The connection string for the MongoDB database.
        *   `JWT_SECRET`: A secret key for signing authentication tokens.

4.  **Set Up the Client:**

    ```bash
    cd ../client
    npm install
    ```

5.  **Configure Client Environment:**

    *   Create a `.env` file in the `client` directory.
    *   Add this environment variable:

        ```
        REACT_APP_API_URL=http://localhost:5000
        ```
        *   `REACT_APP_API_URL`: The URL of the backend server. Make sure the port matches the one in the server's `.env`.

6.  **Start the Server:**

    ```bash
    cd ../server
    npm run dev
    ```

    This command uses `nodemon`, so the server will automatically restart if you change any files.

7.  **Start the Client:**

    ```bash
    cd ../client
    npm start
    ```

    The app should now be running and accessible at `http://localhost:3000`.

## API Endpoints I've Set Up

The server has the following API endpoints:

*   **User Authentication:**
    *   `POST /api/users/register`: To register a new user.
    *   `POST /api/users/login`: To log in.
    *   `GET /api/users/profile`: To get a user's profile info (requires a token).
*   **Item Management:**
    *   `POST /api/items`: To create a new item report (requires a token).
    *   `GET /api/items`: To get a list of all items.
    *   `GET /api/items/:id`: To get a specific item by its ID.
    *   `PUT /api/items/:id`: To update an item (requires a token).
    *   `DELETE /api/items/:id`: To delete an item (requires a token).

## License

This project is unlicensed and the code is my own. All rights are reserved.
