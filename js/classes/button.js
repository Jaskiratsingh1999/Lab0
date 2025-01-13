/*
Note: I acknowledge the contents of this lab were created with the help of Copilot AI in a similar manner to pair programming, where I asked Copilot AI questions on syntax, efficiency, and object-oriented principles 
in JavaScript and received guidance or code snippets. 
*/

const HEIGHT = "5em";
const WIDTH = "10em";
const SHOW_BUTTON = "transparent";
const HIDE_BUTTON = "initial";
const BUTTON_POSITIONING = "absolute";
const BASE_HEXADECIMAL = 16;
const HEXADECIMAL_LENGTH = 6;
const HEXADECIMAL_LETTERS = '0123456789ABCDEF';

function getRandomColor() {
  let color = '#';
  for (let i = 0; i < HEXADECIMAL_LENGTH; i++) {
    color += HEXADECIMAL_LETTERS[Math.floor(Math.random() * BASE_HEXADECIMAL)];
  }
  return color;
}

class Button {
  constructor(number) {
    this.btn = document.createElement("button");
    this.btn.style.backgroundColor = getRandomColor();
    this.btn.style.height = HEIGHT;
    this.btn.style.width = WIDTH;
    this.btn.style.position = BUTTON_POSITIONING;
    this.btn.textContent = number;
    this.btn.style.color = HIDE_BUTTON;
  }

  render() {
    document.body.appendChild(this.btn);
  }

  hideText() {
    this.btn.style.color = SHOW_BUTTON;
  }

  showText() {
    this.btn.style.color = HIDE_BUTTON;
  }

  setOnClick(callback) {
    this.btn.onclick = callback;
  }

  removeOnClick() {
    this.btn.onclick = null;
  }
}


export default Button;