gsap.registerPlugin();

gsap.to(".servicio-card", {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            filter: "blur(0px)",

            duration: 1.1,
            ease: "power4.out",
            stagger: 0.22,
            delay: 0.25,

            // 👇 AQUÍ VA EL GLOW FINAL
            boxShadow: "0 20px 40px rgba(0,0,0,.35), 0 0 25px rgba(255,255,255,.08)",

            // 👇 ESTO TAMBIÉN VA AQUÍ
            onStart: () => {
                document.querySelectorAll(".servicio-card").forEach(card => {
                    card.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
                });
            }
});
const cards = document.querySelectorAll(".servicio-card");

cards.forEach(card => {

    let isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) return; //!importante: desactiva 3D en móvil

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.2) * 20;
        const rotateX = ((y / rect.height) - 0.2) * -20;

        gsap.to(card, {
            rotateX,
            rotateY,
            scale: 1.03,
            duration: 0.1,
            ease: "power2.out",
            transformPerspective: 800,
            transformOrigin: "center"
        });

        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        card.style.setProperty("--x", `${xPercent}%`);
        card.style.setProperty("--y", `${yPercent}%`);
    });

    card.addEventListener("mouseleave", () => {

        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out"
        });

    });

});