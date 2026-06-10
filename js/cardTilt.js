/* SEGUIMIENTO DE TARJETAS TECNOLÓGICAS AL CURSOR */ 
/* EN HERO TAMBIEN HAY COSAS */ 
const isMobile = window.matchMedia("(max-width: 480px)").matches; // Si es movil desactiva la función de mover tarjetas
document.querySelectorAll(".cards-grid .card-inner").forEach(card => {
    if (isMobile) return;
    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 12;
        const rotateX = -((y - centerY) / centerY) * 12;

        card.style.transform =
            `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform =
            "perspective(1200px) rotateX(0deg) rotateY(0deg)";
    });

});