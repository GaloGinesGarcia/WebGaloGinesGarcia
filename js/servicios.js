// ######## REFERENCIA: DATOS DE LOS SERVICIOS ########
(function () {
    "use strict";

    var modal = document.getElementById("serviceModal");
    var modalPanel = document.querySelector(".service-modal__panel");
    var modalTitle = document.getElementById("modalTitle");
    var modalEyebrow = document.getElementById("modalEyebrow");
    var modalDescription = document.getElementById("modalDescription");
    var modalList = document.getElementById("modalList");
    var modalAction = document.getElementById("modalAction");

    var lastTrigger = null;

    var services = {
        web: {
            eyebrow: "Desarrollo web",
            title: "Tu web, bien construida",
            description: "Diseño y desarrollo una presencia digital moderna, rápida y adaptada a tu objetivo.",
            actionText: "Solicitar proyecto web",
            options: [
                "Landing page orientada a conversión",
                "Web corporativa profesional",
                "Portfolio personal o creativo",
                "Tienda online y catálogo digital"
            ]
        },

        apps: {
            eyebrow: "Aplicaciones",
            title: "Aplicaciones para ideas reales",
            description: "Desarrollo aplicaciones pensadas para simplificar procesos y ofrecer una experiencia útil.",
            actionText: "Solicitar aplicación",
            options: [
                "Aplicación Android",
                "Aplicación iOS",
                "App multiplataforma con Flutter",
                "Aplicación de gestión a medida"
            ]
        },

        colaboracion: {
            eyebrow: "Colaboración",
            title: "Apoyo técnico para tu proyecto",
            description: "Te ayudo a mantener, mejorar o definir una solución digital desde el punto donde estés.",
            actionText: "Hablar sobre colaboración",
            options: [
                "Soporte técnico puntual",
                "Mantenimiento y mejoras",
                "Revisión de código y rendimiento",
                "Consultoría y planificación técnica"
            ]
        }
    };

    // ######## REFERENCIA: COMPROBACION DE ELEMENTOS NECESARIOS ########
    if (
        !modal ||
        !modalPanel ||
        !modalTitle ||
        !modalEyebrow ||
        !modalDescription ||
        !modalList ||
        !modalAction
    ) {
        console.error("Faltan elementos HTML del modal de servicios.");
        return;
    }

    // ######## REFERENCIA: RELLENAR CONTENIDO SEGUN EL SERVICIO ########
    function renderService(service) {
        var index;
        var item;

        modalEyebrow.textContent = service.eyebrow;
        modalTitle.textContent = service.title;
        modalDescription.textContent = service.description;

        modalAction.innerHTML = service.actionText + ' <span aria-hidden="true">→</span>';

        modalList.innerHTML = "";

        for (index = 0; index < service.options.length; index += 1) {
            item = document.createElement("li");
            item.textContent = service.options[index];
            modalList.appendChild(item);
        }
    }

    // ######## REFERENCIA: ABRIR MODAL ########
    function openModal(serviceKey, trigger) {
        var service = services[serviceKey];

        if (!service) {
            return;
        }

        lastTrigger = trigger;

        renderService(service);

        modal.hidden = false;
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("service-modal-open");

        if (typeof window.gsap !== "undefined") {
            window.gsap.fromTo(
                modalPanel,
                {
                    opacity: 0,
                    y: 26,
                    scale: 0.96
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.42,
                    ease: "power3.out"
                }
            );

            window.gsap.fromTo(
                ".service-modal__list li",
                {
                    opacity: 0,
                    x: -12
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.3,
                    stagger: 0.06,
                    delay: 0.12,
                    ease: "power2.out"
                }
            );
        }

        window.setTimeout(function () {
            modalPanel.focus();
        }, 80);
    }

    // ######## REFERENCIA: CERRAR MODAL ########
    function finishClose() {
        modal.hidden = true;
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("service-modal-open");

        if (lastTrigger) {
            lastTrigger.focus();
        }
    }

    function closeModal() {
        if (modal.hidden) {
            return;
        }

        if (typeof window.gsap === "undefined") {
            finishClose();
            return;
        }

        window.gsap.to(modalPanel, {
            opacity: 0,
            y: 18,
            scale: 0.97,
            duration: 0.24,
            ease: "power2.in",
            onComplete: finishClose
        });
    }

    // ######## REFERENCIA: BOTONES QUE ABREN MODAL ########
    function configureOpenButtons() {
        var buttons = document.querySelectorAll(".btn-ver-opciones");
        var index;

        for (index = 0; index < buttons.length; index += 1) {
            buttons[index].addEventListener("click", function () {
                openModal(
                    this.getAttribute("data-service"),
                    this
                );
            });
        }
    }

    // ######## REFERENCIA: CIERRE POR FONDO O BOTON X ########
    modal.addEventListener("click", function (event) {
        var target = event.target;

        if (
            target.hasAttribute("data-modal-close") ||
            target.classList.contains("service-modal__backdrop")
        ) {
            closeModal();
        }
    });

    // ######## REFERENCIA: CIERRE CON TECLA ESCAPE ########
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    // ######## REFERENCIA: ANIMACION INICIAL DE TARJETAS ########
    // ######## REFERENCIA: ENTRADA DIRECCIONAL DE TARJETAS DE SERVICIOS ########
function animateServiceCards() {
    var cards = document.querySelectorAll(".servicio-card");
    var webCard;
    var appsCard;
    var collaborationCard;
    var timeline;

    if (!cards.length || typeof window.gsap === "undefined") {
        return;
    }

    webCard = cards[0];
    appsCard = cards[1];
    collaborationCard = cards[2];

    if (!webCard || !appsCard || !collaborationCard) {
        return;
    }

    window.gsap.set(webCard, {
        autoAlpha: 0,
        x: -130,
        rotateY: -10
    });

    window.gsap.set(collaborationCard, {
        autoAlpha: 0,
        x: 130,
        rotateY: 10
    });

    window.gsap.set(appsCard, {
        autoAlpha: 0,
        y: 100,
        scale: 0.96
    });

    timeline = window.gsap.timeline({
        defaults: {
            duration: 0.78,
            ease: "power3.out"
        }
    });

    /* Desarrollo web: entra desde la izquierda */
    timeline.to(webCard, {
        autoAlpha: 1,
        x: 0,
        rotateY: 0
    });

    /* Colaboración: entra desde la derecha */
    timeline.to(collaborationCard, {
        autoAlpha: 1,
        x: 0,
        rotateY: 0
    }, "-=0.28");

    /* Aplicaciones: entra desde abajo */
    timeline.to(appsCard, {
        autoAlpha: 1,
        y: 0,
        scale: 1
    }, "-=0.24");
}

    // ######## REFERENCIA: ARRANQUE ########
    configureOpenButtons();

    if (
        window.Site &&
        typeof window.Site.onTransitionReady === "function"
    ) {
        window.Site.onTransitionReady(animateServiceCards);
    } else {
        window.addEventListener("load", animateServiceCards, { once: true });
    }
})();