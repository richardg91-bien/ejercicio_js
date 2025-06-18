function calcularPrecioConIVA(precio, iva = 21) {
  const precioConIVA = precio + (precio * iva) / 100;
  const mensaje = `El precio total con IVA (${iva}%) es: $${precioConIVA.toFixed(2)}`;
  console.log(mensaje);
  return mensaje;
}

document.getElementById("ivaForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const precio = parseFloat(this.precio.value);
  let iva = this.iva.value.trim();

  if (isNaN(precio) || precio < 0) {
    alert("Por favor, ingrese un precio válido.");
    return;
  }

  iva = iva === "" ? 21 : parseFloat(iva);

  if (isNaN(iva) || iva < 0) {
    alert("Por favor, ingrese un porcentaje de IVA válido.");
    return;
  }

  const resultado = calcularPrecioConIVA(precio, iva);
  document.getElementById("resultado").textContent = resultado;
});
