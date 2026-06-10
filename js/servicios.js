/* SEGUIMIENTO DE TARJETAS TECNOLÓGICAS AL CURSOR */ 
/* EN HERO TAMBIEN HAY COSAS */  
const isMobile = window.matchMedia("(max-width: 780px)").matches;
document.querySelectorAll(".servicio-card").forEach(card => {
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

// 2. ENTRADA SECUENCIAL (UNO DETRÁS DE OTRO)
window.addEventListener("transitionDone", () => {

    const cards = document.querySelectorAll(".servicio-card");

    // estado inicial (por seguridad)
    gsap.set(cards, {
        opacity: 0,
        y: 80,
        rotateX: 15,
        scale: 0.95
    });

    const tl = gsap.timeline({
        defaults: { ease: "power4.out" }
    });

    tl.to(cards[0], {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.6
    })

    .to(cards[1], {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.6
    })

    .to(cards[2], {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.6
    });

});

const modal = document.getElementById("serviceModal");
const modalPanel = document.querySelector(".service-modal__panel");
const modalTitle = document.getElementById("modalTitle");
const modalList = document.getElementById("modalList");

const data = {
    web: {
        title: "Desarrollo Web",
        items: ["Landing page", "Web corporativa", "Tienda online"]
    },
    apps: {
        title: "Aplicaciones",
        items: ["App Android", "App iOS", "App multiplataforma"]
    },
    colaboracion: {
        title: "Colaboración",
        items: ["Soporte técnico", "Mantenimiento", "Consultoría"]
    }
};

// abrir modal
document.querySelectorAll(".btn-ver-opciones").forEach(btn => {

    btn.addEventListener("click", () => {

        const key = btn.dataset.service;
        const service = data[key];

        modalTitle.textContent = service.title;

        modalList.innerHTML = "";
        service.items.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            modalList.appendChild(li);
        });

        modal.classList.add("active");

        gsap.to(modalPanel, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "power3.out"
        });

    });

});

// cerrar modal fuera del panel
document.querySelector(".service-modal__backdrop").addEventListener("click", () => {

    gsap.to(modalPanel, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
            modal.classList.remove("active");
        }
    });

});
// cerrar modal con botón
document.querySelector(".modal-close").addEventListener("click", () => {

    const modal = document.getElementById("serviceModal");
    const panel = document.querySelector(".service-modal__panel");

    gsap.to(panel, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
            modal.classList.remove("active");
        }
    });

});