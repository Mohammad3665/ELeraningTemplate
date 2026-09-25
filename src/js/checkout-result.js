document.addEventListener('DOMContentLoaded', function () {
    /* =========================================================
       RESULT STATE (?status=failed shows the failure state)
       ========================================================= */

    var successState = document.getElementById('result-success');
    var failedState = document.getElementById('result-failed');

    if (!successState || !failedState) return;

    var status = new URLSearchParams(window.location.search).get('status');

    if (status === 'failed') {
        successState.classList.add('hidden');
        failedState.classList.remove('hidden');

        // Update the page title accent to match the failure state.
        document.title = 'وایلند | پرداخت ناموفق';
    }
});