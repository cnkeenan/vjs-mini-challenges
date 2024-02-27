/**
 * Converts binary to decimal
 * @param {string} binary string representing the binary to convert to decimal
 * @returns {number} returns a decimal representation of the binary input
 */
const convertBinToDec = (binary, base) => {
    return parseInt(parseInt(binary, base), 10);
}

/**
 * Paints the output to screen
 * @param {string} output The value of the converted output1
 */
const updateOutput = (output) => {
    document.getElementById('output').value = `${output}`
}

/**
 * @param {boolean} unset determines whether or not to unset certain classes
 * @param {Array<string>} classNames class names to remove
 */
const updateStyles = (unset, classNames) => {
    const [c1, c2, c3] = classNames;

    if (unset) {
        document.getElementById('errorText').classList.remove(c1);
        document.getElementById('errorText').className = c2;
        document.getElementById('binary').classList.remove(c3);
    }
    else {
        document.getElementById('errorText').classList.remove(c2);
        document.getElementById('errorText').className = c1;
        document.getElementById('binary').className = c3;
    }
};

/**
 * @param {string} inputType the selected input type
 * @returns an object of labels that can be used to update the UI dynamically
 */
const getUpdatedInputTypeInfo = (inputType) => {
    switch (inputType) {
        case 'hex': 
            return {
                inputLabelName: 'Hexadecimal',
            }
        case 'binary': 
            return {
                inputLabelName: 'Binary',
            }
        case 'oct': 
            return {
                inputLabelName: 'Octal',
            }
    }
};

let selectedValue = document.getElementById('numberInput').value;

const patternObject = {
    hex: '[^a-fA-F0-9]',
    binary: '[^0-1]',
    oct: '[^0-7]',
};

const patternBase = {
    hex: 16,
    binary: 2,
    oct: 8,
};

document.getElementById('numberInput').addEventListener('change', (event) => {
    console.log(event.target.value);
    const updatedValue = event.target.value; 

    const { inputLabelName } = getUpdatedInputTypeInfo(updatedValue);

    selectedValue = updatedValue;
    document.getElementById('inputLabel').textContent = inputLabelName;
});


setInterval(() => {
    let textValue = document.getElementById('binary').value;
    const classNames = ['error-text', 'no-error', 'error'];

    if (textValue === '') {
        updateStyles(true, classNames);
        updateOutput('');
        return;
    };
    
    if (textValue.match(patternObject[selectedValue])) {
        updateStyles(false, classNames);
        return;
    } else {
        updateStyles(true, classNames);
    }

    let convertedValue = convertBinToDec(textValue, patternBase[selectedValue]);
    updateOutput(convertedValue);
}, 250);