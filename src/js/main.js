/* ============================================================
   Persian Digits Converter
   ============================================================ */
(function () {
  const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  const SKIP_TAGS = new Set([
    'SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'CODE', 'PRE',
    'INPUT', 'SELECT', 'OPTION',
  ]);

  function toPersianDigits(text) {
    return text.replace(/\d/g, (d) => PERSIAN_DIGITS[d]);
  }

  function convertNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const parent = node.parentNode;
      if (!parent || SKIP_TAGS.has(parent.tagName)) return;
      const converted = toPersianDigits(node.nodeValue);
      if (converted !== node.nodeValue) {
        node.nodeValue = converted;
      }
      return;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      if (SKIP_TAGS.has(node.tagName)) return;

      ['placeholder', 'title', 'alt', 'aria-label'].forEach((attr) => {
        if (node.hasAttribute && node.hasAttribute(attr)) {
          const val = node.getAttribute(attr);
          const converted = toPersianDigits(val);
          if (converted !== val) node.setAttribute(attr, converted);
        }
      });

      node.childNodes.forEach(convertNode);
    }
  }

  function convertAll() {
    convertNode(document.body);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', convertAll);
  } else {
    convertAll();
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach(convertNode);
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
})();

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

document.addEventListener("touchstart", function () { }, true);