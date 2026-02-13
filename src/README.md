📦 E-Commerce Backend API

A complete Node.js + Express + MongoDB based E-Commerce Backend API with secure authentication and role-based authorization.

🚀 Project Overview

This project is a backend REST API for an E-Commerce system that includes:

1. User & Admin Authentication
2. JWT Based Authorization
3. Role-Based Access Control
4. Product Management (Admin)
5. Order Management (User & Admin)
6. Secure Middleware Structure
7. MongoDB Database Integration

🛠️ Tech Stack

1. Node.js
2. Express.js
3. MongoDB
4. Mongoose
5. JWT (jsonwebtoken)
6. bcryptjs
7. dotenv

🔐 Authentication & Authorization Flow

1. User/Admin registers
2. Password is hashed using bcrypt before storing in MongoDB
3. On successful login, JWT token is generated
4. Client sends token in headers:

Authorization: Bearer <JWT_TOKEN>

5. authMiddleware verifies the JWT
6. roleMiddleware authorizes access based on user role

📁 Project Structure:

src
│
├── controllers
│   ├── authController.js
│   ├── productController.js
│   └── orderController.js
│
├── middleware
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── models
│   ├── userModel.js
│   ├── productModel.js
│   └── orderModel.js
│
├── routes
│   ├── userRoutes.js
│   ├── productRoutes.js
│   └── orderRoutes.js
│
├── .env
├── server.js
└── package.json

👤 User Roles

The system supports two roles:

1. user
2. admin

📦 Product Module
Admin Only

1. Get All Products
2. Get Product By ID
3. Create Product
4. Update Product
5. Delete Product

Routes Example:

GET     /api/products
GET     /api/products/:id
POST    /api/products/create
PUT     /api/products/update/:id
DELETE  /api/products/delete/:id

🛒 Order Module:

User Capabilities:
Create Order
Get My Orders

Admin Capabilities:
Get All Orders
Update Order Status

Routes Example:

POST    /api/orders/create
GET     /api/orders/my-orders
GET     /api/orders
PUT     /api/orders/update/:id

🔐 Middleware Implementation:

1️⃣ authMiddleware

Verifies JWT token
Extracts user ID and role
Attaches user to req.user

Example:
req.user = {
  _id: decoded.userId,
  role: decoded.role
};

2️⃣ roleMiddleware

Checks if logged-in user has required role
Protects routes from unauthorized access

Example:
roleMiddleware(["admin"])

🧠 Security Features

1. Password hashing using bcrypt
2. JWT authentication
3. Role-based route protection
4. No role taken from request body (secured from manipulation)
5. Proper error handling with status codes

⚙️ Environment Variables

Create a .env file in root:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

▶️ Installation & Setup

1️⃣ Clone the repository
git clone <your-repo-link>

2️⃣ Install dependencies
npm install

3️⃣ Create .env file

4️⃣ Start the server
npm run dev

OR

node server.js

📬 API Testing

You can test APIs using:
Postman
Thunder Client

Remember to add JWT token in headers:
Authorization: Bearer <TOKEN>

📌 Learning Outcomes

Through this project:

1. Implemented secure authentication
2. Understood middleware chaining
3. Applied role-based authorization
4. Built scalable folder structure
5. Practiced real-world backend architecture

🔮 Future Improvements

1. Cart functionality
2. Multiple products in single order
3. Payment gateway integration
4. Advanced error handling middleware
5. Pagination & Filtering
6. Admin dashboard APIs

👨‍💻 Author

Muhammad Hasnain
Backend Developer (Learning & Growing 🚀)