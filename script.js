// Initialize Icons
// Lucide icons replaced with inline SVGs

// ===================================================
// GSAP CURVE SWIPE TRANSITION
// ===================================================

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Curve Swipe Animation Function
function initCurveSwipeTransition() {
    const overlay = document.getElementById('curveSwipeOverlay');
    const scrollTrigger = document.getElementById('scrollTrigger');
    const heroSection = document.querySelector('.hero-slider-section');
    const nextSection = document.getElementById('nextSection');

    if (!overlay || !scrollTrigger || !heroSection || !nextSection) return;

    // Create the curve swipe timeline
    const curveSwipeTimeline = gsap.timeline({
        paused: true,
        onStart: () => {
            overlay.style.visibility = 'visible';
            overlay.style.pointerEvents = 'auto';
        },
        onComplete: () => {
            overlay.style.visibility = 'hidden';
            overlay.style.pointerEvents = 'none';
        }
    });

    // Animate the curve swipe effect
    curveSwipeTimeline
        .set(overlay, { opacity: 1 })
        .fromTo(overlay.querySelector('path'),
            {
                attr: { d: "M0,800 L1440,800 L1440,800 Q720,800 0,800 Z" }
            },
            {
                attr: { d: "M0,0 L1440,0 L1440,0 Q720,0 0,0 Z" },
                duration: 1.2,
                ease: "power3.inOut"
            }
        )
        .to(overlay, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
        }, "-=0.3");

    // Click handler for scroll trigger
    scrollTrigger.addEventListener('click', (e) => {
        e.preventDefault();

        // Play the curve swipe animation
        curveSwipeTimeline.restart();

        // Scroll to next section after animation starts
        setTimeout(() => {
            nextSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 400);
    });

    // Also trigger on scroll down
    let hasTriggered = false;
    window.addEventListener('scroll', () => {
        if (!hasTriggered && window.scrollY > 100) {
            hasTriggered = true;
            curveSwipeTimeline.restart();
        }
    });
}

// Initialize curve swipe on page load
document.addEventListener('DOMContentLoaded', () => {
    initCurveSwipeTransition();
});

// ===================================================
// LOTTIE ANIMATION FALLBACK
// ===================================================

// Fallback for Lottie animation if it fails to load
document.addEventListener('DOMContentLoaded', () => {
    const lottiePlayer = document.getElementById('ac-lottie');

    if (lottiePlayer) {
        // Use a working AC cooling Lottie animation URL
        lottiePlayer.src = 'https://assets2.lottiefiles.com/packages/lf20_tll0j4bb.json';

        // Fallback to icon if Lottie fails
        lottiePlayer.addEventListener('error', () => {
            const tempIndicator = lottiePlayer.parentElement;
            tempIndicator.innerHTML = '<i data-lucide="snowflake" class="text-green" width="24"></i>';
            lucide.createIcons();
        });
    }
});

// Navbar Scroll Effect
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('mainNavbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger Animation Toggle
const navbarToggler = document.querySelector('.navbar-toggler');
if (navbarToggler) {
    navbarToggler.addEventListener('click', function () {
        this.classList.toggle('active');

        // Update aria-expanded
        const isExpanded = this.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded);
    });
}

// Active Link Highlighting (Scroll Spy)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = sectionId;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.startsWith('#') && href.substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// Run on scroll
window.addEventListener('scroll', updateActiveLink);
// Run on page load
document.addEventListener('DOMContentLoaded', updateActiveLink);

// Smooth Scroll with Offset
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#') && href !== '#') {
            e.preventDefault();
            const targetId = href.substring(1);
            const target = document.getElementById(targetId);

            if (target) {
                const navbar = document.getElementById('mainNavbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const targetPosition = target.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
                if (navbarToggler) {
                    navbarToggler.classList.remove('active');
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }
            }
        }
    });
});

// Mobile Menu Close Buttons
const mobileCloseButtons = document.querySelectorAll('.mobile-menu-close');
mobileCloseButtons.forEach(button => {
    button.addEventListener('click', function () {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
            if (navbarToggler) {
                navbarToggler.classList.remove('active');
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
        }
    });
});

// Close mobile menu on outside click
document.addEventListener('click', function (e) {
    const navbar = document.querySelector('.navbar');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbar && navbarCollapse && navbarCollapse.classList.contains('show')) {
        if (!navbar.contains(e.target)) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
            if (navbarToggler) {
                navbarToggler.classList.remove('active');
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
        }
    }
});

// Close mobile menu on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
            if (navbarToggler) {
                navbarToggler.classList.remove('active');
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
        }
    }
});

// ===================================================
// MOBILE MENU BACKDROP
// ===================================================

// Mobile Menu Backdrop Toggle
function toggleBackdrop(show) {
    const backdrop = document.querySelector('.navbar-backdrop');
    if (!backdrop) return;

    if (show) {
        backdrop.classList.add('show');
        document.body.classList.add('menu-open');
    } else {
        backdrop.classList.remove('show');
        document.body.classList.remove('menu-open');
    }
}

// Observe Bootstrap collapse events
const navbarCollapse = document.querySelector('.navbar-collapse');
if (navbarCollapse) {
    navbarCollapse.addEventListener('show.bs.collapse', () => {
        toggleBackdrop(true);
    });

    navbarCollapse.addEventListener('hide.bs.collapse', () => {
        toggleBackdrop(false);
    });
}

// Close menu when clicking backdrop
document.addEventListener('click', function (e) {
    const backdrop = document.querySelector('.navbar-backdrop');
    if (backdrop && e.target === backdrop) {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
            if (navbarToggler) {
                navbarToggler.classList.remove('active');
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
        }
    }
});

// ===================================================
// HERO SLIDER LOGIC
// ===================================================

document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.hero-slide');
    const nextBtn = document.querySelector('.btn-slider-next');
    const prevBtn = document.querySelector('.btn-slider-prev');
    const progressFill = document.querySelector('.progress-bar-fill');
    const numberDisplay1 = document.querySelector('.slider-progress span:first-child');
    const numberDisplay2 = document.querySelector('.slider-progress span:last-child');

    if (!slides.length) return;

    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;

    // Function to update slide
    function updateSlide(index) {
        // Remove active class from all
        slides.forEach(slide => slide.classList.remove('active'));

        // Add active class to current
        slides[index].classList.add('active');

        // Update Progress Bar
        const progressPercentage = ((index + 1) / totalSlides) * 100;
        if (progressFill) progressFill.style.width = `${progressPercentage}%`;

        // Update Numbers
        if (numberDisplay1) {
            numberDisplay1.textContent = `0${index + 1}`;
            numberDisplay1.style.opacity = '1';
        }
        if (numberDisplay2) {
            numberDisplay2.textContent = `0${totalSlides}`;
            // Keep total count static styling or dynamic if preferred
        }
    }

    // Next Slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlide(currentSlide);
    }

    // Prev Slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlide(currentSlide);
    }

    // Event Listeners
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        resetTimer();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        resetTimer();
    });

    // Auto Play
    function startTimer() {
        slideInterval = setInterval(nextSlide, 6000); // 6 seconds
    }

    function resetTimer() {
        clearInterval(slideInterval);
        startTimer();
    }

    // Initialize
    updateSlide(0);
    startTimer();
});

// ===================================================
// GLASSMORPHISM VALUE PROP - SCROLL REVEAL ANIMATION
// ===================================================

document.addEventListener('DOMContentLoaded', function () {
    // Intersection Observer for scroll reveal
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay based on element position
                    const delay = index * 100; // 100ms staggered delay
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // Add magnetic effect to glass cards on hover (optional enhancement)
    const glassCards = document.querySelectorAll('.glass-card');

    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;

            card.style.transform = `translateY(-8px) scale(1.02) translate(${moveX}px, ${moveY}px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});

// ===================================================
// PROCESS SECTION - GSAP SCROLL ANIMATIONS
// ===================================================

document.addEventListener('DOMContentLoaded', function () {
    const processSection = document.querySelector('#process');
    if (!processSection) return;

    // Animate header elements
    gsap.from('.process-header', {
        scrollTrigger: {
            trigger: '#process',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: -40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    // Animate process cards with stagger
    const processCards = gsap.utils.toArray('.process-card');
    processCards.forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 80,
            opacity: 0,
            duration: 0.9,
            delay: i * 0.18,
            ease: 'power3.out'
        });

        // Add hover animation for icons within each card
        const iconContainer = card.querySelector('.icon-container');
        if (iconContainer) {
            gsap.from(iconContainer, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 75%'
                },
                scale: 0,
                rotation: -180,
                duration: 0.6,
                delay: i * 0.18 + 0.3,
                ease: 'back.out(1.7)'
            });
        }

        // Animate step numbers
        const stepNumber = card.querySelector('.step-number');
        if (stepNumber) {
            gsap.from(stepNumber, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 75%'
                },
                scale: 0,
                duration: 0.5,
                delay: i * 0.18 + 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        }
    });

    // Animate progress line fill
    const progressFill = document.querySelector('.process-progress-fill');
    if (progressFill) {
        gsap.to(progressFill, {
            scrollTrigger: {
                trigger: '#process',
                start: 'top 60%',
                end: 'bottom 60%',
                scrub: 1
            },
            width: '100%',
            ease: 'none'
        });
    }

    // Animate connector dots with pulse effect
    const connectorDots = gsap.utils.toArray('.connector-dot');
    connectorDots.forEach((dot, i) => {
        gsap.from(dot, {
            scrollTrigger: {
                trigger: dot,
                start: 'top 90%'
            },
            scale: 0,
            opacity: 0,
            duration: 0.4,
            delay: i * 0.15,
            ease: 'back.out(2)'
        });
    });

    // Animate CTA button
    const ctaButton = document.querySelector('.process-cta');
    if (ctaButton) {
        gsap.from(ctaButton, {
            scrollTrigger: {
                trigger: ctaButton,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.7,
            delay: 0.8,
            ease: 'power3.out'
        });
    }

    // Animate decorative elements
    const decorations = gsap.utils.toArray('.process-decoration');
    decorations.forEach((deco, i) => {
        gsap.from(deco, {
            scrollTrigger: {
                trigger: '#process',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.5,
            opacity: 0,
            duration: 1.2,
            delay: 0.3 + (i * 0.2),
            ease: 'power2.out'
        });
    });
});


// ===================================================
// PROJECT GALLERY LIGHTBOX
// ===================================================

document.addEventListener('DOMContentLoaded', function () {
    // Initialize Fancybox (Standalone)
    Fancybox.bind("[data-fancybox]", {
        // Custom options
        dragToClose: false,
        Toolbar: {
            display: [
                "zoom",
                "slideshow",
                "fullscreen",
                "download",
                "thumbs",
                "close",
            ],
        },
    });
});



// ===================================================
// GALLERY CAROUSEL CONTROLLER - Infinite Loop
// ===================================================

document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('galleryTrack');
    const viewport = document.getElementById('galleryViewport');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');
    const dotsContainer = document.getElementById('galleryDots');

    if (!track || !viewport) return;

    const originalSlides = Array.from(track.children);
    const totalSlides = originalSlides.length;
    let currentIndex = 0;
    let isTransitioning = false;

    // Clone slides for infinite loop
    function setupInfiniteLoop() {
        // Clone first 3 slides and append to end
        for (let i = 0; i < 3; i++) {
            const clone = originalSlides[i].cloneNode(true);
            clone.classList.add('cloned');
            track.appendChild(clone);
        }

        // Clone last 3 slides and prepend to start
        for (let i = totalSlides - 1; i >= totalSlides - 3; i--) {
            const clone = originalSlides[i].cloneNode(true);
            clone.classList.add('cloned');
            track.insertBefore(clone, track.firstChild);
        }

        // Custom Lightbox Implementation (replaces Fancybox)
        setTimeout(() => {
            initCustomLightbox();
        }, 100);
    }

    // Custom Lightbox Functionality
    function initCustomLightbox() {
        const lightbox = document.getElementById('customLightbox');
        const lightboxImg = document.getElementById('lightboxImage');
        const lightboxCaption = document.querySelector('.lightbox-caption');
        const closeBtn = document.querySelector('.lightbox-close');
        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');

        // Get all gallery images (including clones)
        const galleryLinks = document.querySelectorAll('.gallery-slide-link');
        let currentImageIndex = 0;
        let images = [];

        // Build images array
        galleryLinks.forEach((link, index) => {
            const img = link.querySelector('img');
            const href = link.getAttribute('href');
            const caption = link.getAttribute('data-caption') || img.getAttribute('alt') || '';

            images.push({
                src: href,
                caption: caption
            });

            // Add click event
            link.addEventListener('click', (e) => {
                e.preventDefault();
                openLightbox(index);
            });
        });

        function openLightbox(index) {
            currentImageIndex = index;
            showImage();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        function showImage() {
            if (images[currentImageIndex]) {
                lightboxImg.src = images[currentImageIndex].src;
                lightboxCaption.textContent = images[currentImageIndex].caption;
            }
        }

        function showNext() {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            showImage();
        }

        function showPrev() {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            showImage();
        }

        // Event listeners
        closeBtn.addEventListener('click', closeLightbox);
        nextBtn.addEventListener('click', showNext);
        prevBtn.addEventListener('click', showPrev);

        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;

            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        });
    }

    // Get all slides including clones
    function getAllSlides() {
        return Array.from(track.children);
    }

    // Update center slide highlighting
    function updateCenterSlide() {
        const slides = getAllSlides();
        slides.forEach((slide, index) => {
            slide.classList.remove('center-slide');
        });

        // The actual center slide considering the offset
        const centerIndex = currentIndex + 3; // +3 because we prepended 3 clones
        if (slides[centerIndex]) {
            slides[centerIndex].classList.add('center-slide');
        }
    }

    // Update slide position
    function updateSlidePosition(immediate = false) {
        const slides = getAllSlides();
        if (slides.length === 0) return;

        const slideWidth = slides[0].offsetWidth;
        const gap = 24;
        const realIndex = currentIndex + 3; // Offset for prepended clones
        const offset = -realIndex * (slideWidth + gap) + (viewport.offsetWidth / 2) - (slideWidth / 2);

        if (immediate) {
            track.style.transition = 'none';
        } else {
            track.style.transition = 'transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)';
        }

        track.style.transform = `translateX(${offset}px)`;
        updateCenterSlide();
        updateDots();
        updateButtons();
    }

    // Handle infinite loop wrap
    function handleInfiniteLoop() {
        if (currentIndex >= totalSlides) {
            isTransitioning = true;
            setTimeout(() => {
                currentIndex = 0;
                updateSlidePosition(true);
                setTimeout(() => {
                    isTransitioning = false;
                }, 50);
            }, 700);
        } else if (currentIndex < 0) {
            isTransitioning = true;
            setTimeout(() => {
                currentIndex = totalSlides - 1;
                updateSlidePosition(true);
                setTimeout(() => {
                    isTransitioning = false;
                }, 50);
            }, 700);
        }
    }

    // Create pagination dots
    function createDots() {
        dotsContainer.innerHTML = '';

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('gallery-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => goToPage(i));
            dotsContainer.appendChild(dot);
        }
    }

    // Update active dot
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.gallery-dot');
        const realIndex = ((currentIndex % totalSlides) + totalSlides) % totalSlides;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === realIndex);
        });
    }

    // Update button states (always enabled for infinite loop)
    function updateButtons() {
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }

    // Go to specific page
    function goToPage(pageIndex) {
        if (isTransitioning) return;
        currentIndex = pageIndex;
        updateSlidePosition();
    }

    // Next slide
    function slideNext() {
        if (isTransitioning) return;
        currentIndex++;
        updateSlidePosition();
        handleInfiniteLoop();
    }

    // Previous slide
    function slidePrev() {
        if (isTransitioning) return;
        currentIndex--;
        updateSlidePosition();
        handleInfiniteLoop();
    }

    // Event listeners
    nextBtn.addEventListener('click', slideNext);
    prevBtn.addEventListener('click', slidePrev);

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateSlidePosition(true);
        }, 250);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') slidePrev();
        if (e.key === 'ArrowRight') slideNext();
    });

    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                slideNext();
            } else {
                slidePrev();
            }
        }
    }

    // Initialize
    setupInfiniteLoop();
    createDots();
    updateSlidePosition(true);
});
