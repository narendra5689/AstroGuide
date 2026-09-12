/* =========================
   AstroGuide — Global Theme JS
   Handles:
   Dark Mode
   RTL/LTR
   Password Visibility
   Navbar Scroll
   Scroll Animations
   Form Validation
   Newsletter
   Zodiac Selector
   Dashboard Sidebar
   ========================= */

(function () {
    "use strict";


    /* =====================================================
       THEME — DARK / LIGHT
       ===================================================== */

    function initializeTheme() {
        const saved = localStorage.getItem("theme") || "light";

        document.documentElement.setAttribute("data-theme", saved);

        updateThemeIcon(saved);
    }


    function toggleTheme() {
        const current =
            document.documentElement.getAttribute("data-theme") || "light";

        const next = current === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", next);

        localStorage.setItem("theme", next);

        updateThemeIcon(next);
    }


    function updateThemeIcon(theme) {
        document
            .querySelectorAll(".theme-toggle-icon")
            .forEach(function (icon) {

                icon.setAttribute(
                    "data-lucide",
                    theme === "dark" ? "sun" : "moon"
                );

            });

        if (window.lucide) {
            lucide.createIcons();
        }
    }


    /* =====================================================
       DIRECTION — RTL / LTR
       ===================================================== */

    function initializeDirection() {

        const saved =
            localStorage.getItem("direction") || "ltr";

        document.documentElement.setAttribute("dir", saved);

        updateDirectionText(saved);
    }


    function toggleDirection() {

        const current =
            document.documentElement.getAttribute("dir") || "ltr";

        const next =
            current === "rtl" ? "ltr" : "rtl";

        document.documentElement.setAttribute("dir", next);

        localStorage.setItem("direction", next);

        updateDirectionText(next);
    }


    function updateDirectionText(dir) {

        document
            .querySelectorAll(".direction-toggle-text")
            .forEach(function (text) {

                text.textContent =
                    dir === "rtl" ? "RTL" : "LTR";

            });
    }


    /* =====================================================
       APPEARANCE SYNCHRONIZATION
       ===================================================== */

    function synchronizeAppearance() {
        initializeTheme();
        initializeDirection();
    }


    /* =====================================================
       NAVBAR SCROLL
       ===================================================== */

    function initializeNavbarScroll() {

        const navbar =
            document.querySelector(".navbar-custom");

        if (!navbar) return;

        function updateNavbar() {

            if (window.scrollY > 30) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }

        }

        updateNavbar();

        window.addEventListener("scroll", updateNavbar);
    }


    /* =====================================================
       SCROLL ANIMATIONS
       ===================================================== */

    function initializeScrollAnimations() {

        const elements =
            document.querySelectorAll(".animate-on-scroll");

        if (!elements.length) return;

        if (!("IntersectionObserver" in window)) {

            elements.forEach(function (element) {
                element.classList.add("visible");
            });

            return;
        }

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");

                            observer.unobserve(entry.target);
                        }

                    });

                },
                {
                    threshold: 0.1,
                    rootMargin: "0px 0px -50px 0px"
                }
            );

        elements.forEach(function (element) {
            observer.observe(element);
        });
    }


    /* =====================================================
       NEWSLETTER FORMS
       ===================================================== */

    function initializeNewsletterForms() {

        document
            .querySelectorAll(".newsletter-form")
            .forEach(function (form) {

                form.addEventListener("submit", function (e) {

                    e.preventDefault();

                    const input =
                        form.querySelector(".form-control");

                    const msg =
                        form.parentElement.querySelector(
                            ".newsletter-msg"
                        );

                    if (
                        !input ||
                        !input.value ||
                        !input.value.includes("@")
                    ) {

                        if (msg) {

                            msg.textContent =
                                "Please enter a valid email address.";

                            msg.style.color =
                                "var(--secondary-light)";
                        }

                        return;
                    }

                    if (msg) {

                        msg.textContent =
                            "Thank you for subscribing to AstroGuide!";

                        msg.style.color =
                            "var(--secondary-light)";
                    }

                    input.value = "";
                });
            });
    }


    /* =====================================================
       ZODIAC SIGN SELECTOR
       ===================================================== */

    function initializeZodiacSelector() {

        const buttons =
            document.querySelectorAll(".zodiac-sign-btn");

        const display =
            document.getElementById(
                "zodiac-horoscope-display"
            );

        if (!buttons.length || !display) return;

        buttons.forEach(function (btn) {

            btn.addEventListener("click", function () {

                buttons.forEach(function (button) {
                    button.classList.remove("active");
                });

                btn.classList.add("active");

                const sign =
                    btn.getAttribute("data-sign");

                const data =
                    getZodiacData(sign);

                const title =
                    display.querySelector(".zodiac-title");

                const dateRange =
                    display.querySelector(
                        ".zodiac-date-range"
                    );

                const general =
                    display.querySelector(
                        ".zodiac-general"
                    );

                const love =
                    display.querySelector(
                        ".zodiac-love"
                    );

                const career =
                    display.querySelector(
                        ".zodiac-career"
                    );

                const wellness =
                    display.querySelector(
                        ".zodiac-wellness"
                    );

                if (title) {
                    title.textContent = data.title;
                }

                if (dateRange) {
                    dateRange.textContent = data.dateRange;
                }

                if (general) {
                    general.textContent = data.general;
                }

                if (love) {
                    love.textContent = data.love;
                }

                if (career) {
                    career.textContent = data.career;
                }

                if (wellness) {
                    wellness.textContent = data.wellness;
                }

                display.classList.add("fade-in");

                setTimeout(function () {
                    display.classList.remove("fade-in");
                }, 500);

            });

        });
    }


    function getZodiacData(sign) {

        const data = {

            aries: {
                title: "Aries",
                dateRange: "Mar 21 – Apr 19",
                general:
                    "Today brings a surge of confidence. Channel your natural boldness into a project that has been waiting for your initiative.",
                love:
                    "Passion is on your side. A heartfelt conversation could deepen a meaningful connection.",
                career:
                    "Your leadership instincts are sharp. Trust them when an unexpected opportunity appears.",
                wellness:
                    "High energy calls for physical activity. A brisk walk or workout will restore your balance."
            },

            taurus: {
                title: "Taurus",
                dateRange: "Apr 20 – May 20",
                general:
                    "Stability is your theme today. Focus on grounding routines that nurture your sense of security.",
                love:
                    "Patience in relationships pays off. Small, thoughtful gestures speak louder than grand ones.",
                career:
                    "Steady progress is better than rushing. Your methodical approach earns recognition.",
                wellness:
                    "Prioritize rest and nourishment. A calming evening routine will recharge you."
            },

            gemini: {
                title: "Gemini",
                dateRange: "May 21 – Jun 20",
                general:
                    "Curiosity opens new doors. A conversation today could lead to an idea worth exploring further.",
                love:
                    "Communication is your love language. Share your thoughts openly with someone close.",
                career:
                    "Your adaptability shines. Multiple tasks may come your way — prioritize with clarity.",
                wellness:
                    "Mental stimulation is key, but don't forget to unplug and breathe."
            },

            cancer: {
                title: "Cancer",
                dateRange: "Jun 21 – Jul 22",
                general:
                    "Emotional insight guides you today. Trust your intuition when making an important decision.",
                love:
                    "Home and family bring comfort. A warm, nurturing moment strengthens your bonds.",
                career:
                    "Your empathy at work is noticed. Collaborative efforts yield positive results.",
                wellness:
                    "Hydration and gentle movement support your emotional and physical balance."
            },

            leo: {
                title: "Leo",
                dateRange: "Jul 23 – Aug 22",
                general:
                    "Your natural radiance draws people in. Step into the spotlight with authentic confidence.",
                love:
                    "Generosity warms your relationships. Express appreciation for those who matter most.",
                career:
                    "A creative idea gains traction. Don't hesitate to present your vision with pride.",
                wellness:
                    "Channel your vibrant energy into a creative or physical outlet."
            },

            virgo: {
                title: "Virgo",
                dateRange: "Aug 23 – Sep 22",
                general:
                    "Attention to detail serves you well. Organizing one small area of life brings big relief.",
                love:
                    "Acts of service deepen your connections. Your thoughtfulness does not go unnoticed.",
                career:
                    "Your precision is valued. A carefully planned approach leads to a breakthrough.",
                wellness:
                    "A clean, simple routine supports both body and mind today."
            },

            libra: {
                title: "Libra",
                dateRange: "Sep 23 – Oct 22",
                general:
                    "Balance and harmony are within reach. A gentle adjustment restores your inner peace.",
                love:
                    "Diplomacy resolves a lingering tension. Approach differences with grace and openness.",
                career:
                    "Your sense of fairness is appreciated. Mediate a situation and find common ground.",
                wellness:
                    "Stretching and mindful breathing bring calm to a busy day."
            },

            scorpio: {
                title: "Scorpio",
                dateRange: "Oct 23 – Nov 21",
                general:
                    "Depth and transformation define your day. Embrace change as a path to renewal.",
                love:
                    "Intensity can be a strength. Honest vulnerability draws someone closer.",
                career:
                    "Your focused determination cuts through complexity. Trust your investigative instincts.",
                wellness:
                    "Release tension through deep breathing or a restorative practice."
            },

            sagittarius: {
                title: "Sagittarius",
                dateRange: "Nov 22 – Dec 21",
                general:
                    "Adventure calls. Even a small exploration brings fresh perspective and inspiration.",
                love:
                    "Optimism is contagious. Share your enthusiasm and uplift someone's day.",
                career:
                    "Big-picture thinking opens a new path. Your vision is worth pursuing.",
                wellness:
                    "Outdoor activity recharges your spirit. Movement and fresh air are medicine."
            },

            capricorn: {
                title: "Capricorn",
                dateRange: "Dec 22 – Jan 19",
                general:
                    "Discipline and patience are your allies. Long-term goals come into clearer focus today.",
                love:
                    "Reliability builds trust. Show up consistently for the people who matter.",
                career:
                    "Your structured approach earns respect. A milestone is closer than you think.",
                wellness:
                    "Consistency in self-care pays off. Stick to what works for your body."
            },

            aquarius: {
                title: "Aquarius",
                dateRange: "Jan 20 – Feb 18",
                general:
                    "Innovation and individuality light your path. An unconventional idea may be exactly right.",
                love:
                    "Friendship forms the foundation of love. Connect intellectually as well as emotionally.",
                career:
                    "Your forward-thinking approach inspires others. Share your vision boldly.",
                wellness:
                    "Community and connection nourish your spirit. Reach out to your circle."
            },

            pisces: {
                title: "Pisces",
                dateRange: "Feb 19 – Mar 20",
                general:
                    "Compassion and creativity flow through you. Trust your gentle, intuitive nature today.",
                love:
                    "Sensitivity is a gift. Express your feelings through art, music, or kind words.",
                career:
                    "Imagination leads to a creative solution. Don't be afraid to think differently.",
                wellness:
                    "Water and rest restore your energy. Prioritize quiet, reflective moments."
            }

        };

        return data[sign] || data.aries;
    }


    /* =====================================================
       DASHBOARD SIDEBAR
       ===================================================== */

    function initializeDashboardSidebar() {

        const sidebar =
            document.getElementById("dashboardSidebar");

        if (!sidebar) return;

        const links =
            sidebar.querySelectorAll(".sidebar-link");

        const sections =
            document.querySelectorAll(
                ".dashboard-content-area"
            );

        links.forEach(function (link) {

            link.addEventListener("click", function (e) {

                const targetId =
                    link.getAttribute("data-section");

                if (!targetId) return;

                e.preventDefault();

                links.forEach(function (item) {
                    item.classList.remove("active");
                });

                link.classList.add("active");

                sections.forEach(function (section) {

                    section.classList.toggle(
                        "d-none",
                        section.id !== targetId
                    );

                });

                const offcanvasEl =
                    document.getElementById(
                        "dashboardSidebar"
                    );

                if (
                    window.bootstrap &&
                    offcanvasEl
                ) {

                    const instance =
                        bootstrap.Offcanvas.getInstance(
                            offcanvasEl
                        );

                    if (instance) {
                        instance.hide();
                    }

                }

            });

        });
    }


    /* =====================================================
       GENERIC FORM VALIDATION
       ===================================================== */

    function initializeFormValidation() {

        document
            .querySelectorAll("form[data-validate]")
            .forEach(function (form) {

                form.addEventListener(
                    "submit",
                    function (e) {

                        let valid = true;

                        form
                            .querySelectorAll("[required]")
                            .forEach(function (input) {

                                if (!input.value.trim()) {

                                    valid = false;

                                    input.classList.add(
                                        "is-invalid"
                                    );

                                } else {

                                    input.classList.remove(
                                        "is-invalid"
                                    );

                                }

                                if (
                                    input.type === "email" &&
                                    input.value &&
                                    !input.value.includes("@")
                                ) {

                                    valid = false;

                                    input.classList.add(
                                        "is-invalid"
                                    );

                                }

                            });

                        if (!valid) {
                            e.preventDefault();
                        }

                    }
                );

                form
                    .querySelectorAll("[required]")
                    .forEach(function (input) {

                        input.addEventListener(
                            "input",
                            function () {

                                input.classList.remove(
                                    "is-invalid"
                                );

                            }
                        );

                    });

            });
    }


    /* =====================================================
       PASSWORD VISIBILITY
       ===================================================== */

    function initializePasswordToggle() {

        const buttons =
            document.querySelectorAll(".password-toggle");

        if (!buttons.length) return;

        buttons.forEach(function (button) {

            const targetId =
                button.getAttribute("data-target");

            const input =
                document.getElementById(targetId);

            if (!input) return;

            button.addEventListener("click", function (e) {

                e.preventDefault();
                e.stopPropagation();

                const showPassword =
                    input.type === "password";

                /* Change password visibility */
                input.type =
                    showPassword ? "text" : "password";

                /* Find the two Lucide icons */
                const eyeIcon =
                    button.querySelector(
                        ".password-eye-show"
                    );

                const eyeOffIcon =
                    button.querySelector(
                        ".password-eye-hide"
                    );

                /* Change icon visibility */
                if (eyeIcon && eyeOffIcon) {

                    eyeIcon.style.display =
                        showPassword ? "none" : "block";

                    eyeOffIcon.style.display =
                        showPassword ? "block" : "none";
                }

                /* Accessibility */
                button.setAttribute(
                    "aria-label",
                    showPassword
                        ? "Hide password"
                        : "Show password"
                );

                button.setAttribute(
                    "aria-pressed",
                    showPassword ? "true" : "false"
                );

                input.focus();

            });

        });
    }


    /* =====================================================
       LUCIDE INITIALIZATION
       ===================================================== */

    function initializeIcons() {

        if (window.lucide) {
            lucide.createIcons();
        }
    }


    /* =====================================================
       PAGE RESTORATION FIX
       ===================================================== */

    /*
       When the browser restores a page using its
       back/forward cache (bfcache), DOMContentLoaded
       may not run again.

       Re-apply the saved theme and direction so Login,
       Signup, and all other pages stay synchronized.
    */

    window.addEventListener("pageshow", function () {
        synchronizeAppearance();
    });


    /* =====================================================
       INIT ALL
       ===================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            initializeIcons();

            initializeTheme();
            initializeDirection();

            initializeNavbarScroll();

            initializeScrollAnimations();

            initializeNewsletterForms();

            initializeZodiacSelector();

            initializeDashboardSidebar();

            initializeFormValidation();

            initializePasswordToggle();


            /* Theme buttons */

            document
                .querySelectorAll(".theme-toggle")
                .forEach(function (button) {

                    button.addEventListener(
                        "click",
                        toggleTheme
                    );

                });


            /* Direction buttons */

            document
                .querySelectorAll(".direction-toggle")
                .forEach(function (button) {

                    button.addEventListener(
                        "click",
                        toggleDirection
                    );

                });

        }
    );

})();