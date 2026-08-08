// ######## REFERENCIA: CONFIGURACION DE EMAILJS ########
(function () {
    "use strict";

    var EMAILJS_PUBLIC_KEY = "stG8tmmw2bwvii2IL";
    var EMAILJS_SERVICE_ID = "service_wi5ydb9";
    var EMAILJS_TEMPLATE_ID = "template_vtcynlo";

    var form = document.getElementById("contactForm");
    var status = document.getElementById("formStatus");
    var submitButton;
    var submitText;

    if (!form || !status) {
        return;
    }

    submitButton = form.querySelector('button[type="submit"]');
    submitText = form.querySelector(".button-primary__text");

    if (!submitButton || !submitText) {
        return;
    }

    // ######## REFERENCIA: MENSAJE VISUAL DEL ESTADO ########
    function setStatus(message, state) {
        status.textContent = message;

        if (state) {
            status.setAttribute("data-state", state);
            return;
        }

        status.removeAttribute("data-state");
    }

    // ######## REFERENCIA: OBTENER HORA ACTUAL ########
    function getCurrentTime() {
        return new Intl.DateTimeFormat("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        }).format(new Date());
    }

    // ######## REFERENCIA: COMPROBAR SDK EMAILJS ########
    if (typeof window.emailjs === "undefined") {
        setStatus(
            "No se ha podido cargar el servicio de correo.",
            "error"
        );

        return;
    }

    window.emailjs.init(EMAILJS_PUBLIC_KEY);

    // ######## REFERENCIA: ENVIO DEL FORMULARIO ########
    form.addEventListener("submit", function (event) {
        var email;
        var message;
        var originalText;

        event.preventDefault();

        email = document.getElementById("userEmail").value.trim();
        message = document.getElementById("userMessage").value.trim();
        originalText = "Enviar mensaje";

        if (!email || !message) {
            setStatus(
                "Completa el correo y el mensaje antes de enviar.",
                "error"
            );

            return;
        }

        submitButton.disabled = true;
        submitText.textContent = "Enviando mensaje...";
        setStatus("Enviando mensaje...");

        window.emailjs
            .send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    from_email: email,
                    title: "Quiero contactar contigo.",
                    message: message,
                    time: getCurrentTime()
                }
            )
            .then(function () {
                form.reset();

                setStatus(
                    "Mensaje enviado correctamente. Te responderé lo antes posible.",
                    "success"
                );
            })
            .catch(function (error) {
                console.error("EmailJS error:", error);

                setStatus(
                    "No se ha podido enviar el mensaje. Inténtalo de nuevo.",
                    "error"
                );
            })
            .finally(function () {
                submitButton.disabled = false;
                submitText.textContent = originalText;
            });
    });
})();