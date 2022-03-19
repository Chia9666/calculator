let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;

const display_prev = document.querySelector("#display_prev");
const display_curr = document.querySelector("#display_curr");
const eqlButton = document.querySelector("#equalBtn");
const clrButton = document.querySelector("#clearBtn");
const dltButton = document.querySelector("#delBtn");
const pointButton = document.querySelector("#dotBtn");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");

eqlButton.addEventListener("click", () => evaluate());
pointButton.addEventListener("click", () => appendPoint());
dltButton.addEventListener("click", () => deleteNumber());
clrButton.addEventListener("click", () => clear());

numberButtons.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperation(button.textContent))
);

function appendNumber(number) {
  if (display_curr.textContent === "0" || shouldResetScreen) resetScreen();
  display_curr.textContent += number;
}

function resetScreen() {
  display_curr.textContent = "";
  shouldResetScreen = false;
}

function clear() {
  display_curr.textContent = "0";
  display_prev.textContent = "";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
}

function appendPoint() {
  if (shouldResetScreen) resetScreen();
  if (display_curr.textContent === "") display_curr.textContent = "0";
  if (display_curr.textContent.includes(".")) return;
  display_curr.textContent += ".";
}

function deleteNumber() {
  display_curr.textContent = display_curr.textContent.toString().slice(0, -1);
}

function setOperation(operator) {
  if (currentOperation !== null) evaluate();
  firstOperand = display_curr.textContent;
  currentOperation = operator;
  display_prev.textContent = `${firstOperand} ${currentOperation}`;
  shouldResetScreen = true;
}

function evaluate() {
  if (currentOperation === null || shouldResetScreen) return;
  if (currentOperation === "÷" && display_curr.textContent === "0") {
    alert("Error, you can't divide by 0!");
    return;
  }
  secondOperand = display_curr.textContent;
  display_curr.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  );
  display_prev.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return substract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
}
