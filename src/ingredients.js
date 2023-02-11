import { LIGHTBOX_INGREDIENTS_CONFIG } from './config.js';

class DomElementsBuilder {
  static createInfoBox(ingredients) {
    const header = document.createElement("div");
    header.textContent = "Przeanalizowano menu w poszukiwaniu składników: " + ingredients.join(", ");
    header.classList.add("chrome-extension-ingredients-custom-box");
    header.classList.add("info");
    return header;
  }

  static createIngredientBox(names) {
    const header = document.createElement("div");
    header.textContent = names.join(", ");
    header.classList.add("chrome-extension-ingredients-custom-box");
    header.classList.add("ingredient");
    return header;
  }

  static addIngredientsBox(dishContainer, matchedIngredients) {
    dishContainer.classList.add("chrome-extension-ingredients-custom-class");
    dishContainer.classList.add("alert");
    dishContainer.insertAdjacentElement("beforeend", this.createIngredientBox(matchedIngredients));
  }
}

class Helpers {
  static matchesAtLeastOne(sentences, words) {
    for (const word of words) {
      if (sentences.includes(word)) {
        return true;
      }
    }

    return false;
  }
}

class LightBoxIngredientsHighlighter {
  constructor(ingredientsConfiguration) {
    this.ingredientsConfiguration = ingredientsConfiguration;
  }

  run() {
    const container = document.querySelector("#list-of-days-to-change");

    if (container) {
      this.highlightIngredients();

      container.insertAdjacentElement(
        "afterbegin",
        DomElementsBuilder.createInfoBox(Object.keys(this.ingredientsConfiguration))
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
      if (Helpers.matchesAtLeastOne(dishIngredients, matchWords)) {
        matchedIngredients.push(ingredientName);
      }
    }

    return matchedIngredients;
  }
}

new LightBoxIngredientsHighlighter(LIGHTBOX_INGREDIENTS_CONFIG).run();