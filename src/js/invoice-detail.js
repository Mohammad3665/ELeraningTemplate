document.addEventListener('DOMContentLoaded', function () {
    /* ---- Print invoice ---- */
    var printBtn = document.getElementById('print-invoice');

    if (printBtn) {
        printBtn.addEventListener('click', function () {
            window.print();
        });
    }
});
