let display = document.getElementById("display");
let onButton = document.getElementById("on");
let offButton = document.getElementById("off");
let operators = document.getElementsByClassName("operator");
let numbers = document.getElementsByClassName("number");
let equalButton = document.getElementById("equal");
let clearButton = document.getElementById("clear");

let powerState = false;
let firstOperand = "";
let secondOperand = "";
let operator = "";
let containFirstValue = false;
let containSecondValue = false;
let containOperator = false;

function operate(operator, a, b) {
    if (operator == "+") return a + b;
    else if (operator == "-") return a - b;
    else if (operator == "*") return a * b;
    else if (operator == "/") return a / b;
    else return "Invalid Operator";
}

function addNumber(input) {
        if (containFirstValue == false && firstOperand.length < 7) {
            if (firstOperand == "0") firstOperand = "";
            firstOperand = firstOperand + input.toString();
            displayMath();
        }
        else if (containFirstValue == true) {
            secondOperand = secondOperand + input.toString();
            containSecondValue = true;
            displayMath();
        }
}

function addOperator(input) { 

        if (containFirstValue == false || containSecondValue == false) {
            if (firstOperand == "") firstOperand = "0";
            containFirstValue = true;
            operator = input;
            containOperator = true;
            displayMath();
        }
        else if (containFirstValue == true && containSecondValue == true) {
            operator = input;
            firstOperand = operate(operator, Number(firstOperand), Number(secondOperand));
            secondOperand = ""
            displayMath();
            containSecondValue = false;
        }
}

function equalCalculate() {
    if (containFirstValue == true && containSecondValue == true && containOperator == true) {
        firstOperand = operate(operator, Number(firstOperand), Number(secondOperand));
        secondOperand = ""
        displayMath();
        containSecondValue = false;
    }
}

function displayMath() {
    let math = `${firstOperand} ${operator} ${secondOperand}`;
    display.replaceChildren(document.createTextNode(math));
}

function resetCalculator() {
    display.replaceChildren();
    firstOperand = "";
    secondOperand = "";
    operator = "";
    containFirstValue = false;
    containSecondValue = false;
    containOperator = false;
}

onButton.addEventListener("click", () => {
    if (powerState == false) {
        powerState = true;
        display.appendChild(document.createTextNode("Try Me."));
    }
})

offButton.addEventListener("click", () => {
    if (powerState == true) {
        powerState = false;
        resetCalculator();
    }
})

clearButton.addEventListener("click", () => {
    resetCalculator();
    firstOperand = "0";
    display.appendChild(document.createTextNode(`${firstOperand}`));
})

Array.from(operators).forEach(element => {
    element.addEventListener("click", function(e) {
        if (powerState == true) addOperator(e.target.value);
    })
})

Array.from(numbers).forEach(element => {
    element.addEventListener("click", function(e) {
        if (powerState == true) addNumber(e.target.value);
    })
})

equalButton.addEventListener("click", () => {
    equalCalculate();
})