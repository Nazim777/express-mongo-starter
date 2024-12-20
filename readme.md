# 🚀 Express & MongoDB Starter with Full Authentication

This document provides a comprehensive overview of the **Express.js** and **MongoDB** starter project, which includes complete user authentication, password hashing, and route protection using **JSON Web Tokens (JWT)**. This starter file is designed to simplify the process of setting up a secure backend for your application.

---

## ✨ Features

### 1. **User Authentication**

- **🔑 Sign-up:** Allows users to register by providing a unique email and password.
- **🔓 Login:** Enables users to log in by verifying their credentials against the database.

### 2. **🔒 Password Hashing**

- Passwords are securely hashed using **bcrypt** before being stored in the database, ensuring user data security.

### 3. **🛡️ Route Protection**

- Routes are protected using **JWT** to ensure only authenticated users can access certain endpoints.
- Tokens are validated on each request to secure sensitive operations.

---

## 📦 Dependencies

The following dependencies are used in this project:

- **Express:** Web framework for Node.js.
- **Mongoose:** MongoDB object modeling for Node.js.
- **bcrypt:** Library for hashing passwords.
- **jsonwebtoken:** Tool for generating and verifying JWTs.
- **dotenv:** Loads environment variables from a `.env` file.
- **body-parser:** Middleware for parsing incoming request bodies.

---

## 📂 Project Structure

```plaintext
├── config/
│   └── db.js
├── models/
│   └── User.js
├── controllers/
│   └── auth.js
├── routes/
│   └── auth.js
├── middleware/
│   └── authenticate.js
├── utils/
│   └── ErrorHandler.js
├── index.js
├── .env
└── package.json
```

### 📁 **1. Models**

#### `models/User.js`

Defines the user schema and includes fields for email and password. It also contains methods for hashing passwords and comparing hashed passwords during login.

### 📁 **1. Models**

#### `controllers/auth.js`

Controller responsible for handling user-related actions. It processes incoming requests, interacts with the database, and returns appropriate responses, such as creating, updating, or fetching user data.

### 📁 **2. Routes**

#### `routes/auth.js`

Includes the following endpoints:

- **POST /api/v1/auth/register:** Allows users to register. It hashes the password before saving the user to the database.
- **POST /api/v1/auth/login:** Authenticates the user by verifying email and password. Generates a JWT for authenticated users.

### 📁 **3. Middleware**

#### `middleware/authenticate.js`

Middleware to protect routes by verifying the JWT token provided in the request headers. If the token is invalid or missing, access is denied.

### 📁 **4. Main Server File**

#### `index.js`

Initializes the Express app, connects to the MongoDB database, and includes middleware and routes. The application listens for incoming requests on the specified port.

---

## 🛠️ Setup and Installation

1. **📥 Clone the Repository:**

   ```bash
   git clone https://github.com/Nazim777/express-mongo-starter.git
   cd express-mongo-starter
   ```

2. **📦 Install Dependencies:**

   ```bash
   npm install
   ```

3. **🔧 Configure Environment Variables:** Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-secret-key>
   ```

4. **▶️ Run the Application:**

   ```bash
   npm start
   ```

---

## 📌 Usage

### 📍 Endpoints

#### **1. User Registration**

**POST** `api/v1/auth/register`

Request Body:

```json
{
  "username": "user@example",
  "password": "password123"
}
```

Response:

```json
{
  "message": "User registered successfully."
}
```

#### **2. User Login**

**POST** `api/v1/auth/login`

Request Body:

```json
{
  "username": "user@exampe",
  "password": "password123"
}
```

Response:

```json
{
  "token": "<jwt-token>"
}
```

#### **3. Protected Route**

To access a protected route, include the JWT in the `Authorization` header:

**Header:**

```plaintext
Authorization: Bearer <jwt-token>
```

Response:

```json
{
  "message": "Access granted."
}
```

---

## 🔒 Security Considerations

- Always use **HTTPS** in production to secure data transmission.
- Store sensitive information such as `JWT_SECRET` in environment variables.
- Implement rate limiting and input validation to prevent brute-force and injection attacks.

---

## ✅ Conclusion

This starter file provides a robust foundation for developing secure and scalable backend applications with **Express** and **MongoDB**. With built-in authentication, password hashing, and route protection, it reduces the overhead of implementing essential features from scratch.

---

