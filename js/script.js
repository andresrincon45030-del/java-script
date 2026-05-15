function message(text) {

    document.getElementById("message").innerHTML = text
}

function operations(firstNumber, secondNumber, operation) {

    if (operation == "+") {
        message("El resultado es: " + (firstNumber + secondNumber))
    }
    else if (operation == "-") {
        message("El resultado es: " + (firstNumber - secondNumber))
    }
    else if (operation == "*") {
        message("El resultado es: " + (firstNumber * secondNumber))
    }
    else if (operation == "/") {
        message("El resultado es: " + (firstNumber / secondNumber))
    }
}

function calculate() {

    let firstNumber = parseInt(document.getElementById("number1").value)
    let secondNumber = parseInt(document.getElementById("number2").value)
    let operation = document.getElementById("operation").value

    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        message("No se pudo realizar la operacion")
    }
    else {
        operations(firstNumber, secondNumber, operation)
    }
}