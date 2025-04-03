- [**🏷️ Project Name: Task Management**](#️-project-name-task-management)
    - [📝 API Task Management:](#-api-task-management)
  - [🛠️ How many technologies used in this Task Management App backend. Here is a list of the main technologies:](#️-how-many-technologies-used-in-this-task-management-app-backend-here-is-a-list-of-the-main-technologies)
- [***👉🏼Backend Project Information***](#backend-project-information)
  - [📂 Folder structure of code](#-folder-structure-of-code)
  - [⚙️ Setup Instructions](#️-setup-instructions)
    - [Install Dependencies](#install-dependencies)
    - [Environment Variables](#environment-variables)
  - [🚀 Running the Application](#-running-the-application)
    - [Components:](#components)
    - [Important Notes:](#important-notes)
  - [🌐 API Endpoints 🔗](#-api-endpoints-)
    - [**User API :-**](#user-api--)
    - [`POST /api/users/register`](#post-apiusersregister)
    - [`POST /api/users/login`](#post-apiuserslogin)
    - [`GET /api/users/all/data`](#get-apiusersalldata)
    - [`GET /api/users/single/data/by/:id`](#get-apiuserssingledatabyid)
    - [`PUT /api/users/update/profile`](#put-apiusersupdateprofile)
    - [`DELETE /api/users/delete/loggedIn`](#delete-apiusersdeleteloggedin)
  - [When there is an error in the routes ⚠️❌](#when-there-is-an-error-in-the-routes-️)
  - [📝 Note : The Task API should function similarly to the User API. If a route is not found, it should return a "Path Not Found" error. Additionally, proper validation should be implemented to handle input errors and return meaningful validation error messages.](#-note--the-task-api-should-function-similarly-to-the-user-api-if-a-route-is-not-found-it-should-return-a-path-not-found-error-additionally-proper-validation-should-be-implemented-to-handle-input-errors-and-return-meaningful-validation-error-messages)
- [🟠 🔗 Appbirds-Task-Management Postman Documentation Link](#--appbirds-task-management-postman-documentation-link)
  - [📜 Project Deployment Information](#-project-deployment-information)
- [**Backend Deployment Live Link for "Find All Users" API**](#backend-deployment-live-link-for-find-all-users-api)
  
---

# **🏷️ Project Name: Task Management**
### 📝 API Task Management:

- User Crud API
**Add, View, Edit, and Delete Tasks**    
   - Add new user 
   - Login user
   - Find all user
   - Find single user data by ID
   - Edit/update logged-in user
   - Delete logged-in user
   - Logout logged-in user
  
- Task Crud API
**Add, View, Edit, and Delete Tasks**    
   - Create logged-in user
   - Find all logged-in user task
   - Find single task ID logged-in user
   - Edit/update task logged-in user
   - Edit/update task status logged-in user
   - Delete task logged-in user

## 🛠️ How many technologies used in this Task Management App backend. Here is a list of the main technologies:

1. **Node.js** - Server-side JavaScript runtime environment for building the backend.
2. **Express.js** - Web framework for Node.js to handle HTTP requests and routes.
3. **MongoDB** - NoSQL database used to store task data.
4. **Mongoose** - ODM (Object Data Modeling) library for MongoDB, used to interact with the database.
5. **Postman** - Tool used for API testing and documentation.
6. **dotenv** - For managing environment variables in the backend.
7. **express-validator** - A set of middleware functions used in Express.js for validating and sanitizing incoming requests to ensure data integrity and correct input formats.
8. **.gitignore** - A configuration file used in Git to specify which files or directories should be ignored by version control.
---
# ***👉🏼Backend Project Information***

## 📂 Folder structure of code
```markdown
├── config/
│   ├── db.js                     # Database connection setup
│
├── controllers/                  
│   ├── taskController.js         # Controller for task-related logic (CRUD operations)
│   ├── userController.js         # Controller for user-related operations
│
├── middleware/                   
│   ├── authMiddleware.js         # Authentication middleware (JWT handling)
│   ├── handleValidation.js       # Middleware for handling validation errors
│   ├── notFoundHandler.js        # Middleware for handling 404 errors
│
├── models/                       
│   ├── Task.js                   # Mongoose schema for Task model
│   ├── User.js                   # Mongoose schema for User model
│
├── routes/                       
│   ├── taskRoutes.js             # Routes and route handlers for task operations
│   ├── userRoutes.js             # Routes and route handlers for user operations
│
├── validation/                   # Validation logic for request data
│
├── node_modules/                 # Node.js dependencies (auto-generated)
├── .env                          # Environment variables (e.g., MongoDB URI, JWT secret)
├── .gitignore                    # Specifies files to exclude from version control
├── package-lock.json             # NPM package lock file
├── package.json                  # Project dependencies, scripts, and configurations
├── README.md                     # Project documentation
├── server.js                     # Main server entry point

```

---

## ⚙️ Setup Instructions
### Install Dependencies

1. How to Install project dependencies in Node.js:

   ```markdown
   npm install dependencies_name
   ```

### Environment Variables

Create a `.env` file in the root of the `project` folder and add the following keys:

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=Secret key
PORT=8005
```

- **MONGO_URI**: MongoDB connection string for your database.
- **JWT_SECRET**: Secret key.
- **PORT**: Port on which the server will run.

---

## 🚀 Running the Application

To start the backend server, run the following command:

```
node --watch server.js
```
The command `node --watch server.js` is used to run a Node.js server while enabling **watch mode**. Here’s a detailed breakdown of the command:

### Components:
1. **`node`**:
   - This is the command-line interface for running JavaScript code using Node.js. When you type `node server.js`, you are running the `server.js` JavaScript file using Node.js.

2. **`--watch`** (or **`-w`**):
   - This flag tells Node.js to enable **watch mode**. When watch mode is active, Node.js will automatically detect file changes and restart the server when any changes are made to your JavaScript files.

3. **`server.js`**:
   - This is the file that contains the main logic of your application (in this case, likely your Express.js server). It’s the file that Node.js will execute to start the server.

### Important Notes:
- **Node.js 18+**: The `--watch` flag is available starting from Node.js version 18. If you are using an older version of Node.js, you may not have this functionality.

This will start the application on the specified port.

---

## 🌐 API Endpoints 🔗

### **User API :-**

### `POST /api/users/register`

- **Body**:
  ```json
    {
    "name":"Raja",
    "email":"raja@gmail.com",
    "password":"raja@123"
    }
  ```
- **Response**:
  ```json
    {
        "message": "User created successfully",
    }
  ```
---

### `POST /api/users/login`

- **Body**:
  ```json
    {
    "email":"raja@gmail.com",
    "password":"raja@123"
    }
  ```
- **Response**:
  ```json
    {
        "message": "User login successfully",
    }
  ```
---

### `GET /api/users/all/data`

- **Body**:
  ```json
    {}
  ```
- **Response**:
  ```json
    [
        {
            "_id": "67ed0c30252a04321a48c58e",
            "name": "amit",
            "email": "amit@gmail.com",
            "password": "$2b$10$2hpN1D4LzzUlrSHDp3a/auXQuybSOsfjfb3u6a/WYAnMJditxGko.",
            "createdAt": "2025-04-02T10:06:40.776Z",
            "updatedAt": "2025-04-02T10:06:40.776Z",
            "__v": 0
        },...
    ]
  ```
---

### `GET /api/users/single/data/by/:id`

- **URL Parameter**: `id` (MongoDB ObjectId)
- **Body**:
  ```json
    {}
  ```
- **Response**:
  ```json
    {
        "_id": "67ed425b81d6ad1c9d3721e7",
        "name": "kumar",
        "email": "kumar@gmail.com",
        "password": "$2b$10$KpFnRXTOfY2DdObr6/zZIOf75JRFK47BTMX8L65Nw8FD30g56bn3O",
        "createdAt": "2025-04-02T13:57:47.933Z",
        "updatedAt": "2025-04-02T13:57:47.933Z",
        "__v": 0
    }
  ```
---

### `PUT /api/users/update/profile`

- **Body**:
  ```json
    {
        "name": "raja kumar",
        "email": "rajakumar@gmail.com",
        "password": "rajakumar@123"
    }
  ```
- **Response**:
  ```json
    {
        "message": "Profile updated successfully",
        "user": {
            "_id": "67ed7bc47c4ce058e7da667b",
            "name": "raja kumar",
            "email": "rajakumar@gmail.com",
            "password": "$2b$10$pnMonUQwcK/DRQ28k/rApeTWEnrs7XlpEjUz2S6fNnVWLqMjn4Dgi",
            "createdAt": "2025-04-02T18:02:44.433Z",
            "updatedAt": "2025-04-02T19:25:27.593Z",
            "__v": 0
        }
    }
  ```
---

### `DELETE /api/users/delete/loggedIn`

- **Body**:
  ```json
    {}
  ```
- **Response**:
  ```json
    {
        "message": "User deleted successfully",
    }
  ```
  ---

## When there is an error in the routes ⚠️❌
- **A) When the correct API path is not provided for the create, update, view/find/get, or delete task routes**
  ```json
    {
    "message": "Router Path Not Found. Please check it."
    }
  ```

- **B) When there is an error in the route**
  - **When the correct task ID is not provided in delele route**
    - **req.params.id** : localhost:8005/api/tasks/delete/by/232jaj
    - **Response**
    ```json
      {
          "errors": [
              {
                  "value": "232jaj",
                  "field": "id",
                  "msg": "Task ID must be a valid MongoDB ObjectId"
              }
          ]
      }
    ```

- **C) When trying to delete the same ID that has already been deleted**
    - **req.params.id** : localhost:8005/api/tasks/delete/by/675dc36eeae303526a4f2f0a
    - **Response**
    ```json
        {
            "message": "Task not found"
        }
    ```
    ---
  - **When the correct task ID is not provided in update route**
    - **req.params.id** : localhost:5001/api/update/task/675ff5d727b2d9ea58934827adasda
    - **Response**
    ```json
      {
          "errors": [
              {
                  "value": "675ff5d727b2d9ea58934827adasda",
                  "field": "id",
                  "msg": "Task ID must be a valid MongoDB ObjectId"
              }
          ]
      }
    ```

- **D) When update other user task by ID**
    - **Update Request URL** : http://localhost:8005/api/tasks/update/by/67ed57c8fd0ecf3c8fc8507d
    - **Body** : 
        ```json
        {
            "title": "Web app",
            "description": "Create web and androed application",
            "status": "Done"
        }
        ```
    - **Response**
      ```json
        {
            "message": "Unauthorized: You can only update your own tasks"
        }
      ```
---
## 📝 Note : The Task API should function similarly to the User API. If a route is not found, it should return a "Path Not Found" error. Additionally, proper validation should be implemented to handle input errors and return meaningful validation error messages.

# 🟠 🔗 Appbirds-Task-Management Postman Documentation Link
<p align="center">
  <a href="https://documenter.getpostman.com/view/22765203/2sB2cSgiH5" target="_blank" style="text-decoration: none;">
    <img src="https://img.shields.io/badge/Postman%20Documentation%20Link-Click%20And%20Open%20IN%20Browser-orange?style=for-the-badge" alt="Open API in Postman">
  </a>
</p>

🔗 🟠 **Postman URL:** [Postman Documentation Link](https://documenter.getpostman.com/view/22765203/2sB2cSgiH5)

---

## 📜 Project Deployment Information
- **Backend deployment process on Vercel setup**
  - First, create a `vercel.json` file inside the backend folder, and then use this code:
  ```json
  {
      "version": 2,
      "builds": [
          {
              "src": "server.js",
              "use": "@vercel/node"
          }
      ],
      "routes": [
          {
              "src": "/(.*)",
              "dest": "/server.js"
          }
      ] 
  }
  ```

  - Afterward, add the following script inside the `package.json` file:
  ```json
  "scripts": {
      "dev": "node --watch server.js",
      "build": "node server.js",
      "vercel-build": "echo hello"
  }
  ```
  This sets up the necessary configuration for deploying the backend on Vercel.

# **Backend Deployment Live Link for "Find All Users" API**   

<p align="left">
  <a href="https://appbirds-task-management.vercel.app/api/users/all/data" target="_blank" style="text-decoration: none;">
    <img src="https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel Deployment" style="border-radius: 8px;">
  </a>
</p>

🔗 **Live API URL:** [Find All Users](https://appbirds-task-management.vercel.app/api/users/all/data)
