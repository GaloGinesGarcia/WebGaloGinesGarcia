(function () {
    emailjs.init("d8aGSJLv7JC6fVDx5"); // TU PUBLIC KEY
})();

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

const now = new Date();
let hours = now.getHours();
const minutes = String(now.getMinutes()).padStart(2, "0");
const ampm = hours >= 12 ? "PM" : "AM";

hours = hours % 12;
hours = hours ? hours : 12; // si es 0, cambiar a 12

form.addEventListener("submit", function (e) {
    e.preventDefault();

    status.textContent = "Enviando mensaje...";
    status.style.color = "white";

    const templateParams = {
        from_email: document.getElementById("userEmail").value,
        title: "Quiero contactar contigo.",
        message: document.getElementById("userMessage").value,
        time: `${hours}:${minutes} ${ampm}`,
    };

    emailjs
        .send(
            "service_8nqf4za",   // Service ID
            "template_p38ydhd",  // Template ID
            templateParams
        )
        .then(() => {
            status.textContent = "✅ Correo enviado correctamente";
            status.style.color = "limegreen";
            form.reset();
        })
        .catch((error) => {
            status.textContent = "❌ Error al enviar el correo";
            status.style.color = "red";
            console.error("EmailJS error:", error);
        });
});

/*
// ######## REFERENCIA: CONFIGURACION DE EMAILJS ########
(() => {
    const EMAILJS_PUBLIC_KEY = "d8aGSJLv7JC6fVDx5";
    const EMAILJS_SERVICE_ID = "service_8nqf4za";
    const EMAILJS_TEMPLATE_ID = "template_p38ydhd";

    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");
    const submitButton = form?.querySelector('button[type="submit"]');

    if (!form || !status || !submitButton) {
        return;
    }

    // ######## REFERENCIA: INICIALIZACION SEGURA DEL SDK ########
    function initializeEmailJs() {
        if (typeof window.emailjs === "undefined") {
            status.dataset.state = "error";
            status.textContent = "No se ha podido cargar el servicio de correo.";
            return false;
        }

        window.emailjs.init(EMAILJS_PUBLIC_KEY);

        return true;
    }

    // ######## REFERENCIA: MENSAJE VISUAL DEL ESTADO DEL FORMULARIO ########
    function setStatus(message, state = "") {
        status.textContent = message;
        status.dataset.state = state;
    }

    // ######## REFERENCIA: HORA ACTUAL PARA LA PLANTILLA DE EMAILJS ########
    function getCurrentTime() {
        return new Intl.DateTimeFormat("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        }).format(new Date());
    }

    if (!initializeEmailJs()) {
        return;
    }

    // ######## REFERENCIA: ENVIO DEL MENSAJE DE CONTACTO ########
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("userEmail")?.value.trim();
        const message = document.getElementById("userMessage")?.value.trim();

        if (!email || !message) {
            setStatus("Completa el correo y el mensaje.", "error");
            return;
        }

        submitButton.disabled = true;
        setStatus("Enviando mensaje...");

        try {
            await window.emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    from_email: email,
                    title: "Quiero contactar contigo.",
                    message,
                    time: getCurrentTime()
                }
            );

            form.reset();

            setStatus(
                "Mensaje enviado correctamente. Te responderé lo antes posible.",
                "success"
            );
        } catch (error) {
            console.error("EmailJS error:", error);

            setStatus(
                "No se ha podido enviar el mensaje. Inténtalo de nuevo.",
                "error"
            );
        } finally {
            submitButton.disabled = false;
        }
    });
})();
*/