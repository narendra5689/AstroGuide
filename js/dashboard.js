
/* =========================================================
   ASTROGUIDE CLIENT DASHBOARD JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const sidebarToggle =
        document.getElementById("dashboard-sidebar-toggle");

    const navItems =
        document.querySelectorAll(".dashboard-nav-item");

    const dashboardSections =
        document.querySelectorAll(".dashboard-section");


    /* =====================================================
       LUCIDE ICONS
       ===================================================== */

    function refreshIcons() {

        if (window.lucide) {
            lucide.createIcons();
        }

    }

    refreshIcons();


    /* =====================================================
       DASHBOARD SECTION NAVIGATION
       ===================================================== */

    function showSection(sectionName) {

        if (!sectionName) {
            return;
        }


        /* -------------------------------------------------
           HIDE ALL SECTIONS
           ------------------------------------------------- */

        dashboardSections.forEach(function (section) {

            section.classList.remove("active");

        });


        /* -------------------------------------------------
           SHOW SELECTED SECTION
           ------------------------------------------------- */

        const selectedSection =
            document.getElementById(
                "section-" + sectionName
            );


        if (selectedSection) {

            selectedSection.classList.add("active");

        }


        /* -------------------------------------------------
           UPDATE ACTIVE SIDEBAR ITEM
           ------------------------------------------------- */

        navItems.forEach(function (item) {

            item.classList.remove("active");


            if (
                item.getAttribute("data-section") ===
                sectionName
            ) {

                item.classList.add("active");

            }

        });


        /* -------------------------------------------------
           CLOSE MOBILE SIDEBAR
           ------------------------------------------------- */

        if (sidebarToggle) {

            sidebarToggle.checked = false;

        }


        /* -------------------------------------------------
           SCROLL DASHBOARD CONTENT TO TOP
           ------------------------------------------------- */

        const dashboardContent =
            document.querySelector(
                ".dashboard-content"
            );


        if (dashboardContent) {

            dashboardContent.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }


        /* -------------------------------------------------
           REFRESH ICONS
           ------------------------------------------------- */

        setTimeout(function () {

            refreshIcons();

        }, 50);

    }


    /* =====================================================
       SIDEBAR NAVIGATION
       ===================================================== */

    navItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const section =
                    item.getAttribute(
                        "data-section"
                    );


                if (!section) {
                    return;
                }


                closeProfileDropdown();


                showSection(section);


                /* -------------------------------------------------
                   UPDATE URL HASH
                   ------------------------------------------------- */

                if (
                    window.history &&
                    window.history.replaceState
                ) {

                    window.history.replaceState(
                        null,
                        "",
                        "#" + section
                    );

                }

            }
        );

    });


    /* =====================================================
       INTERNAL DASHBOARD LINKS
       ===================================================== */

    const internalSectionLinks =
        document.querySelectorAll(
            "[data-section]"
        );


    internalSectionLinks.forEach(function (element) {

        if (
            element.classList.contains(
                "dashboard-nav-item"
            )
        ) {

            return;

        }


        element.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const section =
                    element.getAttribute(
                        "data-section"
                    );


                if (!section) {
                    return;
                }


                closeProfileDropdown();


                showSection(section);


                if (
                    window.history &&
                    window.history.replaceState
                ) {

                    window.history.replaceState(
                        null,
                        "",
                        "#" + section
                    );

                }

            }
        );

    });


    /* =====================================================
       MOBILE SIDEBAR OVERLAY
       ===================================================== */

    const sidebarOverlay =
        document.querySelector(
            ".dashboard-sidebar-overlay"
        );


    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            function () {

                if (sidebarToggle) {

                    sidebarToggle.checked = false;

                }

            }
        );

    }


    /* =====================================================
       ESCAPE KEY - SIDEBAR + PROFILE
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                if (sidebarToggle) {

                    sidebarToggle.checked = false;

                }

                closeProfileDropdown();

            }

        }
    );


    /* =====================================================
       PROFILE DROPDOWN
       ===================================================== */

    const profileToggle =
        document.getElementById(
            "dashboard-profile-toggle"
        );

    const profileButton =
        document.querySelector(
            ".dashboard-profile-button"
        );

    const profileDropdown =
        document.querySelector(
            ".dashboard-profile-dropdown"
        );

    const profileCloseOverlay =
        document.querySelector(
            ".dashboard-profile-close-overlay"
        );


    /* =====================================================
       OPEN PROFILE DROPDOWN
       ===================================================== */

    function openProfileDropdown() {

        if (!profileDropdown) {
            return;
        }


        profileDropdown.classList.add(
            "profile-open"
        );


        if (profileCloseOverlay) {

            profileCloseOverlay.classList.add(
                "profile-overlay-open"
            );

        }


        if (profileToggle) {

            profileToggle.checked = true;

        }

    }


    /* =====================================================
       CLOSE PROFILE DROPDOWN
       ===================================================== */

    function closeProfileDropdown() {

        if (profileDropdown) {

            profileDropdown.classList.remove(
                "profile-open"
            );

        }


        if (profileCloseOverlay) {

            profileCloseOverlay.classList.remove(
                "profile-overlay-open"
            );

        }


        if (profileToggle) {

            profileToggle.checked = false;

        }

    }


    /* =====================================================
       PROFILE BUTTON CLICK
       ===================================================== */

    if (profileButton) {

        profileButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                if (
                    profileDropdown &&
                    profileDropdown.classList.contains(
                        "profile-open"
                    )
                ) {

                    closeProfileDropdown();

                } else {

                    openProfileDropdown();

                }

            }
        );

    }


    /* =====================================================
       PROFILE DROPDOWN CLICK
       ===================================================== */

    if (profileDropdown) {

        profileDropdown.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

            }
        );

    }


    /* =====================================================
       CLOSE PROFILE OVERLAY
       ===================================================== */

    if (profileCloseOverlay) {

        profileCloseOverlay.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                closeProfileDropdown();

            }
        );

    }


    /* =====================================================
       CLOSE PROFILE WHEN CLICKING OUTSIDE
       ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                profileDropdown &&
                profileDropdown.classList.contains(
                    "profile-open"
                )
            ) {

                if (
                    !profileDropdown.contains(
                        event.target
                    ) &&
                    !profileButton.contains(
                        event.target
                    )
                ) {

                    closeProfileDropdown();

                }

            }

        }
    );


    /* =====================================================
       PROFILE → MY PROFILE
       ===================================================== */

    const profileSectionLink =
        document.querySelector(
            ".profile-dropdown-item:first-of-type"
        );


    if (profileSectionLink) {

        profileSectionLink.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                closeProfileDropdown();


                showSection("profile");


                if (
                    window.history &&
                    window.history.replaceState
                ) {

                    window.history.replaceState(
                        null,
                        "",
                        "#profile"
                    );

                }

            }
        );

    }


    /* =====================================================
       NOTIFICATION BUTTON
       ===================================================== */

    const notificationButton =
        document.querySelector(
            ".dashboard-notification-button"
        );


    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            function () {

                notificationButton.classList.add(
                    "notification-read"
                );


                const notificationDot =
                    notificationButton.querySelector(
                        ".notification-dot"
                    );


                if (notificationDot) {

                    notificationDot.style.display =
                        "none";

                }

            }
        );

    }


    /* =====================================================
       LOGOUT
       ===================================================== */

    const logoutButton =
        document.querySelector(
            ".dashboard-logout"
        );

    const profileLogout =
        document.querySelector(
            ".profile-logout"
        );


    function performLogout(event) {

        if (event) {

            event.preventDefault();

        }


        /* -------------------------------------------------
           Clear local session
           ------------------------------------------------- */

        localStorage.removeItem(
            "astroguideUser"
        );

        localStorage.removeItem(
            "astroguideLoggedIn"
        );


        sessionStorage.removeItem(
            "astroguideUser"
        );

        sessionStorage.removeItem(
            "astroguideLoggedIn"
        );


        /* -------------------------------------------------
           Redirect
           ------------------------------------------------- */

        window.location.href =
            "./index.html";

    }


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            performLogout
        );

    }


    if (profileLogout) {

        profileLogout.addEventListener(
            "click",
            performLogout
        );

    }


    /* =====================================================
       BOOK NOW BUTTONS
       ===================================================== */

    const bookButtons =
        document.querySelectorAll(
            ".consultation-book .dashboard-button"
        );


    bookButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const originalContent =
                    button.innerHTML;


                button.innerHTML =
                    "Booking...";


                button.disabled = true;


                setTimeout(function () {

                    button.innerHTML =
                        'Selected <i data-lucide="check"></i>';

                    refreshIcons();

                }, 700);


                setTimeout(function () {

                    button.innerHTML =
                        originalContent;

                    button.disabled = false;

                    refreshIcons();

                }, 2200);

            }
        );

    });


    /* =====================================================
       READING SUMMARY BUTTONS
       ===================================================== */

    const summaryButtons =
        document.querySelectorAll(
            ".summary-action"
        );


    summaryButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const card =
                    button.closest(
                        ".reading-summary-card"
                    );


                if (!card) {
                    return;
                }


                card.classList.toggle(
                    "summary-expanded"
                );


                if (
                    card.classList.contains(
                        "summary-expanded"
                    )
                ) {

                    button.innerHTML =
                        'Summary Open <i data-lucide="check"></i>';

                } else {

                    button.innerHTML =
                        'View Summary <i data-lucide="arrow-right"></i>';

                }


                refreshIcons();

            }
        );

    });


    /* =====================================================
       SIDEBAR BRAND → HOME
       ===================================================== */

    const sidebarBrand =
        document.querySelector(
            ".dashboard-sidebar-brand"
        );


    if (sidebarBrand) {

        sidebarBrand.style.cursor =
            "pointer";


        sidebarBrand.addEventListener(
            "click",
            function () {

                window.location.href =
                    "./index.html";

            }
        );

    }


    /* =====================================================
       VALID DASHBOARD SECTIONS
       ===================================================== */

    const validSections = [

        "overview",

        "consultations",

        "readings",

        "appointments",

        "horoscope",

        "payments",

        "notifications",

        "profile"

    ];


    /* =====================================================
       LOAD SECTION FROM HASH
       ===================================================== */

    function loadHashSection() {

        const hash =
            window.location.hash
                .replace("#", "")
                .trim()
                .toLowerCase();


        if (
            validSections.includes(hash)
        ) {

            showSection(hash);

        } else {

            showSection("overview");

        }

    }


    /* =====================================================
       HASH CHANGE
       ===================================================== */

    window.addEventListener(
        "hashchange",
        function () {

            loadHashSection();

        }
    );


    /* =====================================================
       INITIAL DASHBOARD LOAD
       ===================================================== */

    loadHashSection();


    /* =====================================================
       FINAL ICON REFRESH
       ===================================================== */

    refreshIcons();

});
