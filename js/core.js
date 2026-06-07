gsap.registerPlugin(ScrollTrigger);

// LENIS
const lenis = new Lenis({
  duration: 1.2,
  smooth: true,
  smoothTouch: false
});

// RAF loop (ÚNICO)
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Sync GSAP
lenis.on("scroll", ScrollTrigger.update);


gsap.ticker.lagSmoothing(0);

document.querySelectorAll(".cards-grid .card").forEach(card => {

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        card.style.setProperty("--x", `${xPercent}%`);
        card.style.setProperty("--y", `${yPercent}%`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `
            perspective(1200px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-6px)
        `;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = `
            perspective(1200px)
            rotateX(0deg)
            rotateY(0deg)
            translateY(0px)
        `;
    });

});

console.log("Core cargado ✔");