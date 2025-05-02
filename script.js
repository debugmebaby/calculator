const display = document.querySelector('.display');
let currentInput = '';
let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let resultDisplayed = false;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b === 0 ? "bruh..." : a / b;

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return "lol NaN";
    }
}

function updateDisplay (value){
   display.textContent = value.toString().slice(0, 12);
}

function clearAll(){
  currentInput = '';
  firstOperand = '';
  secondOperand = '';
  currentOperator = null;
  resultDisplayed = false;
   updateDisplay('0');
}

function clearEntry() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(firstOperand + (currentOperator ? '' + currentOperator + '' : '') + currentInput || '0');
}

function handlerNumber(number) {
  if(resultDisplayed){
    currentInput = '';
    resultDisplayed = false;
  }
  if (currentInput.length >= 12) return;
  currentInput += number;
  updateDisplay(firstOperand + (currentOperator ? ' ' + currentOperator + ' ' : '') + currentInput);
}


function handleDecimal(){
  if (resultDisplayed){
    currentInput = '0';
    resultDisplayed = false;
  }
  if (!currentInput.includes('.')){
    currentInput += currentInput === '' ? '0.' : '.';
    updateDisplay(firstOperand + (currentOperator ? ' ' + currentOperator + ' ' : '') + currentInput);
  }
}

function handleOperator(operator){
  if(currentInput === '') return;

  if(firstOperand === ''){
    firstOperand = currentInput;
    currentOperator = currentInput;
    currentInput = '';
    updateDisplay(firstOperand + '' + currentOperator);
  } else if (!currentOperator){
    currentOperator = operator;
    updateDisplay(firstOperand + '' + currentOperator);
  }
}

