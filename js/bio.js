gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {

    // ================= TITLE (fade normal) =================
    gsap.from(".bio-title", {
        opacity: 0,
        y: 40,
        duration: 7,
        ease: "power3.out"
    });

    // ================= SPLIT TEXT A LETRAS =================
    const paragraphs = gsap.utils.toArray(".bio-text");

    paragraphs.forEach((p) => {

        const text = p.innerText;
        p.innerHTML = "";

        // crear spans por letra
        text.split("").forEach((char) => {
            const span = document.createElement("span");

            // mantener espacios visibles
            span.innerHTML = char === " " ? "&nbsp;" : char;

            span.style.opacity = 0;
            span.style.display = "inline-block";
            span.style.filter = "blur(6px)";
            span.style.transform = "translateY(10px) scale(0.9)";

            p.appendChild(span);
        });
    });

    // ================= ANIMACIÓN SECUENCIAL =================
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".bio-text",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });

    gsap.utils.toArray(".bio-text").forEach((p) => {

        const chars = p.querySelectorAll("span");

        tl.to(chars, {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
            stagger: 0.005
        });

        // pequeño “pause” entre párrafos
        tl.to({}, { duration: 0.4 });

    });

});