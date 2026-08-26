// ============================================
// Mobile Menu Toggle
// ============================================
const mobileMenuButton = document.querySelector("#mobile-menu-button");
const mobileMenu = document.querySelector("#mobile-menu");

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");

    mobileMenu.classList.toggle("hidden");

    mobileMenuButton.setAttribute("aria-expanded", String(!isOpen));
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
// Categories Section
// ============================================
import categories from "../data/categories.js";

const categoriesGrid = document.querySelector("#categories-grid");

if (categoriesGrid) {
  categoriesGrid.innerHTML = categories
    .map(
      (category) => `
        <a
          href="#"
          class="
            group
            flex
            min-h-40
            flex-col
            items-center
            justify-center
            rounded-lg
            border
            border-gray-200
            bg-white
            px-4
            py-6
            text-center
            transition-all
            duration-300
            hover:border-gray-200
            hover:shadow-lg
          "
        >
          <!-- Icon -->
          <div
            class="
              mb-4
              flex
              size-12
              items-center
              justify-center
              text-primary
              transition-transform
              duration-300
              group-hover:scale-105
            "
          >
            <img
              src="${category.icon}"
              alt=""
              aria-hidden="true"
              class="size-10 object-contain"
            >
          </div>

          <!-- Title -->
          <h3
            class="
              text-sm
              font-semibold
              leading-5
              text-dark
              transition-colors
              duration-300
              group-hover:text-primary
            "
          >
            ${category.title}
          </h3>

          <!-- Course Count -->
          <p class="mt-1 text-xs text-body">
            ${category.courses}
          </p>
        </a>
      `,
    )
    .join("");
}

// ============================================
// Courses Section
// ============================================
import courses from "../data/courses.js";

const coursesGrid = document.querySelector("#courses-grid");

if (coursesGrid) {
  coursesGrid.innerHTML = courses
    .map(
      (course) => `
        <article
          class="
            group
            overflow-hidden
            rounded-lg
            border
            border-gray-200
            bg-white
            transition-shadow
            duration-300
            hover:shadow-lg
          "
        >
          <!-- Course Image -->
          <a
            href="#"
            class="relative block overflow-hidden h-48"
          >
            <img
              src="${course.image}"
              alt="${course.title}"
              class="
                aspect-video
                w-full
                h-full
                object-cover
                transition-transform
                duration-500
                group-hover:scale-105
              "
            >

            <!-- Category Badge -->
            <span
              class="
                absolute
                left-3
                top-3
                rounded-lg
                bg-black/80
                px-3
                py-1.5
                text-xs
                font-medium
                text-white
                backdrop-blur-sm
              "
            >
              ${course.category}
            </span>
          </a>

          <!-- Course Content -->
          <div class="p-5">
            <!-- Author -->
            <p class="mb-1.5 text-sm text-gray-400">
              by <span class="font-bold text-gray-700">${course.author}</span>
            </p>

            <!-- Course Title -->
            <h3 class="text-base font-semibold leading-6 text-dark">
              <a href="#" class="transition-colors hover:text-primary">
                ${course.title}
              </a>
            </h3>

            <!-- Course Meta -->
            <div class="mt-2 flex items-center gap-5 text-xs text-body">
              <!-- Lessons -->
              <div class="flex items-center gap-1.5">
                <img
                  src="/assets/icons/times.svg"
                  alt=""
                  aria-hidden="true"
                  class="size-4 object-contain"
                >
                <span>${course.weeks} Weeks</span>
              </div>

              <!-- Students -->
              <div class="flex items-center gap-1.5">
                <img
                  src="/assets/icons/students.svg"
                  alt=""
                  aria-hidden="true"
                  class="size-4 object-contain"
                >
                <span>${course.students} Students</span>
              </div>
            </div>

            <!-- Price & Action -->
            <div class="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
              <div class="flex items-center gap-2">
                ${
                  course.oldPrice
                    ? `
                      <span class="text-base text-gray-400 line-through">
                        ${course.oldPrice}
                      </span>
                    `
                    : ""
                }
                <span
                  class="
                    text-base
                    font-bold
                    ${course.price.toLowerCase() === "free" ? "text-emerald-400" : "text-red-500"}
                  "
                >
                  ${course.price}
                </span>
              </div>

              <a href="#" class="text-sm font-semibold text-dark transition-colors hover:text-primary">
                View More
              </a>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
}

// ============================================
// Stats Section
// ============================================
import stats from "../data/stats.js";

const statsGrid = document.querySelector("#stats-grid");

if (statsGrid) {
  statsGrid.innerHTML = stats
    .map(
      (stat) => `
        <div
          class="
            flex
            min-h-35
            sm:min-h-42.5
            flex-col
            items-center
            justify-center
            rounded-2xl
            bg-[#f6f6f6]
            px-4
            py-8
            sm:py-10
            text-center
            transition-shadow
            duration-300
            hover:shadow-lg
          "
        >
          <!-- Value -->
          <span
            class="
              text-3xl
              font-extrabold
              leading-snug
              text-primary
              sm:text-4xl
              lg:text-[42px]
            "
          >
            ${stat.value}
          </span>

          <!-- Label -->
          <span class="mt-3 text-xs font-semibold text-dark sm:text-sm lg:text-base">
            ${stat.label}
          </span>
        </div>
      `,
    )
    .join("");
}

// ============================================
// Testimonials Section
// ============================================
import testimonials from "../data/testimonials.js";

const testimonialsGrid = document.querySelector("#testimonials-grid");

if (testimonialsGrid) {
  testimonialsGrid.innerHTML = testimonials
    .map(
      (item) => `
        <div
          class="
            flex
            flex-col
            justify-between
            rounded-2xl
            border
            border-gray-100
            bg-white
            p-6
            shadow-sm
            transition-shadow
            duration-300
            hover:shadow-lg
          "
        >
          <div>
            <!-- Quote Icon -->
            <div class="mb-4 text-primary">
              <img
                src="/assets/images/quote.svg"
                alt="Quote Icon"
                class="size-8 object-contain"
              />
            </div>

            <!-- Testimonial Content -->
            <p class="text-xs leading-relaxed text-body sm:text-sm">
              ${item.content}
            </p>
          </div>

          <!-- Author Info -->
          <div class="mt-6 border-t border-gray-100 pt-4">
            <h4 class="text-sm font-bold text-dark">
              ${item.name}
            </h4>
            <p class="mt-0.5 text-xs text-body">
              ${item.role}
            </p>
          </div>
        </div>
      `,
    )
    .join("");
}

// ============================================
// Articles Section
// ============================================
import articles from "../data/articles.js";

const articlesGrid = document.querySelector("#articles-grid");

if (articlesGrid) {
  articlesGrid.innerHTML = articles
    .map(
      (article) => `
        <article
          class="
            group
            flex
            flex-col
            gap-2
            overflow-hidden
            rounded-2xl
            border
            border-gray-100
            bg-white
            shadow-sm
            transition-shadow
            duration-300
            hover:shadow-lg
          "
        >
          <!-- Article Image -->
          <a
            href="#"
            class="relative block aspect-16/10 w-full overflow-hidden bg-gray-100"
          >
            <img
              src="${article.image}"
              alt="${article.title}"
              class="
                h-full
                w-full
                object-cover
                object-center
                transition-transform
                duration-500
                group-hover:scale-105
              "
            />
          </a>

          <!-- Content -->
          <div class="flex flex-1 flex-col justify-between p-5">
            <div>
              <!-- Title -->
              <h3 class="text-base font-bold text-dark transition-colors duration-300 group-hover:text-primary sm:text-lg">
                <a href="#">${article.title}</a>
              </h3>

              <!-- Date -->
              <div class="mt-2.5 flex items-center gap-1.5 text-xs text-body">
                <img
                  src="/assets/icons/calendar.svg"
                  alt="Date"
                  class="size-4 object-contain"
                />
                <span>${article.date}</span>
              </div>

              <!-- Excerpt -->
              <p class="mt-3 text-xs leading-relaxed text-body sm:text-sm line-clamp-2">
                ${article.excerpt}
              </p>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
}
