// ######## REFERENCIA: ENTRADA UNICA Y PRONUNCIADA DE BLOQUES HOME ########
(() => {
    const site = window.Site;

    let initialized = false;

    if (
        !site ||
        typeof window.gsap === "undefined" ||
        typeof window.ScrollTrigger === "undefined"
    ) {
        return;
    }

    // ######## REFERENCIA: ANIMACION DE UN SOLO BLOQUE ########
    function createSectionAnimation(section, index) {
        const direction = index % 2 === 0 ? -1 : 1;
        const horizontalDistance = site.isMobile ? 180 : 380;

        let hasPlayed = false;
        let trigger;

        if (!section || site.prefersReducedMotion) {
            return;
        }

        window.gsap.set(section, {
            autoAlpha: 0,
            x: horizontalDistance * direction,
            y: 18
        });

        trigger = window.ScrollTrigger.create({
            trigger: section,
            start: "top 86%",

            onEnter: function () {
                if (hasPlayed) {
                    return;
                }

                hasPlayed = true;

                window.gsap.to(section, {
                    autoAlpha: 1,
                    x: 0,
                    y: 0,
                    duration: 1.05,
                    ease: "power4.out",

                    onComplete: function () {
                        window.gsap.set(section, {
                            clearProps: "transform"
                        });

                        trigger.kill();
                    }
                });
            }
        });
    }

    // ######## REFERENCIA: INICIALIZACION DE BLOQUES ########
    function startSectionAnimations() {
        const sections = document.querySelectorAll("main > .panel");

        if (initialized) {
            return;
        }

        initialized = true;

        sections.forEach((section, index) => {
            createSectionAnimation(section, index);
        });

        site.refreshScrollTrigger();
    }

    site.onTransitionReady(startSectionAnimations);
})();