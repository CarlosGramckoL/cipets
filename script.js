const countToDate = new Date("2026-08-01T00:00:00").getTime();
let previousTimeBetweenDates;

setInterval(() => {
  const currentDate = new Date().getTime();
  const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000);
  flipAllCards(timeBetweenDates);

  previousTimeBetweenDates = timeBetweenDates;
}, 250);

function flipAllCards(time) {
  const seconds = time % 60;
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600) % 24;
  const days = Math.floor(time / 86400);

  updateFlip(document.querySelector("[data-days]"), days.toString().padStart(2, '0'));
  updateFlip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10));
  updateFlip(document.querySelector("[data-hours-ones]"), hours % 10);
  updateFlip(document.querySelector("[data-minutes-tens]"), Math.floor(minutes / 10));
  updateFlip(document.querySelector("[data-minutes-ones]"), minutes % 10);
  updateFlip(document.querySelector("[data-seconds-tens]"), Math.floor(seconds / 10));
  updateFlip(document.querySelector("[data-seconds-ones]"), seconds % 10);
}

function updateFlip(flipCard, newNumber) {
  if (!flipCard) return;
  const topHalf = flipCard.querySelector(".top");
  const currentNumber = topHalf.textContent;
  if (newNumber.toString() === currentNumber) return; // Evita la animación si el número no ha cambiado
  flip(flipCard, newNumber);
}

function flip(flipCard, newNumber) {
  const topHalf = flipCard.querySelector(".top");
  const bottomHalf = flipCard.querySelector(".bottom");
  const topFlip = document.createElement("div");
  topFlip.classList.add("top-flip");
  const bottomFlip = document.createElement("div");
  bottomFlip.classList.add("bottom-flip");

  topFlip.textContent = topHalf.textContent;
  bottomFlip.textContent = newNumber;

  topFlip.addEventListener("animationstart", () => {
    topHalf.textContent = newNumber;
  });
  topFlip.addEventListener("animationend", () => {
    topFlip.remove();
  });
  bottomFlip.addEventListener("animationend", () => {
    bottomHalf.textContent = newNumber;
    bottomFlip.remove();
  });
  flipCard.append(topFlip, bottomFlip);
}

$(document).ready(function() {
  console.log("jQuery cargado y listo");

  $('#subscribe-form').on('submit', function(event) {
      event.preventDefault(); // Evita la recarga de la página

      const formData = new FormData(this);

      fetch("https://docs.google.com/forms/d/e/1FAIpQLSfNPFfLMxBpb53hWlXPPnbvkq1mssxQZjJrsrDOwsWb41yoPA/formResponse", {
          method: "POST",
          body: formData,
          mode: "no-cors"
      })
      .then(() => {
          let popup = $("#success-popup-subscribe");
          if (popup.length) {
              popup.fadeIn(300); // Muestra el popup con efecto de fade
              setTimeout(() => popup.fadeOut(300), 4000); // Oculta después de 4s
          }

          // 🔹 Borra el campo de texto tras el envío
          $('#subscribe-email').val('');
      })
      .catch(error => console.error("Error al enviar el formulario:", error));
  });
});
