// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSlider();
    initMobileNav();
    initSmoothScrolling();
    initScrollAnimations();
    initDonationForm();
    initGalleryLightbox();
    initDonationHistory();
    initSliderWithMedia();
    loadSectionPreferences();
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

// Donation Records Management
let donationRecords = JSON.parse(localStorage.getItem('donationRecords')) || [];

function saveDonationRecord(donationData, paymentResponse) {
    const donationRecord = {
        id: generateDonationId(),
        donor: {
            name: donationData.name,
            email: donationData.email,
            phone: donationData.phone
        },
        donation: {
            amount: parseFloat(donationData.amount),
            purpose: donationData.purpose,
            message: donationData.message
        },
        payment: {
            transactionId: paymentResponse.razorpay_payment_id,
            orderId: paymentResponse.razorpay_order_id,
            signature: paymentResponse.razorpay_signature
        },
        timestamp: new Date().toISOString(),
        status: 'completed'
    };

    donationRecords.push(donationRecord);
    localStorage.setItem('donationRecords', JSON.stringify(donationRecords));
    
    updateDonationStats();
    return donationRecord;
}

function generateDonationId() {
    return 'DON_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function updateDonationStats() {
    const totalDonations = donationRecords.length;
    const totalAmount = donationRecords.reduce((sum, record) => sum + record.donation.amount, 0);
    
    // Update stats in the donation section
    const statsContainer = document.querySelector('.impact-stats');
    if (statsContainer) {
        const totalDonorsElement = statsContainer.querySelector('.stat:nth-child(1) h4');
        const totalAmountElement = statsContainer.querySelector('.stat:nth-child(2) h4');
        
        if (totalDonorsElement) totalDonorsElement.textContent = totalDonations;
        if (totalAmountElement) totalAmountElement.textContent = '₹' + totalAmount.toLocaleString();
    }
}

// Enhanced donation form handling
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

    if (!validateDonationForm(donationData)) {
        return;
    }

    const submitBtn = e.target.querySelector('.btn-donate');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;

    createRazorpayOrder(donationData)
        .then(order => {
            const options = {
                key: 'rzp_test_YOUR_KEY_HERE',
                amount: donationData.amount * 100,
                currency: 'INR',
                name: 'Adhigam Youth Foundation',
                description: `Donation for ${donationData.purpose}`,
                image: 'Adhigam_Logo.jpg',
                order_id: order.id,
                handler: function(response) {
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
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
}

function handlePaymentSuccess(response, donationData) {
    const donationRecord = saveDonationRecord(donationData, response);
    showDonationReceipt(donationRecord);
    document.getElementById('donationForm').reset();
    sendDonationToServer(response, donationData);
}

function showDonationReceipt(donationRecord) {
    const receipt = `
        <div class="receipt-modal">
            <div class="receipt-content">
                <div class="receipt-header">
                    <h3><i class="fas fa-check-circle"></i> Donation Successful!</h3>
                    <p>Thank you for your generous contribution</p>
                </div>
                <div class="receipt-details">
                    <div class="receipt-row">
                        <span>Donation ID:</span>
                        <span>${donationRecord.id}</span>
                    </div>
                    <div class="receipt-row">
                        <span>Amount:</span>
                        <span>₹${donationRecord.donation.amount.toLocaleString()}</span>
                    </div>
                    <div class="receipt-row">
                        <span>Purpose:</span>
                        <span>${donationRecord.donation.purpose}</span>
                    </div>
                    <div class="receipt-row">
                        <span>Transaction ID:</span>
                        <span>${donationRecord.payment.transactionId}</span>
                    </div>
                    <div class="receipt-row">
                        <span>Date:</span>
                        <span>${new Date(donationRecord.timestamp).toLocaleDateString()}</span>
                    </div>
                </div>
                <div class="receipt-actions">
                    <button onclick="downloadReceipt('${donationRecord.id}')" class="btn-download">
                        <i class="fas fa-download"></i> Download Receipt
                    </button>
                    <button onclick="closeReceipt()" class="btn-close">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', receipt);
}

function downloadReceipt(donationId) {
    const record = donationRecords.find(r => r.id === donationId);
    if (!record) return;
    
    const receiptText = `
        ADHIGAM YOUTH FOUNDATION
        DONATION RECEIPT
        
        Donation ID: ${record.id}
        Date: ${new Date(record.timestamp).toLocaleDateString()}
        Time: ${new Date(record.timestamp).toLocaleTimeString()}
        
        DONOR DETAILS:
        Name: ${record.donor.name}
        Email: ${record.donor.email}
        Phone: ${record.donor.phone}
        
        DONATION DETAILS:
        Amount: ₹${record.donation.amount.toLocaleString()}
        Purpose: ${record.donation.purpose}
        Message: ${record.donation.message || 'N/A'}
        
        PAYMENT DETAILS:
        Transaction ID: ${record.payment.transactionId}
        Order ID: ${record.payment.orderId}
        
        Status: Completed
        
        Thank you for your generous contribution!
        Your donation helps us continue our mission of empowering communities.
        
        For any queries, contact: info@adhigam.org
    `;
    
    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `donation_receipt_${record.id}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
}

function closeReceipt() {
    const receipt = document.querySelector('.receipt-modal');
    if (receipt) {
        receipt.remove();
    }
}

// Donation History Management
function showDonationHistory() {
    const historyHTML = `
        <div class="history-modal">
            <div class="history-content">
                <div class="history-header">
                    <h3><i class="fas fa-history"></i> Donation History</h3>
                    <button onclick="closeHistory()" class="history-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="history-stats">
                    <div class="stat-item">
                        <span class="stat-label">Total Donations:</span>
                        <span class="stat-value">${donationRecords.length}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Total Amount:</span>
                        <span class="stat-value">₹${donationRecords.reduce((sum, r) => sum + r.donation.amount, 0).toLocaleString()}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">This Month:</span>
                        <span class="stat-value">₹${getMonthlyTotal().toLocaleString()}</span>
                    </div>
                </div>
                <div class="history-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Donor</th>
                                <th>Amount</th>
                                <th>Purpose</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${donationRecords.map(record => `
                                <tr>
                                    <td>${new Date(record.timestamp).toLocaleDateString()}</td>
                                    <td>${record.donor.name}</td>
                                    <td>₹${record.donation.amount.toLocaleString()}</td>
                                    <td>${record.donation.purpose}</td>
                                    <td><span class="status-completed">${record.status}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', historyHTML);
}

function closeHistory() {
    const history = document.querySelector('.history-modal');
    if (history) {
        history.remove();
    }
}

function getMonthlyTotal() {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    
    return donationRecords
        .filter(record => {
            const recordDate = new Date(record.timestamp);
            return recordDate.getMonth() === thisMonth && recordDate.getFullYear() === thisYear;
        })
        .reduce((sum, record) => sum + record.donation.amount, 0);
}

function exportDonationData() {
    const csvContent = [
        ['Date', 'Donor Name', 'Email', 'Phone', 'Amount', 'Purpose', 'Transaction ID', 'Status'],
        ...donationRecords.map(record => [
            new Date(record.timestamp).toLocaleDateString(),
            record.donor.name,
            record.donor.email,
            record.donor.phone,
            record.donation.amount,
            record.donation.purpose,
            record.payment.transactionId,
            record.status
        ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `donation_records_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    showNotification('Donation data exported successfully!', 'success');
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
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#136a8a'};
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
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

// Section Visibility Control
function toggleSection(sectionName) {
    const section = document.getElementById(sectionName);
    const checkbox = document.getElementById(`toggle${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}`);
    
    if (section && checkbox) {
        if (checkbox.checked) {
            section.classList.remove('section-hidden');
        } else {
            section.classList.add('section-hidden');
        }
    }
}

function saveSectionPreferences() {
    const sections = ['about', 'programs', 'events', 'gallery', 'impact', 'testimonials', 'news', 'volunteer', 'donate', 'contact'];
    const preferences = {};
    
    sections.forEach(section => {
        const checkbox = document.getElementById(`toggle${section.charAt(0).toUpperCase() + section.slice(1)}`);
        if (checkbox) {
            preferences[section] = checkbox.checked;
        }
    });
    
    localStorage.setItem('sectionPreferences', JSON.stringify(preferences));
    showNotification('Section preferences saved successfully!', 'success');
}

function loadSectionPreferences() {
    const preferences = JSON.parse(localStorage.getItem('sectionPreferences'));
    if (preferences) {
        Object.keys(preferences).forEach(section => {
            const checkbox = document.getElementById(`toggle${section.charAt(0).toUpperCase() + section.slice(1)}`);
            const sectionElement = document.getElementById(section);
            
            if (checkbox && sectionElement) {
                checkbox.checked = preferences[section];
                if (!preferences[section]) {
                    sectionElement.classList.add('section-hidden');
                } else {
                    sectionElement.classList.remove('section-hidden');
                }
            }
        });
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

// Add spin animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Media Folder Slider Functionality
function initSliderWithMedia() {
    // Define media folder path and image extensions
    const mediaFolder = 'media/';
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    
    // Function to check if image exists
    function checkImageExists(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }
    
    // Function to load images from media folder
    async function loadMediaImages() {
        const mediaImages = [];
        
        // Try to load images from media folder
        for (let i = 1; i <= 10; i++) { // Check up to 10 images
            for (const ext of imageExtensions) {
                const imagePath = `${mediaFolder}slide_${i}.${ext}`;
                const exists = await checkImageExists(imagePath);
                if (exists) {
                    mediaImages.push(imagePath);
                    break; // Found image for this number, move to next
                }
            }
        }
        
        return mediaImages;
    }
    
    // Update slider with media images if available
    loadMediaImages().then(mediaImages => {
        if (mediaImages.length > 0) {
            updateSliderWithImages(mediaImages);
        }
    });
}

// Function to update slider with new images
function updateSliderWithImages(imagePaths) {
    const slides = document.querySelectorAll('.slide');
    
    imagePaths.forEach((imagePath, index) => {
        if (slides[index]) {
            const slideBg = slides[index].querySelector('.slide-bg');
            if (slideBg) {
                slideBg.style.backgroundImage = `url('${imagePath}')`;
            }
        }
    });
    
    console.log(`Updated slider with ${imagePaths.length} images from media folder`);
} 