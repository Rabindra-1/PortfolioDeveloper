/* =========================================================
   RABINDRA KUMAR SAH
   PORTFOLIO JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.querySelector(".navbar");

    const menuBtn =
        document.getElementById("menuBtn");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const backTop =
        document.getElementById("backTop");

    const themeToggle =
        document.getElementById("themeToggle");

    const themeIcon =
        themeToggle?.querySelector("i");

    const navLinks =
        document.querySelectorAll(".nav-links a");

    const mobileLinks =
        document.querySelectorAll(".mobile-menu a");

    const sections =
        document.querySelectorAll("section[id]");


    /* =====================================================
       THEME
    ===================================================== */

    function updateThemeIcon() {

        if (!themeIcon) return;

        if (document.body.classList.contains("dark-mode")) {

            themeIcon.classList.remove("fa-moon");

            themeIcon.classList.add("fa-sun");

            themeToggle.setAttribute(
                "title",
                "Switch to light mode"
            );

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

        } else {

            themeIcon.classList.remove("fa-sun");

            themeIcon.classList.add("fa-moon");

            themeToggle.setAttribute(
                "title",
                "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );
        }
    }


    function enableDarkMode() {

        document.body.classList.add("dark-mode");

        localStorage.setItem(
            "portfolio-theme",
            "dark"
        );

        updateThemeIcon();
    }


    function enableLightMode() {

        document.body.classList.remove("dark-mode");

        localStorage.setItem(
            "portfolio-theme",
            "light"
        );

        updateThemeIcon();
    }


    /* Load saved theme */

    const savedTheme =
        localStorage.getItem("portfolio-theme");


    if (savedTheme === "dark") {

        enableDarkMode();

    } else if (savedTheme === "light") {

        enableLightMode();

    } else {

        /* Follow system preference */

        const prefersDark =
            window.matchMedia &&
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;

        if (prefersDark) {
            enableDarkMode();
        } else {
            enableLightMode();
        }
    }


    /* Toggle */

    themeToggle?.addEventListener(
        "click",
        () => {

            if (
                document.body.classList.contains(
                    "dark-mode"
                )
            ) {

                enableLightMode();

            } else {

                enableDarkMode();

            }

        }
    );


    /* =====================================================
       NAVBAR
    ===================================================== */

    function handleNavbar() {

        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }
    }

    window.addEventListener(
        "scroll",
        handleNavbar
    );

    handleNavbar();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function closeMobileMenu() {

        mobileMenu.classList.remove("active");

        document.body.classList.remove(
            "menu-open"
        );

        const icon =
            menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");
    }


    menuBtn?.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle(
                "active"
            );

            document.body.classList.toggle(
                "menu-open"
            );

            const icon =
                menuBtn.querySelector("i");


            if (
                mobileMenu.classList.contains(
                    "active"
                )
            ) {

                icon.classList.remove(
                    "fa-bars"
                );

                icon.classList.add(
                    "fa-xmark"
                );

            } else {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );
            }

        }
    );


    mobileLinks.forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );

            const href =
                link.getAttribute("href");


            if (
                href ===
                `#${currentSection}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNav
    );

    updateActiveNav();


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const navbarHeight =
                        navbar.offsetHeight;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        navbarHeight;


                    window.scrollTo({

                        top: targetPosition,

                        behavior: "smooth"

                    });

                }
            );

        });


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    function handleBackTop() {

        if (window.scrollY > 600) {

            backTop.classList.add(
                "visible"
            );

        } else {

            backTop.classList.remove(
                "visible"
            );

        }
    }

    window.addEventListener(
        "scroll",
        handleBackTop
    );


    backTop?.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-label, " +
            ".about-grid, " +
            ".experience-item, " +
            ".skill-card, " +
            ".project-card, " +
            ".creative-container, " +
            ".contact-content"
        );


    revealElements.forEach(
        element => {

            element.style.opacity = "0";

            element.style.transform =
                "translateY(30px)";

            element.style.transition =
                "opacity 0.7s ease, " +
                "transform 0.7s ease";

        }
    );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.style.opacity =
                                "1";

                            entry.target.style.transform =
                                "translateY(0)";

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
        element => {

            revealObserver.observe(
                element
            );

        }
    );


    /* =====================================================
       PROJECT TILT
    ===================================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    projectCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth < 900
                ) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                const rotateX =
                    -(y / rect.height) * 1.5;


                const rotateY =
                    (x / rect.width) * 1.5;


                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "perspective(1000px) " +
                    "rotateX(0) " +
                    "rotateY(0)";

            }
        );

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElement =
        document.getElementById("year");


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeMobileMenu();

            }

        }
    );

});