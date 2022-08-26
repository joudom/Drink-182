window.onload = (e) => {
    const synth = window.speechSynthesis;
    // cancel the speech when page closed
    window.addEventListener("beforeunload", function() {
        synth.cancel(); 
    })
    
    loadRecipe(synth);
}


async function loadRecipe (synth){
    let test = localStorage.getItem('activeRecipe')
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${test}`);
    const data = await response.json();
    const drink = data.drinks;
    displayRecipe(drink[0], synth);
    document.title = "Drink-182 / " + drink[0].strDrink;
}

function displayRecipe(drink, synth){
    $("#cocktail-name").html(`<p>${drink.strDrink}</p>`)
    $("#dring-img").attr("src",drink["strDrinkThumb"])

    let ingridients = "";
    for(let i = 0 ; i<15 ; i++){
        let strIngName = "strIngredient" + (i+1);
        let strIngMsr = "strMeasure" + (i+1);
        if(drink[strIngName] == null) break; //if there is no ingridient left on the drink object, exit the loop
        if(drink[strIngMsr] == null) { //if there is no scale, don't create an element for it
            ingridients += `<div class="d-flex justify-content-between pe-4 my-1" style="align-items: center">
            <li>${drink[strIngName]}</li></div>`
        }else{
            ingridients += `<div class="d-flex justify-content-between pe-4 my-1" style="align-items: center">
            <li>${drink[strIngName]}</li><div class="px-2 py-1 bg-light rounded">${drink[strIngMsr]}</div></div>`;
        }
    }

    $("#ingridients-list").html(ingridients);
    $("#instructions").html(drink["strInstructions"])

    addTextToSpeech(drink["strInstructions"], synth);;
}

function addTextToSpeech(drinkIns, synth){
    $("#text-to-speech").click(function() {
        // when text-to-speech button clicked consecutevly, reset the speechObj to start reading again
        synth.cancel(); 

        const voices = synth.getVoices();
        let voice = null;
        for(voice of voices){
            if(voice["voiceURI"] == "Google UK English Male") break;
        }

        const speechObj = new SpeechSynthesisUtterance(drinkIns);
        speechObj.voice = voice;
        speechObj.pitch = 0;
        speechObj.rate = 1;
        synth.speak(speechObj);
    })
}