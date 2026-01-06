# SpMart - Online Grocery Shopping Platform

A modern, full-featured e-commerce web application for grocery shopping with a complete checkout system, user authentication, and MongoDB backend integration.

![SpMart](https://img.shields.io/badge/SpMart-Grocery%20Shopping-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Connected-brightgreen)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)

## 🌟 Overview

SpMart is a comprehensive online grocery store platform that provides users with a seamless shopping experience from product browsing to order completion. The platform features user authentication, product catalog management, shopping cart functionality, flexible checkout options (pickup or delivery), payment processing, and order management with QR code generation for pickup orders.

## ✨ Key Features

### 🔐 User Authentication
- User registration and login system
- Secure account management
- Guest checkout option
- Session management

### 🛍️ Shopping Experience
- **Product Catalog**: Browse 60+ products across multiple categories
  - Fruits & Vegetables
  - Bakery Items
  - Dairy Products
  - Beverages
  - Meat & Seafood
  - Snacks & Condiments
  - And more...
- **Search Functionality**: Real-time product search
- **Category Filtering**: Browse products by category
- **Product Details**: Detailed product information with images

### 🛒 Shopping Cart
- Add/remove items
- Quantity adjustment
- Real-time cart total calculation
- Persistent cart storage
- Visual cart count indicator

### 💳 Checkout System
- **Two Delivery Options**:
  - **Pick Up**: Free pickup at store location
  - **Home Delivery**: $4.00 delivery fee with address and date selection
- Order summary with subtotal, tax (8%), and total
- Delivery information form

### 💰 Payment Processing
- Credit card payment form
- Cash payment option
- Secure payment validation
- Order confirmation

### 📱 Order Management
- **QR Code Generation**: For pickup orders
- **Delivery Tracking**: Delivery information and status
- **Order History**: Complete order records

## 🗄️ Backend Integration

### MongoDB Database

SpMart includes full MongoDB integration for persistent data storage:

- **✅ Connected**: MongoDB Atlas cloud database ready for production use
- **Database Models**:
  - **Users**: Account information and authentication
  - **Carts**: Shopping cart data per user
  - **Orders**: Complete order history and billing records

### MongoDB Features

- User account management
- Shopping cart persistence
- Order history tracking
- Billing and payment records
- Delivery information storage

### Connection Status

The application is configured to connect to MongoDB Atlas with:
- Secure SSL connection
- Authentication support
- IP whitelist configuration
- Database migration tools included

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB instance)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd web-20260106T081605Z-3-001
   ```

2. **Install dependencies**
   ```bash
   cd web
   npm install
   ```

3. **Configure MongoDB** (Optional - for backend features)
   
   Edit `mongodb-migration.js` and `server.js` with your MongoDB connection string:
   ```javascript
   const MONGODB_URL = 'mongodb://example:example@example.mongodb.net/database';
   ```

4. **Start the application**
   
   **Option A: Frontend only (localStorage)**
   - Simply open `index.html` in your web browser
   - No server required for basic functionality

   **Option B: With MongoDB backend**
   ```bash
   # Start the API server
   npm run server
   # or
   node server.js
   ```
   - Server runs on `http://localhost:3000`
   - Frontend can connect to API endpoints

### MongoDB Setup

1. **Test MongoDB Connection**
   ```bash
   node test-connection.js
   ```

2. **Migrate Data to MongoDB** (if needed)
   ```bash
   node mongodb-migration.js
   ```

3. **Configure IP Whitelist**
   - Log in to MongoDB Atlas
   - Go to Network Access
   - Add your IP address or use `0.0.0.0/0` for testing

## 📁 Project Structure

```
web/
├── index.html              # Home page with login/signup
├── shop.html              # Main shopping page
├── cart.html              # Shopping cart page
├── checkout.html          # Checkout page
├── payment.html           # Payment page
├── qrcode.html            # QR code display for pickup
├── delivery.html          # Delivery confirmation
│
├── styles.css             # Main stylesheet
├── app.js                 # Core application logic
├── shop.js                # Shopping page functionality
├── cart.js                # Cart management
├── checkout.js            # Checkout process
├── payment.js             # Payment processing
├── qrcode.js              # QR code generation
├── delivery.js            # Delivery information
├── modals.js              # Modal dialogs
├── animations.js          # UI animations
│
├── server.js              # Express.js API server
├── mongodb-migration.js   # MongoDB data migration script
├── test-connection.js     # MongoDB connection tester
│
├── package.json           # Node.js dependencies
├── images/                # Product images
└── node_modules/          # NPM packages
```

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables and animations
- **Vanilla JavaScript**: No framework dependencies
- **LocalStorage API**: Client-side data persistence

### Backend
- **Node.js**: Runtime environment
- **Express.js**: RESTful API server
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling

### Libraries
- **QRCode.js**: QR code generation (CDN)
- **Mongoose**: MongoDB ODM

## 📡 API Endpoints

When using the MongoDB backend, the following API endpoints are available:

### User Management
- `GET /api/users/:email` - Get user information
- `POST /api/users` - Create new user
- `POST /api/users/login` - User authentication

### Shopping Cart
- `GET /api/cart/:userId` - Get user's cart
- `PUT /api/cart/:userId` - Update cart
- `DELETE /api/cart/:userId` - Clear cart

### Orders
- `GET /api/orders/:userId` - Get user's order history
- `GET /api/orders/order/:orderNumber` - Get specific order
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:orderNumber` - Update order status

## 🎨 Features in Detail

### Product Catalog
- 60+ products with detailed information
- High-quality product images
- Category-based organization
- Search functionality
- Price and unit information

### Shopping Cart
- Persistent across sessions
- Real-time price calculation
- Quantity management
- Item removal
- Visual feedback

### Checkout Process
- Delivery method selection
- Address form for delivery
- Date selection for delivery
- Tax calculation (8%)
- Order summary

### Payment Options
- Credit card payment
- Cash payment
- Payment validation
- Secure processing simulation

### Order Confirmation
- QR code for pickup orders
- Delivery details for home delivery
- Order number generation
- Order history tracking

## 🔒 Security Features

- Password validation (minimum 6 characters)
- Email format validation
- Secure authentication flow
- MongoDB connection with SSL
- IP whitelist support

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

## 🧪 Testing

### Test MongoDB Connection
```bash
node test-connection.js
```

### Test Different Connection Formats
```bash
node test-connection-variations.js
```

## 📚 Documentation

- `MONGODB_MIGRATION_README.md` - MongoDB migration guide
- `MONGODB_SETUP.md` - MongoDB setup instructions
- `API_USAGE.md` - API server usage guide
- `FIX_AUTHENTICATION.md` - Troubleshooting authentication issues

## 🚧 Development Status

- ✅ User authentication system
- ✅ Product catalog and search
- ✅ Shopping cart functionality
- ✅ Checkout process
- ✅ Payment processing
- ✅ QR code generation
- ✅ MongoDB integration
- ✅ API server
- ✅ Data migration tools

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available for educational purposes.

## 👤 Author

SpMart Development Team

## 🙏 Acknowledgments

- Product images and data
- MongoDB Atlas for database hosting
- Open source libraries and tools

## 📞 Support

For issues or questions:
1. Check the documentation files in the project
2. Review MongoDB setup guides
3. Test connection using provided test scripts

---

**Note**: This is a full-stack e-commerce application with both frontend and backend capabilities. The frontend can work standalone using localStorage, or connect to the MongoDB backend for persistent data storage and advanced features.

