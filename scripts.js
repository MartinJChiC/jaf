        document.addEventListener('DOMContentLoaded', function() {
            const menuToggle = document.querySelector('.menu-toggle');
            const navLinks = document.querySelector('.nav-links');
            const header = document.querySelector('#header');
            const cursor = document.querySelector('.cursor');

            // Mobile Menu
            menuToggle.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                menuToggle.classList.toggle('active');
                
                // Animate hamburger lines
                const spans = menuToggle.querySelectorAll('span');
                if (navLinks.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    spans[0].style.transform = 'rotate(0) translate(0, 0)';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'rotate(0) translate(0, 0)';
                }
            });

            // Close menu when clicking on a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                    const spans = menuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'rotate(0) translate(0, 0)';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'rotate(0) translate(0, 0)';
                });
            });

            // Custom Cursor (Desktop only)
            if (window.innerWidth > 1024) {
                document.addEventListener('mousemove', (e) => {
                    cursor.style.left = e.clientX - 10 + 'px';
                    cursor.style.top = e.clientY - 10 + 'px';
                    cursor.classList.add('active');
                });

                document.addEventListener('mousedown', () => {
                    cursor.classList.add('clicked');
                });

                document.addEventListener('mouseup', () => {
                    cursor.classList.remove('clicked');
                });

                document.addEventListener('mouseleave', () => {
                    cursor.classList.remove('active');
                });
            }

            // Enhanced Smooth scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const headerOffset = 100;
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Enhanced Contact form with validation
            const contactForm = document.getElementById('contactForm');
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;

            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Change button state
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitBtn.disabled = true;
                
                // Get form data
                const name = document.getElementById('name').value;
                const phone = document.getElementById('phone').value;
                const email = document.getElementById('email').value;
                const interest = document.getElementById('interest').value;
                const message = document.getElementById('message').value;
                
                // Create WhatsApp message
                let whatsappMessage = `🌟 *Nueva Consulta de Belleza* 🌟%0A%0A`;
                whatsappMessage += `👤 *Nombre:* ${name}%0A`;
                whatsappMessage += `📱 *Teléfono:* ${phone}%0A`;
                if (email) {
                    whatsappMessage += `📧 *Email:* ${email}%0A`;
                }
                whatsappMessage += `💄 *Interés:* ${interest}%0A`;
                if (message) {
                    whatsappMessage += `💬 *Mensaje:* ${message}%0A`;
                }
                whatsappMessage += `%0A✨ *¡Lista para descubrir mi belleza con Jafra!* ✨`;
                
                const whatsappUrl = `https://wa.me/5219861139317?text=${whatsappMessage}`;
                
                // Simulate processing time
                setTimeout(() => {
                    window.open(whatsappUrl, '_blank');
                    
                    // Reset button
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    
                    // Show success message
                    showNotification('¡Mensaje preparado! Te estoy redirigiendo a WhatsApp.', 'success');
                    
                    // Reset form
                    contactForm.reset();
                }, 1500);
            });

            // Form validation enhancements
            const inputs = document.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.style.borderColor = 'var(--primary-gold)';
                    this.style.boxShadow = '0 0 0 4px rgba(212, 175, 55, 0.1)';
                    this.style.transform = 'scale(1.02)';
                });
                
                input.addEventListener('blur', function() {
                    this.style.transform = 'scale(1)';
                    if (this.checkValidity()) {
                        this.style.borderColor = 'var(--primary-gold)';
                        this.style.boxShadow = '0 0 0 2px rgba(212, 175, 55, 0.1)';
                    } else {
                        this.style.borderColor = '#ff6b6b';
                        this.style.boxShadow = '0 0 0 2px rgba(255, 107, 107, 0.1)';
                    }
                });
            });

            // Advanced scroll effects
            let lastScrollY = window.scrollY;
            const scrollThreshold = 100;

            window.addEventListener('scroll', () => {
                const currentScrollY = window.scrollY;
                
                // Header background effect
                if (currentScrollY > scrollThreshold) {
                    header.style.background = 'rgba(255, 255, 255, 0.9)';
                    header.style.backdropFilter = 'blur(20px)';
                    header.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
                } else {
                    header.style.background = 'rgba(255,255,255,0.1)';
                    header.style.backdropFilter = 'blur(20px)';
                    header.style.boxShadow = 'none';
                }
                
                // Hide/show header on scroll
                if (currentScrollY > lastScrollY && currentScrollY > 300) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
                
                lastScrollY = currentScrollY;
            });

            // Intersection Observer for animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        
                        if (element.classList.contains('about-text')) {
                            element.classList.add('animate-left');
                        } else if (element.classList.contains('about-image')) {
                            element.classList.add('animate-right');
                        } else {
                            element.classList.add('animate-up');
                        }
                        
                        // Animate stats counters
                        const stats = element.querySelectorAll('.stat-number');
                        stats.forEach(stat => {
                            animateCounter(stat);
                        });
                    }
                });
            }, observerOptions);

            // Observe elements for animation
            document.querySelectorAll('.section-title, .about-text, .about-image, .product-card, .service-card, .contact-info, .contact-form').forEach(el => {
                observer.observe(el);
            });

            // Counter animation function
            function animateCounter(element) {
                const target = parseInt(element.textContent);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        element.textContent = target + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
                        clearInterval(timer);
                    } else {
                        element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
                    }
                }, 16);
            }

            // Enhanced product card effects
            document.querySelectorAll('.product-card').forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
                
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-20px) rotate(2deg) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) rotate(0deg) scale(1)';
                });
            });

            // Service card click effects
            document.querySelectorAll('.service-card').forEach(card => {
                card.addEventListener('click', function() {
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1) translateY(-8px)';
                    }, 150);
                    
                    // Add ripple effect
                    createRipple(this, event);
                });
            });

            // Ripple effect function
            function createRipple(element, event) {
                const ripple = document.createElement('span');
                const rect = element.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = event.clientX - rect.left - size / 2;
                const y = event.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(212, 175, 55, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                element.style.position = 'relative';
                element.style.overflow = 'hidden';
                element.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }

            // Notification system
            function showNotification(message, type = 'info') {
                const notification = document.createElement('div');
                notification.innerHTML = `
                    <div style="
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: ${type === 'success' ? 'var(--primary-gold)' : '#ff6b6b'};
                        color: white;
                        padding: 1rem 1.5rem;
                        border-radius: 12px;
                        box-shadow: var(--shadow-medium);
                        z-index: 10000;
                        animation: slideInRight 0.3s ease;
                        max-width: 300px;
                        backdrop-filter: blur(20px);
                    ">
                        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                        ${message}
                    </div>
                `;
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.animation = 'slideOutRight 0.3s ease';
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 4000);
            }

            // Add CSS for notifications
            const notificationCSS = document.createElement('style');
            notificationCSS.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(notificationCSS);

            // Parallax effect for hero
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                
                if (hero && scrolled < hero.offsetHeight) {
                    const speed = scrolled * 0.5;
                    hero.style.transform = `translateY(${speed}px)`;
                }
            });

            // Typing effect for hero title
            const heroTitle = document.querySelector('.hero h1');
            if (heroTitle) {
                const titleText = heroTitle.textContent;
                heroTitle.textContent = '';
                heroTitle.style.borderRight = '3px solid white';
                
                let i = 0;
                const typeWriter = () => {
                    if (i < titleText.length) {
                        heroTitle.textContent += titleText.charAt(i);
                        i++;
                        setTimeout(typeWriter, 150);
                    } else {
                        heroTitle.style.borderRight = 'none';
                    }
                };
                
                setTimeout(typeWriter, 1000);
            }
        });
    