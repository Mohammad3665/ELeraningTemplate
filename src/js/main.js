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

/* ---- Course Tabs ---- */
var tabButtons = document.querySelectorAll(".course-tab-btn");
var tabPanels = document.querySelectorAll(".course-tab-panel");
var courseTabs = document.getElementById("course-tabs"); // اصلاح #

tabButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    var target = btn.getAttribute("data-tab");

    // ۱. ریست کردن تمام تب‌ها به حالت غیرفعال
    tabButtons.forEach(function (b) {
      b.removeAttribute("data-active");
      b.setAttribute("aria-selected", "false");

      // استایل متون
      b.classList.remove("text-primary");
      b.classList.add("text-dark");

      // استایل بوردر و پس‌زمینه
      b.classList.remove("bg-[#f8f9fa]", "z-20", "-mb-px");
      b.classList.add("border-b-border", "border-b", "z-10");
    });

    // ۲. فعال‌سازی تب کلیک‌شده
    btn.setAttribute("data-active", "true");
    btn.setAttribute("aria-selected", "true");

    // استایل متون
    btn.classList.remove("text-dark");
    btn.classList.add("text-primary");

    // استایل بوردر و پس‌زمینه برای مخفی کردن بوردر پایین
    btn.classList.remove("border-b", "z-10");
    btn.classList.add("bg-[#f8f9fa]", "z-20", "-mb-px");

    // ۳. نمایش پنل مربوطه
    tabPanels.forEach(function (panel) {
      if (panel.id === "tab-" + target) {
        panel.classList.remove("hidden");
      } else {
        panel.classList.add("hidden");
      }
    });
  });
});

/* ---- Curriculum Accordion ---- */
document.querySelectorAll(".curriculum-item").forEach(function (item) {
  var toggle = item.querySelector(".curriculum-toggle");
  var content = item.querySelector(".curriculum-content");
  var chevron = item.querySelector(".curriculum-chevron");
  var titleEl = item.querySelector(".curriculum-toggle span span:last-child");

  if (!toggle || !content) return;

  // مقدار اولیه برای آیتم‌هایی که از قبل باز هستند
  if (item.classList.contains("is-open")) {
    content.style.maxHeight = content.scrollHeight + "px";
    content.classList.remove("opacity-0");
    content.classList.add("opacity-100");
  } else {
    content.style.maxHeight = "0px";
    content.classList.add("opacity-0");
  }

  toggle.addEventListener("click", function () {
    var isOpen = item.classList.contains("is-open");

    // بسته شدن بقیه آیتم‌ها (Accordion Mode)
    document.querySelectorAll(".curriculum-item").forEach(function (other) {
      other.classList.remove("is-open");
      var oContent = other.querySelector(".curriculum-content");
      var oChevron = other.querySelector(".curriculum-chevron");
      var oTitle = other.querySelector(
        ".curriculum-toggle span span:last-child",
      );

      if (oContent) {
        oContent.style.maxHeight = "0px";
        oContent.classList.remove("opacity-100");
        oContent.classList.add("opacity-0");
      }
      if (oChevron) {
        oChevron.classList.remove("rotate-180", "text-primary");
        oChevron.classList.add("text-dark");
      }
      if (oTitle) {
        oTitle.classList.remove("text-primary");
        oTitle.classList.add("text-dark");
      }
    });

    // باز کردن آیتم کلیک‌شده (در صورتی که قبلاً بسته بوده باشد)
    if (!isOpen) {
      item.classList.add("is-open");
      content.style.maxHeight = content.scrollHeight + "px";
      content.classList.remove("opacity-0");
      content.classList.add("opacity-100");

      if (chevron) {
        chevron.classList.add("rotate-180", "text-primary");
        chevron.classList.remove("text-dark");
      }
      if (titleEl) {
        titleEl.classList.add("text-primary");
        titleEl.classList.remove("text-dark");
      }
    }
  });
});

/* ---- FAQ Accordion Event Listener ---- */
document.querySelectorAll(".faq-item").forEach(function (item) {
  var toggle = item.querySelector(".faq-toggle");
  var content = item.querySelector(".faq-content");
  var chevron = item.querySelector(".faq-chevron");
  var titleEl = item.querySelector(".faq-toggle span:first-child");

  if (!toggle || !content) return;

  // مقدار اولیه برای آیتم‌هایی که از قبل باز هستند
  if (item.classList.contains("is-open")) {
    content.style.maxHeight = content.scrollHeight + "px";
    content.classList.remove("opacity-0");
    content.classList.add("opacity-100");
  } else {
    content.style.maxHeight = "0px";
    content.classList.add("opacity-0");
  }

  toggle.addEventListener("click", function () {
    var isOpen = item.classList.contains("is-open");

    // بسته شدن تمام آیتم‌ها
    document.querySelectorAll(".faq-item").forEach(function (other) {
      other.classList.remove("is-open");
      var oContent = other.querySelector(".faq-content");
      var oChevron = other.querySelector(".faq-chevron");
      var oTitle = other.querySelector(".faq-toggle span:first-child");

      if (oContent) {
        oContent.style.maxHeight = "0px";
        oContent.classList.remove("opacity-100");
        oContent.classList.add("opacity-0");
      }
      if (oChevron) {
        oChevron.classList.remove("rotate-180", "text-primary");
        oChevron.classList.add("text-dark");
      }
      if (oTitle) {
        oTitle.classList.remove("text-primary");
        oTitle.classList.add("text-dark");
      }
    });

    // باز کردن آیتم کلیک شده (در صورتی که قبلاً بسته بوده باشد)
    if (!isOpen) {
      item.classList.add("is-open");
      content.style.maxHeight = content.scrollHeight + "px";
      content.classList.remove("opacity-0");
      content.classList.add("opacity-100");

      if (chevron) {
        chevron.classList.add("rotate-180", "text-primary");
        chevron.classList.remove("text-dark");
      }
      if (titleEl) {
        titleEl.classList.add("text-primary");
        titleEl.classList.remove("text-dark");
      }
    }
  });
});

/* Initialize open accordion content visibility on load */
document
  .querySelectorAll(".curriculum-item.is-open .curriculum-content")
  .forEach(function (el) {
    el.style.display = "block";
  });
document
  .querySelectorAll(".faq-item.is-open .faq-content")
  .forEach(function (el) {
    el.style.display = "block";
  });
