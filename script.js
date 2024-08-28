let display = document.getElementById("display");
let onButton = document.getElementById("on");
let offButton = document.getElementById("off");
let functions = document.getElementById("function-container");

let powerState = false;

function add(a, b) {
    return a + b;
} 

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    if (operator == "+") return add(a, b);
    else if (operator == "-") return subtract(a, b);
    else if (operator == "*") return multiply(a, b);
    else if (operator == "/") return divide(a, b);
    else return "Invalid Operator";
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

functions.addEventListener("click", function(e) {
    console.log(e.target);
})


console.log(operate("+", 2, 3));
console.log(operate("-", 2, 3));
console.log(operate("*", 2, 3));
console.log(operate("/", 2, 3));