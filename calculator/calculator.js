let calculator = {
    operand1: '',
    operand2: '',
    operatorValue: '',

    operatorValueMappings: {
        'DIVIDE': 'divide',
        'MULTIPLY': 'times',
        'ADD': 'add',
        'SUBTRACT': 'sub',
    },

    add: (op1, op2) => { return op1 + op2; },
    sub: (op1, op2) => { return op1 - op2; },
    times: (op1, op2) => { return op1 * op2; },
    divide: (op1, op2) => { return op1 / op2; },

    clearScreen: () => {
        document.getElementById('screenText').textContent = '0';
    },

    evaluate: () => {
        let result = 0;
        if (operandStateMachine.canBeEvaluated()) {
            result = calculator[calculator.operatorValueMappings[calculator.operatorValue]](parseInt(calculator.operand1), parseInt(calculator.operand2));
        }

        return result;
    },

    updateStateMachine: (stateUpdate) => operandStateMachine[stateUpdate.key] = stateUpdate.value,

    updateScreen: (v) => document.getElementById('screenText').textContent = v.toString(),

    initializeScreen: () => document.getElementById('screenText').textContent = '0',
};

let operandStateMachine = {
    setOperand1: false,
    setOperator: false,
    setOperand2: false,
    setEvaluateState: false,
    canBeEvaluated: () => operandStateMachine.setOperand1 && operandStateMachine.setOperand2 && operandStateMachine.setOperator,
    noStateSet: () => !operandStateMachine.setOperand1 && !operandStateMachine.setOperand2 && !operandStateMachine.setOperator,

    operand1State: () => operandStateMachine.setOperand1 && !operandStateMachine.setOperand2 && !operandStateMachine.setOperator,
    operand2State: () => operandStateMachine.setOperand1 && operandStateMachine.setOperand2 && operandStateMachine.setOperator,

    isOperatorStateTransition: value => (value === 'ADD' || value === 'MULTIPLY' || value === 'DIVIDE' || value === 'SUBTRACT'),

    isEvaluateStateTransition: value => value === 'EVALUATE',

    clearSpecificState: (stateName) => operandStateMachine[stateName] = false,

    clearFlags: () => {
        operandStateMachine.setOperand1 = false;
        operandStateMachine.setOperand2 = false;
        operandStateMachine.setOperator = false;
    }
};

const checkStateAndSetOperand = (calculator, stateMachine, value) => {
    if (value === 'ALL_CLEAR') {
        calculator.clearScreen();
        stateMachine.clearFlags();
        calculator.operatorValue = '';
        calculator.operand2 = '';
        calculator.operand1 = '';
        return;
    }

    if (stateMachine.noStateSet()) {
        stateMachine.setOperand1 = true;
        calculator.operand1 = value;
        calculator.updateScreen(calculator.operand1);
    } else if (stateMachine.operand1State() && stateMachine.isOperatorStateTransition(value)) {
        stateMachine.setOperator = true;
        calculator.operatorValue = value;
        stateMachine.setOperand2 = true;
    } else if (stateMachine.operand1State() && !stateMachine.isOperatorStateTransition(value)) {
        calculator.operand1 += value;
        calculator.updateScreen(calculator.operand1);
    } else if (stateMachine.operand2State() && !stateMachine.isEvaluateStateTransition(value)) {
        calculator.operand2 += value;
        calculator.updateScreen(calculator.operand2);
    } else if (stateMachine.operand2State() && stateMachine.isEvaluateStateTransition(value)) {
        stateMachine.setEvaluateState = true;
        const result = calculator['evaluate']();
        console.log(result);

        stateMachine.clearSpecificState('setOperand2');
        stateMachine.clearSpecificState('setOperator');
        stateMachine.clearSpecificState('setEvaluateState');
        calculator.operatorValue = '';
        calculator.operand2 = '';
        calculator.operand1 = result.toString();
        calculator.updateScreen(calculator.operand1);
    }
};

calculator.initializeScreen();

document.addEventListener('click', (event) => {
    if (event.target.value === undefined) { return; }

    const value = event.target.value;
    console.log(calculator);
    console.log(operandStateMachine);
    checkStateAndSetOperand(calculator, operandStateMachine, value);
    console.log(calculator);
    console.log(operandStateMachine);
});