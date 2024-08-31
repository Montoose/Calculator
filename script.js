let calcDisplay = document.getElementById("display-calculation");
let numberDisplay = document.getElementById("display-current-number");
let onButton = document.getElementById("on");
let offButton = document.getElementById("off");
let operatorButton = document.getElementsByClassName("operator");
let numberButton = document.getElementsByClassName("number");
let equalButton = document.getElementById("equal");
let clearButton = document.getElementById("clear");
let backspaceButton = document.getElementById("backspace");

let powerState = false;
let currentNumber = "";
let firstOperand = "";
let secondOperand = "";
let operator = "";
let containFirstValue = false;
let containOperator = false;

function operate(operator, a, b) {
    let operation;
    
    if (operator == "+") operation = a + b;
    else if (operator == "-") operation = a - b;
    else if (operator == "x") operation = a * b;
    else if (operator == "/") operation = a / b;
    else return "Invalid Operator";

    return operation.toFixed(6);
}

function addCurrentNumber(input) {
    if (currentNumber.length < 15) {
        if (containFirstValue == true) displayOperatorOperand();
        currentNumber = currentNumber + input.toString();
        displayCurrentNumber();
    }
}

function editCurrentNumber(input) {
    if(currentNumber != "") {
        currentNumber = currentNumber.slice(0, -1);
        displayCurrentNumber();
    }
}

function addOperator(input) { 
    
    if (containFirstValue == false) {
        if (currentNumber == "") firstOperand = "0";
        else firstOperand = currentNumber;
        operator = input;
        
        containFirstValue = true;
        containOperator = true;
        
        displayOperatorOperand();
        currentNumber = "";
    }

    else if (containFirstValue == true && currentNumber == "") {
        operator = input;
        numberDisplay.replaceChildren(document.createTextNode(currentNumber));
        displayOperatorOperand();
    }

    else if (containFirstValue == true && currentNumber.length > 0) {
        secondOperand = currentNumber;
        operator = input;

        currentNumber = operate(operator, Number(firstOperand), Number(secondOperand));

        displayResult();
        displayCurrentNumber();
        
        firstOperand = currentNumber;
        currentNumber = "";
        secondOperand = "";
    }
}

function equalCalculate() {
    if (containFirstValue == true && currentNumber.length > 0 && containOperator == true) {
        secondOperand = currentNumber;
        currentNumber = operate(operator, Number(firstOperand), Number(secondOperand));
        
        displayResult();
        displayCurrentNumber();
        
        firstOperand = currentNumber;
        secondOperand = "";
        currentNumber = "";
    }
}

function displayCurrentNumber() {
    numberDisplay.replaceChildren(document.createTextNode(currentNumber));
}

function displayOperatorOperand() {
    let math = `${firstOperand} ${operator}`;
    calcDisplay.replaceChildren(document.createTextNode(math));
}

function displayResult() {
    let math = `${firstOperand} ${operator} ${secondOperand} = `;
    calcDisplay.replaceChildren(document.createTextNode(math));
}

function resetCalculator() {
    numberDisplay.replaceChildren();
    calcDisplay.replaceChildren();
    currentNumber = "";
    secondOperand = "";
    operator = "";
    containFirstValue = false;
    containOperator = false;
}

onButton.addEventListener("click", () => {
    if (powerState == false) {
        powerState = true;
        numberDisplay.appendChild(document.createTextNode("Try Me."));
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
    numberDisplay.appendChild(document.createTextNode(`${currentNumber}`));
})

Array.from(operatorButton).forEach(element => {
    element.addEventListener("click", function(e) {
        if (powerState == true) addOperator(e.target.value);
    })
})

Array.from(numberButton).forEach(element => {
    element.addEventListener("click", function(e) {
        if (powerState == true) addCurrentNumber(e.target.value);
    })
})

equalButton.addEventListener("click", () => {
    equalCalculate();
})

backspaceButton.addEventListener("click", () => {
    editCurrentNumber();
})