/* ============================================================
   Course Tabs
   Handles switching between course content tabs:
   - Resets all tab buttons
   - Activates the clicked tab
   - Shows the corresponding panel
   - Notifies the accordion module via a custom "tab:changed"
     event so open items can recalculate their height.
   ============================================================ */
(function () {
    "use strict";

    function setupTabs() {
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

                // 3. Show the corresponding panel
                tabPanels.forEach(function (panel) {
                    if (panel.id === "tab-" + target) {
                        panel.classList.remove("hidden");
                    } else {
                        panel.classList.add("hidden");
                    }
                });

                // 4. Notify accordion module to recalculate open item heights
                document.dispatchEvent(new CustomEvent("tab:changed"));
            });
        });
    }

    // Run setup once the DOM is ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setupTabs);
    } else {
        setupTabs();
    }
})();

//#region Wishlist Button
const wishlistBtn = document.getElementById('wishlist-button');
if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
        // Determine current pressed state from ARIA attribute
        const isActive = wishlistBtn.getAttribute('aria-pressed') === 'true';

        // Toggle the aria-pressed attribute
        wishlistBtn.setAttribute('aria-pressed', String(!isActive));

        // Update SVG fill based on the new state
        const svg = wishlistBtn.querySelector('svg');
        svg.setAttribute('fill', !isActive ? 'currentColor' : 'none');
    });
}
//#endregion