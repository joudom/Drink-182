async function loadDrinkTypes() {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list");
    const data = await response.json();
    const type = data.drinks;
    const drinkTypeArray = [];
        for (let i = 0; i < type.length; i++) {
            drinkTypeArray.push(type[i].strAlcoholic);
        }
    showDrinkTypes(drinkTypeArray);
}
loadDrinkTypes();

async function loadDrinkCategories() {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list");
    const data = await response.json();
    const category = data.drinks;
    const drinkCategoryArray = [];
        for (let i = 0; i < category.length; i++) {
            drinkCategoryArray.push(category[i].strCategory);
        }
    showDrinkCategories(drinkCategoryArray);
}
loadDrinkCategories();

async function loadDrinkIngredients() {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list");
    const data = await response.json();
    const ingredient = data.drinks;
    const drinkIngredientArray = [];
        for (let i = 0; i < ingredient.length; i++) {
            drinkIngredientArray.push(ingredient[i].strIngredient1);
        }
    showDrinkIngredients(drinkIngredientArray);
}
loadDrinkIngredients();

function showDrinkTypes(types) {
    const typesOfDrinks = $('#typeFilters').html(`
        ${types.map(function(choices) {
            return `<input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                    <div class="form-check-label" for="flexSwitchCheckDefault">${choices}</option>`
        }).join('')
    }`)
}

function showDrinkCategories(categories) {
    const categoriesOfDrinks = $('#categoryFilters').html(`
        ${categories.map(function(choices) {
            return `<input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                    <div class="form-check-label" for="flexSwitchCheckDefault">${choices}</option>`
        }).join('')
    }`)
}

function showDrinkIngredients(ingredients) {
    const ingredientsOfDrinks = $('#ingredientFilters').html(`
        ${ingredients.map(function(choices) {
            return `<input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                    <div class="form-check-label" for="flexSwitchCheckDefault">${choices}</option>`
        }).join('')
    }`)
}