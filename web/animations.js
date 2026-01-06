// Enhanced animations and interactions

// Add ripple effect to buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add loading state to buttons
function setButtonLoading(button, isLoading) {
    if (isLoading) {
        button.classList.add('btn-loading');
        button.disabled = true;
    } else {
        button.classList.remove('btn-loading');
        button.disabled = false;
    }
}

// Animate cart count update
function animateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.classList.add('updated');
        setTimeout(() => {
            cartCount.classList.remove('updated');
        }, 500);
    }
}

// Add smooth scroll
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add fade in animation to elements
function fadeInElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    const elements = document.querySelectorAll('.product-card, .cart-item, .checkout-item');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(el);
    });
}

// Add success animation
function showSuccessAnimation(element) {
    element.style.animation = 'successPulse 0.6s';
    setTimeout(() => {
        element.style.animation = '';
    }, 600);
}

// Add error shake animation
function shakeElement(element) {
    element.style.animation = 'shake 0.5s';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', function() {
    addRippleEffect();
    fadeInElements();
    
    // Add click sound effect (optional - can be removed)
    const buttons = document.querySelectorAll('.btn, .product-card, .cart-link');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes successPulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
        }
    }
`;
document.head.appendChild(style);
