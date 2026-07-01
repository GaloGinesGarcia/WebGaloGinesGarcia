// ######## REFERENCIA: ANIMACIONES DE BLOQUES PREVIEW EN LA HOME ########
(() => {
    const site = window.Site;

    if (
        !site ||
        typeof window.gsap === "undefined" ||
        typeof window.ScrollTrigger === "undefined"
    ) {
        return;
    }

    // ######## REFERENCIA: ANIMACION DE ENTRADA PARA UN PANEL CONCRETO ########
    function createSectionAnimation(selector) {
        const section = document.querySelector(selector);

        if (!section || site.prefersReducedMotion) {
            return;
        }

        window.gsap.fromTo(
            section,
            {
                autoAlpha: 0,
                y: 46,
                scale: 0.985
            },
            {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.85,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 84%",
                    once: true,
                    invalidateOnRefresh: true
                }
            }
        );
    }

    // ######## REFERENCIA: INICIALIZACION DE TODAS LAS PREVIEWS DE HOME ########
    function startSectionAnimations() {
        [
            ".about-preview",
            ".stack-preview",
            ".services-preview",
            ".contact-preview"
        ].forEach(createSectionAnimation);

        site.refreshScrollTrigger();
    }

    site.onTransitionReady(startSectionAnimations);
})();