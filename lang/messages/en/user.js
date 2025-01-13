import { MIN_BUTTONS, MAX_BUTTONS } from "../../../js/classes/gameController.js";

export const HEADER_TEXT = "Lab 0 by Davin Leong";
export const QUESTION_TEXT = "How many buttons to create?";
export const BUTTON_TEXT = "Go!";
export let INPUT_ERROR_TEXT = ``;
export const WINNER_TEXT = "Excellent memory!";
export const LOSER_TEXT = "Wrong order!";

export function initializeConstantsFromGame() {
  INPUT_ERROR_TEXT = `Please enter a number between ${MIN_BUTTONS} and ${MAX_BUTTONS}`;
}