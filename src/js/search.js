//#region Search Page
/* ============================================================
   Search Page
   Demo behaviors:
   - Shows the searched term (?q=) in the results heading.
   - Filters demo results by type (همه / دوره‌ها / مقالات).
   - ?empty query param previews the empty state.
   ============================================================ */
(function () {
    'use strict';

    const list = document.getElementById('search-list');
    const empty = document.getElementById('search-empty');
    const pagination = document.querySelector('nav[aria-label="صفحه‌بندی"]');
    const typeSelect = document.getElementById('search-type');
    const termEl = document.getElementById('search-term');
    const searchInput = document.querySelector('input[type="text"]');

    if (!list || !empty) return;

    /**
     * Show/hide demo results based on the selected type filter.
     */
    function applyFilter() {
        const value = typeSelect ? typeSelect.value : 'همه';
        const type = value === 'دوره‌ها' ? 'course' : value === 'مقالات' ? 'post' : null;
        let visible = 0;

        list.querySelectorAll('.search-item').forEach((item) => {
            const show = !type || item.getAttribute('data-type') === type;
            item.classList.toggle('hidden', !show);
            if (show) visible++;
        });

        if (visible === 0) {
            list.classList.add('hidden');
            empty.classList.remove('hidden');
            if (pagination) pagination.classList.add('hidden');
        } else {
            list.classList.remove('hidden');
            empty.classList.add('hidden');
            if (pagination) pagination.classList.remove('hidden');
        }
    }

    // Show searched term from ?q= (demo).
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q && termEl) termEl.textContent = q;
    if (q && searchInput) searchInput.value = q;

    // ?empty query param previews the empty state.
    if (params.has('empty')) {
        if (termEl) termEl.textContent = 'نتیجه‌ای';
        list.classList.add('hidden');
        empty.classList.remove('hidden');
        if (pagination) pagination.classList.add('hidden');
        return;
    }

    if (typeSelect) typeSelect.addEventListener('change', applyFilter);
})();
//#endregion
