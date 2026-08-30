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

const gridViewBtn = document.getElementById("grid-view-btn");
const listViewBtn = document.getElementById("list-view-btn");
const coursesList = document.getElementById("courses-list");

const activeButtonClasses = ["bg-primary", "text-white"];

const inactiveButtonClasses = [
  "bg-transparent",
  "text-gray-400",
  "hover:text-dark",
];

function setGridView() {
  // ساختار container
  coursesList.classList.remove("flex", "flex-col", "space-y-6");

  coursesList.classList.add("grid", "grid-cols-1", "gap-6", "sm:grid-cols-2");

  // تغییر ساختار هر کارت
  document.querySelectorAll(".course-item").forEach((course) => {
    course.classList.remove(
      "sm:flex-row",
      "gap-5",
      "border-y",
      "rounded-tr-2xl",
      "rounded-br-2xl",
    );

    course.classList.add(
      "flex-col",
      "rounded-2xl",
      "border",
      "border-border",
      "bg-white",
    );

    // تصویر
    const imageLink = course.querySelector("a:first-child");

    imageLink.classList.remove("sm:h-auto", "sm:self-stretch", "sm:w-70");

    imageLink.classList.add("h-52", "sm:h-48", "sm:w-full");

    // محتوای کارت
    const content = course.querySelector("div.flex-1");

    if (content) {
      content.classList.remove("pt-5");

      content.classList.add("p-5");
    }
  });

  // دکمه Grid فعال
  gridViewBtn.classList.remove(...inactiveButtonClasses);
  gridViewBtn.classList.add(...activeButtonClasses);

  // دکمه List غیرفعال
  listViewBtn.classList.remove(...activeButtonClasses);
  listViewBtn.classList.add(...inactiveButtonClasses);

  gridViewBtn.setAttribute("aria-pressed", "true");
  listViewBtn.setAttribute("aria-pressed", "false");
}

function setListView() {
  // ساختار container
  coursesList.classList.remove(
    "grid",
    "grid-cols-1",
    "gap-6",
    "sm:grid-cols-2",
  );

  coursesList.classList.add("flex", "flex-col", "space-y-6");

  // تغییر ساختار هر کارت
  document.querySelectorAll(".course-item").forEach((course) => {
    course.classList.remove("flex-col", "rounded-2xl", "border", "bg-white");

    course.classList.add(
      "gap-5",
      "sm:flex-row",
      "border-y",
      "border-border",
      "rounded-tr-2xl",
      "rounded-br-2xl",
    );

    // تصویر
    const imageLink = course.querySelector("a:first-child");

    imageLink.classList.remove("h-52", "sm:h-48", "sm:w-full");

    imageLink.classList.add(
      "h-48",
      "w-full",
      "sm:h-auto",
      "sm:self-stretch",
      "sm:w-70",
    );

    // محتوای کارت
    const content = course.querySelector("div.flex-1");

    if (content) {
      content.classList.remove("p-5");
      content.classList.add("pt-5");
    }
  });

  // دکمه List فعال
  listViewBtn.classList.remove(...inactiveButtonClasses);
  listViewBtn.classList.add(...activeButtonClasses);

  // دکمه Grid غیرفعال
  gridViewBtn.classList.remove(...activeButtonClasses);
  gridViewBtn.classList.add(...inactiveButtonClasses);

  gridViewBtn.setAttribute("aria-pressed", "false");
  listViewBtn.setAttribute("aria-pressed", "true");
}

gridViewBtn.addEventListener("click", setGridView);
listViewBtn.addEventListener("click", setListView);
