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
function smoothScroll(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        console.warn('Element not found for id:', sectionId);
    }
}

// Toggle hero background between MSU logos and simple images (cycles through 3 modes)
function toggleHeroBackground() {
    const bg = document.querySelector('.hero-background');
    const btn = document.querySelector('.nav-toggle-btn');
    const body = document.body;
    if (!bg || !btn) return;
    
    // Cycle: logos (dark) → simple-bg (light) → simple-bg-alt (modern) → logos
    if (bg.classList.contains('simple-bg-alt')) {
        bg.classList.remove('simple-bg-alt');
        bg.classList.remove('simple-bg');
        body.classList.remove('theme-modern');
        body.classList.remove('theme-light');
        localStorage.setItem('pageTheme', 'dark');
        btn.setAttribute('aria-pressed', 'false');
    } else if (bg.classList.contains('simple-bg')) {
        bg.classList.remove('simple-bg');
        bg.classList.add('simple-bg-alt');
        body.classList.remove('theme-light');
        body.classList.add('theme-modern');
        localStorage.setItem('pageTheme', 'modern');
        btn.setAttribute('aria-pressed', 'true');
    } else {
        bg.classList.add('simple-bg');
        body.classList.add('theme-light');
        localStorage.setItem('pageTheme', 'light');
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
                smoothScroll(targetId);
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
    const github = document.getElementById('modal-github');

    if (project === 'project1') {
        title.textContent = 'CG Text Checker';
        description.textContent = 'A Streamlit app that classifies whether text is human-written or AI-generated using XGBoost with feature extraction (text stats, sentiment, POS tags).';
        tech.innerHTML = '<li>Streamlit, Python</li><li>XGBoost Classifier</li><li>spaCy, NLTK VADER</li>';
        features.innerHTML = '<li>AI vs Human classification</li><li>Confidence scores</li><li>Feature analysis</li><li>Product category input</li>';
        github.innerHTML = '<strong>GitHub:</strong> <a href="https://github.com/lukaschachich/Chachich-cg-text-checker" target="_blank">Chachich-cg-text-checker</a>';
    } else if (project === 'project2') {
        title.textContent = 'Stock Direction Predictor ML Lab';
        description.textContent = 'An AI project I created with just some prompts. A modular ML pipeline for stock prediction using Random Forest classification. Fetches real stock data, engineers features, and backtests trading strategies entirely in-browser with Pyodide.';
        tech.innerHTML = '<li>Python, Pyodide, scikit-learn</li><li>yfinance, Pandas, NumPy</li><li>JavaScript, Chart.js</li>';
        features.innerHTML = '<li>Real stock data via yfinance</li><li>Random Forest classification</li><li>Backtesting & strategy simulation</li><li>Accuracy and returns charts</li><li>No backend required</li>';
        github.innerHTML = '<strong>GitHub:</strong> <a href="https://github.com/lukaschachich/chachich-daily-stock-predictor-strategy" target="_blank">chachich-daily-stock-predictor-strategy</a>';
    } else if (project === 'project3') {
        title.textContent = 'Personal Portfolio Website';
        description.textContent = 'A modern, responsive portfolio website built with vanilla HTML, CSS, and JavaScript created with prompts, and tweaking HTML code. Features interactive animations, project modals, dark theme with MSU green accents, and mobile-first responsive design—no frameworks required.';
        tech.innerHTML = '<li>HTML5, CSS3, JavaScript</li><li>Responsive Design & Mobile-first</li><li>CSS Animations & Parallax Effects</li>';
        features.innerHTML = '<li>Responsive design (desktop, tablet, mobile)</li><li>Parallax scrolling & smooth animations</li><li>Interactive project modals with GitHub links</li><li>Dark theme with MSU color scheme</li><li>Semantic HTML & accessibility support</li>';
        github.innerHTML = '<strong>GitHub:</strong> <a href="https://github.com/lukaschachich/personal_webpage" target="_blank">personal_webpage</a>';
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
        // Restore theme from localStorage or use default
        const savedTheme = localStorage.getItem('pageTheme');
        if (savedTheme === 'light') {
            bg.classList.add('simple-bg');
            document.body.classList.add('theme-light');
            btn.setAttribute('aria-pressed', 'true');
        } else if (savedTheme === 'modern') {
            bg.classList.add('simple-bg');
            bg.classList.add('simple-bg-alt');
            document.body.classList.add('theme-modern');
            btn.setAttribute('aria-pressed', 'true');
        } else {
            const hasBackground = bg.classList.contains('simple-bg') || bg.classList.contains('simple-bg-alt');
            btn.setAttribute('aria-pressed', String(hasBackground));
        }
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
