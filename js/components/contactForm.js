document.addEventListener("DOMContentLoaded", () => {
    initContactForm();
});

function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const submitBtn = form.querySelector(".contact__submit");
    const defaultLabel = submitBtn.textContent;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

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
                submitBtn.textContent = "Message sent!";
            } else {
                submitBtn.textContent = "Something went wrong";
            }
        } catch (error) {
            submitBtn.textContent = "Something went wrong";
        } finally {
            window.setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = defaultLabel;
            }, 3000);
        }
    });
}
