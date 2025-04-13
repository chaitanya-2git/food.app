// Menu data
const menuItems = [
    {
        id: 1,
        name: "Margherita Pizza",
        category: "pizza",
        price: 12.99,
        description: "Fresh basil, mozzarella, tomatoes",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591"
    },
    {
        id: 2,
        name: "Classic Burger",
        category: "burger",
        price: 9.99,
        description: "100% Angus beef with cheese",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
    },
    {
        id: 3,
        name: "Sushi Roll",
        category: "sushi",
        price: 15.99,
        description: "Fresh salmon, avocado, rice",
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8"
    },
    {
        id: 4,
        name: "Chocolate Cake",
        category: "dessert",
        price: 6.99,
        description: "Rich chocolate cake with ganache",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587"
    },
    {
        id: 5,
        name: "Caesar Salad",
        category: "salad",
        price: 8.99,
        description: "Romaine, croutons, Caesar dressing",
        image: "https://cdn.loveandlemons.com/wp-content/uploads/2024/12/caesar-salad-recipe-1160x1567.jpg"
    },
    {
        id: 6,
        name: "Pasta Primavera",
        category: "pasta",
        price: 11.99,
        description: "Pasta with seasonal vegetables",
        image: "https://cdn.loveandlemons.com/wp-content/uploads/2022/06/pasta-primavera-1.jpg"
    },
    {
        id: 7,
        name: "Tacos",
        category: "taco",
        price: 10.99,
        description: "Soft tortillas with beef and salsa",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/1024px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg"
    },
    {
        id: 8,
        name: "Fish and Chips",
        category: "fish",
        price: 13.99,
        description: "Crispy fish with fries",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Fish_and_chips_blackpool.jpg"
    },
    {
        id: 9,
        name: "Vegetable Stir Fry",
        category: "stir-fry",
        price: 10.99,
        description: "Mixed vegetables with soy sauce",
        image: "https://therecipecritic.com/wp-content/uploads/2019/08/vegetable_stir_fry.jpg"
    },
    {
        id: 10,
        name: "BBQ Chicken Wings",
        category: "wings",
        price: 12.99,
        description: "Spicy BBQ chicken wings",
        image: "https://www.kitchensanctuary.com/wp-content/uploads/2020/06/bbq-chicken-wings-tall-FS-8-1024x1536.webp"
    },
    {
        id: 11,
        name: "Greek Salad",
        category: "salad",
        price: 9.99,
        description: "Feta cheese, olives, tomatoes",
        image: "https://cdn.loveandlemons.com/wp-content/uploads/2019/07/greek-salad-2.jpg"
    },
    {
        id: 12,
        name: "Pancakes",
        category: "breakfast",
        price: 7.99,
        description: "Fluffy pancakes with syrup",
        image: "https://cdn.prod.website-files.com/6682ad647d71ff9a4ed5a566/6682ad647d71ff9a4ed5aaef_64de6e448a33e3478956edd3_64de5fe001ec856580edd1d7_Fluffy_Pancakes__with_almond__coconut_flour_ComfyB.jpeg"
    },
];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    displayMenuItems(menuItems);
    initializeFilters();
    initializeSearch();
    updateCartCount();
});

// Display menu items
function displayMenuItems(items) {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = items.map(item => `
        <div class="menu-item" data-category="${item.category}">
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3 class="menu-item-title">${item.name}</h3>
                    <span class="menu-item-price">$${item.price.toFixed(2)}</span>
                </div>
                <p class="menu-item-description">${item.description}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${item.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Initialize category filters
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter items
            const category = button.dataset.category;
            const filteredItems = category === 'all' 
                ? menuItems 
                : menuItems.filter(item => item.category === category);
            
            displayMenuItems(filteredItems);
        });
    });
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredItems = menuItems.filter(item => 
            item.name.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm)
        );
        displayMenuItems(filteredItems);
    });
}

// Cart functionality - Make it globally accessible
window.addToCart = function(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = menuItems.find(item => item.id === itemId);
    
    if (item) {
        const existingItem = cart.find(cartItem => cartItem.id === itemId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // Redirect to cart page after adding item
        window.location.href = '/cart.html';
    }
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;
}