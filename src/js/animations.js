
const initAnimations = () => {
    // Wait for GSAP and ScrollTrigger to be loaded
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP not loaded yet');
        return;
    }

    // Hero Text Reveal
    const tl = gsap.timeline();

    tl.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        delay: 0.5
    })
        .from('.hero-subtitle', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-description', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.6')
        .from('.hero-cta a', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.4')
        .from('.scroll-indicator', {
            opacity: 0,
            duration: 1
        }, '-=0.2');

    // Section Titles Reveal
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // About Section
    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 75%'
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.about-visual', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 75%'
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
    });

    // Staggered Skills
    gsap.from('.skill-card', {
        scrollTrigger: {
            trigger: '.skills-wrapper',
            start: 'top 85%'
        },
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'back.out(1.7)'
    });

    // Projects Grid
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%'
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
    });

    // Experience Timeline
    gsap.from('.timeline-item', {
        scrollTrigger: {
            trigger: '.timeline',
            start: 'top 80%'
        },
        x: -30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out'
    });

    // Contact Form
    gsap.from('.contact-wrapper', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 75%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    // Navigation Active Link Highlight on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });
    });


    // --- 3D Tilt Effect for Project Cards ---
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const image = card.querySelector('.project-image');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation (max 15 degrees)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Invert Y for natural tilt
            const rotateY = ((x - centerX) / centerX) * 10;

            gsap.to(image, {
                duration: 0.5,
                rotateX: rotateX,
                rotateY: rotateY,
                scale: 1.05,
                ease: 'power2.out',
                transformPerspective: 1000,
                transformOrigin: 'center'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(image, {
                duration: 0.8,
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });

    // --- Auto Scroll for Projects Grid ---
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        let isScrolling = false;
        let scrollSpeed = 0.5; // Pixels per frame
        let animationId;
        let isHovering = false;

        const startAutoScroll = () => {
            if (!isScrolling && !isHovering) {
                isScrolling = true;
                scroll();
            }
        };

        const stopAutoScroll = () => {
            isScrolling = false;
            cancelAnimationFrame(animationId);
        };

        const scroll = () => {
            if (!isScrolling || isHovering) return;

            projectsGrid.scrollLeft += scrollSpeed;

            // Optional: Loop back to start if reached end (simple version)
            // Or just let it stop at the end. For now, let's just let it scroll.
            // If you want infinite scroll, we'd need to clone elements.
            if (projectsGrid.scrollLeft >= projectsGrid.scrollWidth - projectsGrid.clientWidth - 1) {
                // Reached end, maybe pause or reset? 
                // Let's reset for continuous effect after a pause
                // setTimeout(() => { projectsGrid.scrollLeft = 0; }, 1000);
            }

            animationId = requestAnimationFrame(scroll);
        };

        // Pause on hover/touch
        projectsGrid.addEventListener('mouseenter', () => {
            isHovering = true;
            stopAutoScroll();
        });

        projectsGrid.addEventListener('mouseleave', () => {
            isHovering = false;
            startAutoScroll();
        });

        projectsGrid.addEventListener('touchstart', () => {
            isHovering = true;
            stopAutoScroll();
        }, { passive: true });

        projectsGrid.addEventListener('touchend', () => {
            isHovering = false;
            startAutoScroll();
        });

        // Trigger auto-scroll when in view
        ScrollTrigger.create({
            trigger: '.projects-grid',
            start: 'top 80%',
            onEnter: () => {
                // Start after a small delay to let entrance animation finish
                setTimeout(startAutoScroll, 1000);
            },
            onLeaveBack: stopAutoScroll
        });


        // --- Dots Scroll Synchronization ---
        const dots = document.querySelectorAll('.dot');
        const updateActiveDot = () => {
            if (!projectsGrid || dots.length === 0) return;

            // Find the center of the grid container in the viewport
            const gridRect = projectsGrid.getBoundingClientRect();
            const gridCenter = gridRect.left + gridRect.width / 2;

            let closestCardIndex = 0;
            let minDistance = Infinity;

            const cards = projectsGrid.querySelectorAll('.project-card');

            // Find which card is closest to the center
            cards.forEach((card, index) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenter = cardRect.left + cardRect.width / 2;
                const distance = Math.abs(cardCenter - gridCenter);

                if (distance < minDistance) {
                    minDistance = distance;
                    closestCardIndex = index;
                }
            });

            // Map project index to dot index (total 3 dots)
            // Total projects: cards.length
            // We want roughly equal distribution
            const totalCards = cards.length;
            const itemsPerDot = Math.ceil(totalCards / 3);

            // Calculate active dot index (0, 1, or 2)
            let activeDotIndex = Math.floor(closestCardIndex / itemsPerDot);

            // Clamp to max index 2
            if (activeDotIndex > 2) activeDotIndex = 2;

            console.log(`[ScrollDebug] Total: ${totalCards}, Items/Dot: ${itemsPerDot}, Closest: ${closestCardIndex}, ActiveDot: ${activeDotIndex}`);

            dots.forEach((dot, index) => {
                if (index === activeDotIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        // Add Click Interaction for Dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const scrollWidth = projectsGrid.scrollWidth - projectsGrid.clientWidth;
                let targetScrollLeft = 0;

                if (index === 0) targetScrollLeft = 0;
                if (index === 1) targetScrollLeft = scrollWidth * 0.5;
                if (index === 2) targetScrollLeft = scrollWidth;

                projectsGrid.scrollTo({
                    left: targetScrollLeft,
                    behavior: 'smooth'
                });
            });
            // Add cursor pointer style
            dot.style.cursor = 'pointer';
        });

        // Initial update
        updateActiveDot();

        // Update on scroll
        projectsGrid.addEventListener('scroll', updateActiveDot);

        // --- Scroll Buttons Logic ---
        const leftBtn = document.querySelector('.scroll-left');
        const rightBtn = document.querySelector('.scroll-right');

        const updateScrollButtons = () => {
            if (!projectsGrid) return;

            // Show/Hide Left Button
            if (projectsGrid.scrollLeft > 20) {
                leftBtn.classList.add('visible');
            } else {
                leftBtn.classList.remove('visible');
            }

            // Show/Hide Right Button
            // Use a small buffer (e.g. 5px) to handle float precision issues
            if (Math.ceil(projectsGrid.scrollLeft + projectsGrid.clientWidth) >= projectsGrid.scrollWidth - 5) {
                rightBtn.classList.remove('visible');
            } else {
                rightBtn.classList.add('visible');
            }
        };

        if (leftBtn && rightBtn) {
            // Scroll Left
            leftBtn.addEventListener('click', () => {
                stopAutoScroll(); // Stop auto scroll on user interaction
                projectsGrid.scrollBy({
                    left: -320, // Approx card width + gap
                    behavior: 'smooth'
                });
            });

            // Scroll Right
            rightBtn.addEventListener('click', () => {
                stopAutoScroll(); // Stop auto scroll on user interaction
                projectsGrid.scrollBy({
                    left: 320,
                    behavior: 'smooth'
                });
            });

            // Initial check
            updateScrollButtons();

            // Update on scroll
            projectsGrid.addEventListener('scroll', updateScrollButtons);
            window.addEventListener('resize', updateScrollButtons);

            // Robustness: Update when images load or grid resizes
            if (window.ResizeObserver) {
                const resizeObserver = new ResizeObserver(() => {
                    updateScrollButtons();
                });
                resizeObserver.observe(projectsGrid);
            }

            // Fallback: Check again after full page load (images)
            window.addEventListener('load', updateScrollButtons);
        }
    }
};

// Initialize after DOM load, checking compatibility with module loading
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
} else {
    initAnimations();
}
