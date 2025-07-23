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

    // --- Modal Logic ---
    function openModal(overlay) {
        overlay.classList.add('active');
    }

    function closeModal(overlay) {
        overlay.classList.remove('active');
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


    // --- Cart Functionality (Simulated) ---
    let cart = JSON.parse(localStorage.getItem('auraCart')) || [];

    function updateCart() {
        // Update cart display
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is currently empty.</p>';
        } else {
            cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)}</p>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemElement);
            });
        }
        
        // Update total price
        const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotalPriceSpan.textContent = `$${totalPrice.toFixed(2)}`;

        // Update cart count in nav
        cartCountSpan.textContent = cart.length;
        
        // Save to local storage
        localStorage.setItem('auraCart', JSON.stringify(cart));
    }


    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const itemName = card.dataset.name;
            const itemPrice = parseFloat(card.dataset.price);
            const itemImage = card.querySelector('img').src;

            // Simple check to avoid duplicate items (a real cart would have quantity)
            if (!cart.find(item => item.name === itemName)) {
                cart.push({
                    name: itemName,
                    price: itemPrice,
                    image: itemImage,
                });
                
                // Animate button
                button.textContent = 'Added!';
                setTimeout(() => {
                    button.textContent = 'Add to Cart';
                }, 1500);

                updateCart();
            } else {
                alert(`${itemName} is already in your cart.`);
            }
        });
    });

    // Initial cart update on page load
    updateCart();

});document.addEventListener('DOMContentLoaded', () => {

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

    // --- Modal Logic ---
    function openModal(overlay) {
        overlay.classList.add('active');
    }

    function closeModal(overlay) {
        overlay.classList.remove('active');
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


    // --- Cart Functionality (Simulated) ---
    let cart = JSON.parse(localStorage.getItem('auraCart')) || [];

    function updateCart() {
        // Update cart display
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is currently empty.</p>';
        } else {
            cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)}</p>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemElement);
            });
        }
        
        // Update total price
        const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotalPriceSpan.textContent = `$${totalPrice.toFixed(2)}`;

        // Update cart count in nav
        cartCountSpan.textContent = cart.length;
        
        // Save to local storage
        localStorage.setItem('auraCart', JSON.stringify(cart));
    }


    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const itemName = card.dataset.name;
            const itemPrice = parseFloat(card.dataset.price);
            const itemImage = card.querySelector('img').src;

            // Simple check to avoid duplicate items (a real cart would have quantity)
            if (!cart.find(item => item.name === itemName)) {
                cart.push({
                    name: itemName,
                    price: itemPrice,
                    image: itemImage,
                });
                
                // Animate button
                button.textContent = 'Added!';
                setTimeout(() => {
                    button.textContent = 'Add to Cart';
                }, 1500);

                updateCart();
            } else {
                alert(`${itemName} is already in your cart.`);
            }
        });
    });

    // Initial cart update on page load
    updateCart();

});