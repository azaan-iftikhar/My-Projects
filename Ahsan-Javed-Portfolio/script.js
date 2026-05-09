// ==========================================
// NEWSLETTER FORM HANDLING
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.getElementById('newsletterForm');
    const portraitImage = document.getElementById('portrait');

    // Handle newsletter form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = newsletterForm.querySelector('.email-input');
            const email = emailInput.value.trim();

            if (email && validateEmail(email)) {
                // Show success message
                showSuccessMessage();

                // Reset form
                emailInput.value = '';

                // Here you would typically send the email to your backend
                console.log('Email submitted:', email);
            } else {
                showErrorMessage('Please enter a valid email address');
            }
        });
    }

    // Generate placeholder portrait if image doesn't exist
    if (portraitImage) {
        portraitImage.onerror = function () {
            generatePlaceholderPortrait();
        };

        // Try to load the image, if it fails, the onerror will trigger
        portraitImage.src = 'AhsanRevised.png';
    }
});

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show success message
function showSuccessMessage() {
    const subscribeButton = document.querySelector('.subscribe-button');
    const originalText = subscribeButton.textContent;

    subscribeButton.textContent = '✓ Subscribed!';
    subscribeButton.style.backgroundColor = '#10b981';

    setTimeout(() => {
        subscribeButton.textContent = originalText;
        subscribeButton.style.backgroundColor = '';
    }, 3000);
}

// Show error message
function showErrorMessage(message) {
    const emailInput = document.querySelector('.email-input');
    const originalBorder = emailInput.style.borderColor;

    emailInput.style.borderColor = '#ef4444';
    emailInput.placeholder = message;

    setTimeout(() => {
        emailInput.style.borderColor = originalBorder;
        emailInput.placeholder = 'Your email';
    }, 3000);
}

// Generate placeholder portrait using canvas
function generatePlaceholderPortrait() {
    const portraitWrapper = document.querySelector('.portrait-wrapper');
    if (!portraitWrapper) return;

    // Remove the img element
    const img = portraitWrapper.querySelector('img');
    if (img) img.remove();

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.objectFit = 'cover';

    const ctx = canvas.getContext('2d');

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 400, 400);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 400);

    // Draw face outline
    ctx.fillStyle = '#f5d5c8';
    ctx.beginPath();
    ctx.ellipse(200, 180, 80, 100, 0, 0, Math.PI * 2);
    ctx.fill();

    // Draw eyes
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(175, 170, 8, 0, Math.PI * 2);
    ctx.arc(225, 170, 8, 0, Math.PI * 2);
    ctx.fill();

    // Draw smile
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(200, 190, 30, 0.2, Math.PI - 0.2);
    ctx.stroke();

    // Draw glasses (optional)
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(175, 170, 20, 0, Math.PI * 2);
    ctx.arc(225, 170, 20, 0, Math.PI * 2);
    ctx.moveTo(195, 170);
    ctx.lineTo(205, 170);
    ctx.stroke();

    // Draw hair
    ctx.fillStyle = '#2c2c2c';
    ctx.beginPath();
    ctx.ellipse(200, 120, 90, 60, 0, 0, Math.PI * 2);
    ctx.fill();

    // Draw shirt
    ctx.fillStyle = '#9ca3af';
    ctx.fillRect(120, 280, 160, 120);

    portraitWrapper.appendChild(canvas);
}

// ==========================================
// SMOOTH SCROLL FOR NAVIGATION
// ==========================================
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 16px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.newsletter-card, .featured-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

if (mobileMenuToggle && navLinks) {
    // Toggle menu on button click
    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Prevent menu from closing when clicking inside it
    navLinks.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// ==========================================
// BOOK CAROUSEL NAVIGATION
// ==========================================
const bookCarousel = document.querySelector('.book-carousel');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');

if (bookCarousel && prevBtn && nextBtn) {
    const scrollAmount = 320; // Card width (300px) + gap (20px)

    prevBtn.addEventListener('click', () => {
        bookCarousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        bookCarousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Optional: Disable buttons at scroll boundaries
    bookCarousel.addEventListener('scroll', () => {
        const maxScroll = bookCarousel.scrollWidth - bookCarousel.clientWidth;

        if (bookCarousel.scrollLeft <= 0) {
            prevBtn.style.opacity = '0.5';
            prevBtn.style.cursor = 'not-allowed';
        } else {
            prevBtn.style.opacity = '1';
            prevBtn.style.cursor = 'pointer';
        }

        if (bookCarousel.scrollLeft >= maxScroll - 1) {
            nextBtn.style.opacity = '0.5';
            nextBtn.style.cursor = 'not-allowed';
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.style.cursor = 'pointer';
        }
    });

    // Initialize button states
    bookCarousel.dispatchEvent(new Event('scroll'));
}
