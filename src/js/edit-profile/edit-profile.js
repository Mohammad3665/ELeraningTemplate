//#region Edit Profile Page
/* ============================================================
   Edit Profile Page
   Only page-specific logic: form submit validation.
   Other concerns are delegated to:
     - avatar-upload.js       → avatar
     - phone-otp-verify.js    → phone + OTP
     - jalali-date-picker.js  → birth date
     - jalali-date.js         → joined date ([data-jalali-date])
   ============================================================ */
(function () {
    'use strict';

    function setup() {
        var form = document.getElementById('edit-profile-form');
        var formMessage = document.getElementById('form-message');
        var phoneInput = document.getElementById('phone-number');
        if (!form || !formMessage || !phoneInput) return;

        function showMessage(text, ok) {
            formMessage.textContent = text;
            formMessage.classList.remove('hidden', 'text-red-500', 'text-emerald-500');
            formMessage.classList.add(ok ? 'text-emerald-500' : 'text-red-500');
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!window.PhoneOtp || !window.PhoneOtp.isValid(phoneInput.value)) {
                showMessage('شماره موبایل معتبر نیست.', false);
                return;
            }
            if (!window.PhoneOtp.isVerified()) {
                showMessage('لطفاً ابتدا شماره موبایل را با کد تایید کنید.', false);
                return;
            }

            // TODO: send form data to server
            showMessage('تغییرات با موفقیت ذخیره شد.', true);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setup);
    } else {
        setup();
    }
})();
//#endregion