// ============================================
// Categories Section Swiper
// ============================================
new Swiper(".categories-swiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    speed: 500,
    observer: true,
    observeParents: true,
    pagination: {
        el: ".categories-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    breakpoints: {
        450: { slidesPerView: 2, spaceBetween: 16 },
        640: { slidesPerView: 3, spaceBetween: 20 },
        1024: { slidesPerView: 5, spaceBetween: 24 },
    },
});

// ============================================
// Courses Section Swiper
// ============================================
new Swiper(".courses-swiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    speed: 500,
    observer: true,
    observeParents: true,
    pagination: {
        el: ".courses-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
    },
});

// ============================================
// Testimonials Section Swiper
// ============================================
new Swiper(".testimonials-swiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    speed: 500,
    observer: true,
    observeParents: true,
    pagination: {
        el: ".testimonials-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 4, spaceBetween: 24 },
    },
});

// ============================================
// Articles Section Swiper
// ============================================
new Swiper(".articles-swiper", {
    dir: "rtl",
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    speed: 500,
    observer: true,
    observeParents: true,
    pagination: {
        el: ".articles-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
    },
});