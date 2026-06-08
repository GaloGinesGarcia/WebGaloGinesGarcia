gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {

    const isMobile = document.documentElement.classList.contains("mobile-lite");

    // ================= TITLE =================
    gsap.from(".bio-title", {
        opacity: 0,
        y: 40,
        duration: 5,
        ease: "power3.out"
    });

    // ================= SPLIT TEXT =================
    const paragraphs = gsap.utils.toArray(".bio-text");

    paragraphs.forEach((p) => {

        const text = p.innerText;
        p.innerHTML = "";

        text.split("").forEach((char) => {

            const span = document.createElement("span");

            span.innerHTML = char === " " ? "&nbsp;" : char;

            span.style.opacity = "0";
            span.style.display = "inline-block";

            // 🔥 TODO viene del sistema global
            span.style.filter = `blur(${window.BIO_BLUR}px)`;
            span.style.transform = `translateY(${window.BIO_Y}px)`;

            p.appendChild(span);
        });
    });

    // ================= ANIMACIÓN =================
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

            filter: "blur(0px)",
            scale: 1,
            y: 0,

            duration: window.BIO_DURATION,
            ease: "power2.out",
            stagger: window.BIO_STAGGER

        });

        // pausa entre párrafos
        tl.to({}, {
            duration: isMobile ? 0.4 : 0.4
        });

    });

});