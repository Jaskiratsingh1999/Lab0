/*
Note: I acknowledge the contents of this lab were created with the help of Copilot AI in a similar manner to pair programming, where I asked Copilot AI questions on syntax, efficiency, and object-oriented principles 
in JavaScript and received guidance or code snippets. 
*/

import Button from './button.js';
import posHandler from './posHandler.js';
import UIHandler from './UIHandler.js';

export const MIN_BUTTONS = 3;
export const MAX_BUTTONS = 7;
const MILLISECOND_TO_SECOND = 1000;
const WINNING_STATUS = "win";
const LOSING_STATUS = "lose";

class gameController {
  constructor() {
    this.posHandler = new posHandler();
    this.UIHandler = new UIHandler();
    this.buttons = [];
  }

  clearButtons() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.remove());
  }

  async startGame(numOfButtons) {
    this.clearButtons();
    if (numOfButtons >= MIN_BUTTONS && numOfButtons <= MAX_BUTTONS) {
      this.createButtons(numOfButtons);
      await this.delay(numOfButtons * MILLISECOND_TO_SECOND);
      await this.posHandler.shufflePosition(this.buttons);
      this.activateButtons();
    } else {
      this.UIHandler.inputError();
    }
  }

  createButtons(amount) {
    for (let i = 0; i < amount; i++) {
      const button = new Button(i + 1);
      button.render();
      this.buttons.push(button);
    }
    this.posHandler.setPosition(this.buttons);
  }

  activateButtons() {
    let userClickOrder = [];
    this.buttons.forEach(button => {
      button.hideText();
      button.setOnClick(() => {
        userClickOrder.push(button.btn.textContent);

        // Check if the userClickOrder matches the order of this.buttons so far
        let isCorrectOrder = true;
        for (let i = 0; i < userClickOrder.length; i++) {
          if (userClickOrder[i] !== this.buttons[i].btn.textContent) {
            isCorrectOrder = false;
            this.endGame(LOSING_STATUS);
            break;
          } else if (userClickOrder[i] == this.buttons[i].btn.textContent) {
            button.showText();
          }
        }

        // If the userClickOrder matches the order of this.buttons, the user wins
        if (userClickOrder.join() === this.buttons.map(button => button.btn.textContent).join()) {
          this.endGame(WINNING_STATUS);
        }
      });
    });
  }

  // Helper function to create a delay
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  endGame(status) {
    this.buttons.forEach(button => {
      button.showText();
      button.removeOnClick();
    });

    if (status === WINNING_STATUS) {
      setTimeout(() => {
        this.UIHandler.winnerMessage();
      }, 0);
    }

    if (status === LOSING_STATUS) {
      setTimeout(() => {
        this.UIHandler.loserMessage();
      }, 0);
    }
  }
}

export default gameController;