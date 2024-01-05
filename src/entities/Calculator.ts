export class Calculator {
  private display: HTMLInputElement;
  private currentInput: string = '';
  private operator: string | null = null;
  private firstOperand: number | null = null;

  constructor() {
    this.display = document.querySelector('.display input') as HTMLInputElement;
    this.addEventListeners();
  }

  addEventListeners() {
    const buttons = document.querySelectorAll('.buttons button') as NodeListOf<HTMLButtonElement>;
    buttons.forEach(button => {
      button.addEventListener('click', () => this.handleButtonClick(button));
    });
  }

  handleButtonClick(button: HTMLButtonElement) {
    const buttonValue = button.textContent;

    if (buttonValue !== null) {
      switch (buttonValue) {
        case '+':
        case '-':
        case '*':
        case '/':
          this.handleOperatorClick(buttonValue);
          break;
        case '=':
          this.handleEqualClick();
          break;
        case 'C': // Agrega la lógica para el botón de Clear
          this.handleClearClick();
          break;
        default:
          this.handleNumberClick(buttonValue);
          break;
      }
    }
  }

  handleOperatorClick(operator: string) {
    if (this.currentInput !== '') {
      this.operator = operator;
      this.firstOperand = parseFloat(this.currentInput);
      this.currentInput = '';
    }
  }

  handleEqualClick() {
    if (this.operator && this.firstOperand !== null && this.currentInput !== '') {
      const secondOperand = parseFloat(this.currentInput);
      let result: number;

      switch (this.operator) {
        case '+':
          result = this.firstOperand + secondOperand;
          break;
        case '-':
          result = this.firstOperand - secondOperand;
          break;
        case 'x':
          result = this.firstOperand * secondOperand;
          break;
        case '/':
          result = this.firstOperand / secondOperand;
          break;
        default:
          return;
      }

      this.display.value = result.toString();
      this.currentInput = result.toString();
      this.operator = null;
      this.firstOperand = null;
    }
  }

  handleNumberClick(number: string) {
    this.currentInput += number;
    this.display.value = this.currentInput;
  }

  handleClearClick() {
    this.currentInput = '';
    this.operator = null;
    this.firstOperand = null;
    this.display.value = '0';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Calculator();
});
