/*
Note: I acknowledge the contents of this lab were created with the help of Copilot AI in a similar manner to pair programming, where I asked Copilot AI questions on syntax, efficiency, and object-oriented principles 
in JavaScript and received guidance or code snippets. 
*/

const BUTTON_OFFSET_LEFT = 140;
const BUTTON_OFFSET_TOP = 200;
const MS_DELAY_BETWEEN_SHUFFLES = 2000;

class posHandler {
  constructor() {
    this.buttonOffsetLeft = BUTTON_OFFSET_LEFT;
    this.buttonOffsetTop = BUTTON_OFFSET_TOP;
  }

  getButtonWidthInPixels(button) {
    let computedStyle = getComputedStyle(button);
    let fontSize = parseFloat(computedStyle.fontSize);
    let buttonWidthEm = parseFloat(button.style.width);
    return buttonWidthEm * fontSize;
  }

  getButtonHeightInPixels(button) {
    let computedStyle = getComputedStyle(button);
    let fontSize = parseFloat(computedStyle.fontSize);
    let buttonHeightEm = parseFloat(button.style.height);
    return buttonHeightEm * fontSize;
  }

  setPosition(buttons) {
    let currentWindowWidth = window.innerWidth;
    let buttonWidthPx = this.getButtonWidthInPixels(buttons[0].btn);

    // Calculate space needed for buttons in one row of the current window size
    let buttonMargin = this.buttonOffsetLeft - buttonWidthPx;
    let buttonSpaceNeeded = buttonWidthPx + buttonMargin;
    let buttonsPerRow = Math.floor(currentWindowWidth / buttonSpaceNeeded);

    // Set correct positions for all buttons
    let row = 1;
    let buttonCounter = 0;
    for (const button of buttons) {
      if (buttonCounter < buttonsPerRow) {
        button.btn.style.left = `${buttonCounter * this.buttonOffsetLeft}px`;
        button.btn.style.top = `${row * this.buttonOffsetTop}px`;
        buttonCounter++;
      } else {
        row++;
        buttonCounter = 0;
        button.btn.style.left = `${buttonCounter * this.buttonOffsetLeft}px`;
        button.btn.style.top = `${row * this.buttonOffsetTop}px`;
        buttonCounter++;
      }
    }
  }

  async shufflePosition(buttons) {
    let buttonWidthPx = this.getButtonWidthInPixels(buttons[0].btn);
    let buttonHeightPx = this.getButtonHeightInPixels(buttons[0].btn);

    return new Promise(resolve => {
      let completedShuffles = 0;

      for (let i = 0; i < buttons.length; i++) {
        setTimeout(() => {
          for (const button of buttons) {
            let currentWindowWidth = window.innerWidth;
            let currentWindowHeight = window.innerHeight;

            button.btn.style.top = `${Math.floor(Math.random() * (currentWindowHeight - buttonHeightPx))}px`;
            button.btn.style.left = `${Math.floor(Math.random() * (currentWindowWidth - buttonWidthPx))}px`;
          }

          // Check if all shuffles are completed before returning the promise
          completedShuffles++;
          if (completedShuffles === buttons.length) {
            resolve();
          }

        }, i * MS_DELAY_BETWEEN_SHUFFLES);
      }
    });
  }
}

export default posHandler;
