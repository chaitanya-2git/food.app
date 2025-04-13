document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    initializeCartFunctionality();
    updateCartCount();
});

function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cartItems');

    if (cartItems.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty</p>
                <a href="/menu.html" class="btn btn-primary">Browse Menu</a>
            </div>
        `;
        updateCartSummary();
        return;
    }

    cartContainer.innerHTML = cartItems.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeItem('${item.id}')">×</button>
        </div>
    `).join('');

    updateCartSummary();
}

function updateQuantity(itemId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => String(item.id) === String(itemId));

    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;

        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartCount();
    }
}

function removeItem(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => String(item.id) !== String(itemId));
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryFee = cart.length > 0 ? 2.99 : 0;
    const total = subtotal + deliveryFee;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('deliveryFee').textContent = `$${deliveryFee.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function initializeCartFunctionality() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    const promoCodeBtn = document.getElementById('applyPromo');

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert('Proceeding to checkout...');
        });
    }

    if (promoCodeBtn) {
        promoCodeBtn.addEventListener('click', () => {
            const promoCode = document.getElementById('promoCode').value;
            alert(`Promo code "${promoCode}" applied!`);
        });
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountEl = document.querySelector('.cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = totalItems;
    }
}
