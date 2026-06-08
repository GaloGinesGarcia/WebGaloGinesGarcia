// ================= FICHERO DE ANIMACIONES GENERAL =================
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {

    // HERO
    gsap.set(".hero-title", { opacity: 0, y: 100, scale: 0.95 });
    gsap.set(".hero-subtitle", { opacity: 0, y: 40 });
    gsap.set(".hero-text", { opacity: 0, y: 30 });
    gsap.set(".hero-symbol span", { opacity: 0, rotateX: 90, y: 40 });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.to(".hero-subtitle", { opacity: 1, y: 0, duration: 0.8 })
      .to(".hero-title", { opacity: 1, y: 0, scale: 1, duration: 1 }, "-=0.3")
      .to(".hero-symbol span", { opacity: 1, rotateX: 0, y: 0, stagger: 0.15 })
      .to(".hero-text", { opacity: 1, y: 0, duration: 0.8 });

      // ================= ICONO 3D ROTATION =================

    gsap.to(".hero-symbol span", {
    rotateY: 360,
    rotateX: 360,
    duration: 7,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    transformPerspective: 0,
    transformOrigin: "center center",
    stagger: 0.15
});

    // ================= ORBITA DE PUNTOS MAIN =================
    gsap.to(".tech-orbit", {
    y: () => window.innerHeight * 0.001, 
    ease: "none",
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2
    }
});
    gsap.to(".orbit-1", {
        rotateZ: 360,
        duration: 14,
        repeat: -1,
        ease: "none"
    });

    gsap.to(".orbit-2", {
        rotateZ: -360,
        duration: 18,
        repeat: -1,
        ease: "none"
    });

    gsap.to(".orbit-3", {
        rotateZ: 360,
        duration: 22,
        repeat: -1,
        ease: "none"
    });
    gsap.to(".orbit-4", {
    rotateZ: -360,
    duration: 25,
    repeat: -1,
    ease: "none"
    });

    gsap.to(".orbit-5", {
        rotateZ: 360,
        duration: 28,
        repeat: -1,
        ease: "none"
    });

    gsap.to(".orbit-6", {
        rotateZ: -360,
        duration: 32,
        repeat: -1,
        ease: "none"
    });

    gsap.to(".orbit-7", {
        rotateZ: 360,
        duration: 38,
        repeat: -1,
        ease: "none"
    });

    const orbit = document.querySelector(".orbit-container");

if(orbit){

    orbit.addEventListener("mousemove",(e)=>{

        const rect = orbit.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 25;
        const rotateX = ((y / rect.height) - 0.5) * -25;

        gsap.to(orbit,{
            rotateY,
            rotateX,
            duration:0.5
        });
    });

    orbit.addEventListener("mouseleave",()=>{

        gsap.to(orbit,{
            rotateX:0,
            rotateY:0,
            duration:1
        });

    });

}

// ================= MAIN TEXT INDEX (SYMMETRIC BEHAVIOR) =================

function createSectionAnimation(selector) {

    const el = document.querySelector(selector);
    if (!el) return;

    // Estado inicial
    gsap.set(el, {
        opacity: 0,
        y: 80,
        scale: 0.95
    });

    gsap.fromTo(el,
        {
            opacity: 0,
            y: 80,
            scale: 0.95
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 3,
            ease: "power4.out",

            scrollTrigger: {
                trigger: el,
                start: "top 80%",

                // 🔥 comportamiento real ida/vuelta
                toggleActions: "play reverse play reverse",

                // opcional pero recomendado para consistencia
                invalidateOnRefresh: true
            }
        }
    );
}

// aplicar a todas las secciones
createSectionAnimation(".about-preview");
createSectionAnimation(".stack-preview");
createSectionAnimation(".services-preview");
createSectionAnimation(".contact-preview");

    // ================= CARDS ENTRY (IMPORTANTE) =================

    gsap.set(".cards-grid .card-inner", {
        opacity: 0,
        y: 120,
        rotateX: 25,
        scale: 0.9,
        transformOrigin: "center bottom"
    });

    gsap.to(".cards-grid .card-inner", {
        scrollTrigger: {
            trigger: ".cards-grid",
            start: "top 85%",
            toggleActions: "play none none none",
            once: true
        },
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.12
    });

    ScrollTrigger.refresh();
});