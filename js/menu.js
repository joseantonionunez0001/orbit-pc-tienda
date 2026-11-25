"use strict";

const boton = document.querySelector(".nav-toggle");
const menu = document.getElementById("menu-principal");

if (boton && menu) {
  function abrir(estado) {
    menu.classList.toggle("is-open", estado);
    boton.setAttribute("aria-expanded", String(estado));
    boton.querySelector(".sr-only").textContent = estado ? "Cerrar menú" : "Abrir menú";
  }

  boton.addEventListener("click", () => abrir(!menu.classList.contains("is-open")));

  menu.addEventListener("click", e => {
    if (e.target.closest("a")) abrir(false);
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) {
      abrir(false);
      boton.focus();
    }
  });

  window.matchMedia("(min-width: 769px)").addEventListener("change", e => {
    if (e.matches) abrir(false);
  });
}
