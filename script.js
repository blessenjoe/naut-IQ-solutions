// Video Fade to Black Loop Handler
function setupFadeToBlackLoop(video, videoContainer) {
    // Create fade overlay
    const fadeOverlay = document.createElement('div');
    fadeOverlay.className = 'video-fade-overlay';
    videoContainer.appendChild(fadeOverlay);

    video.addEventListener('loadedmetadata', function() {
        const videoDuration = video.duration;
        const fadeStartTime = videoDuration - 1.5; // Start fading 1.5 seconds before end

        video.addEventListener('timeupdate', function() {
            // Fade to black near the end
            if (video.currentTime >= fadeStartTime) {
                fadeOverlay.classList.add('active');
            } else {
                fadeOverlay.classList.remove('active');
            }
        });

        // Reset fade when video loops
        video.addEventListener('seeked', function() {
            if (video.currentTime < 1) {
                fadeOverlay.classList.remove('active');
            }
        });
    });
}

// Splash Screen Animation
document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splash-screen');
    const splashTitle = document.getElementById('splash-title');
    const navbar = document.querySelector('.navbar');
    const splashVideo = document.getElementById('splash-video');
    const heroVideo = document.getElementById('hero-video');
    const heroSection = document.querySelector('.hero');

    // Setup fade to black looping for both videos
    setupFadeToBlackLoop(splashVideo, splashScreen);
    setupFadeToBlackLoop(heroVideo, heroSection);

    // Show splash screen animation every time
    setTimeout(() => {
        // Start move-to-nav animation after 2 seconds (after fade-in)
        splashTitle.classList.add('animate-to-nav');

        // Show navbar at the end of the animation for seamless transition
        setTimeout(() => {
            navbar.classList.add('visible');
        }, 1000); // Show navbar when splash title reaches nav position
    }, 2000);

    setTimeout(() => {
        // Hide splash screen after animation completes
        splashScreen.classList.add('hidden');

        // Remove splash screen from DOM after transition
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 800);
    }, 3800);
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'transparent';
    }
});

// Contact Form Handler
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[placeholder="Your Name"]').value;
    const email = this.querySelector('input[placeholder="Your Email"]').value;
    const company = this.querySelector('input[placeholder="Company"]').value;
    const message = this.querySelector('textarea').value;
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission (replace with actual form handling)
    alert('Thank you for your message! We\'ll get back to you soon.');
    this.reset();
});

// Intersection Observer for Fade In Animations
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

// Add fade-in animation to service cards and sections
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.service-card, .about-content, .contact-content');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        
        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active navigation link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #3498db !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);