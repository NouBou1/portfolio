import { translate } from "../i18n.js";

document.addEventListener("DOMContentLoaded", () => {
    initContactForm();
});

// Letters (any alphabet) plus the separators that occur in real names.
const NAME_PATTERN = /^\p{L}[\p{L}\p{M}\p{Zs}'’.-]*$/u;
const LETTER_PATTERN = /\p{L}/gu;

// Local part without leading, trailing or doubled dots, followed by at least
// one domain label and a TLD of two or more letters.
const EMAIL_PATTERN =
    /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

const VALIDATION_RULES = {
    name: {
        validate: (value) => isValidName(value),
        errorKey: "formErrorName",
    },
    email: {
        validate: (value) => isValidEmail(value),
        errorKey: "formErrorEmail",
    },
    message: {
        validate: (value) => value.trim().length >= 10,
        errorKey: "formErrorMessage",
    },
    consent: {
        validate: (value) => value === true,
        errorKey: "formErrorConsent",
    },
};

function isValidName(value) {
    const name = value.trim();
    if (name.length < 2 || name.length > 60) return false;
    if (!NAME_PATTERN.test(name)) return false;

    // Guards against inputs like "a." or "-", which the pattern alone allows.
    return (name.match(LETTER_PATTERN) ?? []).length >= 2;
}

function isValidEmail(value) {
    const email = value.trim();
    return email.length <= 254 && EMAIL_PATTERN.test(email);
}

function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    // Als Dauer statt als Zeitstempel gesendet, damit eine falsch gestellte
    // Uhr auf dem Client die Serverpruefung nicht aushebelt.
    const openedAt = Date.now();

    const fields = {
        name: form.elements.name,
        email: form.elements.email,
        message: form.elements.message,
        consent: form.elements.consent,
    };

    const submitBtn = form.querySelector(".contact__submit");
    const validationState = {
        name: false,
        email: false,
        message: false,
        consent: false,
    };

    // Setup error message containers
    setupErrorContainers(form, fields);

    // Bind validation on blur
    bindFieldValidation(fields, validationState, submitBtn);

    // Update translations on language change
    document.addEventListener("languagechange", () => {
        updateErrorMessages(form);
        if (submitBtn.textContent === translate("formSubmit") || 
            submitBtn.textContent === translate("formSending") || 
            submitBtn.textContent === translate("formSent") || 
            submitBtn.textContent === translate("formError")) {
            submitBtn.textContent = translate("formSubmit");
        }
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Validate all fields before submit
        const allValid = Object.entries(fields).every(([name, field]) => {
            const isValid = validateField(name, field);
            validationState[name] = isValid;
            return isValid;
        });

        if (!allValid) {
            updateSubmitButton(validationState, submitBtn);
            return;
        }

        submitBtn.disabled = true;
        submitBtn.classList.remove("is-sent");
        submitBtn.textContent = translate("formSending");

        const payload = {
            name: fields.name.value.trim(),
            email: fields.email.value.trim(),
            message: fields.message.value.trim(),
            contact_reference: form.elements.contact_reference?.value ?? "",
            elapsedMs: Date.now() - openedAt,
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
                Object.keys(validationState).forEach((key) => (validationState[key] = false));
                clearAllErrors(form);
                submitBtn.textContent = translate("formSent");
                submitBtn.classList.add("is-sent");
            } else {
                submitBtn.textContent = translate("formError");
            }
        } catch (error) {
            submitBtn.textContent = translate("formError");
        } finally {
            window.setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.classList.remove("is-sent");
                submitBtn.textContent = translate("formSubmit");
            }, 3000);
        }
    });

    // Initial button state
    updateSubmitButton(validationState, submitBtn);
}

function setupErrorContainers(form, fields) {
    Object.entries(fields).forEach(([name, field]) => {
        if (name === "consent") return;

        const fieldContainer = field.closest(".contact__field");
        if (!fieldContainer) return;

        const errorEl = document.createElement("span");
        errorEl.className = "contact__field-error";
        errorEl.setAttribute("data-field", name);
        errorEl.setAttribute("role", "alert");
        fieldContainer.appendChild(errorEl);
    });
}

function bindFieldValidation(fields, validationState, submitBtn) {
    Object.entries(fields).forEach(([name, field]) => {
        const eventType = name === "consent" ? "change" : "blur";

        field.addEventListener(eventType, () => {
            const isValid = validateField(name, field);
            validationState[name] = isValid;
            updateSubmitButton(validationState, submitBtn);
        });

        // Clear error on input/change
        if (name !== "consent") {
            field.addEventListener("input", () => {
                const fieldContainer = field.closest(".contact__field");
                if (fieldContainer?.classList.contains("has-error")) {
                    clearFieldError(fieldContainer, name);
                }
            });
        }
    });
}

function validateField(name, field) {
    const rule = VALIDATION_RULES[name];
    if (!rule) return true;

    const value = field.type === "checkbox" ? field.checked : field.value;
    const isValid = rule.validate(value);

    if (name === "consent") return isValid;

    const fieldContainer = field.closest(".contact__field");
    if (!fieldContainer) return isValid;

    if (!isValid) {
        showFieldError(fieldContainer, name, rule.errorKey);
    } else {
        clearFieldError(fieldContainer, name);
    }

    return isValid;
}

function showFieldError(fieldContainer, fieldName, errorKey) {
    const errorEl = fieldContainer.querySelector(`[data-field="${fieldName}"]`);
    if (!errorEl) return;

    fieldContainer.classList.add("has-error");
    errorEl.textContent = translate(errorKey);
}

function clearFieldError(fieldContainer, fieldName) {
    const errorEl = fieldContainer.querySelector(`[data-field="${fieldName}"]`);
    if (!errorEl) return;

    fieldContainer.classList.remove("has-error");
    errorEl.textContent = "";
}

function clearAllErrors(form) {
    form.querySelectorAll(".contact__field").forEach((fieldContainer) => {
        fieldContainer.classList.remove("has-error");
        const errorEl = fieldContainer.querySelector(".contact__field-error");
        if (errorEl) errorEl.textContent = "";
    });
}

function updateErrorMessages(form) {
    form.querySelectorAll(".contact__field.has-error").forEach((fieldContainer) => {
        const errorEl = fieldContainer.querySelector(".contact__field-error");
        if (!errorEl) return;

        const fieldName = errorEl.getAttribute("data-field");
        const rule = VALIDATION_RULES[fieldName];
        if (rule) {
            errorEl.textContent = translate(rule.errorKey);
        }
    });
}

function updateSubmitButton(validationState, submitBtn) {
    const allValid = Object.values(validationState).every((valid) => valid);
    submitBtn.disabled = !allValid;
}
