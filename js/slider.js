"use strict";

// Slider de la portada: controles, pausa y accesibilidad.
// Si este script falla, las diapositivas siguen visibles en columna.
const slider = document.querySelector("[data-slider]");

if (slider) {
  const diapositivas = slider.querySelectorAll(".slider__slide");
  const puntos = slider.querySelectorAll(".slider__dot");
  const controles = slider.querySelector(".slider__controls");
  const botonToggle = slider.querySelector("[data-toggle]");
  const TIEMPO_ENTRE_SLIDES = 6000;

  // Con movimiento reducido el slider no avanza solo
  const movimientoReducido = window.matchMedia("(prefers-reduced-motion: reduce)");
  let actual = 0;
  let temporizador = null;
  let reproduciendo = !movimientoReducido.matches;

  // Activa el modo "una diapositiva a la vez" definido en el CSS
  slider.classList.add("slider--js");
  controles.hidden = false;

  function mostrar(indice) {
    actual = (indice + diapositivas.length) % diapositivas.length;

    diapositivas.forEach((diapositiva, i) => {
      const activa = i === actual;
      diapositiva.classList.toggle("is-active", activa);
      // Las diapositivas ocultas no reciben foco ni las lee el lector de pantalla
      diapositiva.toggleAttribute("inert", !activa);
      diapositiva.setAttribute("aria-hidden", String(!activa));
    });

    puntos.forEach((punto, i) => {
      punto.setAttribute("aria-current", String(i === actual));
    });
  }

  function arrancar() {
    clearInterval(temporizador);
    temporizador = setInterval(() => mostrar(actual + 1), TIEMPO_ENTRE_SLIDES);
    actualizarBoton();
  }

  function parar() {
    clearInterval(temporizador);
    temporizador = null;
    actualizarBoton();
  }

  function actualizarBoton() {
    botonToggle.textContent = reproduciendo ? "Pausar" : "Reproducir";
    botonToggle.setAttribute("aria-pressed", String(!reproduciendo));
    botonToggle.setAttribute("aria-label", reproduciendo ? "Pausar el cambio automático" : "Reproducir el cambio automático");
  }

  // Controles
  slider.querySelector("[data-prev]").addEventListener("click", () => mostrar(actual - 1));
  slider.querySelector("[data-next]").addEventListener("click", () => mostrar(actual + 1));

  puntos.forEach((punto, i) => {
    punto.addEventListener("click", () => mostrar(i));
  });

  botonToggle.addEventListener("click", () => {
    reproduciendo = !reproduciendo;
    if (reproduciendo) {
      arrancar();
    } else {
      parar();
    }
  });

  // Al elegir manualmente una diapositiva se reinicia el contador
  controles.addEventListener("click", () => {
    if (reproduciendo) arrancar();
  });

  mostrar(0);
  if (reproduciendo) arrancar();
  else actualizarBoton();
}
