const display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = null;

const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number') || value === ',') {
            handleNumber(value);
        } else if (button.classList.contains('operator')) {
            handleOperator(value);
        } else if (value === '=') {
            calculate();
        } else if (value === 'AC') {
            clearAll();
        }
    });
});

function handleNumber(value) {
    currentInput += value;
    display.textContent = currentInput;
}

function handleOperator(op) {
    if (currentInput === '') return;
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result = 0;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput.replace(',', '.'));

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '×':
            result = prev * curr;
            break;
        case '÷':
            result = prev / curr;
            break;
    }

    display.textContent = result;
    previousInput = '';
    currentInput = result;
}

function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = null;
    display.textContent = '0';
}
