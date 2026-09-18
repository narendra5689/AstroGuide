document.addEventListener(
    "DOMContentLoaded",
    function () {

        lucide.createIcons();


        /* ==========================================
           FAQ ACCORDION
        ========================================== */

        const faqQuestions =
            document.querySelectorAll(
                ".pricing-faq-question"
            );


        faqQuestions.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const faq =
                        button.closest(
                            ".pricing-faq"
                        );


                    const answer =
                        faq.querySelector(
                            ".pricing-faq-answer"
                        );


                    const isOpen =
                        faq.classList.contains(
                            "faq-open"
                        );


                    /*
                     * Close all other questions
                     */

                    document
                        .querySelectorAll(
                            ".pricing-faq"
                        )
                        .forEach(function (item) {

                            item.classList.remove(
                                "faq-open"
                            );


                            const itemButton =
                                item.querySelector(
                                    ".pricing-faq-question"
                                );


                            if (itemButton) {

                                itemButton.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );

                            }

                        });


                    /*
                     * Open clicked question
                     */

                    if (!isOpen) {

                        faq.classList.add(
                            "faq-open"
                        );


                        button.setAttribute(
                            "aria-expanded",
                            "true"
                        );

                    }

                }
            );

        });


        /* ==========================================
           SCROLL REVEAL
        ========================================== */

        const revealElements =
            document.querySelectorAll(
                ".premium-plan-card, " +
                ".story-feature, " +
                ".included-item, " +
                ".journey-step, " +
                ".pricing-faq, " +
                ".pricing-comparison"
            );


        const revealObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "is-visible"
                                );


                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            function (element) {

                revealObserver.observe(
                    element
                );

            }
        );

    }
);