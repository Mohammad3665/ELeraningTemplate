/* ============================================================
   Accordions
   Generic accordion system used by:
   - Curriculum section (.curriculum-item)
   - FAQ section (.faq-item)

   Exposes window.initAccordions() so other modules (e.g. tabs)
   can re-calculate open item heights after visibility changes.
   Listens for the "tab:changed" custom event as well.
   ============================================================ */
(function () {
    "use strict";

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

    /* ---- Setup ---- */
    function setupPage() {
        // Register accordion groups
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

    // Expose for other modules (e.g. course-tabs.js)
    window.initAccordions = initAccordions;

    // Also listen to the custom event dispatched by tabs module
    document.addEventListener("tab:changed", initAccordions);

    // Run setup once the DOM is ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setupPage);
    } else {
        setupPage();
    }
})();