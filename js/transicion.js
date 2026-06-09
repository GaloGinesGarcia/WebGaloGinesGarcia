gsap.registerPlugin();

document.addEventListener("DOMContentLoaded", () => {

    const overlay = document.getElementById("transition-overlay");
    let isLeaving = false;

    const url = new URL(window.location.href);
    const cameFromInternalNav = url.searchParams.get("_tr") === "1";

    if (cameFromInternalNav) {
        url.searchParams.delete("_tr");
        window.history.replaceState({}, "", url.toString());
    }

    if (!overlay) return;

    overlay.innerHTML = `
        <div class="loader-stage">
            <div class="loader-spinner"></div>
            <div class="loader-title">Galo Ginés García</div>
        </div>
    `;

    overlay.classList.toggle("quick", cameFromInternalNav);

    // ================= ENTRADA OVERLAY =================
    gsap.set(overlay, {
        opacity: 1,
        visibility: "visible"
    });

    let heroTriggered = false;

    gsap.to(overlay, {
        opacity: 0,
        duration: cameFromInternalNav ? 1.3 : 1.5,
        ease: "power2.out",
        delay: cameFromInternalNav ? 1 : 1.2,

        onUpdate: function () {

            const progress = this.progress();

            // dispara 1.3s antes del final de la transicion
            const triggerPoint = 1 - (1.3 / this.duration());

            if (!heroTriggered && progress >= triggerPoint) {
                heroTriggered = true;
                window.dispatchEvent(new Event("transitionDone"));
            }
        },

        onComplete: () => {
            overlay.classList.add("hidden");
        }
    });

    // ================= MOBILE DROPDOWN (NO TOCADO) =================
    const mobileDropdown = document.querySelector(".mobile-dropdown");
    if (mobileDropdown instanceof HTMLElement) {
        const summary = mobileDropdown.querySelector("summary");
        const mobileMenuCloseTime = 280;
        let closeMenuTimer;

        const closeMobileMenu = () => {
            if (!mobileDropdown.hasAttribute("open") || mobileDropdown.classList.contains("closing")) {
                return;
            }

            mobileDropdown.classList.add("closing");
            document.body.classList.remove("mobile-menu-open");

            if (summary) {
                summary.setAttribute("aria-expanded", "false");
            }

            window.clearTimeout(closeMenuTimer);
            closeMenuTimer = window.setTimeout(() => {
                mobileDropdown.removeAttribute("open");
                mobileDropdown.classList.remove("closing");
            }, mobileMenuCloseTime);
        };

        const syncMobileMenuState = () => {
            const isOpen = mobileDropdown.hasAttribute("open");
            document.body.classList.toggle("mobile-menu-open", isOpen);

            if (summary) {
                summary.setAttribute("aria-expanded", String(isOpen));
            }
        };

        syncMobileMenuState();
        mobileDropdown.addEventListener("toggle", syncMobileMenuState);

        if (summary) {
            summary.addEventListener("click", (event) => {
                if (!mobileDropdown.hasAttribute("open")) return;

                event.preventDefault();
                closeMobileMenu();
            });
        }

        mobileDropdown.addEventListener("click", (event) => {
            const targetElement = event.target;
            if (!(targetElement instanceof Element)) return;

            if (targetElement.closest(".mobile-dropdown__backdrop")) {
                closeMobileMenu();
                return;
            }

            if (targetElement.closest(".mobile-dropdown__panel a")) {
                closeMobileMenu();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && mobileDropdown.hasAttribute("open")) {
                closeMobileMenu();
            }
        });

        document.addEventListener("click", (event) => {
            if (!mobileDropdown.hasAttribute("open")) return;

            const targetElement = event.target;
            if (!(targetElement instanceof Element)) return;

            if (!targetElement.closest(".mobile-dropdown")) {
                closeMobileMenu();
            }
        });
    }

    // ================= NAVEGACIÓN (MEJORADO CON GSAP) =================
    const handleNavigation = (event) => {

        const targetElement = event.target;
        if (!(targetElement instanceof Element)) return;

        const link = targetElement.closest("a[href]");
        if (!link) return;

        if (isLeaving) {
            event.preventDefault();
            return;
        }

        const href = link.getAttribute("href");
        const target = link.getAttribute("target");
        const hasDownload = link.hasAttribute("download");

        if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
        if (target === "_blank" || hasDownload) return;

        const nextUrl = new URL(href, window.location.href);
        if (nextUrl.origin !== window.location.origin) return;

        event.preventDefault();
        isLeaving = true;

        nextUrl.searchParams.set("_tr", "1");

        overlay.classList.remove("hidden");
        overlay.classList.add("quick");

        // ================= EXIT ANIMATION =================
        gsap.to(overlay, {
            opacity: 1,
            visibility: "visible",
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
                window.location.href = nextUrl.href;
            }
        });
    };

    document.addEventListener("click", handleNavigation);
    document.addEventListener("touchend", handleNavigation, { passive: false });
});

window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;

    const overlay = document.getElementById("transition-overlay");
    if (overlay) {
        overlay.classList.add("hidden");
    }
});