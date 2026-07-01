// ######## REFERENCIA: TRANSICION GLOBAL ENTRE PAGINAS ########
document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("transition-overlay");
    const mobileDropdown = document.querySelector(".mobile-dropdown");

    const currentUrl = new URL(window.location.href);
    const cameFromInternalNavigation = currentUrl.searchParams.get("_tr") === "1";

    const initialDuration = cameFromInternalNavigation ? 220 : 1100;
    const exitDuration = 520;

    let isLeaving = false;

    // ######## REFERENCIA: LIMPIEZA DEL PARAMETRO INTERNO DE TRANSICION ########
    function removeTransitionParameter() {
        if (!cameFromInternalNavigation) {
            return;
        }

        currentUrl.searchParams.delete("_tr");
        window.history.replaceState({}, "", currentUrl.toString());
    }

    // ######## REFERENCIA: AVISO A LOS MODULOS CUANDO EL LOADER TERMINA ########
    function notifyTransitionReady() {
        document.documentElement.dataset.transitionReady = "true";
        window.dispatchEvent(new CustomEvent("transitionDone"));
    }

    // ######## REFERENCIA: OCULTACION DEL LOADER DE ENTRADA ########
    function hideOverlay() {
        if (!overlay) {
            notifyTransitionReady();
            return;
        }

        overlay.classList.add("hidden");

        window.setTimeout(notifyTransitionReady, 40);
    }

    // ######## REFERENCIA: CREACION VISUAL DEL LOADER ########
    function setupOverlay() {
        if (!overlay) {
            return;
        }

        overlay.innerHTML = `
            <div class="loader-stage" aria-label="Cargando contenido">
                <div class="loader-spinner" aria-hidden="true"></div>
                <div class="loader-title">Galo Ginés García</div>
            </div>
        `;

        overlay.classList.toggle("quick", cameFromInternalNavigation);

        window.setTimeout(hideOverlay, initialDuration);
    }

    // ######## REFERENCIA: CIERRE ANIMADO DEL MENU MOVIL ########
    function setupMobileMenu() {
        if (!(mobileDropdown instanceof HTMLElement)) {
            return;
        }

        const summary = mobileDropdown.querySelector("summary");
        let closeTimer = null;

        // ######## REFERENCIA: CIERRE CONTROLADO DEL PANEL LATERAL ########
        function closeMobileMenu() {
            if (!mobileDropdown.open || mobileDropdown.classList.contains("closing")) {
                return;
            }

            mobileDropdown.classList.add("closing");
            document.body.classList.remove("mobile-menu-open");

            summary?.setAttribute("aria-expanded", "false");

            window.clearTimeout(closeTimer);

            closeTimer = window.setTimeout(() => {
                mobileDropdown.open = false;
                mobileDropdown.classList.remove("closing");
            }, 280);
        }

        // ######## REFERENCIA: SINCRONIZACION DE ESTADO ACCESIBLE DEL MENU ########
        function syncMobileMenuState() {
            const isOpen = mobileDropdown.open;

            document.body.classList.toggle("mobile-menu-open", isOpen);
            summary?.setAttribute("aria-expanded", String(isOpen));
        }

        summary?.setAttribute("aria-expanded", "false");

        mobileDropdown.addEventListener("toggle", syncMobileMenuState);

        summary?.addEventListener("click", (event) => {
            if (!mobileDropdown.open) {
                return;
            }

            event.preventDefault();
            closeMobileMenu();
        });

        mobileDropdown.addEventListener("click", (event) => {
            const target = event.target;

            if (!(target instanceof Element)) {
                return;
            }

            if (
                target.closest(".mobile-dropdown__backdrop") ||
                target.closest(".mobile-dropdown__panel a")
            ) {
                closeMobileMenu();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && mobileDropdown.open) {
                closeMobileMenu();
            }
        });
    }

    // ######## REFERENCIA: VALIDACION DE ENLACES QUE PUEDEN USAR TRANSICION ########
    function canAnimateLink(link, event) {
        const href = link.getAttribute("href");

        if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:") ||
            link.target === "_blank" ||
            link.hasAttribute("download") ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return false;
        }

        const nextUrl = new URL(href, window.location.href);

        return nextUrl.origin === window.location.origin;
    }

    // ######## REFERENCIA: SALIDA CON OVERLAY AL PULSAR ENLACES INTERNOS ########
    function handleNavigation(event) {
        const target = event.target;

        if (!(target instanceof Element)) {
            return;
        }

        const link = target.closest("a[href]");

        if (!link || !canAnimateLink(link, event)) {
            return;
        }

        if (isLeaving) {
            event.preventDefault();
            return;
        }

        const nextUrl = new URL(link.href, window.location.href);

        event.preventDefault();

        isLeaving = true;
        nextUrl.searchParams.set("_tr", "1");

        if (overlay) {
            overlay.classList.add("quick");
            overlay.classList.remove("hidden");
        }

        window.setTimeout(() => {
            window.location.href = nextUrl.href;
        }, exitDuration);
    }

    removeTransitionParameter();
    setupOverlay();
    setupMobileMenu();

    document.addEventListener("click", handleNavigation);
});

// ######## REFERENCIA: RESTAURACION CORRECTA AL VOLVER CON EL NAVEGADOR ########
window.addEventListener("pageshow", (event) => {
    if (!event.persisted) {
        return;
    }

    const overlay = document.getElementById("transition-overlay");

    if (overlay) {
        overlay.classList.add("hidden");
    }

    document.documentElement.dataset.transitionReady = "true";
    window.dispatchEvent(new CustomEvent("transitionDone"));
});