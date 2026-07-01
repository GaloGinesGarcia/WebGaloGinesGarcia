// ######## REFERENCIA: ANIMACIONES DE LA PAGINA CONTACTO ########
(function () {
    "use strict";

    var site = window.Site;
    var gsap = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;
    var initialized = false;

    if (!site || !gsap || !ScrollTrigger) {
        return;
    }

    // ######## REFERENCIA: ANIMACION INICIAL ########
    function animateContactIntro() {
        var eyebrow = document.querySelector(
            ".contact-intro .page-intro__eyebrow"
        );

        var title = document.querySelector(
            ".contact-intro h1"
        );

        var text = document.querySelector(
            ".contact-intro > p:last-child"
        );

        var directCard = document.querySelector(".contact-direct");
        var formCard = document.querySelector(".contact-form");
        var channels = document.querySelectorAll(".contact-channel");
        var sideDistance = site.isMobile ? 54 : 130;

        if (
            !eyebrow ||
            !title ||
            !text ||
            !directCard ||
            !formCard
        ) {
            return;
        }

        if (site.prefersReducedMotion) {
            return;
        }

        gsap.set(
            [eyebrow, title, text],
            {
                autoAlpha: 0,
                y: 34
            }
        );

        gsap.set(directCard, {
            autoAlpha: 0,
            x: -sideDistance
        });

        gsap.set(formCard, {
            autoAlpha: 0,
            x: sideDistance
        });

        gsap.set(channels, {
            autoAlpha: 0,
            y: 18
        });

        gsap.timeline({
            defaults: {
                ease: "power3.out"
            },

            onComplete: function () {
                gsap.set(
                    [directCard, formCard, channels],
                    {
                        clearProps: "transform"
                    }
                );
            }
        })
            .to(eyebrow, {
                autoAlpha: 1,
                y: 0,
                duration: 0.42
            })
            .to(title, {
                autoAlpha: 1,
                y: 0,
                duration: 0.72
            }, "-=0.14")
            .to(text, {
                autoAlpha: 1,
                y: 0,
                duration: 0.54
            }, "-=0.28")
            .to(directCard, {
                autoAlpha: 1,
                x: 0,
                duration: 0.82
            }, "-=0.08")
            .to(formCard, {
                autoAlpha: 1,
                x: 0,
                duration: 0.82
            }, "-=0.66")
            .to(channels, {
                autoAlpha: 1,
                y: 0,
                duration: 0.42,
                stagger: 0.10
            }, "-=0.42");
    }

    // ######## REFERENCIA: DONACIONES AL HACER SCROLL ########
    function animateDonation() {
        var donation = document.querySelector(".contact-donation");
        var content;
        var paymentCard;
        var distance;
        var hasPlayed = false;

        if (!donation || site.prefersReducedMotion) {
            return;
        }

        content = donation.querySelector(".contact-donation__content");
        paymentCard = donation.querySelector(".donaciones");
        distance = site.isMobile ? 58 : 110;

        if (!content || !paymentCard) {
            return;
        }

        gsap.set(content, {
            autoAlpha: 0,
            x: -distance
        });

        gsap.set(paymentCard, {
            autoAlpha: 0,
            x: distance
        });

        ScrollTrigger.create({
            trigger: donation,
            start: "top 82%",
            once: true,

            onEnter: function () {
                if (hasPlayed) {
                    return;
                }

                hasPlayed = true;

                gsap.timeline({
                    defaults: {
                        ease: "power4.out"
                    },

                    onComplete: function () {
                        gsap.set(
                            [content, paymentCard],
                            {
                                clearProps: "transform"
                            }
                        );
                    }
                })
                    .to(content, {
                        autoAlpha: 1,
                        x: 0,
                        duration: 0.82
                    })
                    .to(paymentCard, {
                        autoAlpha: 1,
                        x: 0,
                        duration: 0.82
                    }, "-=0.54");
            }
        });
    }

    // ######## REFERENCIA: ARRANQUE CONTROLADO ########
    function startContactAnimations() {
        if (initialized) {
            return;
        }

        initialized = true;

        animateContactIntro();
        animateDonation();

        site.refreshScrollTrigger();
    }

    site.onTransitionReady(startContactAnimations);
})();