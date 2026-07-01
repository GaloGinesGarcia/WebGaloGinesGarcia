// donaciones.js
/*
// Cargar SDK de PayPal
const paypalScript = document.createElement('script');
paypalScript.src = "https://www.paypal.com/sdk/js?client-id=TU_CLIENT_ID&currency=USD";
paypalScript.onload = () => {

    function renderPaypalButton(amount) {
        paypal.Buttons({
            style: {
                layout: 'vertical',
                color:  'blue',
                shape:  'rect',
                label:  'donate'
            },
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: amount
                        }
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    alert('¡Gracias ' + details.payer.name.given_name + ' por tu donación de $' + amount + '!');
                });
            }
        }).render('#paypal-button-container');
    }

    const donationInput = document.getElementById('donationAmount');

    donationInput.addEventListener('change', () => {
        const value = donationInput.value;
        if(value >= 1){
            document.getElementById('paypal-button-container').innerHTML = ''; // Limpiar botón anterior
            renderPaypalButton(value);
        }
    });

    // Render inicial con valor predeterminado de 10 USD
    renderPaypalButton('10.00');
};

document.body.appendChild(paypalScript);
*/

// ######## REFERENCIA: CONFIGURACION DE PAYPAL PARA DONACIONES ########
(() => {
    const PAYPAL_CLIENT_ID = "PEGA_AQUI_TU_CLIENT_ID";
    const PAYPAL_CURRENCY = "EUR";

    const amountInput = document.getElementById("donationAmount");
    const buttonContainer = document.getElementById("paypal-button-container");
    const status = document.getElementById("paypalStatus");

    if (!amountInput || !buttonContainer || !status) {
        return;
    }

    // ######## REFERENCIA: MENSAJE DE ESTADO DE DONACIONES ########
    function setDonationStatus(message) {
        status.textContent = message;
    }

    // ######## REFERENCIA: VALIDACION DEL IMPORTE INTRODUCIDO ########
    function getValidatedAmount() {
        const amount = Number.parseFloat(amountInput.value);

        return Number.isFinite(amount) && amount >= 1
            ? amount.toFixed(2)
            : null;
    }

    // ######## REFERENCIA: RENDERIZADO DEL BOTON PAYPAL ########
    function renderPaypalButton() {
        const amount = getValidatedAmount();

        if (!amount || typeof window.paypal === "undefined") {
            return;
        }

        buttonContainer.innerHTML = "";

        window.paypal.Buttons({
            style: {
                layout: "vertical",
                color: "blue",
                shape: "rect",
                label: "donate"
            },

            createOrder(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            currency_code: PAYPAL_CURRENCY,
                            value: amount
                        }
                    }]
                });
            },

            onApprove(data, actions) {
                return actions.order.capture().then((details) => {
                    const name = details.payer?.name?.given_name || "por tu donación";

                    setDonationStatus(
                        `Gracias, ${name}. Donación completada.`
                    );
                });
            },

            onError(error) {
                console.error("PayPal error:", error);
                setDonationStatus("No se ha podido procesar la donación.");
            }
        }).render(buttonContainer);
    }

    // ######## REFERENCIA: CARGA DEL SDK DE PAYPAL ########
    function loadPaypalSdk() {
        if (PAYPAL_CLIENT_ID === "PEGA_AQUI_TU_CLIENT_ID") {
            setDonationStatus(
                "Añade tu Client ID de PayPal en js/donaciones.js para activar las donaciones."
            );

            return;
        }

        const script = document.createElement("script");

        script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=${PAYPAL_CURRENCY}`;
        script.async = true;

        script.addEventListener("load", () => {
            renderPaypalButton();
            setDonationStatus("");
        });

        script.addEventListener("error", () => {
            setDonationStatus("No se ha podido cargar PayPal.");
        });

        document.head.appendChild(script);
    }

    // ######## REFERENCIA: ACTUALIZACION DEL BOTON CUANDO CAMBIA EL IMPORTE ########
    amountInput.addEventListener("change", renderPaypalButton);

    amountInput.addEventListener("input", () => {
        if (getValidatedAmount()) {
            setDonationStatus("");
        }
    });

    loadPaypalSdk();
})();