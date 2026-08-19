# 🛒 ZestCart - Premium E-Commerce Platform

A premium e-commerce web application built with **Next.js App Router**, featuring user authentication, an admin dashboard, product browsing, cart & wishlist management, and secure checkout powered by **Razorpay**.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-State%20Management-764ABC?logo=redux&logoColor=white)
![Razorpay](https://img.shields.io/badge/Razorpay-Payments-0C2451?logo=razorpay&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

## ✨ Features

- 🔐 User registration and login with JWT-based authentication
- 🔒 Secure password hashing using bcryptjs
- 🧑‍💼 Fully functional **Admin Dashboard** (add categories, products, view stats)
- 🛍️ Product listing, dynamic categories, and detailed product pages
- 🛒 Add to cart, update quantity, remove items
- ❤️ **Wishlist** functionality for saving favorite products
- 📦 Checkout page with delivery details
- 💰 Order price calculation
- 💳 **Razorpay payment integration** (order creation & verification)
- ✅ Automatic cart clearing after successful payment
- 📜 **Order History** for users to track their past purchases
- 📱 Responsive and attractive user interface built with custom Vanilla CSS & React Bootstrap
- ⏳ Loading states and error handling across the app
- 🛡️ Protected API operations for authenticated users
- 🗄️ MongoDB integration via Mongoose for data persistence
- 🌐 REST-style API routes using Next.js Route Handlers

---

## 🧰 Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| UI Library | React 18 |
| Styling | Custom CSS, React Bootstrap |
| Icons | React Icons, Bootstrap Icons |
| State Management | Redux Toolkit, React Redux |
| HTTP Client | Axios |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT (jsonwebtoken), bcryptjs |
| Payments | Razorpay |
| Runtime | Node.js |

---

## 🔄 Application Flow

1. User visits the site and browses products or categories.
2. User signs up or logs in (JWT-based authentication).
3. User views product details and adds items to their Cart or Wishlist.
4. Global state is managed seamlessly via Redux Toolkit.
5. User proceeds to checkout and fills in their details.
6. Payment is processed through Razorpay.
7. On successful payment verification, the order is saved and the cart is cleared.
8. User is redirected to a beautiful Success page.

---

## 🔐 Authentication Flow

Authentication is handled using **JWT (JSON Web Token)** combined with **bcryptjs** for password security.

- **Registration:** When a user signs up, their password is hashed using `bcryptjs` before being stored in MongoDB.
- **Login:** On login, the submitted password is compared against the hashed password. If valid, a JWT is generated.
- **Role-Based Access:** Admins have a dedicated Dashboard (protected from regular users) where they can manage products and categories.
- **Protected Routes:** Backend API routes verify the JWT via middleware/headers before allowing access to sensitive operations (e.g., cart updates, order fetching, admin operations).

---

## 🛒 Shopping Cart & Wishlist Flow

```
User selects a product
   → Adds product to Cart / Wishlist
   → Views Cart Page
   → Updates quantities or removes products
   → Proceeds to Checkout
---

## 💳 Checkout & Razorpay Payment Flow

The project integrates **Razorpay** for a secure checkout process:

1. User reviews the cart and clicks Checkout.
2. The frontend sends a request to the backend to generate a Razorpay order.
3. The backend creates a corresponding **Razorpay order ID**.
4. The Razorpay checkout modal opens seamlessly on the frontend.
5. The user completes the payment using test/live credentials.
6. Razorpay returns payment details (order ID, payment ID, signature).
7. The backend verifies the payment signature to confirm authenticity.
8. On success, the **order is saved**, the **cart is cleared**, and the user is redirected to `/success`.

---

## 🏗️ Project Architecture

- **Frontend & Backend** are unified within a single Next.js application using the **App Router**.
- **API Route Handlers** (inside `src/app/api`) serve as the backend, handling authentication, products, categories, cart, orders, and payment logic.
- **MongoDB** stores application data, accessed through **Mongoose** models (`User`, `Product`, `Category`, `Cart`, `Wishlist`, `Order`).
- **Redux Toolkit** manages global client-side state.
- **Axios** is used on the frontend to communicate with API route handlers.

---

## 📁 Folder Structure

```
zestcart/
├── public/                 # Static images and icons
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── admin/          # Admin Dashboard & forms
│   │   ├── api/            # Backend REST APIs (auth, cart, payment, products)
│   │   ├── cart/           # Cart Page
│   │   ├── categories/     # Category Pages
│   │   ├── checkout/       # Razorpay Checkout Logic
│   │   ├── contact/        # Contact Page
│   │   ├── orders/         # User Order History
│   │   ├── products/       # Product Details & Listing
│   │   ├── profile/        # User Profile
│   │   ├── signin/         # Login Page
│   │   ├── signup/         # Registration Page
│   │   ├── success/        # Payment Success Page
│   │   ├── wishlist/       # Wishlist Page
│   │   ├── layout.js       # Root Layout
│   │   └── page.js         # Landing / Home Page
│   ├── Components/         # Reusable React UI Components
│   │   ├── CartCard/
│   │   ├── Categories/
│   │   ├── Features/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── Hero/
│   │   ├── Newsletter/
│   │   ├── ProductCard/
│   │   ├── Products/
│   │   ├── Testimonials/
│   │   └── WishlistCard/
│   ├── lib/                # MongoDB configuration & Mongoose Models
│   │   ├── db.js           # Database Connection
│   │   └── model/          # Data Schemas
│   └── redux/              # Global State Management
│       ├── actions/        # Thunks for async API calls
│       ├── slices/         # Redux Reducers
│       └── store.js        # Redux Store Configuration
├── .env.local              # Environment Variables
├── package.json            # Dependencies
└── README.md               # Project Documentation
```

---

## 🔌 API Overview

The backend APIs are structured under `src/app/api`:

| Category | Description |
|---|---|
| **Authentication APIs** | `/api/auth/register`, `/api/auth/login`, `/api/profile` |
| **Product APIs** | `/api/products`, `/api/products/[id]` |
| **Category APIs** | `/api/category`, `/api/category/[id]` |
| **Cart APIs** | `/api/cart`, `/api/cart/add`, `/api/cart/update`, `/api/cart/remove` |
| **Wishlist APIs** | `/api/wishlist`, `/api/wishlist/add`, `/api/wishlist/remove` |
| **Payment APIs** | `/api/payment/create-order`, `/api/payment/verify-payment` |
| **Order APIs** | `/api/user-orders/[userId]`, `/api/admin/orders` |

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
MONGO_DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

ADMIN_EMAIL=admin@zestcart.com
ADMIN_PASSWORD=your_admin_password

NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

| Variable | Description |
|---|---|
| `MONGO_DB_URL` | Connection string for your MongoDB database |
| `JWT_SECRET` | Secret key used to sign and verify JWTs |
| `ADMIN_EMAIL` | Credentials to log into the Admin Dashboard |
| `ADMIN_PASSWORD` | Password for the Admin Dashboard |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Public Razorpay Key ID used on the frontend |
| `RAZORPAY_KEY_SECRET` | Private Razorpay secret key used only on the backend |

> ⚠️ **Never commit your `.env.local` file to GitHub.** Add it to `.gitignore` and keep all secrets private.

---

## ⚙️ Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/zestcart.git
cd zestcart
npm install
```

---

## ▶️ Running the Project

Start the development server:

```bash
npm run dev
```

The app will be available at:

```
http://localhost:3000
```

---