
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
};

// Initialize after DOM load
document.addEventListener('DOMContentLoaded', initAnimations);
