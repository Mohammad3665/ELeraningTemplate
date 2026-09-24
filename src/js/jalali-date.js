//#region Jalali Date Utility
/* ============================================================
   Jalali Date Utility
   Converts ISO date strings (e.g. "2026-09-01") to Persian
   (Jalali) formatted dates using Intl.DateTimeFormat('fa-IR').

   Usage in HTML:
     <span data-jalali-date="2026-09-01"></span>
     <span data-jalali-date="2026-09-01" data-jalali-format="short"></span>
     <span data-jalali-date="2026-09-01" data-jalali-format="month"></span>

   Programmatic:
     window.JalaliDate.format('2026-09-01', 'long');
     window.JalaliDate.applyTo(document);
   ============================================================ */
(function () {
    'use strict';

    //#region Presets
    var PRESETS = {
        long: { year: 'numeric', month: 'long', day: 'numeric' },
        short: { year: 'numeric', month: '2-digit', day: '2-digit' },
        month: { year: 'numeric', month: 'long' },
    };
    //#endregion

    //#region Core Formatter
    function format(input, preset) {
        if (!input) return '';
        var date = input instanceof Date ? input : new Date(input);
        if (isNaN(date.getTime())) return '';
        try {
            return new Intl.DateTimeFormat('fa-IR', PRESETS[preset] || PRESETS.long)
                .format(date);
        } catch (e) {
            return '';
        }
    }
    //#endregion

    //#region DOM Applier
    /**
     * Scan [data-jalali-date] elements and fill them in.
     * Also supports the legacy id "#profile-joined-date" for backward compat.
     */
    function applyTo(root) {
        root = root || document;

        // New declarative API
        root.querySelectorAll('[data-jalali-date]').forEach(function (el) {
            var iso = el.getAttribute('data-jalali-date');
            var preset = el.getAttribute('data-jalali-format') || 'long';
            var formatted = format(iso, preset);
            if (formatted) el.textContent = formatted;
        });

        // Legacy: #profile-joined-date (deprecated, will be removed later)
        var legacy = root.querySelectorAll('#profile-joined-date');
        if (legacy.length) {
            var formatted = format('2026-09-01', 'long');
            if (formatted) {
                legacy.forEach(function (el) { el.textContent = formatted; });
            }
        }
    }
    //#endregion

    //#region Public API
    window.JalaliDate = { format: format, applyTo: applyTo };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { applyTo(document); });
    } else {
        applyTo(document);
    }
    //#endregion
})();
//#endregion