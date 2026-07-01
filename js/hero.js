// ######## REFERENCIA: ANIMACIONES EXCLUSIVAS DEL HERO ########
(() => {
    const site = window.Site;

    if (!site || typeof window.gsap === "undefined") {
        return;
    }

    let heroStarted = false;

    // ######## REFERENCIA: ANIMACION DE ENTRADA DEL CONTENIDO HERO ########
    function animateHeroContent() {
        window.gsap.set(".hero-title", {
            autoAlpha: 0,
            y: 70,
            scale: 0.96
        });

        window.gsap.set(".hero-subtitle", {
            autoAlpha: 0,
            y: 28
        });

        window.gsap.set(".hero-text", {
            autoAlpha: 0,
            y: 22
        });

        window.gsap.set(".hero-symbol span", {
            autoAlpha: 0,
            rotateX: 90,
            y: 30
        });

        const timeline = window.gsap.timeline({
            defaults: {
                ease: "power4.out"
            }
        });

        timeline
            .to(".hero-subtitle", {
                autoAlpha: 1,
                y: 0,
                duration: 0.65
            })
            .to(".hero-title", {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.9
            }, "-=0.25")
            .to(".hero-symbol span", {
                autoAlpha: 1,
                rotateX: 0,
                y: 0,
                duration: 0.65,
                stagger: 0.12
            }, "-=0.45")
            .to(".hero-text", {
                autoAlpha: 1,
                y: 0,
                duration: 0.65
            }, "-=0.3");
    }

    // ######## REFERENCIA: ROTACION SUAVE DEL SIMBOLO DE CODIGO ########
    function animateHeroSymbol() {
        if (site.prefersReducedMotion) {
            return;
        }

        window.gsap.to(".hero-symbol span", {
            rotateY: 360,
            rotateX: 360,
            duration: 7,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.15,
            transformOrigin: "center center"
        });
    }

    // ######## REFERENCIA: ROTACION CONTINUA DE LAS ORBITAS ########
    function animateOrbits() {
        if (site.prefersReducedMotion) {
            return;
        }

        const orbitAnimations = [
            [".orbit-1", 360, 18],
            [".orbit-2", -360, 23],
            [".orbit-3", 360, 29],
            [".orbit-4", -360, 35],
            [".orbit-5", 360, 42],
            [".orbit-6", -360, 49],
            [".orbit-7", 360, 57]
        ];

        orbitAnimations.forEach(([selector, rotation, duration]) => {
            if (!document.querySelector(selector)) {
                return;
            }

            window.gsap.to(selector, {
                rotateZ: rotation,
                duration,
                repeat: -1,
                ease: "none"
            });
        });
    }

    


    // ######## REFERENCIA: EFECTO 3D DE ORBITAS CON EL RATON ########
    function addOrbitMouseEffect() {
        const orbitContainer = document.querySelector(".orbit-container");

        if (!orbitContainer || !site.canHover || site.prefersReducedMotion) {
            return;
        }

        orbitContainer.addEventListener("pointermove", (event) => {
            const rect = orbitContainer.getBoundingClientRect();

            const pointerX = event.clientX - rect.left;
            const pointerY = event.clientY - rect.top;

            const rotateY = ((pointerX / rect.width) - 0.5) * 18;
            const rotateX = ((pointerY / rect.height) - 0.5) * -18;

            window.gsap.to(orbitContainer, {
                rotateX,
                rotateY,
                duration: 0.45,
                ease: "power2.out",
                overwrite: "auto"
            });
        });

        orbitContainer.addEventListener("pointerleave", () => {
            window.gsap.to(orbitContainer, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.7,
                ease: "power3.out",
                overwrite: "auto"
            });
        });
    }

    // ######## REFERENCIA: SALIDA DEL HERO DURANTE EL SCROLL ########
    

    // ######## REFERENCIA: INICIO CONTROLADO DEL HERO UNA SOLA VEZ ########
    function startHero() {
        if (heroStarted || !document.querySelector(".hero")) {
            return;
        }

        heroStarted = true;

        animateHeroContent();
        animateHeroSymbol();
        animateOrbits();
        addHeroScrollEffect();

        site.refreshScrollTrigger();
    }

    site.onTransitionReady(startHero);
})();