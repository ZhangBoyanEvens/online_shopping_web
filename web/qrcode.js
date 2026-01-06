function generateQRCode() {
    const orderNumber = localStorage.getItem('orderNumber') || 'ORD-' + Date.now();
    const orderTotal = localStorage.getItem('orderTotal') || '0.00';
    
    document.getElementById('orderNumber').textContent = orderNumber;
    document.getElementById('orderTotal').textContent = `$${orderTotal}`;
    
    // Generate QR code with order information
    const qrData = JSON.stringify({
        orderNumber: orderNumber,
        timestamp: new Date().toISOString(),
        total: orderTotal
    });
    
    QRCode.toCanvas(document.getElementById('qrcodeCanvas'), qrData, {
        width: 300,
        margin: 2,
        color: {
            dark: '#000000',
            light: '#FFFFFF'
        }
    }, function (error) {
        if (error) {
            console.error('Error generating QR code:', error);
            document.getElementById('qrcodeCanvas').parentElement.innerHTML = 
                '<p style="color: var(--danger-color);">Error generating QR code. Order Number: ' + orderNumber + '</p>';
        }
    });
}

function printQRCode() {
    window.print();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    generateQRCode();
});
