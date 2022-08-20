async function getPopular(){
    const response = await fetch('https://www.thecocktaildb.com/api/json/v2/9973533/popular.php');
    const data = await response.json();
    const drink = data.drinks;
    let drinkArray = []
    for (let i = 0; i < 10; i++) {
        drinkArray.push(drink[i]);
    }
    listPopular(drinkArray);
    
}

async function getRandom(){
    const response = await fetch('https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php');
    const data = await response.json();
    const drink = data.drinks;
    let drinkArray = []
    for (let i = 0; i < 10; i++) {
        drinkArray.push(drink[i]);
    }
    listRandom(drinkArray);
    }
    

function listPopular(array){
    const popularDrinks = $('#popularResults').html(`
    ${array.map(function(recipe){
        return `
        <div class="card m-3 text-center" style="height: fit-content; width: 25%;">
            <img class="card-img-top rounded mx-auto my-1" style="width: 5rem;" src="${recipe.strDrinkThumb}" alt="Card image cap">
            <div class="card-body p-1">
                <h5 class="card-title">${recipe.strDrink}</h5>
                <p class="card-text">Category: ${recipe.strCategory}</p>
                <p class="card-text">Type: ${recipe.strAlcoholic}</p>
                <p class="card-text">Glass: ${recipe.strGlass}</p>
                <p class="btn btn-primary p-1">View Recipe</p>
            </div>
        </div>`
    }).join('')}`)
}

function listRandom(array){
    const popularDrinks = $('#randomResults').html(`
    ${array.map(function(recipe){
        return `
        <div class="card m-3 text-center" style="height: fit-content; width: 25%;">
            <img class="card-img-top rounded mx-auto my-1" style="width: 5rem;" src="${recipe.strDrinkThumb}" alt="Card image cap">
            <div class="card-body p-1">
                <h5 class="card-title">${recipe.strDrink}</h5>
                <p class="card-text">Category: ${recipe.strCategory}</p>
                <p class="card-text">Type: ${recipe.strAlcoholic}</p>
                <p class="card-text">Glass: ${recipe.strGlass}</p>
                <p class="btn btn-primary p-1">View Recipe</p>
            </div>
        </div>`
    }).join('')}`)
}
getPopular();
getRandom();


