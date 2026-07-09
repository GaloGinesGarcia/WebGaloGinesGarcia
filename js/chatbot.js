// ######## REFERENCIA: CHATBOT LOCAL AUTOMATICO ########
(function () {
    "use strict";

    var widget;
    var panel;
    var toggleButton;
    var closeButton;
    var messagesContainer;
    var form;
    var input;

    var isOpen = false;
    var isTyping = false;

    // ######## REFERENCIA: RUTAS SEGUN PAGINA ACTUAL ########
    function isInsideHtmlFolder() {
        return window.location.pathname.indexOf("/html/") !== -1;
    }

    function pageHref(pageName) {
        return isInsideHtmlFolder()
            ? pageName
            : "html/" + pageName;
    }

    function assetHref(path) {
        return isInsideHtmlFolder()
            ? "../" + path
            : path;
    }

    // ######## REFERENCIA: NORMALIZAR TEXTO ########
    function normalizeText(text) {
        return String(text)
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    // ######## REFERENCIA: BASE DE CONOCIMIENTO LOCAL ########
    var knowledgeBase = [
        {
            id: "saludo",
            keywords: [
                "hola",
                "buenas",
                "hey",
                "que tal",
                "buenos dias",
                "buenas tardes",
                "buenas noches"
            ],
            answer:
                "Hola, soy el asistente virtual de esta web. Puedo orientarte sobre servicios, tecnologías, biografía, contacto o descarga del CV.",
            actions: [
                {
                    label: "Ver servicios",
                    href: pageHref("servicios.html")
                },
                {
                    label: "Contactar",
                    href: pageHref("contacto.html")
                }
            ]
        },
        {
            id: "servicios",
            keywords: [
                "servicio",
                "servicios",
                "web",
                "pagina",
                "landing",
                "portfolio",
                "aplicacion",
                "aplicaciones",
                "app",
                "colaboracion",
                "mantenimiento",
                "proyecto"
            ],
            answer:
                "Galo puede ayudarte con desarrollo web, aplicaciones, portfolios, landing pages, mantenimiento y colaboración técnica. La web está orientada a soluciones modernas, responsive y bien estructuradas.",
            actions: [
                {
                    label: "Abrir servicios",
                    href: pageHref("servicios.html")
                },
                {
                    label: "Enviar mensaje",
                    href: pageHref("contacto.html")
                }
            ]
        },
        {
            id: "tecnologias",
            keywords: [
                "tecnologia",
                "tecnologias",
                "stack",
                "html",
                "css",
                "javascript",
                "java",
                "node",
                "python",
                "angular",
                "php",
                "sql",
                "flutter",
                "c#",
                "go",
                "aws",
                "git"
            ],
            answer:
                "El stack incluye tecnologías frontend, backend, multiplataforma, bases de datos, versionado y cloud: HTML, CSS, JavaScript, PHP, Angular, Node.js, Java, Python, Flutter, C#, SQL, Go, XML, Git, Bitbucket y AWS.",
            actions: [
                {
                    label: "Ver tecnologías",
                    href: pageHref("tecnologias.html")
                }
            ]
        },
        {
            id: "biografia",
            keywords: [
                "biografia",
                "trayectoria",
                "formacion",
                "academica",
                "objetivos",
                "perfil",
                "quien eres",
                "sobre ti",
                "sobre mi",
                "experiencia"
            ],
            answer:
                "La biografía resume la trayectoria académica, objetivos profesionales y sectores de interés de Galo, con una orientación clara hacia el desarrollo de software y soluciones digitales.",
            actions: [
                {
                    label: "Ver biografía",
                    href: pageHref("biografia.html")
                }
            ]
        },
        {
            id: "contacto",
            keywords: [
                "contacto",
                "contactar",
                "correo",
                "email",
                "mail",
                "mensaje",
                "hablar",
                "linkedin",
                "instagram"
            ],
            answer:
                "Puedes contactar con Galo desde el formulario de la página de contacto, por correo, LinkedIn o Instagram. El formulario envía el mensaje directamente por EmailJS.",
            actions: [
                {
                    label: "Ir a contacto",
                    href: pageHref("contacto.html")
                },
                {
                    label: "Enviar email",
                    href: "mailto:galogines1@gmail.com"
                }
            ]
        },
        {
            id: "cv",
            keywords: [
                "cv",
                "curriculum",
                "currículum",
                "resume",
                "descargar",
                "pdf",
                "trabajo",
                "contratar",
                "empleo"
            ],
            answer:
                "Puedes descargar el CV de Galo en PDF desde la sección de biografía. Incluye perfil, formación, experiencia y stack técnico.",
            actions: [
                {
                    label: "Descargar CV",
                    href: assetHref(
                        "assets/documments/CV%20Galo%20Gin%C3%A9s%20Garc%C3%ADa%20Dev.pdf"
                    )
                },
                {
                    label: "Ver biografía",
                    href: pageHref("biografia.html")
                }
            ]
        },
        {
            id: "precio",
            keywords: [
                "precio",
                "precios",
                "cuanto cuesta",
                "cuánto cuesta",
                "tarifa",
                "presupuesto",
                "coste",
                "costo"
            ],
            answer:
                "El precio depende del tipo de proyecto, alcance, funcionalidades, diseño y mantenimiento. Lo mejor es enviar un mensaje explicando la idea para valorar una propuesta adecuada.",
            actions: [
                {
                    label: "Pedir presupuesto",
                    href: pageHref("contacto.html")
                }
            ]
        },
        {
            id: "disponibilidad",
            keywords: [
                "disponible",
                "disponibilidad",
                "nuevo proyecto",
                "proyectos",
                "colaborar",
                "colaboracion",
                "contratar"
            ],
            answer:
                "Actualmente la web muestra disponibilidad para nuevos proyectos. Puedes enviar una propuesta desde contacto para hablar sobre necesidades, tiempos y objetivos.",
            actions: [
                {
                    label: "Contactar",
                    href: pageHref("contacto.html")
                }
            ]
        },
        {
            id: "donacion",
            keywords: [
                "donar",
                "donacion",
                "donación",
                "paypal",
                "apoyar",
                "apoyo"
            ],
            answer:
                "La página de contacto incluye una sección de donación voluntaria mediante PayPal para apoyar el desarrollo, aprendizaje y mejora de proyectos.",
            actions: [
                {
                    label: "Ver donaciones",
                    href: pageHref("contacto.html")
                }
            ]
        }
    ];

    var suggestions = [
        "¿Qué servicios ofreces?",
        "¿Qué tecnologías usas?",
        "¿Cómo contacto contigo?",
        "Descargar CV"
    ];

    // ######## REFERENCIA: CREAR ESTRUCTURA HTML ########
    function createChatbot() {
        widget = document.createElement("div");
        widget.className = "chatbot-widget";
        widget.setAttribute("data-chatbot", "");

        widget.innerHTML =
            '<button class="chatbot-toggle" type="button" aria-label="Abrir asistente virtual" aria-expanded="false">' +
    '<span class="chatbot-toggle__icon" aria-hidden="true">' +
        '<img src="' + assetHref("assets/images/chatbotRobot.svg") + '" alt="">' +
    '</span>' +
    '<span class="chatbot-toggle__dot" aria-hidden="true"></span>' +
'</button>' +

            '<section class="chatbot-panel" aria-label="Asistente virtual" aria-hidden="true">' +
                '<header class="chatbot-header">' +
                    '<div class="chatbot-header__identity">' +
                        '<span class="chatbot-avatar" aria-hidden="true">GGG</span>' +
                        '<div>' +
                            '<h2>Asistente web</h2>' +
                            '<p>Respuestas automáticas</p>' +
                        '</div>' +
                    '</div>' +

                    '<button class="chatbot-close" type="button" aria-label="Cerrar asistente">×</button>' +
                '</header>' +

                '<div class="chatbot-messages" aria-live="polite"></div>' +

                '<footer class="chatbot-footer">' +
                    '<div class="chatbot-suggestions"></div>' +

                    '<form class="chatbot-form">' +
                        '<input class="chatbot-input" type="text" placeholder="Escribe tu pregunta..." autocomplete="off" aria-label="Mensaje para el asistente">' +
                        '<button class="chatbot-send" type="submit" aria-label="Enviar pregunta">→</button>' +
                    '</form>' +
                '</footer>' +
            '</section>';

        document.body.appendChild(widget);

        panel = widget.querySelector(".chatbot-panel");
        toggleButton = widget.querySelector(".chatbot-toggle");
        closeButton = widget.querySelector(".chatbot-close");
        messagesContainer = widget.querySelector(".chatbot-messages");
        form = widget.querySelector(".chatbot-form");
        input = widget.querySelector(".chatbot-input");

        renderSuggestions();
        bindEvents();
    }

    // ######## REFERENCIA: SUGERENCIAS RAPIDAS ########
    function renderSuggestions() {
        var container = widget.querySelector(".chatbot-suggestions");

        suggestions.forEach(function (suggestion) {
            var button = document.createElement("button");

            button.type = "button";
            button.className = "chatbot-suggestion";
            button.textContent = suggestion;

            button.addEventListener("click", function () {
                handleUserMessage(suggestion);
            });

            container.appendChild(button);
        });
    }

    // ######## REFERENCIA: EVENTOS ########
    function bindEvents() {
        toggleButton.addEventListener("click", function () {
            if (isOpen) {
                closeChatbot();
                return;
            }

            openChatbot();
        });

        closeButton.addEventListener("click", closeChatbot);

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            handleUserMessage(input.value);
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && isOpen) {
                closeChatbot();
            }
        });
    }

    // ######## REFERENCIA: ABRIR CHAT ########
    function openChatbot() {
        isOpen = true;

        widget.classList.add("is-open");
        panel.setAttribute("aria-hidden", "false");
        toggleButton.setAttribute("aria-expanded", "true");

        if (!messagesContainer.hasChildNodes()) {
            addBotMessage(
                "Hola. Soy el asistente virtual de la web de Galo. Puedo ayudarte con servicios, tecnologías, contacto, CV o información del portfolio.",
                [
                    {
                        label: "Servicios",
                        href: pageHref("servicios.html")
                    },
                    {
                        label: "Contacto",
                        href: pageHref("contacto.html")
                    }
                ]
            );
        }

        window.setTimeout(function () {
            input.focus();
        }, 120);
    }

    // ######## REFERENCIA: CERRAR CHAT ########
    function closeChatbot() {
        isOpen = false;

        widget.classList.remove("is-open");
        panel.setAttribute("aria-hidden", "true");
        toggleButton.setAttribute("aria-expanded", "false");
    }

    // ######## REFERENCIA: GESTIONAR MENSAJE DEL USUARIO ########
    function handleUserMessage(rawMessage) {
        var message = String(rawMessage || "").trim();

        if (!message || isTyping) {
            return;
        }

        input.value = "";

        addUserMessage(message);
        showTyping();

        window.setTimeout(function () {
            var response = findBestResponse(message);

            hideTyping();
            addBotMessage(response.answer, response.actions);
        }, 520);
    }

    // ######## REFERENCIA: BUSCAR MEJOR RESPUESTA ########
    function findBestResponse(message) {
        var normalizedMessage = normalizeText(message);
        var bestMatch = null;
        var bestScore = 0;

        knowledgeBase.forEach(function (entry) {
            var score = 0;

            entry.keywords.forEach(function (keyword) {
                var normalizedKeyword = normalizeText(keyword);

                if (normalizedMessage.indexOf(normalizedKeyword) !== -1) {
                    score += normalizedKeyword.length;
                }
            });

            if (score > bestScore) {
                bestScore = score;
                bestMatch = entry;
            }
        });

        if (bestMatch) {
            return bestMatch;
        }

        return {
            answer:
                "No tengo una respuesta exacta para eso todavía, pero puedo orientarte sobre servicios, tecnologías, biografía, contacto, presupuesto o CV. Para algo concreto, lo mejor es enviar un mensaje desde contacto.",
            actions: [
                {
                    label: "Ir a contacto",
                    href: pageHref("contacto.html")
                },
                {
                    label: "Ver servicios",
                    href: pageHref("servicios.html")
                }
            ]
        };
    }

    // ######## REFERENCIA: AÑADIR MENSAJE DEL USUARIO ########
    function addUserMessage(text) {
        addMessage(text, "user", []);
    }

    // ######## REFERENCIA: AÑADIR MENSAJE DEL BOT ########
    function addBotMessage(text, actions) {
        addMessage(text, "bot", actions || []);
    }

    // ######## REFERENCIA: CREAR MENSAJE ########
    function addMessage(text, type, actions) {
        var message = document.createElement("div");
        var textNode = document.createElement("div");

        message.className = "chatbot-message chatbot-message--" + type;
        textNode.textContent = text;

        message.appendChild(textNode);

        if (actions && actions.length) {
            message.appendChild(createActions(actions));
        }

        messagesContainer.appendChild(message);
        scrollMessagesToBottom();
    }

    // ######## REFERENCIA: CREAR ACCIONES DEL BOT ########
    function createActions(actions) {
        var container = document.createElement("div");

        container.className = "chatbot-message__actions";

        actions.forEach(function (action) {
            var link = document.createElement("a");

            link.href = action.href;
            link.textContent = action.label;

            if (action.href.indexOf("http") === 0) {
                link.target = "_blank";
                link.rel = "noopener noreferrer";
            }

            container.appendChild(link);
        });

        return container;
    }

    // ######## REFERENCIA: MOSTRAR ESCRIBIENDO ########
    function showTyping() {
        var typing = document.createElement("div");

        isTyping = true;

        typing.className = "chatbot-message chatbot-message--bot";
        typing.setAttribute("data-typing", "");

        typing.innerHTML =
            '<div class="chatbot-typing" aria-label="El asistente está escribiendo">' +
                '<span></span>' +
                '<span></span>' +
                '<span></span>' +
            '</div>';

        messagesContainer.appendChild(typing);
        scrollMessagesToBottom();
    }

    // ######## REFERENCIA: OCULTAR ESCRIBIENDO ########
    function hideTyping() {
        var typing = messagesContainer.querySelector("[data-typing]");

        isTyping = false;

        if (typing) {
            typing.remove();
        }
    }

    // ######## REFERENCIA: SCROLL FINAL ########
    function scrollMessagesToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // ######## REFERENCIA: ARRANQUE ########
    window.addEventListener("DOMContentLoaded", createChatbot);
})();