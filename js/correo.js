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
            status.textContent = "✅ Mensaje enviado correctamente";
            status.style.color = "limegreen";
            form.reset();
        })
        .catch((error) => {
            status.textContent = "❌ Error al enviar el mensaje";
            status.style.color = "red";
            console.error("EmailJS error:", error);
        });
});