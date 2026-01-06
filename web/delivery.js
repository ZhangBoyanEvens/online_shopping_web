function loadDeliveryInfo() {
    const orderNumber = localStorage.getItem('orderNumber') || 'ORD-' + Date.now();
    const orderTotal = localStorage.getItem('orderTotal') || '0.00';
    const deliveryInfo = JSON.parse(localStorage.getItem('deliveryInfo') || '{}');
    
    document.getElementById('deliveryOrderNumber').textContent = orderNumber;
    document.getElementById('deliveryTotal').textContent = `$${orderTotal}`;
    
    if (deliveryInfo.address) {
        const fullAddress = `${deliveryInfo.address}, ${deliveryInfo.city} ${deliveryInfo.postalCode}`;
        document.getElementById('deliveryAddress').textContent = fullAddress;
        document.getElementById('deliveryDate').textContent = new Date(deliveryInfo.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadDeliveryInfo();
});
