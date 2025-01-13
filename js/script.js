import {
  INPUT_MESSAGE,
  WIN_MESSAGE,
  LOSE_MESSAGE,
} from "../lang/messages/en/user.js";

/**
 * ChatGPT was used for assisting with bug fixing and code generation for keeping the buttons/
 * boxes within the browser window during shuffling.
 */

/**
 * Represents an instance of the memory game
 */

class Game {
  constructor(numButtons) {
    this.numButtons = numButtons;
    this.colors = ["red", "green", "blue", "yellow", "orange", "purple", "cyan"];
    this.currentValue = 1;
    this.buttons = [];
    this.container = document.getElementById("gameContainer");
    this.container.innerHTML = "";

    const windowWidth = window.innerWidth - 50; // Adjust for container padding
    const buttonWidth = 10 * 16; // 10em converted to pixels (1em = 16px)
    const buttonHeight = 5 * 16; // 5em converted to pixels
    const gap = 16; // 1em gap in pixels

    let startX = 50;
    let startY = 50;

    for (let i = 0; i < numButtons; i++) {
      const rndIndex = Math.floor(Math.random() * this.colors.length);
      const color = this.colors.splice(rndIndex, 1)[0];

      if (startX + buttonWidth + gap > windowWidth) {
        startX = 50; // Reset X position
        startY += buttonHeight + gap; // Move to the next row
      }

      const button = new Button(color, "10em", "5em", i + 1, startX, startY);
      this.buttons.push(button);
      button.draw(this.container);

      startX += buttonWidth + gap; // Move to the next position
    }
  }

  run() {
    setTimeout(() => {
      let shuffleCount = 0;
      const shuffleInterval = setInterval(() => {
        this.shuffleButtons();
        shuffleCount++;

        if (shuffleCount == this.numButtons) {
          clearInterval(shuffleInterval);

          setTimeout(() => {
            this.hideNumbers();
          }, 1000);
          this.activateButtons();
        }
      }, 2000);
    }, this.numButtons * 1000);
  }

  hideNumbers() {
    this.buttons.forEach((button) => button.toggleValue());
  }

  shuffleButtons() {
    this.buttons.forEach((button) => {
      const buttonRect = button.element.getBoundingClientRect(); // Get dimensions
      const maxX = this.container.offsetWidth - buttonRect.width;
      const maxY = this.container.offsetHeight - buttonRect.height;
  
      const rndX = Math.floor(Math.random() * maxX);
      const rndY = Math.floor(Math.random() * maxY);
  
      button.setLocation(rndX, rndY);
    });
  }
  

  activateButtons() {
    this.buttons.forEach((button) => {
      button.element.addEventListener("click", () => this.handleClick(button));
    });
  }

  handleClick(button) {
    // Check if the clicked button matches the current sequence value
    if (this.currentValue === button.value) {
      button.toggleValue(); // Reveal the button's number
  
      // Check if the last button in the sequence was clicked correctly
      if (this.currentValue == this.numButtons) {
        // Delay to ensure UI updates before showing the win message
        setTimeout(() => {
          alert(WIN_MESSAGE); // Show winning message
          this.resetGame(); // Reset the game
        });
      }
      this.currentValue++; // Move to the next value in the sequence
    } else {
      this.handleLose(); // Call the losing logic
    }
  }
  
  handleLose() {
    // Reveal all button values
    this.buttons.forEach((btn) => {
      btn.hidden = false;
      btn.element.innerText = btn.value; // Ensure the correct number is displayed
    });
  
    // Delay to allow UI updates before showing the losing message
    setTimeout(() => {
      alert(LOSE_MESSAGE); // Show losing message
      this.resetGame(); // Reset the game
    }, 200); // Small delay for better user experience
  }

  resetGame() {
    this.container.innerHTML = ""; // Clear all buttons from the container
    this.currentValue = 1; // Reset the sequence counter
    // this.buttons = []; // Clear the buttons array
  }
  
  resetGame() {
    this.container.innerHTML = ""; // Clear all buttons
    this.currentValue = 1; // Reset the sequence counter
    this.buttons = []; // Clear the buttons array
  }
  
}

/**
 * Button class to represent a game button.
 */
class Button {
  constructor(color, width, height, value, x, y) {
    this.color = color;
    this.width = width;
    this.height = height;
    this.value = value;
    this.x = x;
    this.y = y;
    this.hidden = false;
    this.element = null; // this will be a reference to the dom object when it is created later
  }

  draw(container) {
    const button = document.createElement("div");
    button.style.backgroundColor = this.color;
    button.style.width = this.width;
    button.style.height = this.height;
    button.style.position = "absolute";
    button.style.left = `${this.x}px`;
    button.style.top = `${this.y}px`;
    button.style.display = "flex";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";
    // button.style.fontSize = "1.5em";
    button.style.border = "solid #000000 1px";
    button.style.cursor = "pointer";
    button.innerText = this.hidden ? "" : this.value;

    container.appendChild(button);
    this.element = button;
  }

  setLocation(x, y) {
    this.x = x;
    this.y = y;
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }

  toggleValue() {
    this.hidden = !this.hidden;
    this.element.innerText = this.hidden ? "" : this.value;
  }
}

/**
 * Input class holds player input information and a validate method.
 */
class Input {
  constructor(numButtons) {
    this.numButtons = numButtons;
  }

  validateEntry() {
    const num = Number(this.numButtons);
    if (isNaN(num) || this.numButtons > 7 || this.numButtons < 3) {
      alert(INPUT_MESSAGE);
      return false;
    }
    return true;
  }
}

document.getElementById("startButton").addEventListener("click", function () {
  const numButtons = document.getElementById("buttonCount").value;
  const input = new Input(numButtons);

  if (input.validateEntry()) {
    const game = new Game(input.numButtons);
    game.run();
  }
});
