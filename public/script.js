// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSlider();
    initMobileNav();
    initSmoothScrolling();
    initScrollAnimations();
    initDonationForm();
    initGalleryLightbox();
});

// Hero Slider Functionality
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dots.appendChild(dot);
    });

    const dotElements = document.querySelectorAll('.dot');

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dotElements.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dotElements[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
    }

    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
}

// Mobile Navigation
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const animatedElements = document.querySelectorAll('.about-card, .program-card, .event-card, .gallery-item, .contact-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Donation Form with Razorpay Integration
function initDonationForm() {
    const donationForm = document.getElementById('donationForm');
    
    if (donationForm) {
        donationForm.addEventListener('submit', handleDonation);
    }
}

function handleDonation(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const donationData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        amount: formData.get('amount'),
        purpose: formData.get('purpose'),
        message: formData.get('message')
    };

    // Validate form
    if (!validateDonationForm(donationData)) {
        return;
    }

    // Show loading state
    const submitBtn = e.target.querySelector('.btn-donate');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;

    // Create Razorpay order
    createRazorpayOrder(donationData)
        .then(order => {
            // Initialize Razorpay
            const options = {
                key: 'rzp_test_YOUR_KEY_HERE', // Replace with your Razorpay test key
                amount: donationData.amount * 100, // Amount in paise
                currency: 'INR',
                name: 'Adhigam Youth Foundation',
                description: `Donation for ${donationData.purpose}`,
                image: 'Adhigam_Logo.jpg',
                order_id: order.id,
                handler: function(response) {
                    // Handle successful payment
                    handlePaymentSuccess(response, donationData);
                },
                prefill: {
                    name: donationData.name,
                    email: donationData.email,
                    contact: donationData.phone
                },
                notes: {
                    purpose: donationData.purpose,
                    message: donationData.message
                },
                theme: {
                    color: '#136a8a'
                }
            };

            const rzp = new Razorpay(options);
            rzp.open();
        })
        .catch(error => {
            console.error('Error creating order:', error);
            showNotification('Error creating payment order. Please try again.', 'error');
        })
        .finally(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
}

function validateDonationForm(data) {
    if (!data.name || !data.email || !data.amount) {
        showNotification('Please fill in all required fields.', 'error');
        return false;
    }

    if (data.amount < 100) {
        showNotification('Minimum donation amount is ₹100.', 'error');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }

    return true;
}

// Mock function to create Razorpay order (replace with actual API call)
function createRazorpayOrder(donationData) {
    return new Promise((resolve, reject) => {
        // Simulate API call
        setTimeout(() => {
            const order = {
                id: 'order_' + Math.random().toString(36).substr(2, 9),
                amount: donationData.amount * 100,
                currency: 'INR'
            };
            resolve(order);
        }, 1000);
    });
}

function handlePaymentSuccess(response, donationData) {
    // Here you would typically send the payment details to your server
    console.log('Payment successful:', response);
    
    // Show success message
    showNotification('Thank you for your donation! Your payment was successful.', 'success');
    
    // Reset form
    document.getElementById('donationForm').reset();
    
    // You can also send the data to your server here
    sendDonationToServer(response, donationData);
}

function sendDonationToServer(paymentResponse, donationData) {
    // Mock function to send data to server
    console.log('Sending donation data to server:', {
        payment: paymentResponse,
        donation: donationData
    });
    
    // In a real implementation, you would make an API call here
    // fetch('/api/donations', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         payment: paymentResponse,
    //         donation: donationData
    //     })
    // });
}

// Gallery Lightbox
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h3')?.textContent || '';
            const description = item.querySelector('p')?.textContent || '';
            
            openLightbox(img.src, title, description);
        });
    });
}

function openLightbox(imageSrc, title, description) {
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${imageSrc}" alt="${title}">
            <div class="lightbox-info">
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        </div>
    `;
    
    // Add styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const content = lightbox.querySelector('.lightbox-content');
    content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        text-align: center;
    `;
    
    const img = lightbox.querySelector('img');
    img.style.cssText = `
        max-width: 100%;
        max-height: 70vh;
        border-radius: 10px;
    `;
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        background: none;
        border: none;
    `;
    
    const info = lightbox.querySelector('.lightbox-info');
    info.style.cssText = `
        color: white;
        margin-top: 1rem;
    `;
    
    // Add to DOM
    document.body.appendChild(lightbox);
    
    // Animate in
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
    
    // Close functionality
    function closeLightbox() {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(lightbox);
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    // ESC key to close
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#136a8a',
        warning: '#ffc107'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Event registration functionality
document.querySelectorAll('.btn-register').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const eventTitle = e.target.closest('.event-card').querySelector('h3').textContent;
        showNotification(`Registration for "${eventTitle}" will be available soon!`, 'info');
    });
});

// Contact form submission
document.querySelectorAll('.contact-form form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        form.reset();
    });
});

// Counter animation for impact stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h4');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when donation section is visible
const donationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            donationObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const donationSection = document.querySelector('.donation-section');
if (donationSection) {
    donationObserver.observe(donationSection);
}

// Loading screen
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.classList.add('hidden');
    }
});

// Add loading screen to HTML if not present
if (!document.querySelector('.loading')) {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 50px; height: 50px; border: 3px solid #f3f3f3; border-top: 3px solid #136a8a; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
            <p style="color: #136a8a; font-weight: 600;">Loading Adhigam...</p>
        </div>
    `;
    document.body.appendChild(loading);
}

// Content Management System
function toggleAdminPanel() {
    const panel = document.getElementById('adminPanel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    if (panel.style.display === 'block') {
        setTimeout(() => {
            panel.classList.add('active');
        }, 10);
    } else {
        panel.classList.remove('active');
    }
}

function updateImpactStats() {
    const childrenCount = document.getElementById('childrenCount').value;
    const sessionsCount = document.getElementById('sessionsCount').value;
    const programsCount = document.getElementById('programsCount').value;
    
    if (childrenCount) {
        document.querySelector('.counter[data-target="500"]').textContent = childrenCount;
        document.querySelector('.counter[data-target="500"]').setAttribute('data-target', childrenCount);
    }
    if (sessionsCount) {
        document.querySelector('.counter[data-target="50"]').textContent = sessionsCount;
        document.querySelector('.counter[data-target="50"]').setAttribute('data-target', sessionsCount);
    }
    if (programsCount) {
        document.querySelector('.counter[data-target="3"]').textContent = programsCount;
        document.querySelector('.counter[data-target="3"]').setAttribute('data-target', programsCount);
    }
    
    showNotification('Impact statistics updated successfully!', 'success');
    
    // Clear form
    document.getElementById('childrenCount').value = '';
    document.getElementById('sessionsCount').value = '';
    document.getElementById('programsCount').value = '';
}

function addNewEvent() {
    const title = document.getElementById('eventTitle').value;
    const date = document.getElementById('eventDate').value;
    const time = document.getElementById('eventTime').value;
    const location = document.getElementById('eventLocation').value;
    const description = document.getElementById('eventDescription').value;
    
    if (!title || !date || !time || !location || !description) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    const eventDate = new Date(date);
    const day = eventDate.getDate();
    const month = eventDate.toLocaleString('default', { month: 'short' });
    
    const newEvent = `
        <div class="event-card">
            <div class="event-date">
                <span class="day">${day}</span>
                <span class="month">${month}</span>
            </div>
            <div class="event-content">
                <h3>${title}</h3>
                <p class="event-time"><i class="fas fa-clock"></i> ${time}</p>
                <p class="event-location"><i class="fas fa-map-marker-alt"></i> ${location}</p>
                <p>${description}</p>
                <button class="btn-register">Register Now</button>
            </div>
        </div>
    `;
    
    const eventsContainer = document.getElementById('eventsContainer');
    eventsContainer.insertAdjacentHTML('afterbegin', newEvent);
    
    showNotification('New event added successfully!', 'success');
    
    // Clear form
    document.getElementById('eventTitle').value = '';
    document.getElementById('eventDate').value = '';
    document.getElementById('eventTime').value = '';
    document.getElementById('eventLocation').value = '';
    document.getElementById('eventDescription').value = '';
}

function addTestimonial() {
    const name = document.getElementById('testimonialName').value;
    const role = document.getElementById('testimonialRole').value;
    const text = document.getElementById('testimonialText').value;
    
    if (!name || !role || !text) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    const newTestimonial = `
        <div class="testimonial-card">
            <div class="testimonial-content">
                <i class="fas fa-quote-left"></i>
                <p>"${text}"</p>
            </div>
            <div class="testimonial-author">
                <img src="https://source.unsplash.com/60x60/?portrait" alt="Author">
                <div>
                    <h4>${name}</h4>
                    <span>${role}</span>
                </div>
            </div>
        </div>
    `;
    
    const testimonialsContainer = document.getElementById('testimonialsContainer');
    testimonialsContainer.insertAdjacentHTML('beforeend', newTestimonial);
    
    showNotification('New testimonial added successfully!', 'success');
    
    // Clear form
    document.getElementById('testimonialName').value = '';
    document.getElementById('testimonialRole').value = '';
    document.getElementById('testimonialText').value = '';
}

// Volunteer form handling
document.addEventListener('DOMContentLoaded', function() {
    const volunteerForm = document.getElementById('volunteerForm');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const volunteerData = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                age: formData.get('age'),
                role: formData.get('role'),
                availability: formData.get('availability'),
                experience: formData.get('experience'),
                motivation: formData.get('motivation')
            };
            
            // Validate form
            if (!volunteerData.name || !volunteerData.email || !volunteerData.phone || 
                !volunteerData.age || !volunteerData.role || !volunteerData.availability) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            if (volunteerData.age < 18) {
                showNotification('You must be at least 18 years old to volunteer', 'error');
                return;
            }
            
            // Show success message
            showNotification('Thank you for your volunteer application! We will contact you soon.', 'success');
            
            // Reset form
            this.reset();
            
            // In a real application, you would send this data to your server
            console.log('Volunteer application:', volunteerData);
        });
    }
});

// Counter animation for impact stats
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when impact section is visible
const impactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            impactObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const impactSection = document.querySelector('.impact-section');
if (impactSection) {
    impactObserver.observe(impactSection);
}

// Add spin animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style); 