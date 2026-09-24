//#region Login / OTP Page
/* ============================================================
   Login / OTP Page
   Handles two independent concerns:
   1. Method Tabs    — switch between "OTP" and "Password" panels
   2. OTP Login Flow — mobile → OTP code → (new user) profile
                        completion, with countdown timer & resend
   ============================================================ */
(function () {
    'use strict';

    //#region DOM Ready
    document.addEventListener('DOMContentLoaded', function () {

        //#region Method Tabs
        const methodTabs = document.querySelectorAll('.method-tab');
        const methodPanels = {
            otp: document.getElementById('method-otp'),
            password: document.getElementById('method-password'),
        };

        /**
         * Activate the given tab and show its corresponding panel.
         * @param {HTMLElement} activeTab
         */
        function setActiveTab(activeTab) {
            const method = activeTab.getAttribute('data-method');

            methodTabs.forEach(function (t) {
                const active = t === activeTab;
                t.setAttribute('aria-selected', String(active));
                t.classList.toggle('bg-white', active);
                t.classList.toggle('text-primary', active);
                t.classList.toggle('shadow-sm', active);
                t.classList.toggle('text-dark/60', !active);
                // Hover style only for inactive tabs
                t.classList.toggle('hover:text-dark', !active);
            });

            Object.keys(methodPanels).forEach(function (key) {
                methodPanels[key].classList.toggle('hidden', key !== method);
            });
        }

        // Apply the initial state (before any user click)
        const initialTab = document.querySelector('.method-tab[aria-selected="true"]');
        if (initialTab) setActiveTab(initialTab);

        // Bind click handlers
        methodTabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                setActiveTab(tab);
            });
        });
        //#endregion

        //#region OTP Flow — DOM References
        const step1 = document.getElementById('otp-step-1');
        const step2 = document.getElementById('otp-step-2');
        const step3 = document.getElementById('otp-step-3');

        const mobileForm = document.getElementById('otp-mobile-form');
        const mobileInput = document.getElementById('mobile-number');
        const displayMobile = document.getElementById('display-mobile');

        const otpInputs = document.querySelectorAll('[data-otp]');
        const timerEl = document.getElementById('otp-timer');
        const resendBtn = document.getElementById('resend-otp');
        const backBtn = document.getElementById('back-to-step-1');

        const otpCodeForm = document.getElementById('otp-code-form');
        const profileForm = document.getElementById('profile-form');

        // Timer state
        let timerInterval = null;
        let remaining = 120; // 2 minutes
        //#endregion

        //#region Helpers
        /**
         * Convert English digits to Persian digits.
         * @param {string|number} num
         * @returns {string}
         */
        function toPersianDigits(num) {
            const persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
            return String(num).replace(/\d/g, (d) => persian[d]);
        }

        /**
         * Format seconds as MM:SS in Persian digits.
         * @param {number} seconds
         * @returns {string}
         */
        function formatTime(seconds) {
            const m = Math.floor(seconds / 60).toString().padStart(2, '0');
            const s = (seconds % 60).toString().padStart(2, '0');
            return toPersianDigits(m) + ':' + toPersianDigits(s);
        }
        //#endregion

        //#region OTP Countdown Timer
        /**
         * Start (or restart) the 2-minute OTP countdown.
         * Disables the resend button while the timer is running.
         */
        function startTimer() {
            remaining = 120;
            timerEl.textContent = formatTime(remaining);
            resendBtn.disabled = true;
            resendBtn.classList.add('text-dark/40', 'cursor-not-allowed');
            resendBtn.classList.remove(
                'text-primary',
                'cursor-pointer',
                'hover:underline',
            );

            clearInterval(timerInterval);
            timerInterval = setInterval(() => {
                remaining--;
                if (remaining <= 0) {
                    clearInterval(timerInterval);
                    timerEl.textContent = toPersianDigits('00:00');
                    resendBtn.disabled = false;
                    resendBtn.classList.remove('text-dark/40', 'cursor-not-allowed');
                    resendBtn.classList.add(
                        'text-primary',
                        'cursor-pointer',
                        'hover:underline',
                    );
                } else {
                    timerEl.textContent = formatTime(remaining);
                }
            }, 1000);
        }
        //#endregion

        //#region Step 1 — Mobile Submission
        if (mobileForm) {
            mobileForm.addEventListener('submit', function (e) {
                e.preventDefault();
                if (!mobileInput.value.trim()) return;

                displayMobile.textContent = toPersianDigits(mobileInput.value.trim());
                step1.classList.add('hidden');
                step2.classList.remove('hidden');
                startTimer();
                otpInputs[0].focus();
            });
        }
        //#endregion

        //#region Step 2 — OTP Inputs
        // Auto-focus next input on typing, move back on Backspace.
        // Only digits are allowed.
        otpInputs.forEach((input, idx) => {
            input.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                if (e.target.value && idx < otpInputs.length - 1) {
                    otpInputs[idx + 1].focus();
                }
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && !e.target.value && idx > 0) {
                    otpInputs[idx - 1].focus();
                }
            });
        });

        // Resend OTP: restart timer and clear inputs
        if (resendBtn) {
            resendBtn.addEventListener('click', function () {
                if (resendBtn.disabled) return;
                startTimer();
                otpInputs.forEach((i) => (i.value = ''));
                otpInputs[0].focus();
            });
        }

        // Back to Step 1
        if (backBtn) {
            backBtn.addEventListener('click', function () {
                step2.classList.add('hidden');
                step1.classList.remove('hidden');
                clearInterval(timerInterval);
            });
        }
        //#endregion

        //#region Step 2 → Step 3 — OTP Code Submission
        // Server logs in existing users directly; new users are
        // routed to Step 3 for profile completion.
        if (otpCodeForm && step3 && profileForm) {
            otpCodeForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const code = Array.from(otpInputs)
                    .map((i) => i.value)
                    .join('');
                if (code.length !== 6) return;

                // TODO: send code to server. Existing user → login directly;
                // new user → show Step 3 (profile completion).
                clearInterval(timerInterval);
                step2.classList.add('hidden');
                step3.classList.remove('hidden');
                console.log('OTP Code:', code);
            });
        }
        //#endregion

        //#region Step 3 — Profile Completion (new accounts only)
        if (profileForm) {
            profileForm.addEventListener('submit', function (e) {
                e.preventDefault();
                // TODO: send profile data to server and log the user in
                window.location.href = 'dashboard.html';
            });
        }
        //#endregion

    });
    //#endregion
})();
//#endregion