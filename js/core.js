// ######## REFERENCIA: ESPACIO GLOBAL DE CONFIGURACION ########
window.Site = window.Site || {};

(() => {
    const site = window.Site;
    const desktopPointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 680px)");

    let lenis = null;
    let lenisFrameId = null;

    // ######## REFERENCIA: LECTURA DE PREFERENCIAS DEL DISPOSITIVO ########
    function updatePreferences() {
        site.canHover = desktopPointerQuery.matches;
        site.prefersReducedMotion = reducedMotionQuery.matches;
        site.isMobile = mobileQuery.matches;

        document.documentElement.classList.toggle("mobile-lite", site.isMobile);
    }

    // ######## REFERENCIA: REGISTRO UNICO DE GSAP Y SCROLLTRIGGER ########
    function configureGsap() {
        if (typeof window.gsap === "undefined") {
            return;
        }

        if (typeof window.ScrollTrigger !== "undefined") {
            window.gsap.registerPlugin(window.ScrollTrigger);

            window.ScrollTrigger.config({
                ignoreMobileResize: true,
                autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
            });
        }

        window.gsap.ticker.lagSmoothing(0);
    }

    // ######## REFERENCIA: BUCLE DE ANIMACION PARA LENIS ########
    function runLenisFrame(time) {
        if (!lenis) {
            return;
        }

        lenis.raf(time);
        lenisFrameId = window.requestAnimationFrame(runLenisFrame);
    }

    // ######## REFERENCIA: INICIO DE SMOOTH SCROLL SOLO EN ESCRITORIO ########
    function startLenis() {
        if (
            lenis ||
            !site.canHover ||
            site.prefersReducedMotion ||
            typeof window.Lenis === "undefined"
        ) {
            return;
        }

        lenis = new window.Lenis({
            autoRaf: false,
            lerp: 0.09,
            wheelMultiplier: 0.9
        });

        lenis.on("scroll", () => {
            if (typeof window.ScrollTrigger !== "undefined") {
                window.ScrollTrigger.update();
            }
        });

        lenisFrameId = window.requestAnimationFrame(runLenisFrame);
    }

    // ######## REFERENCIA: PARADA DE SMOOTH SCROLL EN MOVIL O MOVIMIENTO REDUCIDO ########
    function stopLenis() {
        if (!lenis) {
            return;
        }

        if (lenisFrameId) {
            window.cancelAnimationFrame(lenisFrameId);
            lenisFrameId = null;
        }

        lenis.destroy();
        lenis = null;
    }

    // ######## REFERENCIA: ACTUALIZACION DE LENIS SEGUN EL DISPOSITIVO ########
    function updateLenis() {
        if (site.canHover && !site.prefersReducedMotion) {
            startLenis();
            return;
        }

        stopLenis();
    }

    // ######## REFERENCIA: EJECUCION SEGURA DESPUES DEL LOADER ########
    function onTransitionReady(callback) {
        let executed = false;

        function runCallback() {
            if (executed) {
                return;
            }

            executed = true;
            callback();
        }

        if (document.documentElement.dataset.transitionReady === "true") {
            runCallback();
            return;
        }

        window.addEventListener("transitionDone", runCallback, { once: true });
    }

    // ######## REFERENCIA: UTILIDADES COMPARTIDAS PARA OTROS ARCHIVOS ########
    site.onTransitionReady = onTransitionReady;

    site.refreshScrollTrigger = () => {
        if (typeof window.ScrollTrigger !== "undefined") {
            window.ScrollTrigger.refresh();
        }
    };

    // ######## REFERENCIA: ARRANQUE DEL NUCLEO ########
    updatePreferences();
    configureGsap();
    updateLenis();

    desktopPointerQuery.addEventListener("change", () => {
        updatePreferences();
        updateLenis();
    });

    reducedMotionQuery.addEventListener("change", () => {
        updatePreferences();
        updateLenis();
    });

    mobileQuery.addEventListener("change", updatePreferences);
})();