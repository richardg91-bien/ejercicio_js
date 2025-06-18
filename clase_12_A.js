// Seleccionamos el botón y el párrafo
const boton = document.getElementById("btnCambiarTexto");
const parrafo = document.getElementById("miParrafo");

// Agregamos el event listener al botón
boton.addEventListener("click", function () {
  parrafo.textContent = "El texto ha sido modificado con JavaScript";
});
