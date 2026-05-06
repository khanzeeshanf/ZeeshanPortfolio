document.addEventListener('DOMContentLoaded', () => {
    // 1. Typewriting Effect
    const titleElement = document.getElementById('hero-title');
    const name = "Hi, I'm Zeeshan Khan";
    let index = 0;
    titleElement.textContent = ""; // Clear initial state

    function typeWriter() {
        if (index < name.length) {
            titleElement.textContent += name.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        } else {
            titleElement.classList.add('typewriter-done');
        }
    }

    // Start typing after a short delay
    setTimeout(typeWriter, 500);

    // 2. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once visible, we can unobserve if we only want it to animate once
                // observer.unobserve(entry.target); 
            } else {
                // Remove class to animate again on scroll up (optional)
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // 3. Smooth Scrolling for Navigation
    document.querySelectorAll('.sidebar-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Parallax effect for grid background (Subtle)
    window.addEventListener('scroll', () => {
        const grid = document.querySelector('.grid-background');
        const scrolled = window.pageYOffset;
        grid.style.transform = `translateY(${scrolled * 0.1}px)`;
    });

    // 5. Active Link Highlighting in Sidebar
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.style.transform = 'scale(1.3)';
                link.style.filter = 'drop-shadow(0 0 5px var(--accent-primary))';
            } else {
                link.style.transform = 'scale(1)';
                link.style.filter = 'none';
            }
        });
    });
});
