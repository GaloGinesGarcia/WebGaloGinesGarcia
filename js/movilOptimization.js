// ================= MOBILE OPTIMIZATION =================

const isMobile = window.matchMedia("(max-width: 768px)").matches;

// ================= GSAP / SCROLLTRIGGER =================
if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.config({
        ignoreMobileResize: true,
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
    });
}

// ================= GLOBAL SPEED =================
window.ANIMATION_SPEED = isMobile ? 0.7 : 1;

// ================= OPTIMIZACION CLASE BIO =================

window.BIO_STAGGER = isMobile ? 0.005 : 0.02;
window.BIO_Y = isMobile ? 5 : 20;
window.BIO_DURATION = isMobile ? 0.2 : 0.5;

// ================= MOBILE CLASS =================
if (isMobile) {
    document.documentElement.classList.add("mobile-lite");
}

// ================= DELAY HEAVY ANIMATIONS =================
window.addEventListener("load", () => {

    if (!isMobile) return;

    // 1. Retrasar orbits para evitar lag inicial
    setTimeout(() => {

        document.querySelectorAll(".orbit").forEach((el) => {
            el.style.willChange = "transform";
        });

        // activar scroll triggers después de render estable
        ScrollTrigger.refresh();

    }, 800);

});

// ================= REDUCE SCROLL WORK =================
if (isMobile) {

    let ticking = false;

    window.addEventListener("scroll", () => {

        if (!ticking) {
            requestAnimationFrame(() => {
                ticking = false;
            });
            ticking = true;
        }

    }, { passive: true });
}

// ================= LIGHT MODE (GPU OPTIMIZATION) =================
if (isMobile) {

    const style = document.createElement("style");

    style.innerHTML = `
        .tech-orbit {
            opacity: 0.75 !important;
            transform: translate(-50%, -50%) scale(0.95);
        }

        .orbit {
            box-shadow: none !important;
            filter: none !important;
        }

        .hero-text,
        .hero-symbol span {
            text-shadow: none !important;
        }

        .core {
            box-shadow: 0 0 25px rgba(255,255,255,0.25) !important;
        }
    `;

    document.head.appendChild(style);
}