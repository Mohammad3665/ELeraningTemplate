//#region Contact Page
/* ============================================================
   Contact Page
   Demo submission handler for the contact form (static template).
   ============================================================ */
(function () {
    'use strict';

    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const submitBtn = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        if (!submitBtn) return;

        const originalText = submitBtn.textContent;

        // Simulate async submission.
        submitBtn.disabled = true;
        submitBtn.textContent = 'در حال ارسال...';

        try {
            await new Promise((r) => setTimeout(r, 900));
            submitBtn.textContent = 'پیام شما با موفقیت ارسال شد';
            contactForm.reset();

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2500);
        } catch (err) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
})();
//#endregion
