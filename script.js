// ==================== SCROLL-BASED PARALLAX & ANIMATIONS ====================

/**
 * PARALLAX EFFECT EXPLANATION:
 * 
 * This uses the scroll position (window.scrollY) to move background elements
 * at different speeds, creating a depth illusion. The formula:
 * 
 * transform: translateY(scrollPosition * speed)
 * 
 * Where speed is typically 0.3-0.5 for background layers.
 * 
 * PERFORMANCE:
 * - Uses 'requestAnimationFrame' for smooth 60fps animation
 * - Throttles scroll events to prevent excessive calculations
 * - Uses 'transform' and 'will-change' for GPU acceleration
 */

// Throttle function to optimize scroll event performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================== PARALLAX BACKGROUND EFFECT ====================
class ParallaxEffect {
    constructor() {
        this.element = document.querySelector('.hero-background');
        this.speed = 0.5; // Adjust for more/less parallax effect
        this.init();
    }
    
    init() {
        // Add will-change for GPU acceleration
        this.element.style.willChange = 'transform';
        window.addEventListener('scroll', throttle(() => this.update(), 16));
    }
    
    update() {
        const scrollY = window.scrollY;
        // Calculate parallax offset (moves slower than scroll)
        const offset = scrollY * this.speed;
        this.element.style.transform = `translateY(${offset}px)`;
    }
}

// ==================== SCROLL-TRIGGERED ANIMATIONS ====================
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll(
            '.skill-card, .project-card'
        );
        this.init();
    }
    
    init() {
        // Use Intersection Observer for better performance
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1, // Trigger when 10% of element is visible
                rootMargin: '0px 0px -100px 0px' // Start animation 100px before entering
            }
        );
        
        this.elements.forEach(el => observer.observe(el));
    }
}

// ==================== BUTTON HOVER ANIMATIONS ====================
/**
 * HOVER EFFECTS:
 * 
 * Primary Button: Creates expanding ripple effect on hover
 * - Uses ::before pseudo-element with radial gradient
 * - Scales from 0 to 300px over 0.3s
 * - Glows with box-shadow
 * 
 * Secondary Button: Slides background in from left
 * - Uses ::after pseudo-element positioned at -100%
 * - Animates left from -100% to 0% on hover
 * - Transitions color from accent to black
 * 
 * All implemented via CSS for optimal performance
 */

// Smooth scroll navigation
function scrollTo(sectionId) {
    console.log('Scrolling to:', sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
        console.log('Element found:', element);
        element.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.log('Element not found for id:', sectionId);
    }
}

// Toggle hero background between MSU logos and simple images (cycles through 3 modes)
function toggleHeroBackground() {
    const bg = document.querySelector('.hero-background');
    const btn = document.querySelector('.nav-toggle-btn');
    if (!bg || !btn) return;
    
    // Cycle: logos → simple-bg → simple-bg-alt → logos
    if (bg.classList.contains('simple-bg-alt')) {
        bg.classList.remove('simple-bg-alt');
        btn.setAttribute('aria-pressed', 'false');
    } else if (bg.classList.contains('simple-bg')) {
        bg.classList.remove('simple-bg');
        bg.classList.add('simple-bg-alt');
        btn.setAttribute('aria-pressed', 'true');
    } else {
        bg.classList.add('simple-bg');
        btn.setAttribute('aria-pressed', 'true');
    }
}

// ==================== NAVIGATION EFFECTS ====================
class NavigationEffects {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.init();
    }
    
    init() {
        // Update active nav link on scroll
        window.addEventListener('scroll', throttle(() => this.updateActiveLink(), 100));
        
        // Add click event to nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                scrollTo(targetId);
            });
        });
    }
    
    updateActiveLink() {
        let current = '';
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
}

// ==================== MOBILE MENU TOGGLE ====================
class MobileMenu {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        if (this.hamburger) {
            this.init();
        }
    }
    
    init() {
        this.hamburger.addEventListener('click', () => this.toggle());
        
        // Close menu when link is clicked (only on mobile)
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.close();
                }
            });
        });
    }
    
    toggle() {
        this.navMenu.style.display = 
            this.navMenu.style.display === 'flex' ? 'none' : 'flex';
    }
    
    close() {
        this.navMenu.style.display = 'none';
    }
}

// ==================== MODAL FUNCTIONALITY ====================
function openModal(project) {
    const modal = document.getElementById('projectModal');
    const title = document.getElementById('modal-title');
    const description = document.getElementById('modal-description');
    const tech = document.getElementById('modal-tech');
    const features = document.getElementById('modal-features');

    if (project === 'project1') {
        title.textContent = 'E-Commerce Platform';
        description.textContent = 'A comprehensive full-stack e-commerce application designed to provide a seamless online shopping experience. The platform integrates secure payment processing, real-time inventory tracking, and user-friendly admin dashboards for efficient management.';
        tech.innerHTML = '<li>Frontend: React, HTML, CSS</li><li>Backend: Node.js, Express</li><li>Database: MongoDB</li><li>Payment: Stripe API</li>';
        features.innerHTML = '<li>User authentication and profiles</li><li>Product catalog with search and filters</li><li>Shopping cart and checkout process</li><li>Order tracking and history</li><li>Admin panel for inventory management</li>';
    } else if (project === 'project2') {
        title.textContent = 'Analytics Dashboard';
        description.textContent = 'An interactive data visualization dashboard that transforms complex datasets into actionable insights. Built for real-time monitoring and customizable reporting across various business metrics.';
        tech.innerHTML = '<li>Frontend: D3.js, Chart.js</li><li>Backend: Python, Flask</li><li>Database: PostgreSQL</li><li>Data Processing: Pandas, NumPy</li>';
        features.innerHTML = '<li>Real-time data updates</li><li>Customizable chart types</li><li>Export functionality (PDF, CSV)</li><li>User role-based access</li><li>Responsive design for mobile devices</li>';
    } else if (project === 'project3') {
        title.textContent = 'Mobile App Suite';
        description.textContent = 'A suite of cross-platform mobile applications developed for iOS and Android. These apps provide essential tools for productivity, communication, and entertainment with native performance.';
        tech.innerHTML = '<li>Framework: React Native</li><li>Languages: JavaScript, TypeScript</li><li>Backend: Firebase</li><li>APIs: RESTful, GraphQL</li>';
        features.innerHTML = '<li>Cross-platform compatibility</li><li>Offline functionality</li><li>Push notifications</li><li>In-app purchases</li><li>Integration with device features (camera, GPS)</li>';
    }

    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('projectModal').style.display = 'none';
}

// Close modal when clicking outside or on close button
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.onclick = closeModal;
    
    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    }
});

// ==================== INITIALIZE ALL EFFECTS ON DOM LOAD ====================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animation and interaction systems
    new ParallaxEffect();
    new ScrollAnimations();
    new NavigationEffects();
    new MobileMenu();
    
    // Log initialization for debugging
    console.log('✓ Portfolio site initialized');
    console.log('✓ Parallax effect enabled');
    console.log('✓ Scroll animations active');
    console.log('✓ Navigation effects loaded');
    
    // Ensure initial toggle button aria state reflects current mode
    const bg = document.querySelector('.hero-background');
    const btn = document.querySelector('.nav-toggle-btn');
    if (bg && btn) {
        const hasBackground = bg.classList.contains('simple-bg') || bg.classList.contains('simple-bg-alt');
        btn.setAttribute('aria-pressed', String(hasBackground));
    }
});

// ==================== OPTIONAL: SCROLL PROGRESS BAR ====================
/**
 * Uncomment below to add a progress bar at the top that fills as you scroll
 */
// window.addEventListener('scroll', () => {
//     const scrollTop = window.scrollY;
//     const docHeight = document.documentElement.scrollHeight - window.innerHeight;
//     const scrollPercent = (scrollTop / docHeight) * 100;
//     
//     let progressBar = document.getElementById('progress-bar');
//     if (!progressBar) {
//         progressBar = document.createElement('div');
//         progressBar.id = 'progress-bar';
//         progressBar.style.cssText = `
//             position: fixed;
//             top: 60px;
//             left: 0;
//             height: 3px;
//             background: linear-gradient(90deg, var(--color-accent), var(--color-accent-light));
//             z-index: 999;
//             box-shadow: 0 0 10px rgba(0, 208, 132, 0.5);
//         `;
//         document.body.appendChild(progressBar);
//     }
//     progressBar.style.width = scrollPercent + '%';
// });
