"use strict";

const CLAVE_SESION = "orbit-sesion";

function abrirModal(id) {
  bootstrap.Modal.getOrCreateInstance(document.getElementById(id)).show();
}

function sesionActual() {
  return sessionStorage.getItem(CLAVE_SESION) || localStorage.getItem(CLAVE_SESION);
}

const formLogin = document.getElementById("form-login");

if (formLogin) {
  const panelSesion = document.getElementById("sesion-activa");
  const emailSesion = document.getElementById("sesion-email");
  const botonCerrar = document.getElementById("cerrar-sesion");

  function mostrarEstado() {
    const email = sesionActual();
    formLogin.hidden = Boolean(email);
    panelSesion.hidden = !email;
    emailSesion.textContent = email || "";
  }

  formLogin.addEventListener("submit", (evento) => {
    evento.preventDefault();
    formLogin.classList.add("was-validated");
    if (!formLogin.checkValidity()) return;

    const email = formLogin.email.value.trim();
    sessionStorage.setItem(CLAVE_SESION, email);
    if (formLogin.recordar.checked) {
      localStorage.setItem(CLAVE_SESION, email);
    } else {
      localStorage.removeItem(CLAVE_SESION);
    }

    mostrarEstado();
    abrirModal("modal-login");
  });

  botonCerrar.addEventListener("click", () => {
    sessionStorage.removeItem(CLAVE_SESION);
    localStorage.removeItem(CLAVE_SESION);
    formLogin.reset();
    formLogin.classList.remove("was-validated");
    mostrarEstado();
  });

  mostrarEstado();
}

const formRegistro = document.getElementById("form-registro");

if (formRegistro) {
  const password = document.getElementById("registro-password");
  const repetir = document.getElementById("registro-repetir");

  formRegistro.addEventListener("submit", (evento) => {
    evento.preventDefault();

    repetir.setCustomValidity(password.value === repetir.value ? "" : "no-coincide");
    formRegistro.classList.add("was-validated");
    if (!formRegistro.checkValidity()) return;

    formRegistro.reset();
    formRegistro.classList.remove("was-validated");
    abrirModal("modal-registro");
  });

  repetir.addEventListener("input", () => {
    repetir.setCustomValidity("");
  });
}
