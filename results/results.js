window.onload = (e) => {
    loadRecipe();
}


async function loadRecipe (){
    let test = localStorage.getItem('activeRecipe')
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${test}`);
    const data = await response.json();
    const drink = data.drinks;
    displayRecipe(drink[0]);
    document.title = "Drink-182 / " + drink[0].strDrink;
}

function displayRecipe(drink){
    $("#cocktail-name").html(`<p>${drink.strDrink}</p>`)
    $("#dring-img").attr("src",drink["strDrinkThumb"])

    let ingridients = "";
    for(let i = 0 ; i<15 ; i++){
        let strIngName = "strIngredient" + (i+1);
        let strIngMsr = "strMeasure" + (i+1);
        if(drink[strIngName] == null) break; //if there is no ingridient left on the drink object, exit the loop
        if(drink[strIngMsr] == null) { //if there is no scale, don't create an element for it
            ingridients += `<div class="d-flex justify-content-between pe-4 my-1" style="align-items: center">
            <li>${drink[strIngName]}</li>`
        }else{
            ingridients += `<div class="d-flex justify-content-between pe-4 my-1" style="align-items: center">
            <li>${drink[strIngName]}</li><div class="px-2 py-1 bg-light rounded">${drink[strIngMsr]}</div></div>`;
        }
    }

    $("#ingridients-list").html(ingridients);
    $("#instructions").html(drink["strInstructions"])
}