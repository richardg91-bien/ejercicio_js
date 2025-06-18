function verificarEdad(nombre, edad) {
  if (edad >= 18) {
    const msg = `${nombre} es mayor de edad.`;
    console.log(msg);
    return msg;
  } else {
    const añosFaltantes = 18 - edad;
    const msg = `${nombre} es menor de edad. Le faltan ${añosFaltantes} años para cumplir 18.`;
    console.log(msg);
    return msg;
  }
}

document.getElementById("edadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = this.nombre.value.trim();
  const edad = parseInt(this.edad.value);

  if (nombre === "" || isNaN(edad) || edad < 0) {
    alert("Por favor, ingrese un nombre válido y una edad correcta.");
    return;
  }

  const resultado = verificarEdad(nombre, edad);
  document.getElementById("resultado").textContent = resultado;
});
