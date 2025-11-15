document.addEventListener('DOMContentLoaded', () => {

    const loginBtn = document.getElementById('login-btn');
    const cartBtn = document.getElementById('cart-btn');
    const loginOverlay = document.getElementById('login-overlay');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeLoginBtn = document.getElementById('close-login');
    const closeCartBtn = document.getElementById('close-cart');
    
    const cartCountSpan = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPriceSpan = document.getElementById('cart-total-price');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // --- Smooth Scroll for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Header Scroll Effect ---
    const header = document.querySelector('.main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
            header.style.boxShadow = '0 4px 30px rgba(212, 175, 55, 0.2)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        }
        
        lastScroll = currentScroll;
    });

    // --- Product Cards Scroll Animation ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // --- Modal Logic ---
    function openModal(overlay) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(loginOverlay);
    });

    cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(cartOverlay);
    });

    closeLoginBtn.addEventListener('click', () => closeModal(loginOverlay));
    closeCartBtn.addEventListener('click', () => closeModal(cartOverlay));

    // Close modal if clicking outside the content
    loginOverlay.addEventListener('click', (e) => {
        if (e.target === loginOverlay) closeModal(loginOverlay);
    });
    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) closeModal(cartOverlay);
    });

    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(loginOverlay);
            closeModal(cartOverlay);
        }
    });

    // --- Cart Functionality ---
    let cart = JSON.parse(localStorage.getItem('auraCart')) || [];

    function updateCart() {
        // Update cart display
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--secondary-text);">Your cart is currently empty.</p>';
        } else {
            cart.forEach((item, index) => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.style.animation = `fade-in 0.3s ease ${index * 0.1}s forwards`;
                cartItemElement.style.opacity = '0';
                cartItemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>₹${item.price.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemElement);
            });
        }
        
        // Update total price
        const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotalPriceSpan.textContent = `₹${totalPrice.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

        // Update cart count in nav with animation
        const newCount = cart.length;
        cartCountSpan.style.transform = 'scale(1.5)';
        cartCountSpan.textContent = newCount;
        setTimeout(() => {
            cartCountSpan.style.transform = 'scale(1)';
        }, 300);
        
        // Save to local storage
        localStorage.setItem('auraCart', JSON.stringify(cart));
    }

    // --- Add to Cart with Enhanced Animation ---
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const itemName = card.dataset.name;
            const itemPrice = parseFloat(card.dataset.price);
            const itemImage = card.querySelector('img').src;

            // Check if item already in cart
            if (!cart.find(item => item.name === itemName)) {
                cart.push({
                    name: itemName,
                    price: itemPrice,
                    image: itemImage,
                });
                
                // Enhanced button animation
                const originalHTML = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i><span>Added!</span>';
                button.style.background = 'var(--accent-gold)';
                button.style.color = 'var(--bg-color)';
                button.style.borderColor = 'var(--accent-gold)';
                
                // Create floating notification
                createFloatingNotification(card, itemName);
                
                setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.style.background = '';
                    button.style.color = '';
                    button.style.borderColor = '';
                }, 2000);

                updateCart();
            } else {
                // Item already in cart - show notification
                showNotification('This item is already in your cart', 'warning');
            }
        });
    });

    // --- Floating Notification Effect ---
    function createFloatingNotification(element, itemName) {
        const notification = document.createElement('div');
        notification.textContent = '✓ Added to Cart';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--accent-gold);
            color: var(--bg-color);
            padding: 15px 25px;
            border-radius: 5px;
            font-weight: 600;
            z-index: 10000;
            animation: slide-in-right 0.5s ease, fade-out 0.5s ease 2.5s forwards;
            box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // --- Show Notification ---
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'warning' ? '#ff9800' : 'var(--accent-gold)'};
            color: var(--bg-color);
            padding: 15px 25px;
            border-radius: 5px;
            font-weight: 600;
            z-index: 10000;
            animation: slide-in-right 0.5s ease, fade-out 0.5s ease 2.5s forwards;
            box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // --- Form Submission ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show success message
            showNotification('Thank you! We will contact you soon.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }

    // --- Add CSS Animations ---
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slide-in-right {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes fade-out {
            to {
                opacity: 0;
                transform: translateX(400px);
            }
        }
        
        @keyframes fade-in {
            to {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);



    // --- Product Card Tilt Effect ---
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Initial cart update on page load
    updateCart();

    // --- Cursor Trail Effect (Optional Luxury Touch) ---
    let cursorTrail = [];
    const trailLength = 10;

    document.addEventListener('mousemove', (e) => {
        cursorTrail.push({ x: e.clientX, y: e.clientY });
        if (cursorTrail.length > trailLength) {
            cursorTrail.shift();
        }
    });

    // --- Logo Animation on Click ---
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            logo.style.animation = 'none';
            setTimeout(() => {
                logo.style.animation = '';
            }, 10);
        });
    }

});
