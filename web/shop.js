let currentCategory = 'all';
let allProducts = [];

function loadProducts() {
    allProducts = Object.entries(PRODUCTS).map(([id, product]) => ({
        id,
        ...product
    }));
    displayProducts(allProducts);
    updateProductCount(allProducts.length);
}

function displayProducts(products) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    
    if (products.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No products found</p>';
        return;
    }
    
    products.forEach(product => {
        const cart = JSON.parse(localStorage.getItem('cart') || '{}');
        const cartItem = cart[product.id];
        const qty = cartItem ? cartItem.qty : 0;
        
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image-container" onclick="goToDetail('${product.id}')">
                <img src="${product.image || ''}" alt="${product.name}" class="product-image-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="product-image" style="display: none;">${product.emoji}</div>
            </div>
            <div class="product-name" onclick="goToDetail('${product.id}')" style="cursor: pointer;">
                <span class="product-brand">${product.brand || ''}</span>
                <span class="product-name-text">${product.name}</span>
            </div>
            <div class="product-price">
                $${product.price.toFixed(2)}
                <span class="price-unit">${product.priceUnit || ''}</span>
            </div>
            <div class="product-actions">
                ${qty > 0 ? `
                    <div class="quantity-control">
                        <button onclick="event.stopPropagation(); decreaseQty('${product.id}')">-</button>
                        <span>${qty}</span>
                        <button onclick="event.stopPropagation(); increaseQty('${product.id}')">+</button>
                    </div>
                ` : `
                    <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart('${product.id}')" style="width: 100%;">Add to Cart</button>
                `}
            </div>
        `;
        grid.appendChild(card);
    });
}

function goToDetail(productId) {
    window.location.href = `detail.html?id=${productId}`;
}

function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    const product = PRODUCTS[productId];
    
    if (!product) return;
    
    if (cart[productId]) {
        cart[productId].qty += 1;
    } else {
        cart[productId] = {
            name: product.name,
            brand: product.brand,
            price: product.price,
            priceUnit: product.priceUnit,
            emoji: product.emoji,
            image: product.image,
            qty: 1
        };
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Refresh product display
    const filtered = currentCategory === 'all' 
        ? allProducts 
        : allProducts.filter(p => p.category === currentCategory);
    displayProducts(filtered);
}

function increaseQty(productId) {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    if (cart[productId]) {
        cart[productId].qty += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        const filtered = currentCategory === 'all' 
            ? allProducts 
            : allProducts.filter(p => p.category === currentCategory);
        displayProducts(filtered);
    }
}

function decreaseQty(productId) {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    if (cart[productId]) {
        cart[productId].qty -= 1;
        if (cart[productId].qty <= 0) {
            delete cart[productId];
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        const filtered = currentCategory === 'all' 
            ? allProducts 
            : allProducts.filter(p => p.category === currentCategory);
        displayProducts(filtered);
    }
}

function filterByCategory(category) {
    currentCategory = category;
    
    // Update active category link
    document.querySelectorAll('.category-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const filtered = category === 'all' 
        ? allProducts 
        : allProducts.filter(p => p.category === category);
    
    displayProducts(filtered);
    updateProductCount(filtered.length);
}

function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm) &&
        (currentCategory === 'all' || p.category === currentCategory)
    );
    displayProducts(filtered);
    updateProductCount(filtered.length);
    updateClearButton();
}

function handleSearchFocus() {
    const searchWrapper = document.querySelector('.search-bar-wrapper');
    if (searchWrapper) {
        searchWrapper.classList.add('focused');
    }
    updateClearButton();
}

function handleSearchBlur() {
    const searchWrapper = document.querySelector('.search-bar-wrapper');
    if (searchWrapper) {
        setTimeout(() => {
            searchWrapper.classList.remove('focused');
        }, 200);
    }
}

function updateClearButton() {
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('searchClearBtn');
    if (searchInput && clearBtn) {
        if (searchInput.value.length > 0) {
            clearBtn.style.display = 'flex';
            setTimeout(() => {
                clearBtn.classList.add('show');
            }, 10);
        } else {
            clearBtn.classList.remove('show');
            setTimeout(() => {
                clearBtn.style.display = 'none';
            }, 300);
        }
    }
}

function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
        filterProducts();
        updateClearButton();
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        filterProducts();
        // Add a subtle animation feedback
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                searchBtn.style.transform = '';
            }, 150);
        }
    }
}

function updateProductCount(count) {
    const countEl = document.getElementById('productCount');
    if (countEl) {
        countEl.textContent = `Showing ${count} product${count !== 1 ? 's' : ''}`;
    }
}

// Carousel functionality
let currentSlide = 0;
let carouselInterval;

function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;
    
    // Set initial position
    updateCarousel();
    
    // Auto-play carousel
    carouselInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }, 5000); // Change slide every 5 seconds
    
    // Pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });
        carouselContainer.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                updateCarousel();
            }, 5000);
        });
    }
}

function updateCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    if (slides[currentSlide]) {
        slides[currentSlide].classList.add('active');
    }
    if (indicators[currentSlide]) {
        indicators[currentSlide].classList.add('active');
    }
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    currentSlide += direction;
    
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    } else if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    
    updateCarousel();
    
    // Reset auto-play timer
    clearInterval(carouselInterval);
    carouselInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }, 5000);
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    
    // Reset auto-play timer
    clearInterval(carouselInterval);
    carouselInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % document.querySelectorAll('.carousel-slide').length;
        updateCarousel();
    }, 5000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    initCarousel();
    
    // Add Enter key support for search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Update clear button on input
        searchInput.addEventListener('input', function() {
            updateClearButton();
        });
    }
});
