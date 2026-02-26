(() => {
    const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (!isTouchDevice) return;

    const cards = Array.from(document.querySelectorAll(".cards-grid .card"));
    if (!cards.length) return;

    const closeAllCards = () => {
        cards.forEach((card) => {
            card.classList.remove("is-open");
            card.setAttribute("aria-expanded", "false");
        });
    };

    cards.forEach((card) => {
        card.setAttribute("tabindex", "0");
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
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            card.click();
        });
    });

    document.addEventListener("click", closeAllCards);
})();
