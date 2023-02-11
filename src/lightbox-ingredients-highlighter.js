import DomElementsBuilder from './dom-elements-builder';
import { matchesAtLeastOne } from './helpers';

class LightBoxIngredientsHighlighter {
  constructor(ingredientsConfiguration) {
    this.ingredientsConfiguration = ingredientsConfiguration;
  }

  run() {
    const container = document.querySelector('#list-of-days-to-change');

    if (container) {
      this.highlightIngredients();

      container.insertAdjacentElement(
        'afterbegin',
        DomElementsBuilder.createInfoBox(Object.keys(this.ingredientsConfiguration)),
      );
    }
  }

  highlightIngredients() {
    const mealContainers = document.querySelectorAll('.flexch-dish__meals__meal');

    for (const dishContainer of mealContainers) {
      const dishIns = dishContainer.querySelectorAll('.dish-in');

      for (const dishInElement of dishIns) {
        const dishIngredients = dishInElement.dataset.in;

        const matchedIngredients = this.selectIngredientsToHighlight(dishIngredients);

        if (matchedIngredients.length > 0) {
          DomElementsBuilder.addIngredientsBox(dishContainer, matchedIngredients);
        }
      }
    }
  }

  selectIngredientsToHighlight(dishIngredients) {
    const matchedIngredients = [];

    for (const [ingredientName, matchWords] of Object.entries(this.ingredientsConfiguration)) {
      if (matchesAtLeastOne(dishIngredients, matchWords)) {
        matchedIngredients.push(ingredientName);
      }
    }

    return matchedIngredients;
  }
}

export default LightBoxIngredientsHighlighter;
