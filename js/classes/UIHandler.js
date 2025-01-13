/*
Note: I acknowledge the contents of this lab were created with the help of Copilot AI in a similar manner to pair programming, where I asked Copilot AI questions on syntax, efficiency, and object-oriented principles 
in JavaScript and received guidance or code snippets. 
*/

import * as userMessages from '../../lang/messages/en/user.js';

const HEADER_TEXT = 'headerText';
const QUESTION_TEXT_ID = 'questionText';
const BUTTON_TEXT_ID = 'buttonText';

class UIHandler {
  constructor() {
    userMessages.initializeConstantsFromGame();
  }

  setText(language) {
    if (language === 'en') {
      document.getElementById(HEADER_TEXT).innerText = userMessages.HEADER_TEXT;
      document.getElementById(QUESTION_TEXT_ID).innerText = userMessages.QUESTION_TEXT;
      document.getElementById(BUTTON_TEXT_ID).value = userMessages.BUTTON_TEXT;
    }
  }

  inputError() {
    alert(`${userMessages.INPUT_ERROR_TEXT}`);
  }

  winnerMessage() {
    alert(`${userMessages.WINNER_TEXT}`)
  }

  loserMessage() {
    alert(`${userMessages.LOSER_TEXT}`)
  }
}

export default UIHandler;
