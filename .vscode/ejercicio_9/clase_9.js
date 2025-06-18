function sumar(num1, num2) {
    return num1 + num2;
}

function restar(num1, num2) {
    return num1 - num2;
}

function multiplicar(num1, num2) {
    return num1 * num2;
}

function dividir(num1, num2) {
    if (num2 === 0) {
        return 'Error: División por cero';
    }
    return num1 / num2;
}

document.addEventListener('DOMContentLoaded', function() {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const sumaInput = document.getElementById('suma');
    const restaInput = document.getElementById('resta');
    const multiInput = document.getElementById('multi');
    const diviInput = document.getElementById('divi');

    num1Input.addEventListener('input', calcular);
    num2Input.addEventListener('input', calcular);

    function calcular() {
        const num1 = parseFloat(num1Input.value);
        const num2 = parseFloat(num2Input.value);

        sumaInput.value = sumar(num1, num2);
        restaInput.value = restar(num1, num2);
        multiInput.value = multiplicar(num1, num2);
        diviInput.value = dividir(num1, num2);
    }
});