// import {
//   INPUT_MESSAGE,
//   WIN_MESSAGE,
//   LOSE_MESSAGE,
// } from "../lang/messages/en/user.js";

// /**
//  * ChatGPT was used for assisting with bug fixing and code generation for keeping the buttons/
//  * boxes within the browser window during shuffling.
//  */

// /**
//  * Represents an instance of the memory game
//  */

// class Game {
//   constructor(numButtons) {
//     this.numButtons = numButtons;
//     this.colors = [
//       "red",
//       "green",
//       "blue",
//       "yellow",
//       "orange",
//       "purple",
//       "cyan",
//     ];
//     this.currentValue = 1;
//     this.buttons = [];
//     this.container = document.getElementById("gameContainer");
//     this.container.innerHTML = "";

//     const windowWidth = window.innerWidth - 50;

//     let startX = 50;
//     let startY = 50;
//     const spacingX = 250;
//     const spacingY = 150;

//     for (let i = 0; i < numButtons; i++) {
//       const rndIndex = Math.floor(Math.random() * this.colors.length);
//       const color = this.colors.splice(rndIndex, 1)[0];

//       if (startX + spacingX > windowWidth) {
//         startX = 50;
//         startY += spacingY;
//       }

//       const button = new Button(color, "10em", "5em", i + 1, startX, startY);
//       this.buttons.push(button);
//       button.draw(this.container);

//       startX += spacingX;
//     }
//   }

//   run() {
//     setTimeout(() => {
//       let shuffleCount = 0;
//       const shuffleInterval = setInterval(() => {
//         this.shuffleButtons();
//         shuffleCount++;

//         if (shuffleCount == this.numButtons) {
//           clearInterval(shuffleInterval);

//           setTimeout(() => {
//             this.hideNumbers();
//           }, 1000);
//           this.activateButtons();
//         }
//       }, 2000);
//     }, this.numButtons * 1000);
//   }

//   hideNumbers() {
//     this.buttons.forEach((button) => button.toggleValue());
//   }

//   shuffleButtons() {
//     //width of buttons in pixels, approximated from actual em sizes.
//     const buttonWidth = 195;
//     const buttonHeight = 105;

//     const maxX = this.container.offsetWidth - buttonWidth;
//     const maxY = this.container.offsetHeight - buttonHeight;

//     this.buttons.forEach((button) => {
//       const rndX = Math.floor(Math.random() * maxX);
//       const rndY = Math.floor(Math.random() * maxY);

//       button.setLocation(rndX, rndY);
//     });
//   }

//   activateButtons() {
//     this.buttons.forEach((button) => {
//       button.element.addEventListener("click", () => this.handleClick(button));
//     });
//   }

//   handleClick(button) {
//     if (this.currentValue === button.value) {
//       button.toggleValue();

//       if (this.currentValue == this.numButtons) {
//         alert(WIN_MESSAGE);
//         this.resetGame();
//       }
//       this.currentValue++;
//     } else {
//       alert(LOSE_MESSAGE);
//       this.resetGame();
//     }
//   }

//   resetGame() {
//     this.container.innerHTML = "";
//     this.currentValue = 1;
//   }
// }

// /**
//  * Button class to represent a game button.
//  */
// class Button {
//   constructor(color, width, height, value, x, y) {
//     this.color = color;
//     this.width = width;
//     this.height = height;
//     this.value = value;
//     this.x = x;
//     this.y = y;
//     this.hidden = false;
//     this.element = null; // this will be a reference to the dom object when it is created later
//   }

//   draw(container) {
//     const button = document.createElement("div");
//     button.style.backgroundColor = this.color;
//     button.style.width = this.width;
//     button.style.height = this.height;
//     button.style.position = "absolute";
//     button.style.left = `${this.x}px`;
//     button.style.top = `${this.y}px`;
//     button.style.display = "flex";
//     button.style.alignItems = "center";
//     button.style.justifyContent = "center";
//     button.style.fontSize = "1.5em";
//     button.style.border = "solid #000000 1px";
//     button.style.cursor = "pointer";
//     button.innerText = this.hidden ? "" : this.value;

//     container.appendChild(button);
//     this.element = button;
//   }

//   setLocation(x, y) {
//     this.x = x;
//     this.y = y;
//     this.element.style.left = `${this.x}px`;
//     this.element.style.top = `${this.y}px`;
//   }

//   toggleValue() {
//     this.hidden = !this.hidden;
//     this.element.innerText = this.hidden ? "" : this.value;
//   }
// }

// /**
//  * Input class holds player input information and a validate method.
//  */
// class Input {
//   constructor(numButtons) {
//     this.numButtons = numButtons;
//   }

//   validateEntry() {
//     const num = Number(this.numButtons);
//     if (isNaN(num) || this.numButtons > 7 || this.numButtons < 3) {
//       alert(INPUT_MESSAGE);
//       return false;
//     }
//     return true;
//   }
// }

// document.getElementById("startButton").addEventListener("click", function () {
//   const numButtons = document.getElementById("buttonCount").value;
//   const input = new Input(numButtons);

//   if (input.validateEntry()) {
//     const game = new Game(input.numButtons);
//     game.run();
//   }
// });


import MESSAGES from '../lang/messages/en/user.js';

class GameUI {
    constructor() {
        this.gameContainer = this.createGameContainer();
    }

    createGameContainer() {
        const container = document.createElement('div');
        container.style.position = 'relative';
        container.style.width = '100%';
        container.style.height = '80vh';
        container.style.margin = '0 auto';
        container.style.overflow = 'hidden';
        document.body.appendChild(container);
        container.className = 'container'
        container.id = 'container'
        return container;
    }

    renderButtons(buttons) {
        buttons.forEach(button => {
            this.gameContainer.appendChild(button.buttonElement);
        });
    }

    updateButtonPosition(button) {
        button.buttonElement.style.left = button.position[0] + 'px';
        button.buttonElement.style.top = button.position[1] + 'px';
    }

    clearButtons() {

        const container = document.getElementById('container');
        if (container) {
            container.innerHTML = '';
        }



    }
}

class MemoryButton {
    constructor(number, color, position, container) {
        this.number = number;
        this.color = color;
        this.position = position;
        this.buttonElement = this.createButton(container);
    }

    createButton(container) {
        const button = document.createElement('button');
        button.style.height = '5em';
        button.style.width = '10em';
        button.style.backgroundColor = this.color;
        button.style.position = 'absolute';
        button.style.left = this.position[0] + 'px';
        button.style.top = this.position[1] + 'px';
        button.innerText = this.number;
        container.appendChild(button);
        return button;
    }

    move(newPosition) {
        this.position = newPosition;
        this.buttonElement.style.left = this.position[0] + 'px';
        this.buttonElement.style.top = this.position[1] + 'px';
    }

    hideNumber() {
        this.buttonElement.innerText = '';
    }

    revealNumber() {
        this.buttonElement.innerText = this.number;
    }
}

class MemoryGame {
    constructor(numButtons) {
        this.numButtons = numButtons;
        this.buttons = [];
        this.originalOrder = [];
        this.currentIndex = 0;
        this.ui = new GameUI();

    }

    startGame() {
        this.ui.clearButtons();
        this.createButtons();
        setTimeout(() => this.scrambleButtons(), this.numButtons * 1000);
    }

    createButtons() {
        const containerWidth = this.ui.gameContainer.clientWidth;
        const buttonWidth = 160; // 10em in pixels (approx)
        const buttonHeight = 80; // 5em in pixels (approx)
        let xPosition = 0;
        let yPosition = 50; // Start height

        for (let i = 0; i < this.numButtons; i++) {
            if (xPosition + buttonWidth > containerWidth) {
                xPosition = 0;  // Wrap to the next line
                yPosition += buttonHeight + 10; // Add margin between rows
            }

            const position = [xPosition, yPosition];
            const color = this.randomColor();
            const button = new MemoryButton(i + 1, color, position, this.ui.gameContainer);
            this.buttons.push(button);
            this.originalOrder.push(button);

            xPosition += buttonWidth + 10; // Move to the next position (with top margin)
        }
        this.ui.renderButtons(this.buttons);
    }

    randomPosition() {
        const buttonWidth = 160;
        const buttonHeight = 80;
        let x, y, overlap;

        do {
            overlap = false;
            x = Math.random() * (this.ui.gameContainer.clientWidth - buttonWidth);
            y = Math.random() * (this.ui.gameContainer.clientHeight - buttonHeight);

            // Check if new position overlaps with any existing button
            for (let button of this.buttons) {
                const dx = button.position[0] - x;
                const dy = button.position[1] - y;
                if (Math.abs(dx) < buttonWidth && Math.abs(dy) < buttonHeight) {
                    overlap = true;
                    break;
                }
            }
        } while (overlap);

        return [x, y];
    }

    randomColor() {
        const letters = '0123456789ABCDEF'; //genius random color implementation
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    scrambleButtons() {
        for (let i = 0; i < this.numButtons; i++) {
            setTimeout(() => {
                this.buttons.forEach(button => {
                    const newPosition = this.randomPosition();
                    button.move(newPosition);
                    this.ui.updateButtonPosition(button);
                });
            }, i * 2000);
        }
        setTimeout(() => this.hideNumbers(), this.numButtons * 2000);
    }

    hideNumbers() {
        this.buttons.forEach(button => button.hideNumber());
        this.makeButtonsClickable();
    }

    makeButtonsClickable() {
        this.buttons.forEach(button => {
            button.buttonElement.onclick = () => this.checkOrder(button);
        });
    }

    checkOrder(clickedButton) {
        if (clickedButton === this.originalOrder[this.currentIndex]) {
            clickedButton.revealNumber();
            this.currentIndex++;
            if (this.currentIndex === this.numButtons) {
                this.displayMessage(MESSAGES.EXCELLENT_MEMORY);
                document.getElementById('goButton').disabled = false
                document.getElementsByClassName('container')[0].remove() //remove the old div

            }
        } else {
            this.displayMessage(MESSAGES.WRONG_ORDER);
            document.getElementById('goButton').disabled = false
            document.getElementsByClassName('container')[0].remove() //remove the old div
            this.revealCorrectOrder();
        }
    }

    revealCorrectOrder() {
        //super clean for each to reveal the button numbers
        this.originalOrder.forEach(button => button.revealNumber());
    }

    displayMessage(message) {
        alert(message);
    }
}

class ButtonInputBox {
    constructor() {
        this.inputElement = this.createInputBox();

    }

    createInputBox() {
        const inputBox = document.createElement('input');
        inputBox.id = 'input';
        const inputBoxLabel = document.createElement('label');


        inputBoxLabel.attributes.for = 'input'
        inputBoxLabel.innerHTML = MESSAGES.INPUT_LABEL
        inputBox.type = 'number';
        inputBox.min = 3;
        inputBox.max = 7;
        inputBox.placeholder = '3-7';
        document.body.appendChild(inputBoxLabel);
        document.body.appendChild(inputBox);

        const button = document.createElement('button'); //this is the go button
        button.id = 'goButton'

        button.innerText = MESSAGES.GO_BUTTON_TEXT;
        document.body.appendChild(button);

        button.onclick = () => this.onButtonClick();

        return inputBox;
    }

    getNumberOfButtons() {
        const value = parseInt(this.inputElement.value, 10);
        if (isNaN(value) || value < 3 || value > 7) {
            alert(MESSAGES.INPUT_VALIDATION_ALERT);
            return null;
        }
        return value;
    }

    onButtonClick() {
        const numButtons = this.getNumberOfButtons();
        if (numButtons !== null) {
            const game = new MemoryGame(numButtons);

            game.startGame();
            document.getElementById('goButton').disabled = true


        }
    }
}

// Initialize the game 
const inputBox = new ButtonInputBox();
