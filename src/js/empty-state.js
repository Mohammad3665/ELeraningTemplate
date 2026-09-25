//#region Empty State Utility
/* ============================================================
   Empty State Utility
   Toggles between a "list" element and an "empty state" element.

   Usage:
     // 1. Auto via ?empty query param (for demos/previews):
     //    Open any page with ?empty appended to preview the empty state.
     //    Requires the list/empty/pagination elements to have these ids:
     //      - #favorites-list / #favorites-empty  (Favorites page)
     //      - #courses-list   / #courses-empty    (Purchased page)
     //      - ... or any pair specified via data attributes.

     // 2. Programmatic:
     window.EmptyState.show(listEl, emptyEl, paginationEl);
     window.EmptyState.hide(listEl, emptyEl, paginationEl);
   ============================================================ */
(function () {
    'use strict';

    //#region Core
    /**
     * Show the empty state and hide the list (and pagination if given).
     * @param {HTMLElement|null} listEl
     * @param {HTMLElement|null} emptyEl
     * @param {HTMLElement|null} [paginationEl]
     */
    function show(listEl, emptyEl, paginationEl) {
        if (listEl) listEl.classList.add('hidden');
        if (emptyEl) emptyEl.classList.remove('hidden');
        if (paginationEl) paginationEl.classList.add('hidden');
    }

    /**
     * Hide the empty state and show the list (and pagination if given).
     * @param {HTMLElement|null} listEl
     * @param {HTMLElement|null} emptyEl
     * @param {HTMLElement|null} [paginationEl]
     */
    function hide(listEl, emptyEl, paginationEl) {
        if (listEl) listEl.classList.remove('hidden');
        if (emptyEl) emptyEl.classList.add('hidden');
        if (paginationEl) paginationEl.classList.remove('hidden');
    }
    //#endregion

    //#region ?empty Query Param Auto-Apply
    /**
     * If the URL has ?empty, show the empty state for the given
     * (or default) element ids. Called automatically on DOM ready.
     */
    function applyFromQuery() {
        if (!new URLSearchParams(window.location.search).has('empty')) return;

        // Try each known list/empty pair; the first one present wins.
        var pairs = [
            { list: 'favorites-list', empty: 'favorites-empty' },
            { list: 'courses-list', empty: 'courses-empty' },
            { list: 'orders-list', empty: 'orders-empty' },
            { list: 'payments-list', empty: 'payments-empty' },
            { list: 'invoices-list', empty: 'invoices-empty' },
        ];

        for (var i = 0; i < pairs.length; i++) {
            var listEl = document.getElementById(pairs[i].list);
            var emptyEl = document.getElementById(pairs[i].empty);
            if (listEl && emptyEl) {
                var pagination = document.querySelector('nav[aria-label="صفحه‌بندی"]');
                show(listEl, emptyEl, pagination);
                return;
            }
        }
    }
    //#endregion

    //#region Public API
    window.EmptyState = {
        show: show,
        hide: hide,
        applyFromQuery: applyFromQuery,
    };

    // Auto-apply on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyFromQuery);
    } else {
        applyFromQuery();
    }
    //#endregion
})();
//#endregion