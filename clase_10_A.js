document.getElementById('accesoForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar recarga

  const edadInput = document.getElementById('edad').value.trim();
  const edad = parseInt(edadInput);

  // Validar edad
  if (isNaN(edad) || edad < 0) {
    document.getElementById('resultado').textContent = 'Por favor, ingrese una edad válida.';
    return;
  }

  // Obtener valor VIP seleccionado
  const vipRadios = document.getElementsByName('vip');
  let esVIP = false;
  for (const radio of vipRadios) {
    if (radio.checked) {
      esVIP = radio.value === 'sí';
      break;
    }
  }

  // Evaluar condiciones con operador ternario
  const mensaje = edad >= 18
    ? (esVIP ? 'Acceso permitido al área exclusiva VIP.' : 'Acceso permitido al evento.')
    : 'Acceso denegado. Debe ser mayor de 18 años.';

  document.getElementById('resultado').textContent = mensaje;
});
