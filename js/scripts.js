// JavaScript para la Landing Page de Tienda de Ropa

// ===============================
// Funcionalidad de Lista de Deseos
// Adaptación de clase_10_b.js y clase_12_b.js
// ===============================

// Array para almacenar los items de la lista de deseos (se sincronizará con localStorage)
let listaDeseos = [];

// Referencias a elementos del DOM para la lista de deseos
const listaDeseosUL = document.getElementById('miLista'); // ID del UL en el HTML
const listaDeseosContainer = document.querySelector('.wishlist-display'); // Clase del contenedor de la lista de deseos
const ivaTotalDisplay = document.getElementById('iva-total-display'); // Elemento para mostrar el IVA total
const totalFinalDisplay = document.getElementById('total-final-display'); // Elemento para mostrar el total final
const btnClearWishlist = document.getElementById('btn-clear-wishlist'); // Botón para vaciar la lista

// Cargar la lista de deseos desde localStorage al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const storedListaDeseos = localStorage.getItem('listaDeseos');
    if (storedListaDeseos) {
        listaDeseos = JSON.parse(storedListaDeseos);
    }
    mostrarListaDeseos(); // Mostrar la lista cargada (o ocultar si está vacía)

    // Inicializar la visibilidad del botón de vaciar lista
    if (btnClearWishlist) {
         btnClearWishlist.style.display = listaDeseos.length > 0 ? 'block' : 'none';
    }
});

// Seleccionar todos los botones con la clase 'btn-wishlist'
document.querySelectorAll('.btn-wishlist').forEach(button => {
    button.addEventListener('click', function() {
        // Obtener datos del producto usando atributos data-* en el botón
        const nombre = this.getAttribute('data-nombre');
        const precio = this.getAttribute('data-precio');

        if (nombre && precio) {
             // Añadir el producto al array de lista de deseos
            const productoExistente = listaDeseos.find(item => item.nombre === nombre);

            if (productoExistente) {
                // Si el producto ya existe, incrementar la cantidad
                productoExistente.cantidad++;
            } else {
                // Si el producto no existe, añadirlo con cantidad 1
                listaDeseos.push({ nombre, precio: parseFloat(precio), cantidad: 1 });
            }

            // Guardar la lista de deseos actualizada en localStorage
            guardarListaDeseos();

            // Actualizar la vista en la página (ahora llamada después de guardar)
            // Se llama dentro de guardarListaDeseos para consistencia
            // mostrarListaDeseos(); // Esta llamada se mueve o elimina

            // Notificación simple (considerar reemplazar alert por algo menos intrusivo)
            alert(`${nombre} ha sido añadido a tu Lista de Deseos`);
        } else {
            console.error("Faltan atributos data-nombre o data-precio en el botón 'Añadir a Lista de Deseos'.");
        }
    });
});


// Función para mostrar los items en la lista de deseos en el HTML y calcular totales
function mostrarListaDeseos() {
    // Limpiar la lista actual en el HTML
    if (listaDeseosUL) {
        listaDeseosUL.innerHTML = '';

        let subtotalGeneral = 0; // Inicializar subtotal general AQUI

        if (listaDeseos.length > 0) {
             // Mostrar el contenedor de la lista de deseos si hay items
            if (listaDeseosContainer) {
                listaDeseosContainer.style.display = 'block';
            }

            // Iterar sobre el array y crear elementos de lista para cada item
            listaDeseos.forEach(item => {
                const li = document.createElement('li');
                const precioUnitario = item.precio;
                const cantidad = item.cantidad;
                const subtotal = precioUnitario * cantidad;

                subtotalGeneral += subtotal; // Sumar al subtotal general AQUI

                // Crear elementos internos para la presentación tabular
                const nombreSpan = document.createElement('span');
                nombreSpan.textContent = item.nombre;
                nombreSpan.classList.add('item-name'); // Usar las clases para estilizar

                const cantidadSpan = document.createElement('span');
                cantidadSpan.textContent = `Cantidad: ${cantidad}`;
                cantidadSpan.classList.add('item-qty'); // Usar las clases para estilizar

                const precioUnitarioSpan = document.createElement('span');
                precioUnitarioSpan.textContent = `P. Unitario: $${precioUnitario.toFixed(2)}`;
                precioUnitarioSpan.classList.add('item-price'); // Usar las clases para estilizar

                const subtotalSpan = document.createElement('span');
                subtotalSpan.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
                subtotalSpan.classList.add('item-subtotal'); // Usar las clases para estilizar

                // Añadir los spans al li
                li.appendChild(nombreSpan);
                li.appendChild(cantidadSpan);
                li.appendChild(precioUnitarioSpan);
                li.appendChild(subtotalSpan);

                listaDeseosUL.appendChild(li);
            });

             // Después de iterar, calcular y mostrar totales
            const ivaRate = 21; // Tasa de IVA (puedes ajustarla o hacerla variable)
            const ivaTotal = (subtotalGeneral * ivaRate) / 100; // Calcular el monto del IVA
            const totalFinal = subtotalGeneral + ivaTotal;

            if (ivaTotalDisplay && totalFinalDisplay) {
                ivaTotalDisplay.textContent = `$${ivaTotal.toFixed(2)}`;
                totalFinalDisplay.textContent = `$${totalFinal.toFixed(2)}`;
            }

            // Mostrar el botón de vaciar lista si hay items
            if (btnClearWishlist) {
                btnClearWishlist.style.display = 'block';
            }

        } else { // Si la lista de deseos está vacía
            // Ocultar el contenedor y resetear totales y botón
            if (listaDeseosContainer) {
                listaDeseosContainer.style.display = 'none';
            }
            if (ivaTotalDisplay && totalFinalDisplay) {
                ivaTotalDisplay.textContent = '$0.00';
                totalFinalDisplay.textContent = '$0.00';
            }
             if (btnClearWishlist) {
                btnClearWishlist.style.display = 'none';
            }
        }
    } else {
        console.error("Elemento con ID 'miLista' no encontrado.");
    }
}

// Función para guardar la lista de deseos actual en localStorage
function guardarListaDeseos() {
    // Convertir el array a una cadena JSON y guardarla
    try {
        localStorage.setItem('listaDeseos', JSON.stringify(listaDeseos));
        // Después de guardar, actualizar la vista para reflejar los cambios (cantidad o nuevo item)
        mostrarListaDeseos(); // Llamar a mostrarListaDeseos AQUI
    } catch (e) {
        console.error("Error al guardar en localStorage:", e);
        // Podrías mostrar un mensaje al usuario si el localStorage está lleno
        if (e.name === 'QuotaExceededError') {
            alert('Tu lista de deseos es demasiado grande. Por favor, elimina algunos elementos.');
        }
    }
}


// ===============================
// Funcionalidad de Suscripción
// Adaptación de control_acceso.html y clase_10_A.js
// ===============================

// Referencias a elementos del DOM para el formulario de suscripción
const suscripcionForm = document.getElementById('accesoForm'); // ID del formulario en el HTML
const suscripcionResultado = document.getElementById('resultado-suscripcion'); // ID del párrafo de resultado en el HTML

// Añadir event listener al formulario de suscripción
if (suscripcionForm) {
    suscripcionForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar la recarga de la página al enviar el formulario

        const emailInput = document.getElementById('email'); // ID del input de email en el HTML
        const email = emailInput ? emailInput.value.trim() : '';

        // Validar si se encontró el input de email y si el email es válido
        if (!emailInput || email === '' || !email.includes('@') || !email.includes('.')) {
            if (suscripcionResultado) {
                suscripcionResultado.textContent = 'Por favor, introduce un correo electrónico válido.';
                suscripcionResultado.style.color = 'red';
            }
            return; // Detener el proceso si la validación falla
        }

        // Simulación de envío de datos (aquí iría la lógica real para enviar el email)
        console.log(`Intento de suscripción con correo: ${email}`);

        // Mostrar mensaje de éxito
        if (suscripcionResultado) {
            suscripcionResultado.textContent = `¡Gracias por suscribirte, ${email}! Te enviaremos ofertas exclusivas.`;
            suscripcionResultado.style.color = 'green';
        }

        // Limpiar el formulario después del envío (simulado)
        suscripcionForm.reset();
    });
} else {
    console.error("Formulario con ID 'accesoForm' no encontrado.");
}


// ===============================
// Funcionalidad de Cálculo de IVA
// Adaptación de clase_11_B.js (como utilidad)
// ===============================

// Función para calcular el precio con IVA
function calcularPrecioConIVA(precio, iva = 21) {
  if (typeof precio !== 'number' || precio < 0) {
    console.error("Precio inválido para calcular IVA.");
    return null; // O manejar el error de otra manera
  }
  // Esta función originalmente devolvía el precio TOTAL con IVA.
  // Para obtener solo el MONTO del IVA, necesitaríamos (precio * iva) / 100
  const montoIVA = (precio * iva) / 100;
  return montoIVA; // Devolver solo el monto del IVA
}

// Ejemplo de uso (no visible en la página, solo para referencia o uso interno)
// const precioOriginal = 50;
// const montoIVAejemplo = calcularPrecioConIVA(precioOriginal);
// if (montoIVAejemplo !== null) {
//     console.log(`El monto de IVA para $${precioOriginal} con 21% es: $${montoIVAejemplo.toFixed(2)}`);
// }


// ===============================
// Funcionalidad de Vaciar Lista de Deseos
// ===============================

if (btnClearWishlist) {
    btnClearWishlist.addEventListener('click', () => {
        listaDeseos = []; // Vaciar el array
        localStorage.removeItem('listaDeseos'); // Eliminar de localStorage
        mostrarListaDeseos(); // Actualizar la vista (esto la ocultará y reseteará totales)
    });
}

// ===============================
// Otras Funcionalidades de Clases Anteriores (Opcional)
// Comentadas a menos que se defina un caso de uso específico
// ===============================

// Adaptación de clase_12_A.js (Cambiar Texto)
// Si tienes un elemento en el HTML con ID \'miParrafo\' y un botón con ID \'btnCambiarTexto\',
// puedes descomentar y adaptar este código si quieres que el botón cambie el texto del párrafo.
/*
const miParrafoEjemplo = document.getElementById('miParrafo');
const btnCambiarTextoEjemplo = document.getElementById('btnCambiarTexto');

if (btnCambiarTextoEjemplo && miParrafoEjemplo) {
    btnCambiarTextoEjemplo.addEventListener('click', function() {
        miParrafoEjemplo.textContent = "Texto del párrafo modificado por JavaScript.";
    });
} else {
    // console.log("Elementos para cambiar texto no encontrados (miParrafo o btnCambiarTexto).");
}
*/

// Adaptación de clase_9.js (Operaciones Aritméticas)
// Las operaciones aritméticas no tienen una aplicación obvia en esta landing page.
// Si necesitas realizar cálculos específicos (ej. en una calculadora de tallas),
// puedes adaptar esta lógica y vincularla a los elementos HTML correspondientes.
/*
document.addEventListener('DOMContentLoaded', () => {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const sumaInput = document.getElementById('suma');

    if (num1Input && num2Input && sumaInput) {
        // Ejemplo básico: Calcular suma al cargar (necesitaría un evento input o button para actualizar)
        const numero1 = parseInt(num1Input.value) || 0;
        const numero2 = parseInt(num2Input.value) || 0;
        sumaInput.value = numero1 + numero2;

        // Para que se actualice al cambiar los inputs:
        const calcularSuma = () => {
             const n1 = parseInt(num1Input.value) || 0;
             const n2 = parseInt(num2Input.value) || 0;
             sumaInput.value = n1 + n2;
        };

        num1Input.addEventListener('input', calcularSuma);
        num2Input.addEventListener('input', calcularSuma);

    } else {
         // console.log("Elementos para operaciones aritméticas no encontrados.");
    }
});
*/
