// ============================================
// Mobile Side Drawer Toggle
// ============================================
const mobileMenuButton = document.querySelector("#mobile-menu-button");
const closeMenuButton = document.querySelector("#close-menu-button");
const mobileMenu = document.querySelector("#mobile-menu");
const menuOverlay = document.querySelector("#menu-overlay");

function openMenu() {
  // Slide in drawer from left
  mobileMenu.classList.remove("-translate-x-full");
  // Show backdrop
  menuOverlay.classList.remove("pointer-events-none", "opacity-0");
  menuOverlay.classList.add("opacity-100");

  // Prevent body scrolling
  document.body.style.overflow = "hidden";
  mobileMenuButton.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  // Slide out drawer to left
  mobileMenu.classList.add("-translate-x-full");
  // Hide backdrop
  menuOverlay.classList.remove("opacity-100");
  menuOverlay.classList.add("opacity-0", "pointer-events-none");

  // Restore body scrolling
  document.body.style.overflow = "";
  mobileMenuButton.setAttribute("aria-expanded", "false");
}

if (mobileMenuButton && mobileMenu && menuOverlay) {
  mobileMenuButton.addEventListener("click", openMenu);
  if (closeMenuButton) closeMenuButton.addEventListener("click", closeMenu);
  menuOverlay.addEventListener("click", closeMenu);

  // Close menu on ESC key press
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      !mobileMenu.classList.contains("-translate-x-full")
    ) {
      closeMenu();
    }
  });
}

// ============================================
// Scroll to Top Button
// ============================================
const scrollTopBtn = document.querySelector("#scroll-to-top");

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

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

document.addEventListener("touchstart", function () {}, true);

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".password-wrapper").forEach((wrapper) => {
    const input = wrapper.querySelector('input[type="password"]');
    const toggleBtn = wrapper.querySelector(".toggle-password");
    const eyeIcon = toggleBtn.querySelector(".eye-animated");

    toggleBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const isPassword = input.type === "password";

      input.type = isPassword ? "text" : "password";

      if (isPassword) {
        eyeIcon.classList.add("is-hidden");
      } else {
        eyeIcon.classList.remove("is-hidden");
      }
    });
  });
});

