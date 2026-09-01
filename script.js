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

// Splash Screen Animation (Home page only — other pages have no splash markup)
document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splash-screen');
    const splashTitle = document.getElementById('splash-title');
    const navbar = document.querySelector('.navbar');
    const splashVideo = document.getElementById('splash-video');
    const heroVideo = document.getElementById('hero-video');
    const heroSection = document.querySelector('.hero');

    if (!splashScreen || !splashTitle || !navbar || !splashVideo) {
        // No splash on this page — just make sure the navbar is visible.
        if (navbar) {
            navbar.classList.add('visible');
        }
        return;
    }

    // Setup fade to black looping for both videos
    setupFadeToBlackLoop(splashVideo, splashScreen);
    if (heroVideo && heroSection) {
        setupFadeToBlackLoop(heroVideo, heroSection);
    }

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

// Contact Form Handler (only present on contact.html)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
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

        // Build mailto link with form data
        const recipient = 'info@nautiqsolutions.com';
        const subject = encodeURIComponent(`Contact from ${name}${company ? ` (${company})` : ''}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\n\nMessage:\n${message}`);

        window.open(`mailto:${recipient}?subject=${subject}&body=${body}`, '_blank');
        this.reset();
    });
}

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

// Active Navigation Link Highlighting (single-page scroll spy)
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

// Offerings Interactive Category View
document.addEventListener('DOMContentLoaded', function() {
    const categoryData = {
        audits: {
            title: 'Shipboard Audits',
            services: [
                {
                    icon: '📋',
                    title: 'Internal ISM, ISPS & MLC Audits',
                    description: '<ul><li>Independent audits conducted in accordance with the ISM Code</li><li>Verify compliance with safety management, security, and crew welfare requirements</li><li>Identify gaps between procedures and actual onboard practices</li><li>Help shore management strengthen compliance and operational reliability</li></ul>'
                },
                {
                    icon: '🧭',
                    title: 'Navigational Audits',
                    description: '<ul><li>Cover both static and dynamic assessments aligned with SIRE 2.0 standards</li><li>Static reviews examine voyage planning and documentation</li><li>Dynamic audits assess bridge team performance and risk management during live operations</li></ul>'
                },
                {
                    icon: '📦',
                    title: 'Cargo & Mooring Audits',
                    description: '<ul><li>Evaluate cargo handling practices and mooring operations</li><li>Aligned with SIRE 2.0 and industry best practices</li><li>Identify operational risks and ensure procedural compliance</li><li>Enhance safety during critical deck operations</li></ul>'
                },
                {
                    icon: '📊',
                    title: 'VDR Analysis Audit',
                    description: '<ul><li>Examine Voyage Data Recorder recorded data</li><li>Validate bridge procedures and identify behavioural patterns</li><li>Turn raw data into actionable safety insights</li></ul>'
                }
            ]
        },
        inspections: {
            title: 'Shipboard Inspections',
            services: [
                {
                    icon: '🔍',
                    title: 'Pre-AMSA Inspections',
                    description: '<ul><li>Prepare your vessel for Australian Maritime Safety Authority inspections</li><li>Identify compliance gaps before inspection</li></ul>'
                },
                {
                    icon: '🔍',
                    title: 'Pre-Vetting Inspections',
                    description: '<ul><li>Independent inspections to prepare vessels for oil major and chemical industry vetting programmes such as SIRE and CDI</li><li>Identify operational gaps and documentation issues</li><li>Address onboard practices that could affect vetting outcomes</li></ul>'
                },
                {
                    icon: '🔍',
                    title: 'Pre-Hire Inspections',
                    description: '<ul><li>Thorough assessment of vessel condition and operational readiness</li><li>Ensure charterer hire inspection readiness</li></ul>'
                },
                {
                    icon: '🔍',
                    title: 'Pre-Sale Inspections',
                    description: '<ul><li>Detailed technical inspection supporting vessel sale</li><li>Comprehensive condition documentation</li></ul>'
                },
                {
                    icon: '🔍',
                    title: 'Pre-Purchase Inspections',
                    description: '<ul><li>Due diligence assessment for vessel acquisition</li><li>Identify technical status and regulatory compliance</li></ul>'
                }
            ]
        },
        risk: {
            title: 'Risk Management',
            services: [
                {
                    icon: '⚠️',
                    title: 'Incident Investigation & Root Cause Analysis',
                    description: '<ul><li>Professional investigation of maritime incidents</li><li>Root cause analysis and corrective action plans</li></ul>'
                },
                {
                    icon: '⚠️',
                    title: 'Safety Risk Assessments',
                    description: '<ul><li>Proactive identification and evaluation of safety risks</li><li>Assessment across vessel operations with prioritization</li></ul>'
                }
            ]
        }
    };

    const indexItems = document.querySelectorAll('.index-item');
    const categoryTitle = document.getElementById('category-title');
    const categoryServices = document.getElementById('category-services');

    function renderCategory(categoryKey) {
        const category = categoryData[categoryKey];
        if (!category) return;

        categoryTitle.textContent = category.title;
        categoryServices.innerHTML = '';

        category.services.forEach(service => {
            const serviceDiv = document.createElement('div');
            serviceDiv.className = 'service-item';
            serviceDiv.innerHTML = `
                <div class="service-item-icon">${service.icon}</div>
                <h4>${service.title}</h4>
                <p>${service.description}</p>
            `;
            categoryServices.appendChild(serviceDiv);
        });
    }

    // Set first item as active and render default category
    if (indexItems.length > 0) {
        indexItems[0].classList.add('active');
        renderCategory('audits');
    }

    indexItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            const categoryKey = this.getAttribute('data-category');

            // Update active state
            indexItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // Render category
            renderCategory(categoryKey);
        });
    });
});

// Footer year
document.addEventListener('DOMContentLoaded', function() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});

// =====================================================
// Interactive additions: timeline, stat strip, coverage map
// =====================================================
(function () {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasAnime = typeof anime !== 'undefined';

    // ---------- Timeline reveal ----------
    (function () {
        const track = document.getElementById('timeline-track');
        if (!track) return;
        const points = track.querySelectorAll('.timeline-point');

        const reveal = (el, i) => {
            if (prefersReducedMotion || !hasAnime) {
                el.style.opacity = 1;
                el.style.transform = 'none';
                return;
            }
            anime({
                targets: el,
                opacity: [0, 1],
                translateY: [16, 0],
                easing: 'easeOutQuad',
                duration: 500,
                delay: i * 120
            });
        };

        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    points.forEach((el, i) => reveal(el, i));
                    io.disconnect();
                }
            });
        }, { threshold: 0.3 });
        io.observe(track);
    })();

    // ---------- Animated credentials stat strip ----------
    (function () {
        const strip = document.getElementById('stat-strip');
        if (!strip) return;
        const cards = strip.querySelectorAll('.stat-card');
        const numbers = strip.querySelectorAll('.stat-number');

        const revealCards = () => {
            if (prefersReducedMotion || !hasAnime) {
                cards.forEach(c => { c.style.opacity = 1; c.style.transform = 'none'; });
            } else {
                anime({
                    targets: cards,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    delay: anime.stagger(100),
                    duration: 500,
                    easing: 'easeOutQuad'
                });
            }
        };

        const countUp = () => {
            numbers.forEach(el => {
                const target = parseInt(el.dataset.target, 10);
                const suffix = el.dataset.suffix || '';
                if (prefersReducedMotion || !hasAnime) {
                    el.textContent = target + suffix;
                    return;
                }
                const obj = { val: 0 };
                el.textContent = '0' + suffix;
                anime({
                    targets: obj,
                    val: target,
                    round: 1,
                    duration: 1400,
                    easing: 'easeOutExpo',
                    update: () => { el.textContent = obj.val + suffix; }
                });
            });
        };

        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    revealCards();
                    countUp();
                    io.disconnect();
                }
            });
        }, { threshold: 0.3 });
        io.observe(strip);
    })();

    // ---------- D3 coverage map ----------
    (function () {
        const svgEl = document.getElementById('coverage-map');
        if (!svgEl || typeof d3 === 'undefined' || typeof topojson === 'undefined') {
            showFallback();
            return;
        }

        function showFallback() {
            const fallback = document.getElementById('coverage-grid-fallback');
            const mapWrap = document.querySelector('.map-wrap');
            const legend = document.querySelector('.map-legend');
            if (fallback) fallback.style.display = 'grid';
            if (mapWrap) mapWrap.style.display = 'none';
            if (legend) legend.style.display = 'none';
        }

        // ISO 3166-1 numeric codes.
        // Note: Fiji/Samoa/Tonga are deliberately excluded from the Pacific
        // Islands markers — their geometry straddles the antimeridian (180°),
        // which breaks the map's bounding-box fit. "Pacific Islands" isn't
        // itemized in the source copy, so PNG/Solomon Islands/Vanuatu stand
        // in for the region instead.
        const PRIMARY = new Set([
            '036', // Australia
            '554', // New Zealand
            '392', // Japan
            '410', // South Korea
            '598', // Papua New Guinea
            '090', // Solomon Islands
            '548'  // Vanuatu
        ]);
        const EXTENDED = new Set([
            '360', '458', '764', '704', '608', '104', '116', '418', '096', '626' // Southeast Asia
        ]);
        const NAMES = {
            '036': 'Australia', '554': 'New Zealand', '392': 'Japan', '410': 'South Korea',
            '598': 'Papua New Guinea', '090': 'Solomon Islands', '548': 'Vanuatu',
            '360': 'Indonesia', '458': 'Malaysia', '764': 'Thailand', '704': 'Vietnam',
            '608': 'Philippines', '104': 'Myanmar', '116': 'Cambodia', '418': 'Laos',
            '096': 'Brunei', '626': 'Timor-Leste'
        };

        const svg = d3.select(svgEl);
        const width = 960, height = 560;
        const tooltip = document.getElementById('map-tooltip');

        fetch('vendor/countries-110m.json')
            .then(r => r.json())
            .then(world => {
                const countries = topojson.feature(world, world.objects.countries).features;
                const coverageFeatures = countries.filter(d => PRIMARY.has(d.id) || EXTENDED.has(d.id));
                const coverageCollection = { type: 'FeatureCollection', features: coverageFeatures };

                const projection = d3.geoMercator();
                projection.fitExtent([[30, 30], [width - 30, height - 30]], coverageCollection);

                const path = d3.geoPath().projection(projection);

                svg.selectAll('path')
                    .data(countries)
                    .enter()
                    .append('path')
                    .attr('d', path)
                    .attr('class', d => {
                        if (PRIMARY.has(d.id)) return 'country primary';
                        if (EXTENDED.has(d.id)) return 'country extended';
                        return 'country';
                    })
                    .on('mousemove', (event, d) => {
                        if (!PRIMARY.has(d.id) && !EXTENDED.has(d.id)) return;
                        const name = NAMES[d.id] || d.properties.name;
                        const note = PRIMARY.has(d.id)
                            ? 'Short notice'
                            : 'Additional lead time required (visa arrangements)';
                        tooltip.innerHTML = `<strong>${name}</strong><br>${note}`;
                        tooltip.style.left = (event.clientX + 16) + 'px';
                        tooltip.style.top = (event.clientY + 16) + 'px';
                        tooltip.style.opacity = 1;
                    })
                    .on('mouseleave', () => {
                        tooltip.style.opacity = 0;
                    });
            })
            .catch(err => {
                console.error('Coverage map data failed to load, showing list fallback:', err);
                showFallback();
            });
    })();
})();
