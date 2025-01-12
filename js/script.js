class Game {
  constructor() {
      this.buttons = [];
      this.originalOrder = [];
      this.currentOrder = [];
  }

  startGame(buttonCount) {
      this.clearGameArea();
      this.createButtons(buttonCount);
      this.originalOrder = [...this.buttons];
      setTimeout(() => this.scrambleButtons(buttonCount), buttonCount * 1000);
  }

  clearGameArea() {
      const gameArea = document.getElementById('game-area');
      gameArea.innerHTML = '';
      this.buttons = [];
  }

  createButtons(count) {
      const gameArea = document.getElementById('game-area');
      for (let i = 0; i < count; i++) {
          const button = new GameButton(i + 1);
          this.buttons.push(button);
          gameArea.appendChild(button.element);
      }
  }

  scrambleButtons(times) {
      let moves = 0;
      const interval = setInterval(() => {
          if (moves >= times) {
              clearInterval(interval);
              this.hideButtonNumbers();
              this.makeButtonsClickable();
          } else {
              this.shuffle();
              moves++;
          }
      }, 2000);
  }

  shuffle() {
      this.buttons.forEach((btn) => btn.setRandomPosition());
  }

  hideButtonNumbers() {
      this.buttons.forEach((btn) => btn.hideNumber());
  }

  makeButtonsClickable() {
      this.currentOrder = [];
      this.buttons.forEach((btn) => {
          btn.element.onclick = () => this.handleButtonClick(btn);
      });
  }

  handleButtonClick(button) {
      const expected = this.originalOrder[this.currentOrder.length];
      if (button.number === expected.number) {
          this.currentOrder.push(button);
          button.revealNumber();
          if (this.currentOrder.length === this.originalOrder.length) {
              alert(messages.success);
          }
      } else {
          alert(messages.failure);
          this.revealCorrectOrder();
      }
  }

  revealCorrectOrder() {
      this.originalOrder.forEach((btn) => btn.revealNumber());
  }
}

class GameButton {
  constructor(number) {
      this.number = number;
      this.element = this.createButton();
  }

  createButton() {
      const button = document.createElement('button');
      button.textContent = this.number;
      button.style.position = 'absolute';
      this.setRandomPosition();
      return button;
  }

  setRandomPosition() {
      const gameArea = document.getElementById('game-area');
      const maxWidth = gameArea.offsetWidth - 100;
      const maxHeight = gameArea.offsetHeight - 50;
      this.element.style.left = Math.random() * maxWidth + 'px';
      this.element.style.top = Math.random() * maxHeight + 'px';
  }

  hideNumber() {
      this.element.textContent = '';
  }

  revealNumber() {
      this.element.textContent = this.number;
  }
}

// Initialize game
document.getElementById('start-game').onclick = () => {
  const buttonCount = parseInt(document.getElementById('button-count').value, 10);
  if (buttonCount < 3 || buttonCount > 7) {
      alert(messages.invalidInput);
      return;
  }
  const game = new Game();
  game.startGame(buttonCount);
};
