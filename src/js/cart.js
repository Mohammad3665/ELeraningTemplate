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

    /* =========================================================
       CART STATE
       ========================================================= */

    var cartList = document.getElementById('cart-list');
    var cartEmpty = document.getElementById('cart-empty');

    var subtotalEl = document.getElementById('summary-subtotal');
    var courseDiscountEl = document.getElementById('summary-course-discount');
    var couponDiscountEl = document.getElementById('summary-coupon-discount');
    var totalEl = document.getElementById('summary-total');

    // Coupon codes are applied on the checkout page; the cart summary
    // keeps the row but always shows zero here.
    var couponAmount = 0;

    function showEmptyState() {
        if (cartList) cartList.classList.add('hidden');
        if (cartEmpty) cartEmpty.classList.remove('hidden');
    }

    /* =========================================================
       ORDER SUMMARY
       ========================================================= */

    function updateSummary() {
        var items = document.querySelectorAll('#cart-list article');

        var subtotal = 0;
        var courseDiscount = 0;

        items.forEach(function (item) {
            var priceBox = item.querySelector('[data-unit-price]');
            if (!priceBox) return;

            var unit = parseInt(priceBox.getAttribute('data-unit-price'), 10) || 0;
            var discount = parseInt(priceBox.getAttribute('data-discount'), 10) || 0;

            subtotal += unit;
            courseDiscount += discount;
        });

        var total = Math.max(subtotal - courseDiscount - couponAmount, 0);

        if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
        if (courseDiscountEl) {
            courseDiscountEl.textContent =
                courseDiscount > 0 ? '−' + formatPrice(courseDiscount) : formatPrice(0);
        }
        if (couponDiscountEl) {
            couponDiscountEl.textContent =
                couponAmount > 0 ? '−' + formatPrice(couponAmount) : formatPrice(0);
        }
        if (totalEl) totalEl.textContent = formatPrice(total);

        // No items left -> empty state
        if (cartList && cartEmpty && items.length === 0) {
            showEmptyState();
        }
    }

    /* =========================================================
       REMOVE CART ITEM
       ========================================================= */

    document.querySelectorAll('.remove-cart-item').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var row = btn.closest('article');
            if (row) row.remove();
            updateSummary();
        });
    });

    /* =========================================================
       INIT
       ========================================================= */

    updateSummary();
});
