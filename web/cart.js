function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    const cartItemsEl = document.getElementById('cartItems');
    const emptyCartEl = document.getElementById('emptyCart');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (Object.keys(cart).length === 0) {
        cartItemsEl.style.display = 'none';
        emptyCartEl.style.display = 'block';
        checkoutBtn.disabled = true;
        updateSummary({});
        return;
    }
    
    cartItemsEl.style.display = 'block';
    emptyCartEl.style.display = 'none';
    checkoutBtn.disabled = false;
    
    cartItemsEl.innerHTML = '';
    
    for (let [id, item] of Object.entries(cart)) {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        const productImage = item.image || '';
        const productEmoji = item.emoji || '📦';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                ${productImage ? `<img src="${productImage}" alt="${item.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><div style="display: none;">${productEmoji}</div>` : `<div>${productEmoji}</div>`}
            </div>
            <div class="cart-item-details">
                <div class="cart-item-name">
                    <span class="cart-item-brand">${item.brand || ''}</span>
                    <span class="cart-item-name-text">${item.name}</span>
                </div>
                <div class="cart-item-price">$${item.price.toFixed(2)} <span class="price-unit">${item.priceUnit || 'each'}</span></div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button onclick="decreaseCartQty('${id}')">-</button>
                        <span>${item.qty}</span>
                        <button onclick="increaseCartQty('${id}')">+</button>
                    </div>
                    <button class="btn btn-secondary" onclick="removeFromCart('${id}')" style="font-size: 0.9rem; padding: 8px 16px;">Remove</button>
                </div>
            </div>
            <div class="cart-item-total">$${(item.price * item.qty).toFixed(2)}</div>
        `;
        cartItemsEl.appendChild(cartItem);
    }
    
    updateSummary(cart);
}

function increaseCartQty(productId) {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    const product = PRODUCTS[productId];
    if (cart[productId]) {
        cart[productId].qty += 1;
        // Ensure all product info is stored
        if (product) {
            if (product.image && !cart[productId].image) {
                cart[productId].image = product.image;
            }
            if (product.brand && !cart[productId].brand) {
                cart[productId].brand = product.brand;
            }
            if (product.priceUnit && !cart[productId].priceUnit) {
                cart[productId].priceUnit = product.priceUnit;
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
        updateCartCount();
    }
}

function decreaseCartQty(productId) {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    if (cart[productId]) {
        cart[productId].qty -= 1;
        if (cart[productId].qty <= 0) {
            delete cart[productId];
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
        updateCartCount();
    }
}

function removeFromCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    delete cart[productId];
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

function updateSummary(cart) {
    let subtotal = 0;
    for (let item of Object.values(cart)) {
        subtotal += item.price * item.qty;
    }
    
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    if (Object.keys(cart).length === 0) {
        alert('Your cart is empty');
        return;
    }
    window.location.href = 'checkout.html';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
});
