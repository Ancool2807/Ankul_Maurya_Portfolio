document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('show');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('show');
            navToggle.classList.remove('active');
        });
    });

    // Smooth Scrolling and Active Navigation
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current nav link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Update active nav link on page load
    updateActiveNavLink();

    // Smooth scrolling for navigation links - FIXED
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero section buttons smooth scrolling - FIXED
    const viewWorkBtn = document.querySelector('a[href="#projects"]');
    const downloadResumeBtn = document.querySelector('a[href="#contact"]');
    
    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.getElementById('projects');
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Form validation functions
    function validateName(name) {
        return name.trim().length >= 2;
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }

    function validateMessage(message) {
        return message.trim().length >= 10;
    }

    function showError(inputElement, message) {
        const errorElement = document.getElementById(`${inputElement.id}-error`);
        inputElement.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    function clearError(inputElement) {
        const errorElement = document.getElementById(`${inputElement.id}-error`);
        inputElement.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    function clearAllErrors() {
        [nameInput, emailInput, messageInput].forEach(input => {
            clearError(input);
        });
    }

    // Real-time validation
    nameInput.addEventListener('blur', function() {
        if (!validateName(this.value)) {
            showError(this, 'Name must be at least 2 characters long');
        } else {
            clearError(this);
        }
    });

    nameInput.addEventListener('input', function() {
        if (this.classList.contains('error') && validateName(this.value)) {
            clearError(this);
        }
    });

    emailInput.addEventListener('blur', function() {
        if (!validateEmail(this.value)) {
            showError(this, 'Please enter a valid email address');
        } else {
            clearError(this);
        }
    });

    emailInput.addEventListener('input', function() {
        if (this.classList.contains('error') && validateEmail(this.value)) {
            clearError(this);
        }
    });

    messageInput.addEventListener('blur', function() {
        if (!validateMessage(this.value)) {
            showError(this, 'Message must be at least 10 characters long');
        } else {
            clearError(this);
        }
    });

    messageInput.addEventListener('input', function() {
        if (this.classList.contains('error') && validateMessage(this.value)) {
            clearError(this);
        }
    });

    // Form submission - ENHANCED VALIDATION
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearAllErrors();
        
        // Get form values
        const name = nameInput.value;
        const email = emailInput.value;
        const message = messageInput.value;
        
        // Validate form - ENHANCED
        let isValid = true;
        
        // Check if fields are empty first
        if (!name.trim()) {
            showError(nameInput, 'Name is required');
            isValid = false;
        } else if (!validateName(name)) {
            showError(nameInput, 'Name must be at least 2 characters long');
            isValid = false;
        }
        
        if (!email.trim()) {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!message.trim()) {
            showError(messageInput, 'Message is required');
            isValid = false;
        } else if (!validateMessage(message)) {
            showError(messageInput, 'Message must be at least 10 characters long');
            isValid = false;
        }
        emailjs.init('nx3SSaKvT01o3Ib7Q');
        // If form is valid, simulate submission
        if (isValid) {
            // Disable submit button temporarily
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            

            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                from_name: name,
                from_email: email,
                message: message,
                to_name: 'Ankul',
            })
                .then(function (response) {
                    alert('Message sent successfully!');
                    contactForm.reset();
                    clearAllErrors();
                })
                .catch(function (error) {
                    alert('Failed to send message. Please try again.');
                    console.error('EmailJS error:', error);
                })
                .finally(function () {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                });

            submitButton.textContent = originalText;
            submitButton.disabled = false;
        } else {
            // Focus on first error field
            const firstErrorField = contactForm.querySelector('.form-control.error');
            if (firstErrorField) {
                firstErrorField.focus();
            }
        }
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow when scrolled
        if (scrollTop > 10) {
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Scroll animations for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards and sections for animations
    const animateElements = document.querySelectorAll('.skills__category, .project-card, .experience__card, .education__card');
    
    animateElements.forEach((element, index) => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
        
        // Observe for intersection
        observer.observe(element);
    });

    // Typing animation for hero section
    const heroTitle = document.querySelector('.hero__title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Skills hover effect enhancement
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('show');
            navToggle.classList.remove('active');
        }
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            navToggle.classList.remove('active');
        }
    });

    // Initialize page
    console.log('Portfolio website loaded successfully!');
});