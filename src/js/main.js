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

(function () {
  "use strict";

  function setupPage() {
    /* ---- Course Tabs ---- */
    var tabButtons = document.querySelectorAll(".course-tab-btn");
    var tabPanels = document.querySelectorAll(".course-tab-panel");

    tabButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = btn.getAttribute("data-tab");

        // 1. Reset all tabs
        tabButtons.forEach(function (b) {
          b.removeAttribute("data-active");
          b.setAttribute("aria-selected", "false");
          b.classList.remove(
            "text-primary",
            "bg-[#f8f9fa]",
            "z-20",
            "-mb-px",
          );
          b.classList.add(
            "text-dark",
            "border-b-border",
            "border-b",
            "z-10",
          );
        });

        // 2. Activate the clicked tab
        btn.setAttribute("data-active", "true");
        btn.setAttribute("aria-selected", "true");
        btn.classList.remove("text-dark", "border-b", "z-10");
        btn.classList.add("text-primary", "bg-[#f8f9fa]", "z-20", "-mb-px");

        // 3. Show the corresponding panel and re-update accordion heights
        tabPanels.forEach(function (panel) {
          if (panel.id === "tab-" + target) {
            panel.classList.remove("hidden");
            // Update the height of open items within the new tab
            initAccordions();
          } else {
            panel.classList.add("hidden");
          }
        });
      });
    });

    /* ---- Generic accordion setup function ---- */
    function setupAccordion(
      selector,
      toggleClass,
      contentClass,
      chevronClass,
      titleClass,
    ) {
      var items = document.querySelectorAll(selector);

      items.forEach(function (item) {
        var toggle = item.querySelector("." + toggleClass);
        var content = item.querySelector("." + contentClass);
        var chevron = item.querySelector("." + chevronClass);
        var titleEl = item.querySelector("." + titleClass);

        if (!toggle || !content) return;

        toggle.addEventListener("click", function () {
          var isOpen = item.classList.contains("is-open");

          // Close all items in the same group
          items.forEach(function (other) {
            other.classList.remove("is-open");
            var oContent = other.querySelector("." + contentClass);
            var oChevron = other.querySelector("." + chevronClass);
            var oTitle = other.querySelector("." + titleClass);

            if (oContent) {
              oContent.style.maxHeight = "0px";
              oContent.classList.remove("opacity-100");
              oContent.classList.add("opacity-0");
            }
            if (oChevron) {
              oChevron.classList.remove("text-primary");
              oChevron.classList.add("text-dark");
            }
            if (oTitle) {
              oTitle.classList.remove("text-primary");
              oTitle.classList.add("text-dark");
            }
          });

          // Open the selected item
          if (!isOpen) {
            item.classList.add("is-open");
            // Remove hidden class if present
            content.classList.remove("hidden");

            content.style.maxHeight = content.scrollHeight + "px";
            content.classList.remove("opacity-0");
            content.classList.add("opacity-100");

            if (chevron) {
              chevron.classList.add("text-primary");
              chevron.classList.remove("text-dark");
            }
            if (titleEl) {
              titleEl.classList.add("text-primary");
              titleEl.classList.remove("text-dark");
            }
          }
        });
      });
    }

    /* ---- Initialization function for is-open items ---- */
    function initAccordions() {
      // Curriculum
      document
        .querySelectorAll(".curriculum-item")
        .forEach(function (item) {
          var content = item.querySelector(".curriculum-content");
          var chevron = item.querySelector(".curriculum-chevron");
          var titleEl = item.querySelector(
            ".curriculum-toggle span span:last-child",
          );

          if (item.classList.contains("is-open") && content) {
            content.style.maxHeight = content.scrollHeight + "px";
            content.classList.remove("opacity-0");
            content.classList.add("opacity-100");

            if (chevron) chevron.classList.add("text-primary");
            if (titleEl) titleEl.classList.add("text-primary");
          }
        });

      // FAQ
      document.querySelectorAll(".faq-item").forEach(function (item) {
        var content = item.querySelector(".faq-content");
        var chevron = item.querySelector(".faq-chevron");
        var titleEl = item.querySelector(".faq-toggle span:first-child");

        if (item.classList.contains("is-open") && content) {
          content.style.maxHeight = content.scrollHeight + "px";
          content.classList.remove("opacity-0");
          content.classList.add("opacity-100");

          if (chevron) chevron.classList.add("text-primary");
          if (titleEl) titleEl.classList.add("text-primary");
        }
      });
    }

    // Set up event listeners
    setupAccordion(
      ".curriculum-item",
      "curriculum-toggle",
      "curriculum-content",
      "curriculum-chevron",
      "curriculum-toggle span span:last-child",
    );
    setupAccordion(
      ".faq-item",
      "faq-toggle",
      "faq-content",
      "faq-chevron",
      "faq-toggle span:first-child",
    );

    // Initialize open items right away
    initAccordions();
  }

  // Run setup once the DOM is ready, regardless of where/how this script is loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupPage);
  } else {
    setupPage();
  }
})();

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

