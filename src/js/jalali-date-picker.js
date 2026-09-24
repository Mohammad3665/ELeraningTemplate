//#region Jalali Date Picker
/* ============================================================
   Jalali Date Picker
   A data-driven Jalali (Persian) date picker with no external
   dependencies. Attaches to any input matching a selector and
   uses a shared panel in the DOM.

   Required DOM structure:
     <input data-jalali-picker="my-picker" />
     <div id="my-picker" data-jalali-picker-panel>
       <button data-picker-nav="prev">‹</button>
       <button data-picker-label></button>
       <button data-picker-nav="next">›</button>

       <div data-picker-days>
         <div data-picker-grid></div>
       </div>
       <div data-picker-months>          <!-- month dropdown -->
         <div data-picker-months-grid></div>
       </div>
       <div data-picker-years>           <!-- year dropdown -->
         <select data-picker-years-select></select>
       </div>
     </div>

   Three view modes: days | months | years
   Years are dynamically generated from MIN_YEAR (1300) up to
   the current Jalali year — no need to update the source each
   year.

   Events:
     "jalali:pick" on the input → { jy, jm, jd }

   Public API:
     window.JalaliDatePicker.init(inputEl, panelEl);
     window.JalaliDatePicker.open(inputEl);
     window.JalaliDatePicker.close(inputEl);
     window.JalaliDatePicker.toPersian(str);
     window.JalaliDatePicker.toEnglishDigits(str);
   ============================================================ */
(function () {
    'use strict';

    //#region Constants
    var J_MONTHS = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
        'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
    var J_WEEK = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

    var MIN_YEAR = 1300; // earliest selectable Jalali year
    //#endregion

    //#region Persian Digits
    var PERSIAN = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    function toPersian(str) {
        return String(str).replace(/\d/g, function (d) { return PERSIAN[d]; });
    }
    function toEnglishDigits(str) {
        return String(str)
            .replace(/[۰-۹]/g, function (d) { return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d); })
            .replace(/[٠-٩]/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'.indexOf(d); });
    }
    //#endregion

    //#region Jalali <-> Gregorian (Borkowski)
    function div(a, b) { return ~~(a / b); }
    function mod(a, b) { return a - ~~(a / b) * b; }

    function jalCal(jy) {
        var breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210,
            1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178];
        var bl = breaks.length, gy = jy + 621, leapJ = -14, jp = breaks[0],
            jm, jump = 0, leap, n, i;

        for (i = 1; i < bl; i += 1) {
            jm = breaks[i]; jump = jm - jp;
            if (jy < jm) break;
            leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
            jp = jm;
        }
        n = jy - jp;
        leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
        if (mod(jump, 33) === 4 && jump - n === 4) leapJ += 1;

        var leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
        var march = 20 + leapJ - leapG;

        if (jump - n < 6) n = n - jump + div(jump + 4, 33) * 33;
        leap = mod(mod(n + 1, 33) - 1, 4);
        if (leap === -1) leap = 4;

        return { leap: leap, gy: gy, march: march };
    }

    function g2d(gy, gm, gd) {
        var d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4)
            + div(153 * mod(gm + 9, 12) + 2, 5)
            + gd - 34840408;
        d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
        return d;
    }

    function d2g(jdn) {
        var j, i, gd, gm, gy;
        j = 4 * jdn + 139361631;
        j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
        i = div(mod(j, 1461), 4) * 5 + 308;
        gd = div(mod(i, 153), 5) + 1;
        gm = mod(div(i, 153), 12) + 1;
        gy = div(j, 1461) - 100100 + div(8 - gm, 6);
        return { gy: gy, gm: gm, gd: gd };
    }

    function jIsLeap(jy) { return jalCal(jy).leap === 0; }
    function jMonthLen(jy, jm) {
        if (jm <= 6) return 31;
        if (jm <= 11) return 30;
        return jIsLeap(jy) ? 30 : 29;
    }
    function j2jdn(jy, jm, jd) {
        var r = jalCal(jy);
        return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1;
    }

    /** Today's Jalali date as [jy, jm, jd]. */
    function todayJalali() {
        var now = new Date();
        var jdn = g2d(now.getFullYear(), now.getMonth() + 1, now.getDate());
        // jdn → jalali
        var gy = d2g(jdn).gy;
        var jy = gy - 621;
        var r = jalCal(jy);
        var jdn1f = g2d(gy, 3, r.march);
        var k = jdn - jdn1f;
        var jm, jd;
        if (k >= 0) {
            if (k <= 185) {
                jm = 1 + div(k, 31);
                jd = mod(k, 31) + 1;
                return [jy, jm, jd];
            }
            k -= 186;
        } else {
            jy -= 1;
            k += 179;
            if (r.leap === 1) k += 1;
        }
        jm = 7 + div(k, 30);
        jd = mod(k, 30) + 1;
        return [jy, jm, jd];
    }
    //#endregion

    //#region Helpers
    function pad2(n) { return String(n).padStart(2, '0'); }

    function parseInputValue(input) {
        var m = toEnglishDigits(input.value).match(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
        return m ? [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)] : null;
    }
    //#endregion

    //#region Picker Instance
    /**
     * Attach picker behavior to an input + panel.
     * @param {HTMLInputElement} input
     * @param {HTMLElement} panel
     */
    function init(input, panel) {
        if (!input || !panel) {
            console.warn('[JalaliDatePicker] init() skipped: input or panel is null');
            return;
        }

        //#region Resolve inner elements
        var labelEl = panel.querySelector('[data-picker-label]');
        var daysWrap = panel.querySelector('[data-picker-days]');
        var gridEl = panel.querySelector('[data-picker-grid]');
        var monthsWrap = panel.querySelector('[data-picker-months]');
        var monthsGrid = panel.querySelector('[data-picker-months-grid]');
        var yearsWrap = panel.querySelector('[data-picker-years]');
        var yearsGrid = panel.querySelector('[data-picker-years-grid]');
        var prevBtn = panel.querySelector('[data-picker-nav="prev"]');
        var nextBtn = panel.querySelector('[data-picker-nav="next"]');

        if (!labelEl || !gridEl) {
            console.warn(
                '[JalaliDatePicker] Panel is missing [data-picker-label] or [data-picker-grid].',
                panel
            );
            return;
        }
        //#endregion

        //#region State
        var picked = null;    // [jy, jm, jd] — currently selected day
        var view = null;    // [jy, jm]     — currently displayed month
        var mode = 'days';  // 'days' | 'months' | 'years'
        //#endregion

        //#region View toggling
        function setMode(newMode) {
            mode = newMode;
            if (daysWrap) daysWrap.classList.toggle('hidden', mode !== 'days');
            if (monthsWrap) monthsWrap.classList.toggle('hidden', mode !== 'months');
            if (yearsWrap) yearsWrap.classList.toggle('hidden', mode !== 'years');

            // Hide prev/next navigation in years view (grid is self-sufficient)
            var hideNav = mode === 'years';
            if (prevBtn) prevBtn.classList.toggle('hidden', hideNav);
            if (nextBtn) nextBtn.classList.toggle('hidden', hideNav);
        }
        //#endregion

        //#region Render — Days
        function renderDays() {
            if (!view) return;
            var jy = view[0], jm = view[1];

            labelEl.textContent = J_MONTHS[jm - 1] + ' ' + toPersian(jy);

            var firstJdn = j2jdn(jy, jm, 1);
            var startCol = (firstJdn % 7 + 2) % 7;

            gridEl.innerHTML = '';
            J_WEEK.forEach(function (w) {
                var head = document.createElement('span');
                head.className = 'py-1 font-semibold text-gray-400';
                head.textContent = w;
                gridEl.appendChild(head);
            });

            var empty = document.createElement('span');
            for (var i = 0; i < startCol; i++) gridEl.appendChild(empty.cloneNode());

            var len = jMonthLen(jy, jm);
            for (var d = 1; d <= len; d++) {
                (function (day) {
                    var btn = document.createElement('button');
                    btn.type = 'button';
                    btn.textContent = toPersian(day);
                    var isSel = picked && picked[0] === jy && picked[1] === jm && picked[2] === day;
                    btn.className = 'flex size-7 cursor-pointer items-center justify-center rounded-lg transition-colors sm:size-8 ' +
                        (isSel ? 'bg-primary font-bold text-white'
                            : 'text-dark hover:bg-[#fff4ef] hover:text-primary');
                    btn.addEventListener('click', function () {
                        picked = [jy, jm, day];
                        input.value = toPersian(jy) + '/' + toPersian(pad2(jm)) + '/' + toPersian(pad2(day));
                        panel.classList.add('hidden');
                        input.dispatchEvent(new CustomEvent('jalali:pick', {
                            bubbles: true,
                            detail: { jy: jy, jm: jm, jd: day },
                        }));
                    });
                    gridEl.appendChild(btn);
                })(d);
            }
        }
        //#endregion

        //#region Render — Months
        function renderMonths() {
            if (!view) return;
            var jy = view[0];

            labelEl.textContent = toPersian(jy);

            if (!monthsGrid) return;
            monthsGrid.innerHTML = '';

            J_MONTHS.forEach(function (name, idx) {
                var jm = idx + 1;
                var isSel = view[1] === jm;
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = name;
                btn.className = 'cursor-pointer rounded-lg px-2 py-2 text-xs transition-colors ' +
                    (isSel ? 'bg-primary font-bold text-white'
                        : 'text-dark hover:bg-[#fff4ef] hover:text-primary');
                btn.addEventListener('click', function () {
                    view = [jy, jm];
                    setMode('days');
                    renderDays();
                });
                monthsGrid.appendChild(btn);
            });
        }
        //#endregion

        //#region Render — Years (grid, like months)
        function renderYears() {
            if (!view || !yearsGrid) return;

            var currentJy = todayJalali()[0];
            var selectedJy = view[0];

            labelEl.textContent = 'انتخاب سال';

            yearsGrid.innerHTML = '';

            // Show years from newest to oldest so recent years are on top.
            for (var y = currentJy; y >= MIN_YEAR; y--) {
                (function (yr) {
                    var isSel = yr === selectedJy;

                    var btn = document.createElement('button');
                    btn.type = 'button';
                    btn.textContent = toPersian(yr);
                    btn.className =
                        'cursor-pointer rounded-lg px-2 py-2 text-xs transition-colors ' +
                        (isSel
                            ? 'bg-primary font-bold text-white'
                            : 'text-dark hover:bg-[#fff4ef] hover:text-primary');

                    btn.addEventListener('click', function () {
                        view = [yr, view[1]];
                        setMode('months');
                        renderMonths();
                    });

                    yearsGrid.appendChild(btn);
                })(y);
            }

            // Auto-scroll so the currently selected year is visible
            var selectedBtn = yearsGrid.querySelector('.bg-primary');
            if (selectedBtn) {
                selectedBtn.scrollIntoView({ block: 'nearest' });
            }
        }
        //#endregion

        //#region Render dispatcher
        function render() {
            if (mode === 'years') renderYears();
            else if (mode === 'months') renderMonths();
            else renderDays();
        }
        //#endregion

        //#region Navigation
        function goPrev() {
            if (!view) return;
            var jy = view[0], jm = view[1];

            if (mode === 'months') {
                view = [jy - 1, jm];
                renderMonths();
            } else if (mode === 'days') {
                jm -= 1;
                if (jm < 1) { jm = 12; jy -= 1; }
                view = [jy, jm];
                renderDays();
            }
            // years mode: no prev/next (dropdown handles it)
        }

        function goNext() {
            if (!view) return;
            var jy = view[0], jm = view[1];

            if (mode === 'months') {
                view = [jy + 1, jm];
                renderMonths();
            } else if (mode === 'days') {
                jm += 1;
                if (jm > 12) { jm = 1; jy += 1; }
                view = [jy, jm];
                renderDays();
            }
        }

        if (prevBtn) prevBtn.addEventListener('click', goPrev);
        if (nextBtn) nextBtn.addEventListener('click', goNext);
        //#endregion

        //#region Label toggles view mode
        labelEl.style.cursor = 'pointer';
        labelEl.classList.add('cursor-pointer', 'hover:text-primary', 'transition-colors');
        labelEl.addEventListener('click', function (e) {
            e.stopPropagation();

            if (mode === 'days') {
                setMode('months');
            } else if (mode === 'months') {
                setMode('years');
            } else {
                setMode('months');
            }
            render();
        });
        //#endregion

        //#region Open / Close
        function open() {
            picked = parseInputValue(input) || todayJalali();
            view = [picked[0], picked[1]];
            setMode('days');
            render();
            panel.classList.remove('hidden');
        }

        function close() {
            panel.classList.add('hidden');
        }

        input.addEventListener('click', function () {
            if (!panel.classList.contains('hidden')) close();
            else open();
        });

        document.addEventListener('click', function (e) {
            if (!panel.classList.contains('hidden') &&
                !panel.contains(e.target) && e.target !== input) {
                close();
            }
        });
        //#endregion

        //#region Per-instance API
        input._jalaliPicker = {
            open: open,
            close: close,
            isOpen: function () { return !panel.classList.contains('hidden'); },
        };
        //#endregion
    }
    //#endregion

    //#region Auto-Init
    function autoInit() {
        document.querySelectorAll('[data-jalali-picker]').forEach(function (input) {
            var panelId = input.getAttribute('data-jalali-picker');
            var panel = document.getElementById(panelId);
            if (panel) init(input, panel);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoInit);
    } else {
        autoInit();
    }
    //#endregion

    //#region Public API
    window.JalaliDatePicker = {
        init: init,
        open: function (input) { if (input && input._jalaliPicker) input._jalaliPicker.open(); },
        close: function (input) { if (input && input._jalaliPicker) input._jalaliPicker.close(); },
        toPersian: toPersian,
        toEnglishDigits: toEnglishDigits,
        todayJalali: todayJalali,
    };
    //#endregion
})();
//#endregion