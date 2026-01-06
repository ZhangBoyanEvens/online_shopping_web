# SpMart - Online Grocery Store Checkout System

A modern, responsive web-based checkout system for grocery shopping with multiple pages and full functionality.

## Features

### REQ-30: Home Page
- User login with existing account
- User sign up with new account
- Information stored and retrieved from browser localStorage (simulating database)

### REQ-31: Main Shopping Page
- Browse all products
- Search for desired items
- Browse items by category (Fruits, Bakery, Dairy, Beverages, etc.)

### REQ-32: Add to Cart
- Add/remove items and adjust quantities
- Cart icon shows item count
- Clicking cart icon leads to checkout page displaying all cart items

### REQ-33: Checkout
- Select between delivery or pickup options
- Option 1: "Pick up" (Free)
- Option 2: "Home delivery (+$4.00)"

### REQ-34: Pickup Option
- After payment, QR code is generated for the order
- User must show QR code to supermarket staff to pick up items

### REQ-35: Home Delivery Option
- Users enter housing details (address, city, postal code)
- Users select a date for delivery

### REQ-36: ATM Payment Function
- Users enter credit card credentials to proceed with payment
- Card number, name, expiry date, and CVV fields

## File Structure

```
web/
├── index.html          # Home page with login/signup
├── shop.html          # Main shopping page
├── cart.html          # Shopping cart page
├── checkout.html      # Checkout page with delivery options
├── payment.html        # Payment page with credit card form
├── qrcode.html         # QR code display for pickup orders
├── delivery.html       # Delivery confirmation page
├── styles.css          # Main stylesheet
├── app.js              # Core application logic and authentication
├── shop.js             # Shopping page functionality
├── cart.js             # Cart management
├── checkout.js         # Checkout process
├── payment.js          # Payment processing
├── qrcode.js           # QR code generation
└── delivery.js         # Delivery information display
```

## How to Use

1. **Open the website**: Open `index.html` in a web browser
2. **Sign up or Login**: Create a new account or login with existing credentials
3. **Browse Products**: Navigate to the shop page to browse and search products
4. **Add to Cart**: Click "Add to Cart" or use quantity controls on products
5. **View Cart**: Click the cart icon to view all items
6. **Checkout**: Select pickup or delivery option
7. **Payment**: Enter credit card information
8. **Confirmation**: View QR code (for pickup) or delivery information (for delivery)

## Technical Details

- **Storage**: Uses browser localStorage to simulate database storage
- **Authentication**: User accounts stored in localStorage
- **Cart Management**: Cart data persisted in localStorage
- **QR Code**: Uses QRCode.js library (loaded from CDN)
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, professional design inspired by mainstream checkout systems

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Notes

- This is a front-end only implementation using localStorage for data persistence
- In a production environment, this would connect to a backend database
- Payment processing is simulated - no actual payment processing occurs
- QR codes are generated client-side using the QRCode.js library
