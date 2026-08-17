<div align="center">
  
  <h1>🛒 ZestCart - Premium E-Commerce Platform</h1>
  
  <p><strong>A Modern, Full-Stack E-Commerce Web Application built with Next.js, Redux, and MongoDB.</strong></p>

  <div>
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=3395FF" alt="Razorpay" />
  </div>
</div>

<br />

## ✨ Features

- **🛍️ Complete Shopping Experience**: Browse products, view detailed descriptions, and seamlessly add them to your cart.
- **❤️ Wishlist Management**: Save your favorite products for later with a single click.
- **💳 Secure Checkout**: Fully integrated **Razorpay** payment gateway for seamless and secure test/live payments.
- **📦 Order History**: Dedicated user dashboard to track past orders and purchase history.
- **🗂️ Dynamic Categories**: Filter and browse products by categories (Sports, Fashion, Electronics, Toys, Grocery, etc.).
- **🔐 Authentication**: Secure user login and registration system.
- **🎨 Premium UI/UX**: Custom-designed interfaces with beautiful micro-animations, glassmorphism, and responsive layouts built using Vanilla CSS.
- **⚡ High Performance**: Server-Side Rendering (SSR) and API Routes powered by Next.js App Router.

---

## 🛠️ Tech Stack

**Frontend:**
- [Next.js](https://nextjs.org/) (React Framework - App Router)
- [Redux Toolkit](https://redux-toolkit.js.org/) (State Management)
- Vanilla CSS (Custom styling, responsive design)
- React Icons

**Backend & Database:**
- Next.js API Routes (`/app/api/...`)
- [MongoDB](https://www.mongodb.com/) (Database)
- [Mongoose](https://mongoosejs.com/) (ODM)

**Payments:**
- [Razorpay SDK](https://razorpay.com/docs/) (Payment Gateway Integration)

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### 1. Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16.14.0 or higher)
- npm or yarn

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/zestcart.git
cd zestcart
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Environment Variables
Create a `.env.local` file in the root directory and add the following keys:
```env
# MongoDB Connection String
MONGO_DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/ZestCart

# Authentication Secret
JWT_SECRET=your_super_secret_jwt_key

# Razorpay Keys (Get these from Razorpay Dashboard)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Admin Credentials (Hardcoded for testing)
ADMIN_EMAIL=admin@admin.com
ADMIN_PASSWORD=admin
```

### 5. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---


## 📂 Folder Structure

```
e-commerce/
├── public/                 # Static assets (images, icons)
├── src/
│   ├── app/                # Next.js App Router pages & API routes
│   │   ├── api/            # Backend API controllers (auth, cart, orders, etc.)
│   │   ├── cart/           # Cart Page
│   │   ├── checkout/       # Checkout & Payment Page
│   │   ├── orders/         # User Orders History Page
│   │   └── products/       # Product Catalog & Details Pages
│   ├── Components/         # Reusable React components (Header, Footer, Cards)
│   ├── lib/                # MongoDB connection & Mongoose Models
│   └── redux/              # Redux slices and actions
├── .env.local              # Environment variables
└── package.json            # Project metadata and scripts
```

---

## 💡 Acknowledgements
- Designed and developed as a premium, full-stack Next.js learning project.
- High-quality dummy images provided by [Pexels](https://www.pexels.com/) & [Unsplash](https://unsplash.com/).

---

<div align="center">
  <p>Built with ❤️ using Next.js</p>
</div>
