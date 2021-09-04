class Calculator {
    constructor(previousText, currentText) {
        this.previousText = previousText;
        this.currentText = currentText;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return;
        if(this.previousOperand !== '') this.compute();
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let comp;
        let prev = parseFloat(this.previousOperand);
        let cur = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(cur)) return;
        switch (this.operation) {
            case '+':
                comp = prev + cur;
                break
            case '-':
                comp = prev - cur;
                break
            case '*':
                comp = prev * cur;
                break
            case '/':
                comp = prev / cur;
                break
            default:
                return
        }
        this.currentOperand = comp;
        this.operation = undefined;
        this.previousOperand = '';
    }

    update() {
        this.currentText.innerText = this.currentOperand;
        if(this.operation != null) {
            this.previousText.innerText = `${this.previousOperand} ${this.operation}`
        } else {
            this.previousText.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousText = document.querySelector('[data-previous]');
const currentText = document.querySelector('[data-current]');

const calculator = new Calculator(previousText,currentText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.update()
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.update()
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.update();
})

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.update();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.update();
})

