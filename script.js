/* 
   ==========================================================================
   EDIT HERE: WEBSITE CONFIGURATION
   Change these values to update phone numbers, links, and addresses.
   ==========================================================================
*/
const CONFIG = {
    links: {
        calendly: "https://calendly.com/PLACEHOLDER", // REPLACE THIS
        whatsapp: "https://wa.me/918143368858?text=Hi%20Dr%20Harsha%2C%20I%20would%20like%20to%20book%20an%20appointment.",
        call: "9381003480",
        instagram: "https://www.instagram.com/saanvikakidneyandrology?igsh=dHA2ZDIwaHduY2s4",
        google_reviews: "https://share.google/fxdYJq24gYx4m7pKx",
        gmaps: "https://share.google/fxdYJq24gYx4m7pKx" // Using review link as map link for now unless specific map link provided
    },
    content: {
        address: "3rd floor, Plot no 6, behind Aruna Diagnostics Center, beside Terrace Grill Car Parking, Srinivasa Nagar Colony, Kapra, A. S. Rao Nagar, Hyderabad, Secunderabad, Telangana 500062",
        timings: "<strong>Clinic Consultation (Kapra):</strong><br>Mon - Sat: 8:00 AM - 10:00 AM & 7:00 PM - 9:00 PM<br><br><strong>KIMS Sunshine:</strong><br>Mon - Sat: 10:00 AM - 5:00 PM<br><br><strong>Sunday:</strong><br>11:00 AM - 1:00 PM (By Appointment)",
        year_founded: 2024
    }
};

/* =================================================================*********
   CORE LOGIC (Do not edit unless you know JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initContent();
    initNavbar();
    initAnimations();
    initMobileMenu();
    initLightbox();
    initServiceCards();
});

function initContent() {
    // 1. Update Links
    const whatsappLinks = document.querySelectorAll('.whatsapp-link-action');
    whatsappLinks.forEach(el => el.href = CONFIG.links.whatsapp);

    const callLinks = document.querySelectorAll('.call-link-action');
    callLinks.forEach(el => {
        // If it's an anchor tag, set href. If it has text content that looks like a number, update it? 
        // Logic: if class 'call-link-text' exists, update text. Always update href.
        if (el.tagName === 'A') el.href = `tel:+91${CONFIG.links.call}`;
    });

    const callLinkTexts = document.querySelectorAll('.call-link-text');
    callLinkTexts.forEach(el => el.textContent = CONFIG.links.call);

    const calendlyLinks = document.querySelectorAll('.calendly-link-action');
    calendlyLinks.forEach(el => el.href = CONFIG.links.calendly);

    const instagramLinks = document.querySelectorAll('.instagram-link-action');
    instagramLinks.forEach(el => {
        el.href = CONFIG.links.instagram;
        el.target = "_blank";
    });

    const googleReviewLinks = document.querySelectorAll('.google-review-link');
    googleReviewLinks.forEach(el => {
        el.href = CONFIG.links.google_reviews;
        el.target = "_blank";
    });

    // 2. Update Text Content
    const addressEl = document.getElementById('address-placeholder');
    if (addressEl) addressEl.innerHTML = CONFIG.content.address;

    const timingsEl = document.getElementById('timings-placeholder');
    if (timingsEl) timingsEl.innerHTML = CONFIG.content.timings;

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function initNavbar() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) mobileMenu.classList.remove('active');

                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}

function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }
}

function initAnimations() {
    // Intersection Observer for scroll reveals
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-reveal');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    elementsToReveal.forEach(el => observer.observe(el));
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (!galleryItems || galleryItems.length === 0) return;

    // Create an array of image sources from the unique items (not duplicates)
    const uniqueItemsCount = Math.min(5, galleryItems.length);
    const images = [];

    for (let i = 0; i < uniqueItemsCount; i++) {
        const img = galleryItems[i].querySelector('img');
        if (img) images.push(img.src);
    }

    let currentIndex = 0;

    function showImage(index) {
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;

        currentIndex = index;
        if (lightboxImg) lightboxImg.src = images[currentIndex];
    }

    function openLightbox(index) {
        showImage(index);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event Listeners
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.getAttribute('data-index')) || 0;
            openLightbox(index);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showImage(currentIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showImage(currentIndex + 1);
        });
    }

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });
}

function initServiceCards() {
    const cards = document.querySelectorAll('.service-card');

    cards.forEach(card => {
        // Ensure the whole card indicates it is clickable
        card.style.cursor = 'pointer';

        card.addEventListener('click', (e) => {
            // Close other cards (Accordion behavior)
            cards.forEach(c => {
                if (c !== card) {
                    c.classList.remove('active');
                    const btn = c.querySelector('.service-toggle-btn');
                    if (btn && btn.childNodes[0]) btn.childNodes[0].nodeValue = "Read More ";
                }
            });

            // Toggle current
            const isActive = card.classList.toggle('active');

            // Update button text
            const btn = card.querySelector('.service-toggle-btn');
            if (btn && btn.childNodes[0]) {
                btn.childNodes[0].nodeValue = isActive ? "Read Less " : "Read More ";
            }
        });
    });
}
