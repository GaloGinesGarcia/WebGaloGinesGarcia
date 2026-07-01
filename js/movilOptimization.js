
// ================= MOBILE OPTIMIZATION =================

const mobileQuery = window.matchMedia("(max-width: 768px)");

function aplicarOptimizacionMovil(evento) {
    const isMobile = evento.matches;

    document.documentElement.classList.toggle("mobile-lite", isMobile);

    window.ANIMATION_SPEED = isMobile ? 0.7 : 1;
    window.BIO_STAGGER = isMobile ? 0.005 : 0.02;
    window.BIO_Y = isMobile ? 5 : 10;
    window.BIO_DURATION = isMobile ? 0.5 : 0.7;
    window.BIO_BLUR = isMobile ? 1.25 : 6;
}

aplicarOptimizacionMovil(mobileQuery);
mobileQuery.addEventListener("change", aplicarOptimizacionMovil);

if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.config({
        ignoreMobileResize: true,
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
    });
}

window.addEventListener("load", () => {
    if (!mobileQuery.matches) return;

    setTimeout(() => {
        document.querySelectorAll(".orbit").forEach((orbit) => {
            orbit.style.willChange = "transform";
        });

        if (typeof ScrollTrigger !== "undefined") {
            ScrollTrigger.refresh();
        }
    }, 800);
});

