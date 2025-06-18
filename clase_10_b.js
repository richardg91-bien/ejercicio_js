const productos = [];

const form = document.getElementById("productoForm");
const listaDescuento = document.getElementById("listaDescuento");
const totalSinDescuento = document.getElementById("totalSinDescuento");
const resumen = document.getElementById("resumen");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Leer datos del formulario
  const nombre = form.nombre.value.trim();
  const precio = parseFloat(form.precio.value);
  const descuento = form.descuento.value === "true";

  // Validar
  if (nombre === "" || isNaN(precio) || precio < 0) {
    alert("Por favor, ingrese datos válidos.");
    return;
  }

  // Agregar producto a la lista
  productos.push({ nombre, precio, descuento });

  // Limpiar formulario
  form.reset();

  // Actualizar la vista
  mostrarResultados();
});

function mostrarResultados() {
  // Vaciar lista y reseteos
  listaDescuento.innerHTML = "";
  let contadorConDescuento = 0;
  let contadorSinDescuento = 0;

  // Recorrer productos
  for (const producto of productos) {
    if (producto.descuento) {
      const li = document.createElement("li");
      li.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
      listaDescuento.appendChild(li);
      contadorConDescuento++;
    } else {
      contadorSinDescuento++;
    }
  }

  totalSinDescuento.textContent = `Total de productos sin descuento: ${contadorSinDescuento}`;
  resumen.textContent = `Resumen: ${contadorConDescuento} productos con descuento y ${contadorSinDescuento} sin descuento.`;
}
