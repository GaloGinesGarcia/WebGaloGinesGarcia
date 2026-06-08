gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {

    const isMobile = document.documentElement.classList.contains("mobile-lite");

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

        text.split("").forEach((char) => {

            const span = document.createElement("span");

            // mantener espacios visibles
            span.innerHTML = char === " " ? "&nbsp;" : char;

            span.style.opacity = "0";
            span.style.display = "inline-block";

            // SOLO PC -> blur + scale
            if (!isMobile) {
                span.style.filter = "blur(6px)";
                span.style.transform = "translateY(10px) scale(0.9)";
            } else {
                span.style.transform = "translateY(5px)";
            }

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

    paragraphs.forEach((p) => {

        const chars = p.querySelectorAll("span");

        tl.to(chars, {

            opacity: 1,

            // En móvil evitamos blur y scale
            ...(isMobile ? {} : {
                filter: "blur(0px)",
                scale: 1
            }),

            y: 0,

            duration: isMobile ? 0.7 : 1.5,
            ease: "power2.out",

            stagger: isMobile ? 0.0015 : 0.005

        });

        // pausa entre párrafos
        tl.to({}, {
            duration: isMobile ? 0.1 : 0.4
        });

    });

});