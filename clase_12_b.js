const boton = document.getElementById("btnAgregar");
const lista = document.getElementById("miLista");

boton.addEventListener("click", function () {
  const nuevoElemento = document.createElement("li");
  nuevoElemento.textContent = "Nuevo Elemento";
  lista.appendChild(nuevoElemento);
  alert("Se ha añadido un nuevo elemento");
});
