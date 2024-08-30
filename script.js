let display = document.getElementById("display");
let onButton = document.getElementById("on");
let offButton = document.getElementById("off");
let operators = document.getElementsByClassName("operator");
let numbers = document.getElementsByClassName("number");

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
            firstOperand = firstOperand + input.toString();
            console.log(`FirstOperand is ${firstOperand}`);
        }
        else if (containFirstValue == true) {
            secondOperand = secondOperand + input.toString();
            containSecondValue = true;
            console.log(`SecondOperand is ${secondOperand}`);
        }
}

function addOperator(input) { 
        if (containFirstValue == false || containSecondValue == false) {
            containFirstValue = true;
            operator = input;
            console.log(`Operator is ${operator}`);
        }
        else if (containFirstValue == true && containSecondValue == true) {
            operator = input;
            firstOperand = operate(operator, Number(firstOperand), Number(secondOperand));
            console.log(firstOperand);
            operator = "";
            containOperator = false;
            secondOperand = ""
            containSecondValue = false;
        }
}

onButton.addEventListener("click", () => {
    if (powerState == false) {
        powerState = true;
        let output = (document.createElement("p"));
        display.appendChild(output);
        output.appendChild(document.createTextNode("0"));
    }
})

offButton.addEventListener("click", () => {
    if (powerState == true) {
        powerState = false;
        display.replaceChildren();
    }
})

Array.from(operators).forEach(element => {
    element.addEventListener("click", function(e) {
        addOperator(e.target.value);
    })
})

Array.from(numbers).forEach(element => {
    element.addEventListener("click", function(e) {
        addNumber(e.target.value);
    })
})