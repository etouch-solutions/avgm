// AVGM Financial Services - Main JavaScript

// ===== NAVIGATION & MOBILE MENU =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    
    // ===== SCROLL ANIMATIONS =====
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
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    // Scroll-triggered animation
const faders = document.querySelectorAll('.fade-in-up');

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, {
  threshold: 0.1,
});

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

    
    // Observe service strips for sliding animation
    document.querySelectorAll('.service-strip').forEach(el => {
        observer.observe(el);
    });
    
    // ===== ACCORDION FUNCTIONALITY =====
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = content.classList.contains('active');
            
            // Close all accordions
            document.querySelectorAll('.accordion-content').forEach(acc => {
                acc.classList.remove('active');
            });
            
            // Open clicked accordion if it wasn't active
            if (!isActive) {
                content.classList.add('active');
            }
        });
    });
    
    // ===== FORM WIZARD =====
    let currentStep = 1;
    const totalSteps = document.querySelectorAll('.wizard-step').length;
    
    function updateWizardStep(step) {
        // Update step indicators
        document.querySelectorAll('.wizard-step').forEach((stepEl, index) => {
            if (index + 1 <= step) {
                stepEl.classList.add('active');
            } else {
                stepEl.classList.remove('active');
            }
        });
        
        // Show/hide step content
        document.querySelectorAll('.step-content').forEach((content, index) => {
            if (index + 1 === step) {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
            }
        });
    }
    
    // Next/Previous buttons for form wizard
    document.querySelectorAll('.next-step').forEach(btn => {
        btn.addEventListener('click', function() {
            if (currentStep < totalSteps) {
                currentStep++;
                updateWizardStep(currentStep);
            }
        });
    });
    
    document.querySelectorAll('.prev-step').forEach(btn => {
        btn.addEventListener('click', function() {
            if (currentStep > 1) {
                currentStep--;
                updateWizardStep(currentStep);
            }
        });
    });
    
    
    // ===== PROGRESS BAR ANIMATION =====
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width') || '75';
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 500);
    });
    
    // ===== EMI CALCULATOR =====
    const loanAmountSlider = document.getElementById('loanAmount');
    const tenureSlider = document.getElementById('tenure');
    const interestSlider = document.getElementById('interestRate');
    
    function calculateEMI() {
        if (!loanAmountSlider || !tenureSlider || !interestSlider) return;
        
        const principal = parseFloat(loanAmountSlider.value);
        const tenure = parseFloat(tenureSlider.value);
        const rate = parseFloat(interestSlider.value) / 12 / 100;
        
        const emi = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
        
        // Update display values
        document.getElementById('loanAmountValue').textContent = '₹' + principal.toLocaleString();
        document.getElementById('tenureValue').textContent = tenure + ' months';
        document.getElementById('interestValue').textContent = interestSlider.value + '%';
        document.getElementById('emiValue').textContent = '₹' + Math.round(emi).toLocaleString();
    }
    
    if (loanAmountSlider) {
        [loanAmountSlider, tenureSlider, interestSlider].forEach(slider => {
            slider.addEventListener('input', calculateEMI);
        });
        calculateEMI(); // Initial calculation
    }
    
    // ===== CIBIL SCORE ANIMATION =====
const cibilMeter = document.querySelector('.cibil-meter');
if (cibilMeter) {
    const score = parseInt(cibilMeter.getAttribute('data-score')) || 750;
    const angle = (score / 900) * 360;

    const meterCircle = cibilMeter.querySelector('.meter-circle');
    if (meterCircle) {
        setTimeout(() => {
            meterCircle.style.background = `
                conic-gradient(
                    var(--primary-blue) 0deg,
                    var(--accent-gold) ${angle}deg,
                    #e0e0e0 ${angle}deg
                )
            `;
        }, 500); // slight delay for effect
    }
}

    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
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
    
    // ===== FORM VALIDATION =====
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Show success message
                showNotification('Form submitted successfully!', 'success');
                form.reset();
            } else {
                showNotification('Please fill all required fields.', 'error');
            }
        });
    });
    
    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'success' ? 'var(--accent-gold)' : type === 'error' ? '#e74c3c' : 'var(--primary-blue)'};
            color: white;
            border-radius: var(--border-radius);
            z-index: 9999;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // ===== INTERACTIVE ICON EFFECTS =====
    document.querySelectorAll('.icon-item').forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            showNotification(`Learn more about ${title}`, 'info');
        });
    });
    
   // ===== BUILDER CAROUSEL AUTO-SCROLL =====
const builderCarousel = document.querySelector('.builder-carousel');

if (builderCarousel) {
    // Duplicate content to make seamless loop
    builderCarousel.innerHTML += builderCarousel.innerHTML;

    const scrollSpeed = 1; // pixels per tick

    function autoScroll() {
        builderCarousel.scrollLeft += scrollSpeed;

        // Reset when we reach half the scroll width (original content length)
        if (builderCarousel.scrollLeft >= builderCarousel.scrollWidth / 2) {
            builderCarousel.scrollLeft = 0;
        }
    }

    setInterval(autoScroll, 20); // Lower = faster speed
}

    
    // ===== HEADER SCROLL EFFECT =====
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ===== FLOATING CTA SCROLL BEHAVIOR =====
    const floatingCTA = document.querySelector('.floating-cta');
    if (floatingCTA) {
        window.addEventListener('scroll', function() {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            
            if (scrollPercent > 20) {
                floatingCTA.style.opacity = '1';
                floatingCTA.style.transform = 'scale(1)';
            } else {
                floatingCTA.style.opacity = '0.7';
                floatingCTA.style.transform = 'scale(0.8)';
            }
        });
    }
    
    // ===== COMPARISON TABLE TOGGLE =====
    document.querySelectorAll('.comparison-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const target = document.querySelector(this.getAttribute('data-target'));
            if (target) {
                target.style.display = target.style.display === 'none' ? 'block' : 'none';
            }
        });
    });
    
    // ===== MAP PLACEHOLDER INTERACTION =====
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        mapContainer.addEventListener('click', function() {
            this.innerHTML = '<p>Interactive map would be integrated here with Google Maps API or similar service.</p>';
            this.style.background = 'var(--primary-blue)';
            this.style.color = 'white';
        });
    }
    
    // ===== INITIALIZE ANIMATIONS ON LOAD =====
    setTimeout(() => {
        document.querySelectorAll('.hero h1, .hero p, .hero-cta').forEach((el, index) => {
            el.style.animationDelay = (index * 0.2) + 's';
        });
    }, 100);
});

// ===== UTILITY FUNCTIONS =====
function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN');
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[6-9]\d{9}$/;
    return re.test(phone);
}

// ===== EXPORT FOR MODULE USE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        formatCurrency,
        validateEmail,
        validatePhone
    };
}

  
    
