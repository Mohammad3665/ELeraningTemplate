document.addEventListener('DOMContentLoaded', function () {
    /* =========================================================
       PAYMENT METHOD SELECTION
       ========================================================= */

    var paymentForm = document.getElementById('checkout-payment-form');
    var paymentError = document.getElementById('payment-error');

    if (!paymentForm) return;

    function clearError() {
        if (paymentError) paymentError.classList.add('hidden');
    }

    // Hide the error as soon as a method is picked.
    paymentForm.querySelectorAll('input[name="payment_method"]').forEach(function (radio) {
        radio.addEventListener('change', clearError);
    });

    /* =========================================================
       SUBMIT (demo)
       ========================================================= */

    paymentForm.addEventListener('submit', function (event) {
        event.preventDefault();

        var selected = paymentForm.querySelector('input[name="payment_method"]:checked');

        if (!selected) {
            if (paymentError) paymentError.classList.remove('hidden');
            return;
        }

        clearError();

        // TODO: redirect to the payment result step (section 3.4) once implemented.
    });
});
