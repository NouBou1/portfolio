document.addEventListener("DOMContentLoaded", () => {
    initContactForm();
});

function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const submitBtn = form.querySelector(".contact__submit");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        submitBtn.disabled = true;
        submitBtn.textContent = translate("formSending");

        const payload = {
            name: form.elements.name.value,
            email: form.elements.email.value,
            message: form.elements.message.value,
        };

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            const result = await response.json().catch(() => null);

            if (response.ok && result?.success) {
                form.reset();
                submitBtn.textContent = translate("formSent");
            } else {
                submitBtn.textContent = translate("formError");
            }
        } catch (error) {
            submitBtn.textContent = translate("formError");
        } finally {
            window.setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = translate("formSubmit");
            }, 3000);
        }
    });
}
