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
        <div class="card me-3 mb-3 text-center" style="height: fit-content; width: 400px;">
            <a class="text-decoration-none text-dark" href="#">
                <img class="rounded img-fluid my-1" src="${recipe.strDrinkThumb}" alt="Card image cap">
                <div class="card-body p-3">
                    <h5 class="card-title">${recipe.strDrink}</h5>
                </div>
            </a>
        </div>`
    }).join('')}`)
}

function listRandom(array){
    const popularDrinks = $('#randomResults').html(`
    ${array.map(function(recipe){
        return `
        <div class="card me-3 mb-3 text-center" style="height: fit-content; width: 400px;">
            <a class="text-decoration-none text-dark" href="#">
                <img class="rounded img-fluid my-1" src="${recipe.strDrinkThumb}" alt="Card image cap">
                <div class="card-body p-3">
                    <h5 class="card-title">${recipe.strDrink}</h5>
                </div>
            </a>
        </div>`
    }).join('')}`)
}
getPopular();
getRandom();


