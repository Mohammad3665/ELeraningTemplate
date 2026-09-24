//#region Reset Password Page
/* ============================================================
   Reset Password Page
   Multi-step reset password flow:
   1. Enter mobile number
   2. Enter OTP (with 2-minute countdown timer & resend)
   3. Set new password (with validation)
   4. Success confirmation
   ============================================================ */
(function () {
    'use strict';

    //#region DOM References
    // Step containers
    const step1 = document.getElementById('reset-step-1');
    const step2 = document.getElementById('reset-step-2');
    const step3 = document.getElementById('reset-step-3');
    const step4 = document.getElementById('reset-step-4');

    // Step 1: Mobile form
    const mobileForm = document.getElementById('reset-mobile-form');
    const mobileInput = document.getElementById('reset-mobile');
    const displayMobile = document.getElementById('reset-display-mobile');

    // Step 2: OTP form
    const otpForm = document.getElementById('reset-otp-form');
    const otpInputs = document.querySelectorAll('[data-reset-otp]');
    const timerEl = document.getElementById('otp-timer');
    const resendBtn = document.getElementById('resend-otp');
    const backBtn = document.getElementById('back-to-step-1');

    // Step 3: New password form
    const passwordForm = document.getElementById('reset-password-form');
    const newPassInput = document.getElementById('new-password');
    const confirmPassInput = document.getElementById('confirm-new-password');
    const errorEl = document.getElementById('reset-error');
    const submitBtn = document.getElementById('reset-submit');

    // Timer state
    let timerInterval = null;
    let remaining = 120;
    //#endregion

    //#region Helpers
    /**
     * Convert English digits in a string/number to Persian digits.
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

    /**
     * Hide all step containers and show the given one.
     * @param {HTMLElement} state
     */
    function showState(state) {
        [step1, step2, step3, step4].forEach((s) => s.classList.add('hidden'));
        state.classList.remove('hidden');
    }

    /**
     * Display an error message under the password form.
     * @param {string} msg
     */
    function showError(msg) {
        errorEl.textContent = msg;
        errorEl.classList.remove('hidden');
    }

    /**
     * Hide the error message.
     */
    function hideError() {
        errorEl.textContent = '';
        errorEl.classList.add('hidden');
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
                timerEl.textContent = toPersianDigits('۰۰:۰۰');
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

    //#region Step 1: Mobile Submission
    mobileForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const mobile = mobileInput.value.trim();
        if (!mobile) return;

        displayMobile.textContent = toPersianDigits(mobile);
        showState(step2);
        startTimer();
        otpInputs[0].focus();
    });
    //#endregion

    //#region Step 2: OTP Inputs
    // Auto-focus next input on typing, and move back on Backspace.
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

    // Resend OTP button: restart timer and clear inputs.
    resendBtn.addEventListener('click', function () {
        if (resendBtn.disabled) return;
        startTimer();
        otpInputs.forEach((i) => (i.value = ''));
        otpInputs[0].focus();
    });

    // Back to Step 1 button: stop timer and show step 1.
    backBtn.addEventListener('click', function () {
        showState(step1);
        clearInterval(timerInterval);
    });

    // Submit OTP -> proceed to Step 3.
    otpForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const code = Array.from(otpInputs)
            .map((i) => i.value)
            .join('');
        if (code.length !== 6) return;

        showState(step3);
        newPassInput.focus();
    });
    //#endregion

    //#region Step 3: New Password Submission
    passwordForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        hideError();

        const newPass = newPassInput.value;
        const confirmPass = confirmPassInput.value;

        // Validation
        if (newPass.length < 8) {
            showError('رمز عبور باید حداقل ۸ کاراکتر باشد.');
            return;
        }

        if (newPass !== confirmPass) {
            showError('رمز عبور و تکرار آن یکسان نیستند.');
            return;
        }

        // Simulate async save
        submitBtn.disabled = true;
        submitBtn.textContent = 'در حال ذخیره...';

        try {
            await new Promise((r) => setTimeout(r, 900));
            showState(step4);
        } catch (err) {
            showError('خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.');
            submitBtn.disabled = false;
            submitBtn.textContent = 'ذخیره رمز جدید';
        }
    });
    //#endregion
})();
//#endregion