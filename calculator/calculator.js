let display = '0';

let operand1 = '';
let operand2 = '';
let operator = '';

let memory = 0;

let rpn = [];

document.getElementById('screenText').textContent = display;

const handleDisplayUpdate = (current, next) => {
    if (current === '0') {
        current = next;
    }
    else {
        current += next;
    }
    document.getElementById('screenText').textContent = current;
    return current;
};

const handleUpdatingCorrectOperand = (operand) => {
    if (!operand1 || (operand1 && !operator)) {
        operand1 += operand;
        return;
    }

    if ((!operand2 && operator) || (operand1 && operator)) {
        operand2 += operand;
        return;
    }
};

const checkToConvertInfixToRPN = () => {
    if (operand1 && operand2 && operator) {
        rpn.push(parseInt(operand1, 10));
        rpn.push(parseInt(operand2, 10));
        rpn.push(operator);

        operand1 = '';
        operand2 = '';
        operator = '';
        return true;
    }
    return false;
};

const selectOperator = (operator, remove) => {
    switch (operator) {
        case '+':
            if (!remove) 
                document.getElementById('add').classList.add(['selected']);
            else 
                document.getElementById('add').classList.remove(['selected']);
            break;
        case '-':
            if (!remove) 
                document.getElementById('sub').classList.add(['selected']);
            else 
                document.getElementById('sub').classList.remove(['selected']);
            break;
        case '/':
            if (!remove) 
                document.getElementById('divide').classList.add(['selected']);
            else 
                document.getElementById('divide').classList.remove(['selected']);
            break;
        case '*':
            if (!remove) 
                document.getElementById('times').classList.add(['selected']);
            else 
                document.getElementById('times').classList.remove(['selected']);
            break;
    }
    return;
};

const calculate = (op1, op2, operator) => {
    switch (operator) {
        case '+': 
            return op1 + op2;
        case '-':
            return op1 - op2;
        case '/':
            return op1 / op2;
        case '*': 
            return op1 * op2;
    }
};

document.addEventListener('click', (event) => {
    const eventType = event.target.value;

    switch (eventType) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            handleUpdatingCorrectOperand(eventType);
            display = handleDisplayUpdate(display, eventType);
            break;
        case 'ADD':
            if (operator) {
                checkToConvertInfixToRPN();
            }
            else {
                operator += '+';
                selectOperator('+');
                display = handleDisplayUpdate('0', '0');
            }
            break;
        case 'SUBTRACT':
            if (operator) {
                checkToConvertInfixToRPN();
            }
            else {
                operator += '-';
                selectOperator('-');
                display = handleDisplayUpdate('0', '0');
            }
            break;
        case 'DIVIDE':
            if (operator) {
                checkToConvertInfixToRPN();
            }
            else {
                operator += '/';
                selectOperator('/');
                display = handleDisplayUpdate('0', '0');
            }
            break;
        case 'MULTIPLY':
            if (operator) {
                checkToConvertInfixToRPN();
            }
            else {
                operator += '*';
                selectOperator('*');
                display = handleDisplayUpdate('0', '0');
            }
            break;
        case 'EVALUATE':
            if (checkToConvertInfixToRPN()) {
                const operator = rpn.pop();
                const op2 = rpn.pop();
                const op1 = rpn.pop();

                const result = calculate(op1, op2, operator);
                selectOperator(operator, true);
                display = handleDisplayUpdate('0', result.toString());
                operand1 = result.toString();
                rpn.push(result);
            }
            break;
        case 'CLEAR':
            operand1 = '';
            break;
        case 'ALL_CLEAR':
            rpn = [];
            operand1 = '';
            operand2 = '';
            operator = '';
            display = handleDisplayUpdate('0', '0');
            break;
        case 'MEMORY_ADD':
            memory = rpn[0];
            break;
        case 'MEMORY_RECALL':
            if (operand1 && !operand2) operand2 = memory;
            break;
    }


});