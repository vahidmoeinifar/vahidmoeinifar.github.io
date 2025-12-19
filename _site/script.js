// ============================================
// WEBSITE INITIALIZATION
// ============================================

(function() {
    'use strict';
    
    console.log('Initializing website...');
    
    // ============================================
    // THEME MANAGEMENT
    // ============================================
    
    const ThemeManager = {
        // DARK THEME IS DEFAULT
        init() {
            this.themeToggle = document.getElementById('themeToggle');
            if (!this.themeToggle) {
                console.warn('Theme toggle button not found');
                return;
            }
            
            // FORCE DARK THEME ON LOAD (ignore localStorage)
            this.setTheme('dark');
            
            // Add click event
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
            
            console.log('Theme manager initialized');
        },
        
        setTheme(theme) {
            if (theme === 'light') {
                document.body.classList.add('light-theme');
                this.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'light');
            } else {
                document.body.classList.remove('light-theme');
                this.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'dark');
            }
        },
        
        toggleTheme() {
            const isLightTheme = document.body.classList.contains('light-theme');
            this.setTheme(isLightTheme ? 'dark' : 'light');
        },
        
        getCurrentTheme() {
            return document.body.classList.contains('light-theme') ? 'light' : 'dark';
        }
    };
    
    // ============================================
    // MOBILE NAVIGATION
    // ============================================
    
    const MobileNavigation = {
        init() {
            this.menuToggle = document.getElementById('menuToggle');
            this.navLinks = document.querySelector('.nav-links');
            
            if (!this.menuToggle || !this.navLinks) {
                console.warn('Mobile navigation elements not found');
                return;
            }
            
            // Add click event to menu toggle
            this.menuToggle.addEventListener('click', (e) => this.toggleMenu(e));
            
            // Add click events to nav links
            this.navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => this.handleOutsideClick(e));
            
            // Close menu on window resize
            window.addEventListener('resize', () => this.handleResize());
            
            console.log('Mobile navigation initialized');
        },
        
        toggleMenu(e) {
            e.stopPropagation();
            const isActive = this.navLinks.classList.toggle('active');
            
            if (isActive) {
                this.menuToggle.innerHTML = '<i class="fas fa-times"></i>';
                document.body.style.overflow = 'hidden';
            } else {
                this.menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            }
        },
        
        closeMenu() {
            this.navLinks.classList.remove('active');
            this.menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        },
        
        handleOutsideClick(e) {
            if (!this.navLinks.contains(e.target) && 
                !this.menuToggle.contains(e.target) && 
                this.navLinks.classList.contains('active')) {
                this.closeMenu();
            }
        },
        
        handleResize() {
            if (window.innerWidth > 768 && this.navLinks.classList.contains('active')) {
                this.closeMenu();
            }
        }
    };
    
    // ============================================
    // SMOOTH SCROLLING
    // ============================================
    
    const SmoothScroll = {
        init() {
            // Only enable on home page
            const isHomePage = window.location.pathname === '/' || 
                              window.location.pathname === '/index.html' ||
                              window.location.pathname.endsWith('.github.io/');
            
            if (!isHomePage) return;
            
            // Add click events to anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => this.handleAnchorClick(e));
            });
            
            console.log('Smooth scroll initialized');
        },
        
        handleAnchorClick(e) {
            const targetId = e.currentTarget.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL
                history.pushState(null, null, targetId);
                
                // Close mobile menu if open
                MobileNavigation.closeMenu();
            }
        }
    };
    
    // ============================================
    // NAVBAR SCROLL EFFECTS
    // ============================================
    
    const NavbarEffects = {
        init() {
            this.navbar = document.querySelector('.navbar');
            if (!this.navbar) return;
            
            // Initial check
            this.updateNavbar();
            
            // Listen for scroll
            window.addEventListener('scroll', () => this.updateNavbar());
            
            console.log('Navbar effects initialized');
        },
        
        updateNavbar() {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
                this.navbar.style.padding = '15px 0';
                this.navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            } else {
                this.navbar.classList.remove('scrolled');
                this.navbar.style.padding = '20px 0';
                this.navbar.style.boxShadow = 'none';
            }
        }
    };
    
    // ============================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ============================================
    
    const ActiveLinkManager = {
        init() {
            this.updateActiveLink();
            window.addEventListener('scroll', () => this.updateActiveLink());
            console.log('Active link manager initialized');
        },
        
        updateActiveLink() {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    this.setActiveLink(sectionId);
                }
            });
        },
        
        setActiveLink(sectionId) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    };
    
    // ============================================
    // INITIALIZE EVERYTHING
    // ============================================
    
    function initializeWebsite() {
        // Initialize all components
        ThemeManager.init();
        MobileNavigation.init();
        SmoothScroll.init();
        NavbarEffects.init();
        ActiveLinkManager.init();
        
        console.log('Website initialization complete');
    }
    
    // ============================================
    // DOM READY & ERROR HANDLING
    // ============================================
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeWebsite);
    } else {
        initializeWebsite();
    }
    
    // Global error handler
    window.addEventListener('error', function(e) {
        console.error('Website error:', e.error);
    });
    
})();

// ============================================
// DEBUG UTILITIES (Remove in production)
// ============================================

function debugWebsite() {
    console.log('=== WEBSITE DEBUG INFO ===');
    console.log('Theme:', document.body.classList.contains('light-theme') ? 'Light' : 'Dark');
    console.log('LocalStorage theme:', localStorage.getItem('theme'));
    console.log('Mobile menu active:', document.querySelector('.nav-links')?.classList.contains('active'));
    console.log('Window width:', window.innerWidth);
    console.log('Scroll position:', window.scrollY);
    console.log('=======================');
}
