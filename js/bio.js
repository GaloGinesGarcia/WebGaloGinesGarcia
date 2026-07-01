// ######## REFERENCIA: ANIMACIONES DE BIOGRAFIA ########
window.addEventListener("load", function () {
    "use strict";

    // ######## REFERENCIA: COMPROBACION DE GSAP ########
    if (
        typeof window.gsap === "undefined" ||
        typeof window.ScrollTrigger === "undefined"
    ) {
        return;
    }

    var gsap = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;

    gsap.registerPlugin(ScrollTrigger);

    var isMobile = document.documentElement.classList.contains("mobile-lite");

    // ######## REFERENCIA: VALORES SEGUROS PARA TEXTO DIVIDIDO ########
    var bioBlur = typeof window.BIO_BLUR === "number"
        ? window.BIO_BLUR
        : 8;

    var bioY = typeof window.BIO_Y === "number"
        ? window.BIO_Y
        : 18;

    var bioDuration = typeof window.BIO_DURATION === "number"
        ? window.BIO_DURATION
        : 0.34;

    var bioStagger = typeof window.BIO_STAGGER === "number"
        ? window.BIO_STAGGER
        : 0.018;

    // ######## REFERENCIA: TITULO PRINCIPAL ########
    function animateTitle() {
        var title = document.querySelector(".bio-title");

        if (!title) {
            return;
        }

        gsap.from(title, {
            autoAlpha: 0,
            y: 42,
            duration: 0.9,
            ease: "power3.out"
        });
    }

    // ######## REFERENCIA: PREPARAR TEXTO LETRA A LETRA ########
    function prepareSplitText() {
        var paragraphs = gsap.utils.toArray(".bio-text");

        paragraphs.forEach(function (paragraph) {
            var text = paragraph.textContent;
            var fragment = document.createDocumentFragment();

            paragraph.innerHTML = "";

            text.split("").forEach(function (character) {
                var span = document.createElement("span");

                span.textContent = character === " "
                    ? "\u00A0"
                    : character;

                span.style.display = "inline-block";

                gsap.set(span, {
                    autoAlpha: 0,
                    y: bioY,
                    filter: "blur(" + bioBlur + "px)"
                });

                fragment.appendChild(span);
            });

            paragraph.appendChild(fragment);
        });

        return paragraphs;
    }

    // ######## REFERENCIA: ANIMACION DE TEXTO ########
    function animateSplitText(paragraphs) {
        var timeline;
        var triggerElement;

        if (!paragraphs.length) {
            return;
        }

        triggerElement = paragraphs[0];

        timeline = gsap.timeline({
            scrollTrigger: {
                trigger: triggerElement,
                start: "top 84%",
                once: true
            }
        });

        paragraphs.forEach(function (paragraph, index) {
            var characters = paragraph.querySelectorAll("span");

            timeline.to(characters, {
                autoAlpha: 1,
                y: 0,
                filter: "blur(0px)",
                duration: bioDuration,
                stagger: bioStagger,
                ease: "power2.out"
            });

            if (index < paragraphs.length - 1) {
                timeline.to({}, {
                    duration: isMobile ? 0.28 : 0.38
                });
            }
        });
    }

    // ######## REFERENCIA: PROGRESO DE LINEA DE TRAYECTORIA ########
    function animateTimelineProgress() {
        var timeline = document.querySelector(".bio-timeline");
        var items;
        var progressAnimation;

        if (!timeline) {
            return;
        }

        items = Array.prototype.slice.call(
            timeline.querySelectorAll(".bio-timeline__item")
        );

        if (!items.length) {
            return;
        }

        gsap.set(timeline, {
            "--timeline-progress": 0
        });

        progressAnimation = gsap.to(timeline, {
            "--timeline-progress": 1,
            ease: "none",
            scrollTrigger: {
                trigger: timeline,
                start: "top 76%",
                end: "bottom 64%",
                scrub: 0.55,
                invalidateOnRefresh: true
            }
        });

        items.forEach(function (item) {
            ScrollTrigger.create({
                trigger: item,
                start: "top 72%",
                once: true,

                onEnter: function () {
                    item.classList.add("is-reached");
                }
            });
        });

        return progressAnimation;
    }

    // ######## REFERENCIA: ENTRADA UNICA DE OBJETIVOS ########
function animateObjectives() {
    var section = document.querySelector(".bio-objectives-section");
    var cards;
    var distance;
    var hasPlayed = false;

    if (!section) {
        return;
    }

    cards = Array.prototype.slice.call(
        section.querySelectorAll(".bio-objective")
    );

    if (cards.length !== 3) {
        return;
    }

    distance = isMobile ? 70 : 150;

    /* Primera tarjeta: izquierda */
    gsap.set(cards[0], {
        autoAlpha: 0,
        x: -distance
    });

    /* Segunda tarjeta: abajo */
    gsap.set(cards[1], {
        autoAlpha: 0,
        y: 90
    });

    /* Tercera tarjeta: derecha */
    gsap.set(cards[2], {
        autoAlpha: 0,
        x: distance
    });

    ScrollTrigger.create({
        trigger: section,
        start: "top 78%",
        once: true,

        onEnter: function () {
            var timeline;

            if (hasPlayed) {
                return;
            }

            hasPlayed = true;

            timeline = gsap.timeline({
                defaults: {
                    duration: 0.82,
                    ease: "power4.out"
                },

                onComplete: function () {
                    gsap.set(cards, {
                        clearProps: "transform"
                    });
                }
            });

            /* Objetivo 1: desde izquierda */
            timeline.to(cards[0], {
                autoAlpha: 1,
                x: 0
            });

            /* Objetivo 3: desde derecha */
            timeline.to(cards[2], {
                autoAlpha: 1,
                x: 0
            }, "-=0.48");

            /* Objetivo 2: desde abajo */
            timeline.to(cards[1], {
                autoAlpha: 1,
                y: 0
            }, "-=0.46");
        }
    });
}

// ######## REFERENCIA: ENTRADA UNICA DE SECTORES DE INTERES ########
function animateSectors() {
    var section = document.querySelector(".bio-sectors-section");
    var sectors;
    var distance;

    if (!section) {
        return;
    }

    sectors = Array.prototype.slice.call(
        section.querySelectorAll(".bio-sector")
    );

    if (!sectors.length) {
        return;
    }

    distance = isMobile ? 34 : 58;

    sectors.forEach(function (sector, index) {
        gsap.set(sector, {
            autoAlpha: 0,
            x: index % 2 === 0 ? -distance : distance,
            y: 24
        });
    });

    ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        once: true,

        onEnter: function () {
            gsap.to(sectors, {
                autoAlpha: 1,
                x: 0,
                y: 0,

                duration: 0.56,
                stagger: 0.10,
                ease: "power3.out",

                onComplete: function () {
                    gsap.set(sectors, {
                        clearProps: "transform"
                    });

                    sectors.forEach(function (sector) {
                        sector.classList.add("is-revealed");
                    });
                }
            });
        }
    });
}
// ######## REFERENCIA: ENTRADA UNICA DEL BLOQUE CV ########
function animateCv() {
    var section = document.querySelector(".bio-cv");
    var button;
    var distance;
    var hasPlayed = false;

    if (!section) {
        return;
    }

    button = section.querySelector(".bio-cv__button");
    distance = isMobile ? 68 : 120;

    gsap.set(section, {
        autoAlpha: 0,
        y: distance
    });

    if (button) {
        gsap.set(button, {
            autoAlpha: 0,
            x: isMobile ? 0 : 58,
            y: isMobile ? 18 : 0
        });
    }

    ScrollTrigger.create({
        trigger: section,
        start: "top 82%",
        once: true,

        onEnter: function () {
            var timeline;

            if (hasPlayed) {
                return;
            }

            hasPlayed = true;

            timeline = gsap.timeline({
                defaults: {
                    ease: "power4.out"
                },

                onComplete: function () {
                    gsap.set(section, {
                        clearProps: "transform"
                    });

                    if (button) {
                        gsap.set(button, {
                            clearProps: "transform"
                        });
                    }

                    section.classList.add("is-revealed");
                }
            });

            timeline.to(section, {
                autoAlpha: 1,
                y: 0,
                duration: 0.95
            });

            if (button) {
                timeline.to(button, {
                    autoAlpha: 1,
                    x: 0,
                    y: 0,
                    duration: 0.68
                }, "-=0.48");
            }
        }
    });
}

    // ######## REFERENCIA: ARRANQUE GENERAL ########
    animateTitle();

    var paragraphs = prepareSplitText();

    animateSplitText(paragraphs);
    animateTimelineProgress();
    animateObjectives();
    animateSectors();
    animateCv();
    ScrollTrigger.refresh();
});