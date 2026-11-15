"use strict";

// Filtro por tipo de equipo y orden por precio en la tienda.
// Cada tarjeta va dentro de una columna de la rejilla de Bootstrap (.col),
// así que se filtran y ordenan las columnas completas.
const lista = document.getElementById("listado-productos");
const columnas = Array.from(lista.querySelectorAll(":scope > .col"));
const filtros = document.querySelectorAll(".filtro");
const selectorOrden = document.getElementById("orden-productos");
const resultado = document.getElementById("resultado-filtro");

let filtroActual = "todos";

function pintar() {
  let visibles = 0;
  columnas.forEach((columna) => {
    const tarjeta = columna.querySelector(".product-card");
    const mostrar = filtroActual === "todos" || tarjeta.dataset.categoria === filtroActual;
    columna.hidden = !mostrar;
    if (mostrar) visibles++;
  });

  const orden = selectorOrden.value;
  const ordenadas = columnas.slice().sort((a, b) => {
    const da = a.querySelector(".product-card").dataset;
    const db = b.querySelector(".product-card").dataset;
    if (orden === "precio-asc") return da.precio - db.precio;
    if (orden === "precio-desc") return db.precio - da.precio;
    return da.orden - db.orden;
  });
  ordenadas.forEach((columna) => lista.appendChild(columna));

  resultado.textContent = "Mostrando " + visibles + " de " + columnas.length + (columnas.length === 1 ? " equipo" : " equipos");
}

filtros.forEach((boton) => {
  boton.addEventListener("click", () => {
    filtroActual = boton.dataset.filtro;
    filtros.forEach((b) => {
      const activo = b === boton;
      b.classList.toggle("is-active", activo);
      b.setAttribute("aria-pressed", String(activo));
    });
    pintar();
  });
});

selectorOrden.addEventListener("change", pintar);
