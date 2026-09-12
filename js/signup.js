/* =========================================================
   ASTROGUIDE — SIGNUP PAGE JS
   Handles:
   - Lucide initialization
   - Password visibility
   - Password matching
   - Signup form validation
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       LUCIDE ICONS
       ===================================================== */

    function initializeIcons() {

        if (window.lucide) {
            lucide.createIcons();
        }

    }


    /* =====================================================
       PASSWORD VISIBILITY
       ===================================================== */

    function initializePasswordToggle() {

        const buttons =
            document.querySelectorAll(
                ".signup-password-toggle"
            );


        if (!buttons.length) return;


        buttons.forEach(function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();


                    const targetId =
                        button.getAttribute(
                            "data-target"
                        );


                    const input =
                        document.getElementById(
                            targetId
                        );


                    if (!input) return;


                    const eyeShow =
                        button.querySelector(
                            ".signup-eye-show"
                        );


                    const eyeHide =
                        button.querySelector(
                            ".signup-eye-hide"
                        );


                    const shouldShow =
                        input.type === "password";


                    input.type =
                        shouldShow
                            ? "text"
                            : "password";


                    if (eyeShow && eyeHide) {

                        eyeShow.style.display =
                            shouldShow
                                ? "none"
                                : "block";


                        eyeHide.style.display =
                            shouldShow
                                ? "block"
                                : "none";

                    }


                    button.setAttribute(
                        "aria-label",
                        shouldShow
                            ? "Hide password"
                            : "Show password"
                    );


                    button.setAttribute(
                        "aria-pressed",
                        shouldShow
                            ? "true"
                            : "false"
                    );


                    input.focus();

                }
            );

        });

    }


    /* =====================================================
       PASSWORD MATCHING
       ===================================================== */

    function initializePasswordMatching() {

        const password =
            document.getElementById(
                "signup-password"
            );


        const confirmPassword =
            document.getElementById(
                "signup-confirm-password"
            );


        if (
            !password ||
            !confirmPassword
        ) {
            return;
        }


        function checkPasswordMatch() {

            if (
                confirmPassword.value &&
                password.value !==
                confirmPassword.value
            ) {

                confirmPassword.classList.add(
                    "signup-input-error"
                );

            } else {

                confirmPassword.classList.remove(
                    "signup-input-error"
                );

            }

        }


        password.addEventListener(
            "input",
            checkPasswordMatch
        );


        confirmPassword.addEventListener(
            "input",
            checkPasswordMatch
        );

    }


    /* =====================================================
       FORM VALIDATION
       ===================================================== */

    function initializeSignupForm() {

        const form =
            document.querySelector(
                ".signup-form"
            );


        if (!form) return;


        form.addEventListener(
            "submit",
            function (event) {

                let valid = true;


                const requiredInputs =
                    form.querySelectorAll(
                        "input[required]"
                    );


                requiredInputs.forEach(
                    function (input) {

                        if (
                            input.type === "checkbox"
                        ) {

                            if (!input.checked) {

                                valid = false;

                                input
                                    .closest(
                                        ".signup-terms"
                                    )
                                    .classList.add(
                                        "signup-terms-error"
                                    );

                            } else {

                                input
                                    .closest(
                                        ".signup-terms"
                                    )
                                    .classList.remove(
                                        "signup-terms-error"
                                    );

                            }

                            return;
                        }


                        if (
                            !input.value.trim()
                        ) {

                            valid = false;

                            input.classList.add(
                                "signup-input-error"
                            );

                        } else {

                            input.classList.remove(
                                "signup-input-error"
                            );

                        }

                    }
                );


                /* Email validation */

                const email =
                    document.getElementById(
                        "signup-email"
                    );


                if (
                    email &&
                    email.value &&
                    !email.value.includes("@")
                ) {

                    valid = false;

                    email.classList.add(
                        "signup-input-error"
                    );

                }


                /* Password matching */

                const password =
                    document.getElementById(
                        "signup-password"
                    );


                const confirmPassword =
                    document.getElementById(
                        "signup-confirm-password"
                    );


                if (
                    password &&
                    confirmPassword &&
                    password.value !==
                    confirmPassword.value
                ) {

                    valid = false;

                    confirmPassword.classList.add(
                        "signup-input-error"
                    );

                }


                if (!valid) {

                    event.preventDefault();

                }

            }
        );


        /* Remove errors while typing */

        form
            .querySelectorAll(
                "input"
            )
            .forEach(function (input) {

                input.addEventListener(
                    "input",
                    function () {

                        input.classList.remove(
                            "signup-input-error"
                        );

                    }
                );


                input.addEventListener(
                    "change",
                    function () {

                        const terms =
                            input.closest(
                                ".signup-terms"
                            );


                        if (terms) {

                            terms.classList.remove(
                                "signup-terms-error"
                            );

                        }

                    }
                );

            });

    }


    /* =====================================================
       INITIALIZE
       ===================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            initializeIcons();

            initializePasswordToggle();

            initializePasswordMatching();

            initializeSignupForm();

        }
    );

})();