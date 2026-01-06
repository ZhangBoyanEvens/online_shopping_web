function loadCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    const checkoutItemsEl = document.getElementById('checkoutItems');
    
    checkoutItemsEl.innerHTML = '';
    
    for (let [id, item] of Object.entries(cart)) {
        const checkoutItem = document.createElement('div');
        checkoutItem.className = 'checkout-item';
        checkoutItem.innerHTML = `
            <div>
                <div class="checkout-item-name">
                    <span class="checkout-item-brand">${item.brand || ''}</span>
                    <span class="checkout-item-name-text">${item.name}</span>
                </div>
                <div class="checkout-item-qty">Qty: ${item.qty} × $${item.price.toFixed(2)} <span class="price-unit">${item.priceUnit || ''}</span></div>
            </div>
            <div class="checkout-item-price">$${(item.price * item.qty).toFixed(2)}</div>
        `;
        checkoutItemsEl.appendChild(checkoutItem);
    }
    
    updateCheckoutSummary();
    
    // Set minimum date for delivery
    const deliveryDateInput = document.getElementById('deliveryDate');
    if (deliveryDateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        deliveryDateInput.min = tomorrow.toISOString().split('T')[0];
    }
}

function updateDeliveryMethod() {
    const method = document.querySelector('input[name="deliveryMethod"]:checked').value;
    const deliveryInfoSection = document.getElementById('deliveryInfoSection');
    const deliveryFeeRow = document.getElementById('deliveryFeeRow');
    
    if (method === 'delivery') {
        deliveryInfoSection.style.display = 'block';
        deliveryFeeRow.style.display = 'flex';
    } else {
        deliveryInfoSection.style.display = 'none';
        deliveryFeeRow.style.display = 'none';
    }
    
    updateCheckoutSummary();
}

function updateCheckoutSummary() {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    const method = document.querySelector('input[name="deliveryMethod"]:checked')?.value || 'pickup';
    
    let subtotal = 0;
    for (let item of Object.values(cart)) {
        subtotal += item.price * item.qty;
    }
    
    const deliveryFee = method === 'delivery' ? 4.00 : 0;
    const tax = (subtotal + deliveryFee) * 0.08;
    const total = subtotal + deliveryFee + tax;
    
    document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkoutTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;
}

function proceedToPayment() {
    const method = document.querySelector('input[name="deliveryMethod"]:checked').value;
    
    if (method === 'delivery') {
        const deliveryForm = document.getElementById('deliveryForm');
        if (!deliveryForm.checkValidity()) {
            deliveryForm.reportValidity();
            return;
        }
        
        // Store delivery information
        const deliveryInfo = {
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            postalCode: document.getElementById('postalCode').value,
            date: document.getElementById('deliveryDate').value
        };
        localStorage.setItem('deliveryInfo', JSON.stringify(deliveryInfo));
    }
    
    // Store order method
    localStorage.setItem('orderMethod', method);
    
    // Calculate and store order total
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    let subtotal = 0;
    for (let item of Object.values(cart)) {
        subtotal += item.price * item.qty;
    }
    const deliveryFee = method === 'delivery' ? 4.00 : 0;
    const tax = (subtotal + deliveryFee) * 0.08;
    const total = subtotal + deliveryFee + tax;
    localStorage.setItem('orderTotal', total.toFixed(2));
    
    window.location.href = 'payment.html';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadCheckout();
});
