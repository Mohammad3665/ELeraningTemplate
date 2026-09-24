document.addEventListener('DOMContentLoaded', function () {
    /* ---- Remove favorite: removes the row and shows empty state when none left ---- */
    var list = document.getElementById('favorites-list');
    var empty = document.getElementById('favorites-empty');
    document.querySelectorAll('.remove-favorite').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var row = btn.closest('article');
            if (row) row.remove();
            if (list && empty && list.children.length === 0) {
                list.classList.add('hidden');
                empty.classList.remove('hidden');
                var pagination = document.querySelector('nav[aria-label="صفحه‌بندی"]');
                if (pagination) pagination.classList.add('hidden');
            }
        });
    });
});