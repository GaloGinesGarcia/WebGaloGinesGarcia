gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {

    // ================= HERO =================
    gsap.set(".hero-title", { opacity: 0, y: 100, scale: 0.95 });
    gsap.set(".hero-subtitle", { opacity: 0, y: 40 });
    gsap.set(".hero-text", { opacity: 0, y: 30 });
    gsap.set(".hero-symbol span", { opacity: 0, rotateX: 90, y: 40 });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.to(".hero-subtitle", { opacity: 1, y: 0, duration: 0.8 })
      .to(".hero-title", { opacity: 1, y: 0, scale: 1, duration: 1 }, "-=0.3")
      .to(".hero-symbol span", { opacity: 1, rotateX: 0, y: 0, stagger: 0.15, duration: 0.8 }, "-=0.6")
      .to(".hero-text", { opacity: 1, y: 0, duration: 0.8 }, "-=0.4");

    // HERO scroll effect
    gsap.to(".hero", {
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.2
        },
        scale: 0.88,
        opacity: 0.25,
        y: -60
    });

    // ================= ABOUT =================
    gsap.from(".about-preview", {
        scrollTrigger: {
            trigger: ".about-preview",
            start: "top 80%"
        },
        opacity: 0,
        y: 80,
        duration: 1
    });

    // ================= STACK =================
    gsap.from(".stack-preview", {
        scrollTrigger: {
            trigger: ".stack-preview",
            start: "top 80%"
        },
        opacity: 0,
        y: 80,
        duration: 1
    });

    // ================= CARDS (ENTRADA 3D MEJORADA) =================

    // IMPORTANTE: estado inicial
    gsap.set(".cards-grid .card", {
        opacity: 0,
        y: 120,
        rotateX: 25,
        scale: 0.9,
        transformOrigin: "center bottom"
    });

    // animación scroll
    gsap.to(".cards-grid .card", {
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
        stagger: {
            each: 0.12,
            from: "start"
        }
    });

    ScrollTrigger.refresh();
});