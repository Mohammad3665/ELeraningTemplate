//#region Password Toggle
/* ============================================================
   Password Toggle
   Adds show/hide functionality to password inputs.

   Usage in HTML:
     <div class="password-wrapper">
       <input type="password" ... />
       <button type="button" class="toggle-password">
         <svg class="eye-animated">...</svg>
       </button>
     </div>

   - Clicking the toggle button switches the input between
     "password" and "text" type.
   - The .eye-animated icon receives the "is-hidden" class
     when the password becomes visible, so the icon can
     reflect the current state (e.g. crossed-out eye).
   ============================================================ */
(function () {
    'use strict';

    //#region Setup
    function setupPasswordToggles() {
        document.querySelectorAll('.password-wrapper').forEach(function (wrapper) {
            var input = wrapper.querySelector('input[type="password"]');
            var toggleBtn = wrapper.querySelector('.toggle-password');
            var eyeIcon = toggleBtn.querySelector('.eye-animated');

            toggleBtn.addEventListener('click', function (e) {
                e.preventDefault();

                var isPassword = input.type === 'password';

                // Switch input type
                input.type = isPassword ? 'text' : 'password';

                // Update the eye icon state
                if (isPassword) {
                    eyeIcon.classList.add('is-hidden');
                } else {
                    eyeIcon.classList.remove('is-hidden');
                }
            });
        });
    }
    //#endregion

    //#region Run
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupPasswordToggles);
    } else {
        setupPasswordToggles();
    }
    //#endregion
})();
//#endregion