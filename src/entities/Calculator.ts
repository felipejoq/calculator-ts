export class Calculator {
  private display: HTMLInputElement;
  private currentInput: string = '';
  private operator: string | null = null;
  private firstOperand: number | null = null;
  private buttons: NodeListOf<HTMLButtonElement>;

  constructor(display: HTMLInputElement, buttons: NodeListOf<HTMLButtonElement>) {
    this.display = display;
    this.buttons = buttons;
    this.addEventListeners();
  }

  addEventListeners() {
    this.buttons.forEach(button => {
      button.addEventListener('click', () => this.handleButtonClick(button));
    });
  }

  handleButtonClick(button: HTMLButtonElement) {
    const buttonValue = button.textContent;

    if (buttonValue !== null) {
      switch (buttonValue) {
        case '+':
        case '-':
        case 'x':
        case '/':
          this.handleOperatorClick(buttonValue);
          break;
        case '=':
          this.handleEqualClick();
          break;
        case 'C':
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
      this.calculateResult();
      this.operator = operator;
      this.currentInput = '';
    }
  }

  handleEqualClick() {
    this.calculateResult();
  }

  calculateResult() {
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
      this.firstOperand = result;
    } else if (this.currentInput !== '') {
      this.firstOperand = parseFloat(this.currentInput);
      this.currentInput = '';
    }
  }

  handleClearClick() {
    this.currentInput = '';
    this.operator = null;
    this.firstOperand = null;
    this.display.value = '0';
  }

  handleNumberClick(number: string) {
    this.currentInput += number;
    this.display.value = this.currentInput;
  }
}