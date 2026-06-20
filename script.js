document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Activation States
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Auto-collapses menu on selection anchor actions
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. Element Scroll-Driven Reveal Engine (.fade-in setup)
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Trigger transition once for visual stability
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 3. Fluid Mouse Track Tilt Parallax Effect for Hero Layout
    const tiltContainer = document.querySelector('.hero-image-container');
    const tiltTarget = document.querySelector('.tilt-target');

    if (tiltContainer && tiltTarget && window.innerWidth > 992) {
        tiltContainer.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = tiltContainer.getBoundingClientRect();
            const mouseX = e.clientX - left - width / 2;
            const mouseY = e.clientY - top - height / 2;

            // Constrain max degree boundaries
            const rotX = (mouseY / (height / 2)) * -8;
            const rotY = (mouseX / (width / 2)) * 8;

            tiltTarget.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
        });

        tiltContainer.addEventListener('mouseleave', () => {
            tiltTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }
});