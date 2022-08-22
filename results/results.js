window.onload = (e) => {
    loadRecipe();
}

async function loadRecipe (){
    let test = localStorage.getItem('activeRecipe')
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${test}`);
    const data = await response.json();
    const drink = data.drinks;
    displayRecipe(drink[0]);
}

function displayRecipe(drink){
    $("#results").html(`
    </p>name = ${drink.strDrink}, category = ${drink.strCategory} Instructions = ${drink.strInstructions}`)
}