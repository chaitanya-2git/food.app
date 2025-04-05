// Testimonials data
const testimonials = [
    {
        name: "Sarah Johnson",
        text: "The food is always fresh and delivery is super quick! My go-to food delivery service.",
        rating: 5
    },
    {
        name: "Mike Thompson",
        text: "Great variety of restaurants and excellent customer service. Highly recommended!",
        rating: 5
    },
    {
        name: "Emily Davis",
        text: "The app is so easy to use and the delivery drivers are always friendly.",
        rating: 4
    }
];

// Initialize testimonials
function initializeTestimonials() {
    const testimonialsContainer = document.getElementById('testimonials');
    
    testimonials.forEach(testimonial => {
        const testimonialElement = document.createElement('div');
        testimonialElement.className = 'testimonial';
        testimonialElement.innerHTML = `
            <div class="testimonial-content">
                <p>${testimonial.text}</p>
                <div class="testimonial-info">
                    <strong>${testimonial.name}</strong>
                    <div class="rating">${'★'.repeat(testimonial.rating)}${'☆'.repeat(5-testimonial.rating)}</div>
                </div>
            </div>
        `;
        testimonialsContainer.appendChild(testimonialElement);
    });
}

// Initialize cart count
function initializeCart() {
    const cartCount = localStorage.getItem('cartCount') || 0;
    updateCartCount(cartCount);
}

// Update cart count
function updateCartCount(count) {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = count;
        localStorage.setItem('cartCount', count);
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeTestimonials();
    initializeCart();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});