/*
Note: I acknowledge the contents of this lab were created with the help of Copilot AI in a similar manner to pair programming, where I asked Copilot AI questions on syntax, efficiency, and object-oriented principles 
in JavaScript and received guidance or code snippets. 
*/

import GameController from './classes/gameController.js';
import UIHandler from './classes/UIHandler.js';

const DEFAULT_LANGUAGE = 'en';
const BUTTONS_INPUT_ID = 'numOfButtons';
const START_GAME_BUTTON = 'input[type="button"]';

const lang = DEFAULT_LANGUAGE;

const uiHandler = new UIHandler();
uiHandler.setText(lang);

function handleClick() {
  const numOfButtons = document.getElementById(BUTTONS_INPUT_ID).value;
  const gameController = new GameController();
  gameController.startGame(numOfButtons);
}

document.querySelector(START_GAME_BUTTON).addEventListener('click', handleClick);