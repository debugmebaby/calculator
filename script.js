const display = document.querySelector('.display');
let currentInput = '';
let firstOperand = '';
let currentOperator = '';
let resultDisplayed = false;

function updateDisplay(value) {
  display.textContent = value;
}

function clearAll() {
  currentInput = '';
  firstOperand = '';
  currentOperator = '';
  resultDisplayed = false;
  updateDisplay('0');
}

function deleteLast() {
  if (resultDisplayed) return;
  currentInput = currentInput.slice(0, -1);
  updateDisplay(firstOperand + (currentOperator ? ' ' + currentOperator + ' ' : '') + currentInput);
}

function handleNumber(number) {
  if (resultDisplayed) {
    // Nollställ om man börjar skriva ny siffra efter "="
    currentInput = '';
    firstOperand = '';
    currentOperator = '';
    resultDisplayed = false;
    updateDisplay('');
  }

  if (currentInput.length >= 15) return;
  currentInput += number;
  updateDisplay(firstOperand + (currentOperator ? ' ' + currentOperator + ' ' : '') + currentInput);
}

function handleOperator(operator) {
  if (resultDisplayed) {
    // Fortsätt från tidigare resultat
    currentInput = '';
    currentOperator = operator;
    resultDisplayed = false;
    updateDisplay(firstOperand + ' ' + currentOperator + ' ');
    return;
  }

  if (currentInput === '' && firstOperand !== '') {
    currentOperator = operator;
    updateDisplay(firstOperand + ' ' + currentOperator);
  } else if (currentInput !== '') {
    firstOperand = currentInput;
    currentOperator = operator;
    currentInput = '';
    updateDisplay(firstOperand + ' ' + currentOperator);
  }
}

function calculate() {
  if (firstOperand === '' || currentOperator === '' || currentInput === '') return;

  const a = parseFloat(firstOperand);
  const b = parseFloat(currentInput);
  let result = 0;

  switch (currentOperator) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case '×':
    case '*':
      result = a * b;
      break;
    case '÷':
    case '/':
      if (b === 0) {
        updateDisplay("You wish 🧙‍♂️");
        return;
      }
      result = a / b;
      break;
    default:
      return;
  }

  result = Math.round(result * 100000000) / 100000000; // Begränsa decimaler
  updateDisplay(result.toString());
  firstOperand = result.toString();
  currentInput = '';
  currentOperator = '';
  resultDisplayed = true;
}

function handlePercent() {
  if (currentInput !== '') {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay(firstOperand + (currentOperator ? ' ' + currentOperator + ' ' : '') + currentInput);
  }
}

function toggleSign() {
  if (currentInput !== '') {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay(firstOperand + (currentOperator ? ' ' + currentOperator + ' ' : '') + currentInput);
  }
}

// Event listeners
document.querySelectorAll('.btn.number').forEach(btn =>
  btn.addEventListener('click', () => handleNumber(btn.textContent))
);

document.querySelectorAll('.btn.operator').forEach(btn =>
  btn.addEventListener('click', () => handleOperator(btn.textContent))
);

document.querySelector('.btn.equals').addEventListener('click', calculate);
document.querySelector('.btn.clear').addEventListener('click', clearAll);
document.querySelector('.btn.delete').addEventListener('click', deleteLast);
document.querySelector('.btn.percent').addEventListener('click', handlePercent);
document.querySelector('.btn.sign').addEventListener('click', toggleSign);
