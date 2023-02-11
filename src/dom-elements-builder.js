class DomElementsBuilder {
  static createInfoBox(ingredients) {
    const header = document.createElement('div');
    header.textContent = `Przeanalizowano menu w poszukiwaniu składników: ${ingredients.join(', ')}`;
    header.classList.add('chrome-extension-ingredients-custom-box');
    header.classList.add('info');
    return header;
  }

  static createIngredientBox(names) {
    const header = document.createElement('div');
    header.textContent = names.join(', ');
    header.classList.add('chrome-extension-ingredients-custom-box');
    header.classList.add('ingredient');
    return header;
  }

  static addIngredientsBox(dishContainer, matchedIngredients) {
    dishContainer.classList.add('chrome-extension-ingredients-custom-class');
    dishContainer.classList.add('alert');
    dishContainer.insertAdjacentElement('beforeend', this.createIngredientBox(matchedIngredients));
  }
}

export default DomElementsBuilder;
