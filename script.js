const display = document.querySelector('.display');
let currentInput = '';
let firstOperand = '';
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

function updateDisplay(value) {
    display.textContent = value.toString().slice(0, 12);
}

function clearAll() {
    currentInput = '';
    firstOperand = '';
    currentOperator = null;
    resultDisplayed = false;
    updateDisplay('0');
}

function clearEntry() {
    currentInput = currentInput.slice(0, -1);
    const displayValue = firstOperand + (currentOperator ? ' ' + currentOperator + ' ' : '') + currentInput;
    updateDisplay(displayValue.trim() || '0');
}

function handleNumber(number) {
    if (resultDisplayed) {
        currentInput = '';
        resultDisplayed = false;
    }
    if (currentInput.length >= 12) return;
    currentInput += number;
    updateDisplay(firstOperand + (currentOperator ? ' ' + currentOperator + ' ' : '') + currentInput);
}

function handleDecimal() {
    if (resultDisplayed) {
        currentInput = '0';
        resultDisplayed = false;
    }
    if (!currentInput.includes('.')) {
        currentInput += currentInput === '' ? '0.' : '.';
        updateDisplay(firstOperand + (currentOperator ? ' ' + currentOperator + ' ' : '') + currentInput);
    }
}

function handleOperator(operator) {
    if (currentInput === '') return;

    if (firstOperand === '') {
        firstOperand = currentInput;
        currentOperator = operator;
        currentInput = '';
        updateDisplay(firstOperand + ' ' + currentOperator);
    } else if (!currentOperator) {
        currentOperator = operator;
        updateDisplay(firstOperand + ' ' + currentOperator);
    }
}

function handleEquals() {
    if (firstOperand === '' || currentOperator === null || currentInput === '') return;

    const result = operate(currentOperator, firstOperand, currentInput);
    updateDisplay(result);
    firstOperand = result.toString();
    currentInput = '';
    currentOperator = null;
    resultDisplayed = true;
}

function handlePlusMinus() {
    if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay(firstOperand + (currentOperator ? ' ' + currentOperator + ' ' : '') + currentInput);
    }
}

function handlePercent() {
    if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay(firstOperand + (currentOperator ? ' ' + currentOperator + ' ' : '') + currentInput);
    }
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;

        if (button.classList.contains('number')) {
            handleNumber(value);
        }
        if (button.classList.contains('operator')) {
            let op = value;
            if (op === '×') op = '*';
            if (op === '÷') op = '/';
            handleOperator(op);
        }
        if (button.classList.contains('equals')) handleEquals();
        if (button.classList.contains('function')) {
            if (button.classList.contains('ce')) clearEntry();
            else if (button.classList.contains('c')) clearAll();
            else if (button.classList.contains('decimal')) handleDecimal();
            else if (button.classList.contains('plus-minus')) handlePlusMinus();
        }
        if (button.classList.contains('percent')) handlePercent();
    });
});
