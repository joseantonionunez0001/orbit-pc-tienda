"use strict";

const CANTIDAD_MAXIMA = 10;

const parametros = new URLSearchParams(window.location.search);
const producto = PRODUCTOS.find((p) => p.id === parametros.get("producto"));

const avisoProducto = document.getElementById("aviso-producto");
const contenidoPago = document.getElementById("contenido-pago");

function euros(importe) {
  return importe.toLocaleString("es-ES") + " €";
}

if (!producto) {
  avisoProducto.hidden = false;
  contenidoPago.hidden = true;
} else {
  const imagen = document.getElementById("resumen-imagen");
  const campoCantidad = document.getElementById("pago-cantidad");
  const total = document.getElementById("resumen-total");
  const formulario = document.getElementById("form-pago");

  imagen.src = producto.imagen;
  imagen.alt = "Fotografía de " + producto.nombre;
  document.getElementById("resumen-nombre").textContent = producto.nombre;
  document.getElementById("resumen-precio").textContent = euros(producto.precio);

  function cantidadValida() {
    const cantidad = Math.floor(Number(campoCantidad.value));
    if (!Number.isFinite(cantidad) || cantidad < 1) return 1;
    return Math.min(cantidad, CANTIDAD_MAXIMA);
  }

  function actualizarTotal() {
    total.textContent = euros(producto.precio * cantidadValida());
  }

  campoCantidad.addEventListener("input", actualizarTotal);
  campoCantidad.addEventListener("change", () => {
    campoCantidad.value = cantidadValida();
    actualizarTotal();
  });
  actualizarTotal();

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    formulario.classList.add("was-validated");
    if (!formulario.checkValidity()) return;

    bootstrap.Modal.getOrCreateInstance(document.getElementById("modal-compra")).show();
  });
}
