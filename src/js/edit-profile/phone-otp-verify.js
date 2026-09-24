//#region Phone OTP Verification
/* ============================================================
   Phone OTP Verification
   Validates an Iranian mobile number, opens an OTP modal,
   handles the 2-minute countdown, resend, and mock verification.

   Required DOM ids:
     phone-number, phone-verify-btn, phone-error,
     phone-verified-badge,
     otp-modal, otp-modal-backdrop, otp-modal-close,
     otp-display-phone, otp-form, otp-error,
     otp-timer, otp-resend, otp-cancel
     [data-otp] inputs

   Exposes:
     window.PhoneOtp.isVerified()
     window.PhoneOtp.getNumber()
   ============================================================ */
(function () {
    'use strict';

    var PERSIAN = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    function toPersian(str) {
        return String(str).replace(/\d/g, function (d) { return PERSIAN[d]; });
    }
    function toEnglishDigits(str) {
        return String(str)
            .replace(/[۰-۹]/g, function (d) { return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d); })
            .replace(/[٠-٩]/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'.indexOf(d); });
    }
    function isValidPhone(value) {
        return /^09\d{9}$/.test(toEnglishDigits(value).trim());
    }

    var verified = false;

    function setup() {
        var phoneInput = document.getElementById('phone-number');
        var verifyBtn = document.getElementById('phone-verify-btn');
        var phoneError = document.getElementById('phone-error');
        var verifiedBadge = document.getElementById('phone-verified-badge');
        var modal = document.getElementById('otp-modal');
        var backdrop = document.getElementById('otp-modal-backdrop');
        var closeBtn = document.getElementById('otp-modal-close');
        var displayPhone = document.getElementById('otp-display-phone');
        var form = document.getElementById('otp-form');
        var inputs = document.querySelectorAll('[data-otp]');
        var otpError = document.getElementById('otp-error');
        var timerEl = document.getElementById('otp-timer');
        var resendBtn = document.getElementById('otp-resend');
        var cancelBtn = document.getElementById('otp-cancel');

        if (!phoneInput || !verifyBtn || !modal) return;

        var timerInterval = null;
        var remaining = 0;

        function openModal() {
            displayPhone.textContent = toPersian(toEnglishDigits(phoneInput.value).trim());
            otpError.classList.add('hidden');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';
            inputs.forEach(function (i) { i.value = ''; });
            inputs[0].focus();
            startTimer();
        }

        function closeModal() {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
            clearInterval(timerInterval);
        }

        function startTimer() {
            remaining = 120;
            timerEl.textContent = toPersian('02:00');
            resendBtn.disabled = true;
            resendBtn.classList.add('text-dark/40', 'cursor-not-allowed');
            resendBtn.classList.remove('text-primary', 'cursor-pointer', 'hover:underline');

            clearInterval(timerInterval);
            timerInterval = setInterval(function () {
                remaining--;
                if (remaining <= 0) {
                    clearInterval(timerInterval);
                    timerEl.textContent = toPersian('00:00');
                    resendBtn.disabled = false;
                    resendBtn.classList.remove('text-dark/40', 'cursor-not-allowed');
                    resendBtn.classList.add('text-primary', 'cursor-pointer', 'hover:underline');
                } else {
                    var m = Math.floor(remaining / 60).toString().padStart(2, '0');
                    var s = (remaining % 60).toString().padStart(2, '0');
                    timerEl.textContent = toPersian(m + ':' + s);
                }
            }, 1000);
        }

        verifyBtn.addEventListener('click', function () {
            phoneError.classList.add('hidden');
            verifiedBadge.classList.add('hidden');
            verifiedBadge.classList.remove('flex');

            if (!isValidPhone(phoneInput.value)) {
                phoneError.textContent = 'شماره موبایل معتبر نیست. (مثال: 09123456789)';
                phoneError.classList.remove('hidden');
                return;
            }
            openModal();
        });

        closeBtn.addEventListener('click', closeModal);
        backdrop.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
        });

        inputs.forEach(function (input, idx) {
            input.addEventListener('input', function (e) {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                if (e.target.value && idx < inputs.length - 1) inputs[idx + 1].focus();
            });
            input.addEventListener('keydown', function (e) {
                if (e.key === 'Backspace' && !e.target.value && idx > 0) inputs[idx - 1].focus();
            });
        });

        resendBtn.addEventListener('click', function () {
            if (resendBtn.disabled) return;
            inputs.forEach(function (i) { i.value = ''; });
            inputs[0].focus();
            startTimer();
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            otpError.classList.add('hidden');

            var code = Array.prototype.map.call(inputs, function (i) { return i.value; }).join('');
            if (code.length !== 6) {
                otpError.textContent = 'کد ۶ رقمی را کامل وارد کنید.';
                otpError.classList.remove('hidden');
                return;
            }

            // Mock: any 6-digit code is accepted
            verified = true;
            closeModal();
            phoneError.classList.add('hidden');
            verifiedBadge.classList.remove('hidden');
            verifiedBadge.classList.add('flex');
            phoneInput.readOnly = true;
            verifyBtn.textContent = 'تایید شده';
            verifyBtn.disabled = true;
            verifyBtn.classList.remove('hover:bg-primary', 'hover:text-white');
            verifyBtn.classList.add('cursor-not-allowed', 'border-emerald-500', 'text-emerald-500');

            // Notify listeners
            document.dispatchEvent(new CustomEvent('phone:verified', {
                detail: { phone: toEnglishDigits(phoneInput.value).trim() },
            }));
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setup);
    } else {
        setup();
    }

    // Public API
    window.PhoneOtp = {
        isVerified: function () { return verified; },
        getNumber: function () {
            var el = document.getElementById('phone-number');
            return el ? toEnglishDigits(el.value).trim() : '';
        },
        isValid: isValidPhone,
    };
})();
//#endregion