function operations(firstNumber, secondNumber, operation){

    let result

    if (operation == "+") {

        result = firstNumber + secondNumber
    }

    else if (operation == "-") {

        result = firstNumber - secondNumber
    }

    else if (operation == "x") {

        result = firstNumber * secondNumber
    }

    else if (operation == "÷") {

        result = firstNumber / secondNumber
    }

    return result
}

function calculate() {

    let firstNumber = parseInt(document.getElementById("number1").value) 

    let secondNumber = parseInt(document.getElementById("number2").value)

    let operation = document.getElementById("operation").value

    let result = operations(firstNumber, secondNumber, operation)

    document.getElementById("message").innerHTML = result
}