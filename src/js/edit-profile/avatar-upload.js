//#region Avatar Upload
/* ============================================================
   Avatar Upload
   Handles avatar selection, preview, validation, and removal.

   Required DOM:
     <input type="file" id="avatar-input" hidden />
     <img id="avatar-preview" />
     <button id="avatar-select-btn">...</button>
     <button id="avatar-remove-btn">...</button>
     <div id="avatar-error" class="hidden"></div>

   Config:
     - data-default-src on #avatar-preview (fallback image)
   ============================================================ */
(function () {
    'use strict';

    var MAX_SIZE = 2 * 1024 * 1024; // 2 MB
    var ALLOWED = ['image/jpeg', 'image/png'];

    function setup() {
        var input = document.getElementById('avatar-input');
        var preview = document.getElementById('avatar-preview');
        var selectBtn = document.getElementById('avatar-select-btn');
        var removeBtn = document.getElementById('avatar-remove-btn');
        var errorEl = document.getElementById('avatar-error');
        var defaultSrc = preview ? preview.getAttribute('data-default-src') || preview.src : '';

        if (!input || !preview || !selectBtn || !removeBtn || !errorEl) return;

        var objectUrl = null;

        function showError(msg) {
            errorEl.textContent = msg;
            errorEl.classList.remove('hidden');
        }
        function clearError() { errorEl.classList.add('hidden'); }

        selectBtn.addEventListener('click', function () { input.click(); });

        input.addEventListener('change', function () {
            clearError();
            var file = input.files && input.files[0];
            if (!file) return;

            if (ALLOWED.indexOf(file.type) === -1) {
                showError('فرمت تصویر باید JPG یا PNG باشد.');
                input.value = '';
                return;
            }
            if (file.size > MAX_SIZE) {
                showError('حجم تصویر نباید بیشتر از ۲ مگابایت باشد.');
                input.value = '';
                return;
            }

            if (objectUrl) URL.revokeObjectURL(objectUrl);
            objectUrl = URL.createObjectURL(file);
            preview.src = objectUrl;
            removeBtn.classList.remove('hidden');
        });

        removeBtn.addEventListener('click', function () {
            if (objectUrl) { URL.revokeObjectURL(objectUrl); objectUrl = null; }
            input.value = '';
            preview.src = defaultSrc;
            removeBtn.classList.add('hidden');
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setup);
    } else {
        setup();
    }
})();
//#endregion