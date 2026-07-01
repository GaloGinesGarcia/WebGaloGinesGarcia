// ######## REFERENCIA: APERTURA DE TARJETAS TECNOLOGICAS EN MOVIL ########
(() => {
    const touchQuery = window.matchMedia("(hover: none) and (pointer: coarse)");

    if (!touchQuery.matches) {
        return;
    }

    const cards = Array.from(document.querySelectorAll(".cards-grid .card"));

    if (!cards.length) {
        return;
    }

    // ######## REFERENCIA: CIERRE DE TODAS LAS TARJETAS ABIERTAS ########
    function closeAllCards() {
        cards.forEach((card) => {
            card.classList.remove("is-open");
            card.setAttribute("aria-expanded", "false");
        });
    }

    // ######## REFERENCIA: CONFIGURACION ACCESIBLE DE CADA TARJETA ########
    function configureCard(card) {
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute("aria-expanded", "false");

        card.addEventListener("click", (event) => {
            event.stopPropagation();

            const wasOpen = card.classList.contains("is-open");

            closeAllCards();

            if (!wasOpen) {
                card.classList.add("is-open");
                card.setAttribute("aria-expanded", "true");
            }
        });

        card.addEventListener("keydown", (event) => {
            if (event.key !== "Enter" && event.key !== " ") {
                return;
            }

            event.preventDefault();
            card.click();
        });
    }

    // ######## REFERENCIA: INICIALIZACION DEL CONTROL TACTIL ########
    cards.forEach(configureCard);
    document.addEventListener("click", closeAllCards);
})();