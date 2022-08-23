window.onload = (event) => {
    loadDrinkTypes();
    loadDrinkCategories();
    loadDrinkIngredients();
}


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


function showDrinkTypes(types) {
    const typesOfDrinks = $('#typeFilters').html(`
        ${types.map(function(choices) {
            return `<div class="form-switch">
                        <input class="form-check-input" type="checkbox" name="drinkTypeRadio" onchange="classChangeType(this)" id="${choices}">
                        <label class="form-check-label" for="${choices}">
                             ${choices}
                        </label>
                    </div>`
        }).join('')
    }`)
}

function showDrinkCategories(categories) {
    const categoriesOfDrinks = $('#categoryFilters').html(`
        ${categories.map(function(choices) {
            return `<div class="form-switch">
                        <input class="form-check-input" type="checkbox" onchange="classChangeCategory(this)" id="${choices}">
                        <label class="form-check-label" for="${choices}">
                            ${choices}
                        </label>
                    </div>`
        }).join('')
    }`)
}

function showDrinkIngredients(ingredients) {
    const ingredientsOfDrinks = $('#ingredientFilters').html(`
        ${ingredients.map(function(choices) {
            return `<input class="form-check-input" type="checkbox" onchange="classChangeIngredients(this)" id="${choices}">
                    <div class="form-check-label" for="${choices}">${choices}</div>`
        }).join('')
    }`)
}

// Types Filter
let activeTypes = [];
let typesArray = [];

function classChangeType (option){
    option.classList.toggle("active");
    let optionIndex = activeTypes.indexOf(option.id)
    if(option.classList.contains('active') === true){
        activeTypes.push(option.id);
    } else {
       activeTypes.splice(optionIndex,1);
    }

    loadTypeResults(activeTypes);
}

async function loadTypeResults(array){ 
    typesArray = [];
    for (let i = 0; i < array.length; i++) {
        let type = array[i].split(' ').join('_');
        let response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${type}`)
        let data = await response.json();
        drinks = data.drinks;
        allTypesArray(drinks);
    } 
    drinksArray = [].concat(typesArray, categoriesArray, ingredientsArray);
    displayResults(drinksArray)  
}

function allTypesArray (fetchedArray){
    for (let i = 0; i < fetchedArray.length; i++) {
        if (!drinksArray.includes(fetchedArray[i])){
            typesArray.push(fetchedArray[i])
        }
    }
}

//Category Filter

let activeCategories = [];
let categoriesArray = [];

function classChangeCategory (option){
    option.classList.toggle("active");
    let optionIndex = activeCategories.indexOf(option.id)
    if(option.classList.contains('active') === true){
        activeCategories.push(option.id);
    } else {
       activeCategories.splice(optionIndex,1);
    }
    
    loadCategoryResults(activeCategories);
}

async function loadCategoryResults(array){ 
    categoriesArray = [];
    for (let i = 0; i < array.length; i++) {
        let type = array[i].split(' ').join('_');
        let response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${type}`)
        let data = await response.json();
        drinks = data.drinks;
        allCategoriesArray(drinks);
    } 
    drinksArray = [].concat(typesArray, categoriesArray, ingredientsArray);
    displayResults(drinksArray)  
}

function allCategoriesArray (fetchedArray){
    for (let i = 0; i < fetchedArray.length; i++) {
        if (!drinksArray.includes(fetchedArray[i])){
            categoriesArray.push(fetchedArray[i])
        }
    }
}

//Ingredients

let activeIngredients = [];
let ingredientsArray = [];

function classChangeIngredients (option){
    option.classList.toggle("active");
    let optionIndex = activeIngredients.indexOf(option.id)
    if(option.classList.contains('active') === true){
        activeIngredients.push(option.id);
    } else {
       activeIngredients.splice(optionIndex,1);
    }
    
    loadIngredientsResults(activeIngredients);
}

async function loadIngredientsResults(array){ 
    ingredientsArray = [];
    for (let i = 0; i < array.length; i++) {
        let type = array[i].split(' ').join('_');
        let response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${type}`)
        let data = await response.json();
        drinks = data.drinks;
        allIngredientsArray(drinks);
    } 
    drinksArray = [].concat(typesArray, categoriesArray, ingredientsArray);
    displayResults(drinksArray)  
}

function allIngredientsArray (fetchedArray){
    for (let i = 0; i < fetchedArray.length; i++) {
        if (!drinksArray.includes(fetchedArray[i])){
            ingredientsArray.push(fetchedArray[i])
        }
    }
}


function displayResults(drinks){
    const popularDrinks = $('#resultCards').html(`
    ${drinks.map(function(recipe){
        return `
        <div class="card me-3 mb-3 text-center flip-card-front" id="${recipe.idDrink}" onclick="saveID(this.id)" style="height: fit-content; width: 250px;">
            <a class="text-decoration-none text-dark" href="/results.html">
                <img class="rounded img-fluid my-1" src="${recipe.strDrinkThumb}" alt="Card image cap">
                <div class="card-body p-3">
                    <h5 class="card-title">${recipe.strDrink}</h5>
                </div>
            </a>
        </div>`
    }).join('')}`)
}

let drinksArray = [];

function saveID(id){
    localStorage.clear('activeRecipe')
    let IDstr = id;
    localStorage.setItem('activeRecipe', IDstr);
}
