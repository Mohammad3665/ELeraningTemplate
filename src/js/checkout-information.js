document.addEventListener('DOMContentLoaded', function () {
    /* =========================================================
       HELPERS
       ========================================================= */

    var FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    function toPersianNumber(value) {
        var grouped = String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return grouped.replace(/\d/g, function (d) {
            return FA_DIGITS[Number(d)];
        });
    }

    function formatPrice(value) {
        return toPersianNumber(value) + ' تومان';
    }

    /** Parse a Persian-digit price string like «۹۳,۰۰۰ تومان» into a number. */
    function parsePrice(text) {
        if (!text) return 0;
        var normalized = text.replace(/[۰-۹]/g, function (d) {
            return String(FA_DIGITS.indexOf(d));
        }).replace(/[^\d]/g, '');
        return parseInt(normalized, 10) || 0;
    }

    /* =========================================================
       ORDER SUMMARY STATE
       ========================================================= */

    var subtotalEl = document.getElementById('summary-subtotal');
    var courseDiscountEl = document.getElementById('summary-course-discount');
    var couponDiscountEl = document.getElementById('summary-coupon-discount');
    var totalEl = document.getElementById('summary-total');

    // Base amounts come from the static summary (mirrors the cart contents).
    var BASE_SUBTOTAL = parsePrice(subtotalEl ? subtotalEl.textContent : '');
    var BASE_COURSE_DISCOUNT = parsePrice(courseDiscountEl ? courseDiscountEl.textContent : '');

    // Demo coupon: WHY-1404 => 5,000 Toman off
    var COUPONS = {
        'WHY-1404': 5000,
    };

    var couponAmount = 0;

    function updateSummary() {
        var total = Math.max(BASE_SUBTOTAL - BASE_COURSE_DISCOUNT - couponAmount, 0);

        if (couponDiscountEl) {
            couponDiscountEl.textContent =
                couponAmount > 0 ? '−' + formatPrice(couponAmount) : formatPrice(0);
        }
        if (totalEl) totalEl.textContent = formatPrice(total);
    }

    /* =========================================================
       COUPON
       ========================================================= */

    var couponForm = document.getElementById('coupon-form');
    var couponInput = document.getElementById('coupon-code');
    var couponError = document.getElementById('coupon-error');
    var couponSuccess = document.getElementById('coupon-success');
    var couponFormBlock = document.getElementById('coupon-form-block');
    var couponApplied = document.getElementById('coupon-applied');
    var removeCouponBtn = document.getElementById('remove-coupon');

    function applyCoupon(code) {
        var amount = COUPONS[code];

        if (couponError) couponError.classList.add('hidden');
        if (couponSuccess) couponSuccess.classList.add('hidden');

        if (!amount) {
            if (couponError) couponError.classList.remove('hidden');
            return;
        }

        couponAmount = amount;

        if (couponFormBlock) couponFormBlock.classList.add('hidden');
        if (couponApplied) couponApplied.classList.remove('hidden');
        if (couponSuccess) couponSuccess.classList.remove('hidden');

        updateSummary();
    }

    function removeCoupon() {
        couponAmount = 0;

        if (couponApplied) couponApplied.classList.add('hidden');
        if (couponFormBlock) couponFormBlock.classList.remove('hidden');
        if (couponError) couponError.classList.add('hidden');
        if (couponSuccess) couponSuccess.classList.add('hidden');
        if (couponInput) couponInput.value = '';

        updateSummary();
    }

    if (couponForm) {
        couponForm.addEventListener('submit', function (event) {
            event.preventDefault();
            var code = couponInput ? couponInput.value.trim() : '';
            applyCoupon(code);
        });
    }

    if (removeCouponBtn) {
        removeCouponBtn.addEventListener('click', removeCoupon);
    }

    /* =========================================================
       CUSTOMER INFO FORM (demo validation)
       ========================================================= */

    var infoForm = document.getElementById('checkout-info-form');
    var checkoutError = document.getElementById('checkout-error');

    if (infoForm) {
        infoForm.addEventListener('submit', function (event) {
            event.preventDefault();

            var requiredFields = infoForm.querySelectorAll('[required]');
            var isValid = true;

            requiredFields.forEach(function (field) {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                } else {
                    field.classList.remove('border-red-500');
                }
            });

            if (checkoutError) {
                checkoutError.classList.toggle('hidden', isValid);
            }

            // TODO: navigate to checkout payment step (section 3.3) once implemented.
        });
    }

    /* =========================================================
       INIT
       ========================================================= */

    updateSummary();
});
