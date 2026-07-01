// ######## REFERENCIA: ANIMACION Y EFECTO 3D DE TARJETAS TECNOLOGICAS ########
(() => {
    const site = window.Site;

    if (!site || typeof window.gsap === "undefined") {
        return;
    }

    // ######## REFERENCIA: ENTRADA DE TARJETAS AL LLEGAR CON SCROLL ########
    function animateCardsEntry() {
        if (
            site.prefersReducedMotion ||
            typeof window.ScrollTrigger === "undefined"
        ) {
            return;
        }

        window.gsap.utils.toArray(".cards-grid").forEach((grid) => {
            const cards = grid.querySelectorAll(".card");

            if (!cards.length) {
                return;
            }

            window.gsap.from(cards, {
                autoAlpha: 0,
                y: 54,
                scale: 0.97,
                duration: 0.7,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: grid,
                    start: "top 86%",
                    once: true,
                    invalidateOnRefresh: true
                }
            });
        });
    }

    // ######## REFERENCIA: INCLINACION 3D DE UNA TARJETA ########
    function addCardTilt(card) {
        let animationFrame = null;
        let pointerX = 0;
        let pointerY = 0;

        const rotateX = window.gsap.quickTo(card, "rotationX", {
            duration: 0.24,
            ease: "power2.out"
        });

        const rotateY = window.gsap.quickTo(card, "rotationY", {
            duration: 0.24,
            ease: "power2.out"
        });

        const translateY = window.gsap.quickTo(card, "y", {
            duration: 0.24,
            ease: "power2.out"
        });

        // ######## REFERENCIA: CALCULO DE POSICION Y ROTACION ########
        function updateCardTilt() {
            const rect = card.getBoundingClientRect();

            const localX = pointerX - rect.left;
            const localY = pointerY - rect.top;

            const xPercent = (localX / rect.width) * 100;
            const yPercent = (localY / rect.height) * 100;

            card.style.setProperty("--x", `${xPercent}%`);
            card.style.setProperty("--y", `${yPercent}%`);

            rotateX(((localY / rect.height) - 0.5) * -12);
            rotateY(((localX / rect.width) - 0.5) * 12);
            translateY(-6);

            animationFrame = null;
        }

        card.addEventListener("pointermove", (event) => {
            pointerX = event.clientX;
            pointerY = event.clientY;

            if (!animationFrame) {
                animationFrame = window.requestAnimationFrame(updateCardTilt);
            }
        });

        card.addEventListener("pointerleave", () => {
            if (animationFrame) {
                window.cancelAnimationFrame(animationFrame);
                animationFrame = null;
            }

            rotateX(0);
            rotateY(0);
            translateY(0);
        });
    }

    // ######## REFERENCIA: ACTIVACION DEL HOVER SOLO EN ESCRITORIO ########
    function enableCardTilt() {
        if (!site.canHover || site.prefersReducedMotion) {
            return;
        }

        document.querySelectorAll(".cards-grid .card").forEach(addCardTilt);
    }

    // ######## REFERENCIA: INICIO DEL MODULO DE TARJETAS ########
    function startCardsModule() {
        animateCardsEntry();
        enableCardTilt();

        site.refreshScrollTrigger();
    }

    site.onTransitionReady(startCardsModule);
})();