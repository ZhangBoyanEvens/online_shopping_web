function loadProductDetail() {
    // Get product ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId || !PRODUCTS[productId]) {
        document.getElementById('productDetail').innerHTML = `
            <div class="error-state">
                <h2>Product Not Found</h2>
                <p>The product you're looking for doesn't exist.</p>
                <a href="shop.html" class="btn btn-primary">Back to Shop</a>
            </div>
        `;
        return;
    }
    
    const product = PRODUCTS[productId];
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    const cartItem = cart[productId];
    const qty = cartItem ? cartItem.qty : 0;
    
    const detailHTML = `
        <div class="detail-layout">
            <div class="detail-image-section">
                <img src="${product.image}" alt="${product.name}" class="detail-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22400%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2220%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3E${product.emoji}%3C/text%3E%3C/svg%3E'">
            </div>
            <div class="detail-info-section">
                <div class="detail-header">
                    <h1 class="detail-name">
                        <span class="detail-brand">${product.brand || ''}</span>
                        <span class="detail-name-text">${product.name}</span>
                    </h1>
                    <div class="detail-price">
                        $${product.price.toFixed(2)}
                        <span class="price-unit">${product.priceUnit || ''}</span>
                    </div>
                </div>
                <div class="detail-category">
                    <span class="category-badge">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                </div>
                <div class="detail-description">
                    <h3>Description</h3>
                    <p>${product.description}</p>
                </div>
                <div class="detail-details">
                    <h3>Product Details</h3>
                    <p>${product.details}</p>
                </div>
                <div class="detail-actions">
                    <div class="quantity-section">
                        <label>Quantity:</label>
                        <div class="quantity-control-large">
                            <button class="qty-btn-large" onclick="decreaseDetailQty('${productId}')">-</button>
                            <span class="qty-display" id="detailQty">${qty}</span>
                            <button class="qty-btn-large" onclick="increaseDetailQty('${productId}')">+</button>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-large" onclick="addToCartFromDetail('${productId}')" id="addToCartBtn">
                        ${qty > 0 ? 'Update Cart' : 'Add to Cart'}
                    </button>
                </div>
                <div class="detail-specs">
                    <div class="spec-item">
                        <span class="spec-label">Category:</span>
                        <span class="spec-value">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Price per unit:</span>
                        <span class="spec-value">$${product.price.toFixed(2)}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Product ID:</span>
                        <span class="spec-value">${productId}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('productDetail').innerHTML = detailHTML;
}

function increaseDetailQty(productId) {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    const product = PRODUCTS[productId];
    
    if (!cart[productId]) {
        cart[productId] = {
            name: product.name,
            price: product.price,
            emoji: product.emoji,
            image: product.image,
            qty: 0
        };
    }
    
    cart[productId].qty += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateDetailQty(cart[productId].qty);
}

function decreaseDetailQty(productId) {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    
    if (cart[productId] && cart[productId].qty > 0) {
        cart[productId].qty -= 1;
        if (cart[productId].qty === 0) {
            delete cart[productId];
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateDetailQty(cart[productId] ? cart[productId].qty : 0);
    }
}

function updateDetailQty(qty) {
    document.getElementById('detailQty').textContent = qty;
    const btn = document.getElementById('addToCartBtn');
    if (btn) {
        btn.textContent = qty > 0 ? 'Update Cart' : 'Add to Cart';
    }
}

function addToCartFromDetail(productId) {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    const product = PRODUCTS[productId];
    const qty = parseInt(document.getElementById('detailQty').textContent) || 1;
    
    if (qty === 0) {
        if (confirm('Remove this item from cart?')) {
            delete cart[productId];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            updateDetailQty(0);
        }
        return;
    }
    
    cart[productId] = {
        name: product.name,
        brand: product.brand,
        price: product.price,
        priceUnit: product.priceUnit,
        emoji: product.emoji,
        image: product.image,
        qty: qty
    };
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show success message
    showNotification('Item added to cart!', 'success');
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProductDetail();
});
