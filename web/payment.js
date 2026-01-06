function formatCardNumber(input) {
    let value = input.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    input.value = formattedValue;
}

function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;
}

function loadPayment() {
    const orderTotal = localStorage.getItem('orderTotal') || '0.00';
    document.getElementById('paymentTotal').textContent = `$${orderTotal}`;
    document.getElementById('cashPaymentTotal').textContent = `$${orderTotal}`;
}

function updatePaymentMethod() {
    const method = document.querySelector('input[name="paymentMethod"]:checked').value;
    const cardForm = document.getElementById('cardPaymentForm');
    const cashForm = document.getElementById('cashPaymentForm');
    
    if (method === 'card') {
        cardForm.style.display = 'block';
        cashForm.style.display = 'none';
    } else {
        cardForm.style.display = 'none';
        cashForm.style.display = 'block';
    }
}

function handleCashPayment(event) {
    event.preventDefault();
    
    // Store payment info
    const paymentInfo = {
        method: 'cash',
        type: 'Cash Payment'
    };
    localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));
    
    // Generate order number
    const orderNumber = 'ORD-' + Date.now();
    localStorage.setItem('orderNumber', orderNumber);
    
    // Clear cart
    localStorage.setItem('cart', JSON.stringify({}));
    
    // Redirect based on order method
    const orderMethod = localStorage.getItem('orderMethod');
    if (orderMethod === 'pickup') {
        window.location.href = 'qrcode.html';
    } else {
        window.location.href = 'delivery.html';
    }
}

function handlePayment(event) {
    event.preventDefault();
    
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const cardName = document.getElementById('cardName').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    
    // Basic validation
    if (cardNumber.length < 13 || cardNumber.length > 19) {
        alert('Please enter a valid card number');
        return;
    }
    
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        alert('Please enter a valid expiry date (MM/YY)');
        return;
    }
    
    if (!/^\d{3,4}$/.test(cvv)) {
        alert('Please enter a valid CVV');
        return;
    }
    
    // Store payment info (in real app, this would be sent to secure payment processor)
    const paymentInfo = {
        method: 'card',
        type: 'Credit Card',
        cardNumber: cardNumber.replace(/\d(?=\d{4})/g, '*'), // Mask card number
        cardName,
        expiryDate
    };
    localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));
    
    // Generate order number
    const orderNumber = 'ORD-' + Date.now();
    localStorage.setItem('orderNumber', orderNumber);
    
    // Clear cart
    localStorage.setItem('cart', JSON.stringify({}));
    
    // Redirect based on order method
    const orderMethod = localStorage.getItem('orderMethod');
    if (orderMethod === 'pickup') {
        window.location.href = 'qrcode.html';
    } else {
        window.location.href = 'delivery.html';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadPayment();
});
