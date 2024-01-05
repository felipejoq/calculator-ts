import { Calculator } from './entities/Calculator';
import './style.css'

const display = document.querySelector('.display input') as HTMLInputElement;
const buttons = document.querySelectorAll('.buttons button') as NodeListOf<HTMLButtonElement>;

document.addEventListener('DOMContentLoaded', () => {
  new Calculator(display, buttons);
});