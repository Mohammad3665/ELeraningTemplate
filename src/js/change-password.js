//#region Change Password Page
/* ============================================================
   Change Password Page
   Validates and submits the change-password form:
   - Current password required
   - New password: min 8 chars, must contain letters AND digits,
     must differ from the current password
   - Confirmation must match the new password
   On success: hides the card and shows a success box.

   Note: Password visibility toggle is handled by password-toggle.js
   ============================================================ */
(function () {
    'use strict';

    //#region DOM Ready
    function setup() {
        //#region DOM References
        var form = document.getElementById('change-password-form');
        var card = document.getElementById('change-password-card');
        var successBox = document.getElementById('change-password-success');
        var submitBtn = document.getElementById('change-password-submit');

        var currentInput = document.getElementById('current-password');
        var newInput = document.getElementById('new-password');
        var confirmInput = document.getElementById('confirm-password');

        var currentError = document.getElementById('current-password-error');
        var newError = document.getElementById('new-password-error');
        var confirmError = document.getElementById('confirm-password-error');

        if (!form) return;
        //#endregion

        //#region Helpers
        function showError(el, msg) {
            el.textContent = msg;
            el.classList.remove('hidden');
        }
        function hideError(el) {
            el.textContent = '';
            el.classList.add('hidden');
        }
        //#endregion

        //#region Live Error Clearing
        // Clear each field's error as soon as the user starts typing.
        [
            { input: currentInput, error: currentError },
            { input: newInput, error: newError },
            { input: confirmInput, error: confirmError },
        ].forEach(function (pair) {
            pair.input.addEventListener('input', function () {
                hideError(pair.error);
            });
        });
        //#endregion

        //#region Submit & Validation
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            hideError(currentError);
            hideError(newError);
            hideError(confirmError);

            var currentPass = currentInput.value;
            var newPass = newInput.value;
            var confirmPass = confirmInput.value;
            var valid = true;

            // Current password
            if (!currentPass) {
                showError(currentError, 'رمز عبور فعلی را وارد کنید.');
                valid = false;
            }

            // New password
            if (newPass.length < 8) {
                showError(newError, 'رمز عبور باید حداقل ۸ کاراکتر باشد.');
                valid = false;
            } else if (!/[A-Za-z]/.test(newPass) || !/\d/.test(newPass)) {
                showError(newError, 'رمز عبور باید شامل حروف و اعداد باشد.');
                valid = false;
            } else if (newPass === currentPass) {
                showError(newError, 'رمز عبور جدید نباید با رمز فعلی یکسان باشد.');
                valid = false;
            }

            // Confirmation
            if (!confirmPass) {
                showError(confirmError, 'تکرار رمز عبور جدید را وارد کنید.');
                valid = false;
            } else if (newPass && confirmPass !== newPass) {
                showError(confirmError, 'رمز عبور و تکرار آن یکسان نیستند.');
                valid = false;
            }

            if (!valid) return;

            // Mock submit
            submitBtn.disabled = true;
            submitBtn.textContent = 'در حال ذخیره...';

            setTimeout(function () {
                card.classList.add('hidden');
                successBox.classList.remove('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 800);
        });
        //#endregion
    }
    //#endregion

    //#region Run
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setup);
    } else {
        setup();
    }
    //#endregion
})();
//#endregion