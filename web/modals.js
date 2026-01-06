// Modal functions for About Us, Contact Us, and Help

function showAboutUs() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>About Us</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <h3>Welcome to SpMart</h3>
                <p>SpMart is your trusted online grocery store, providing fresh, high-quality products delivered right to your doorstep or available for convenient pickup.</p>
                
                <h4>Our Mission</h4>
                <p>To make grocery shopping convenient, affordable, and enjoyable for everyone. We source the finest products and ensure they reach you in perfect condition.</p>
                
                <h4>Why Choose SpMart?</h4>
                <ul>
                    <li>Fresh, quality products from trusted suppliers</li>
                    <li>Convenient pickup and delivery options</li>
                    <li>Competitive prices and special promotions</li>
                    <li>Easy-to-use online shopping platform</li>
                    <li>Excellent customer service</li>
                </ul>
                
                <h4>Our Values</h4>
                <p>Quality, convenience, and customer satisfaction are at the heart of everything we do. We're committed to providing you with the best shopping experience possible.</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
}

function showContactUs() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Contact Us</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <h3>Get in Touch</h3>
                <p>We're here to help! Reach out to us through any of the following channels:</p>
                
                <div class="contact-info">
                    <div class="contact-item">
                        <strong>📞 Phone:</strong>
                        <p>+1 (555) 123-4567</p>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Mon-Fri: 9:00 AM - 6:00 PM</p>
                    </div>
                    
                    <div class="contact-item">
                        <strong>✉️ Email:</strong>
                        <p>support@spmart.com</p>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">We respond within 24 hours</p>
                    </div>
                    
                    <div class="contact-item">
                        <strong>📍 Address:</strong>
                        <p>123 Shopping Street</p>
                        <p>City, State 12345</p>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Store Hours: 8:00 AM - 9:00 PM</p>
                    </div>
                    
                    <div class="contact-item">
                        <strong>💬 Live Chat:</strong>
                        <p>Available on our website</p>
                        <p style="color: var(--text-secondary); font-size: 0.9rem;">Mon-Sun: 8:00 AM - 10:00 PM</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
}

function showHelp() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Help & Support</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <h3>Frequently Asked Questions</h3>
                
                <div class="faq-item">
                    <h4>How do I place an order?</h4>
                    <p>Browse our products, add items to your cart, proceed to checkout, select delivery or pickup, and complete payment.</p>
                </div>
                
                <div class="faq-item">
                    <h4>What payment methods do you accept?</h4>
                    <p>We accept credit cards and cash payments for both pickup and delivery orders.</p>
                </div>
                
                <div class="faq-item">
                    <h4>How does pickup work?</h4>
                    <p>After placing your order, you'll receive a QR code. Show this QR code at the store to collect your items.</p>
                </div>
                
                <div class="faq-item">
                    <h4>What are your delivery charges?</h4>
                    <p>Home delivery costs $4.00. Pickup is free of charge.</p>
                </div>
                
                <div class="faq-item">
                    <h4>Can I modify or cancel my order?</h4>
                    <p>Please contact our customer service team as soon as possible if you need to modify or cancel your order.</p>
                </div>
                
                <div class="faq-item">
                    <h4>Do you offer refunds?</h4>
                    <p>Yes, we offer refunds for damaged or incorrect items. Please contact us within 24 hours of delivery.</p>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.querySelector('.modal-overlay');
    if (modal && event.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});
