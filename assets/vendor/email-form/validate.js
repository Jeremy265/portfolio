/**
 * PHP Email Form Validation - v3.9
 * URL: https://bootstrapmade.com/email-form/
 * Author: BootstrapMade.com
 */
(function () {
    "use strict";

    let forms = document.querySelectorAll(".email-form");

    forms.forEach(function (e) {
        e.addEventListener("submit", function (event) {
            event.preventDefault();

            let thisForm = this;

            let recaptcha = thisForm.getAttribute("data-recaptcha-site-key");

            thisForm.querySelector(".loading").classList.add("d-block");
            thisForm
                .querySelector(".error-message")
                .classList.remove("d-block");
            thisForm.querySelector(".sent-message").classList.remove("d-block");

            let formData = new FormData(thisForm);

            if (recaptcha) {
                if (typeof grecaptcha !== "undefined") {
                    grecaptcha.ready(function () {
                        try {
                            grecaptcha
                                .execute(recaptcha, {
                                    action: "email_form_submit",
                                })
                                .then((token) => {
                                    formData.set("recaptcha-response", token);
                                    email_form_submit(thisForm, formData);
                                });
                        } catch (error) {
                            displayError(thisForm, error);
                        }
                    });
                } else {
                    displayError(
                        thisForm,
                        "The reCaptcha javascript API url is not loaded!"
                    );
                }
            } else {
                email_form_submit(thisForm, formData);
            }
        });
    });

    function email_form_submit(thisForm, formData) {
        window.location.href = `mailto:jeremy.thom26@yahoo.fr?subject=${formData.get(
            "subject"
        )}&body=${formData.get("message")}&cc=${formData.get("email")}`;
        thisForm.querySelector(".loading").classList.remove("d-block");
    }

    function displayError(thisForm, error) {
        thisForm.querySelector(".loading").classList.remove("d-block");
        thisForm.querySelector(".error-message").innerHTML = error;
        thisForm.querySelector(".error-message").classList.add("d-block");
    }
})();
