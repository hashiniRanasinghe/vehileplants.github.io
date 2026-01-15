// ===========================
// Mobile Menu Toggle
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        // Ensure hamburger works on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
});

// ===========================
// Mouse Cursor Glow Effect
// ===========================

document.addEventListener('mousemove', (e) => {
    const { x, y } = e;
    const elements = document.querySelectorAll('.product-card, .testimonial-card, .cta-button');
    
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;
        
        const angle = Math.atan2(y - elementCenterY, x - elementCenterX);
        const distance = Math.hypot(x - elementCenterX, y - elementCenterY);
        
        if (distance < 200) {
            element.style.transform = `perspective(1000px) rotateX(${(y - elementCenterY) * 0.05}deg) rotateY(${(x - elementCenterX) * 0.05}deg)`;
        } else {
            element.style.transform = '';
        }
    });
});

// ===========================
// Shopping Cart Functionality
// ===========================

let cart = [];

function addToCart(productName) {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: productName, quantity: 1 });
    }
    
    // Show confirmation
    showNotification(`${productName} added to cart!`);
    
    // Update cart display (you could add a cart icon with count here)
    updateCartCount();
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    console.log(`Cart contains ${totalItems} items`);
}

function showNotification(message) {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #52b788 0%, #2d6a4f 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInNotification 0.4s ease;
        font-weight: 600;
        border-left: 4px solid #84fab0;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutNotification 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// ===========================
// Contact Form Handling
// ===========================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: contactForm.querySelector('input[placeholder="Your Name"]').value,
        email: contactForm.querySelector('input[placeholder="Your Email"]').value,
        subject: contactForm.querySelector('input[placeholder="Subject"]').value,
        message: contactForm.querySelector('textarea').value
    };
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Validate form fields
    if (!data.name || !data.email || !data.subject || !data.message) {
        showFormMessage('Please fill out all fields.', 'error');
        return;
    }
    
    // Simulate form submission
    contactForm.style.opacity = '0.6';
    contactForm.style.pointerEvents = 'none';
    
    setTimeout(() => {
        showFormMessage('Thank you for reaching out! We\'ll get back to you soon.', 'success');
        contactForm.reset();
        contactForm.style.opacity = '1';
        contactForm.style.pointerEvents = 'auto';
    }, 1500);
});

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = type;
    
    if (type === 'success') {
        setTimeout(() => {
            formMessage.className = '';
        }, 5000);
    }
}

// ===========================
// Smooth Scroll Behavior for Buttons
// ===========================

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

// ===========================
// Intersection Observer for Animations
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe product cards and testimonial cards
document.querySelectorAll('.product-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Observe section headings
const headingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInDown 0.7s ease forwards';
            headingObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('h2').forEach(el => {
    el.style.opacity = '0';
    headingObserver.observe(el);
});

// Observe about content
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('about-text')) {
                entry.target.style.animation = 'slideInLeft 0.7s ease forwards';
            } else if (entry.target.classList.contains('about-image')) {
                entry.target.style.animation = 'slideInRight 0.7s ease forwards';
            }
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.about-text, .about-image').forEach(el => {
    el.style.opacity = '0';
    aboutObserver.observe(el);
});

// Observe hero content
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('hero-content')) {
                entry.target.style.animation = 'slideInLeft 0.8s ease forwards';
            } else if (entry.target.classList.contains('hero-images')) {
                entry.target.style.animation = 'slideInRight 0.8s ease forwards';
            }
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.hero-content, .hero-images').forEach(el => {
    el.style.opacity = '0';
    heroObserver.observe(el);
});

// Observe contact form
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('contact-form')) {
                entry.target.style.animation = 'slideInLeft 0.7s ease forwards';
            } else if (entry.target.classList.contains('contact-info')) {
                entry.target.style.animation = 'slideInRight 0.7s ease forwards';
            }
            contactObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.contact-form, .contact-info').forEach(el => {
    el.style.opacity = '0';
    contactObserver.observe(el);
});

// Observe gallery items
const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Default desktop animation
            entry.target.style.animation = 'scaleIn 0.6s ease forwards';

            // On mobile, briefly trigger the same effect as a click/hover
            if (window.innerWidth <= 768) {
                entry.target.classList.add('active');

                // Remove the "clicked" effect after a short delay
                setTimeout(() => {
                    entry.target.classList.remove('active');
                }, 1200);
            }

            galleryObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.gallery-item').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.animationDelay = `${index * 0.1}s`;
    galleryObserver.observe(el);
});

// ===========================
// CSS Animation Keyframes
// ===========================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInNotification {
        from {
            transform: translateX(400px) scale(0.8);
            opacity: 0;
        }
        to {
            transform: translateX(0) scale(1);
            opacity: 1;
        }
    }
    
    @keyframes slideOutNotification {
        from {
            transform: translateX(0) scale(1);
            opacity: 1;
        }
        to {
            transform: translateX(400px) scale(0.8);
            opacity: 0;
        }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-20px);
        }
    }

    @keyframes pulse {
        0%, 100% {
            box-shadow: 0 0 20px rgba(82, 183, 136, 0.3);
        }
        50% {
            box-shadow: 0 0 40px rgba(82, 183, 136, 0.6);
        }
    }

    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    /* Parallax effect for hero section */
    .hero {
        position: relative;
        overflow: hidden;
    }

    .hero-content {
        position: relative;
        z-index: 2;
    }

    .hero-images {
        position: relative;
        z-index: 1;
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(10px, 10px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }

    .add-to-cart {
        position: relative;
        overflow: hidden;
    }

    .add-to-cart::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
        pointer-events: none;
    }

    .add-to-cart:active::after {
        width: 300px;
        height: 300px;
    }
`;
document.head.appendChild(style);

// ===========================
// Scroll to Top Button (Optional)
// ===========================

window.addEventListener('scroll', () => {
    // Parallax effect for hero images
    const heroImages = document.querySelector('.hero-images');
    if (heroImages && window.scrollY < 500) {
        heroImages.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    }

    // Add subtle scroll animation to navbar
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)';
        navbar.style.background = 'linear-gradient(135deg, rgba(45, 106, 79, 0.95) 0%, rgba(82, 183, 136, 0.95) 100%)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        navbar.style.background = 'linear-gradient(135deg, #2d6a4f 0%, #52b788 100%)';
    }

    // Add floating animation to elements
    const products = document.querySelectorAll('.product-card');
    products.forEach((product, index) => {
        const yOffset = Math.sin((window.scrollY + index * 100) * 0.01) * 5;
        product.style.transform = `translateY(${yOffset}px)`;
    });
});

// ===========================
// Responsive Navigation Enhancement
// ===========================

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
    } else {
        navLinks.style.display = 'none';
    }
});
