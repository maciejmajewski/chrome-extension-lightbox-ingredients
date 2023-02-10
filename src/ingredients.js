const ingredients = {
  papryka: ["papryk"],
  indyk: ["indyk", "indycz"],
}

const container = document.querySelector("#list-of-days-to-change");

function createInfoBox() {
  const header = document.createElement("div");
  header.textContent = "Przeanalizowano menu w poszukiwaniu składników: " + Object.keys(ingredients).join(", ");
  header.classList.add("chrome-plugin-ingredients-custom-box");
  header.classList.add("info");
  return header;
}

function createIngredientBox(names) {
  const header = document.createElement("div");
  header.textContent = names.join(", ");
  header.classList.add("chrome-plugin-ingredients-custom-box");
  header.classList.add("ingredient");
  return header;
}

function anyMatch(source, matchWords) {
  for (const word of matchWords) {
    if (source.includes(word)) {
      return true;
    }
  }

  return false;
}

function highlightIngredients() {
  const containers = document.querySelectorAll('.flexch-dish');

  for (const dishContainer of containers) {
    const activeDishContainer = dishContainer.querySelector('.flexch-dish__meals__meal.active');
    const dishIns = activeDishContainer.querySelectorAll('.dish-in');

    for (const dishInElement of dishIns) {
      const dishIngredients = dishInElement.dataset.in;

      const matchedIngredients = [];

      for (const [ingredientName, matchWords] of Object.entries(ingredients)) {
        if (anyMatch(dishIngredients, matchWords)) {
          matchedIngredients.push(ingredientName);
        }
      }

      if (matchedIngredients.length > 0) {
        dishContainer.classList.add("chrome-plugin-ingredients-custom-class");
        dishContainer.classList.add("alert");
        dishContainer.insertAdjacentElement("beforeend", createIngredientBox(matchedIngredients));
      }
    }
  }
}

// function resetIngredients() {
//   for (const element of document.querySelectorAll('.chrome-plugin-custom-css')) {
//     element.classList.remove("chrome-plugin-custom-css");
//   }
//  
//   highlightIngredients();
// }

function main() {
  container.insertAdjacentElement("afterbegin", createInfoBox());
  highlightIngredients();

  // for (const submitButton of document.querySelectorAll(".flexch-dish__meals__meal__name")) {
  //   if (submitButton.innerText === "Wybierz") {
  //     console.log(submitButton);
  //   }
  // }
}

if (container) {
  main();
}
