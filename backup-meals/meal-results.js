window.onload = (e) => {
	const synth = window.speechSynthesis;
	// cancel the speech when page closed
	window.addEventListener("beforeunload", function () {
		synth.cancel();
	})

	loadMeal(synth);
}


async function loadMeal(synth) {
	let test2 = localStorage.getItem('activeMeal')
	const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${test2}`);
	const data = await response.json();
	const meal = data.meals;
	displayMeal(meal[0], synth);
	document.title = "Drink-182 / " + meal[0].strMeal;
}

function displayMeal(dish, synth) {
	$("#meal-name").html(`<p>${dish.strMeal}</p>`)
	$("#meal-img").attr("src", dish["strMealThumb"])

	let ingredients = "";
	for (let i = 0; i < 15; i++) {
		let strMealName = "strIngredient" + (i + 1);
		let strMealMsr = "strMeasure" + (i + 1);
		if (dish[strMealName] == null || dish[strMealName] == "") break;  //if there are no ingredients left on the meal object, exit the loop
		if (dish[strMealMsr] == "") { //if there is no scale, don't create an element for it
			ingredients += `<div class="d-flex justify-content-between pe-4 my-1" style="align-items: center">
            <li>${dish[strMealName]}</li>`
		} else {
			ingredients += `<div class="d-flex justify-content-between pe-4 my-1" style="align-items: center">
            <li>${dish[strMealName]}</li><div class="px-2 py-1 bg-light rounded">${dish[strMealMsr]}</div></div>`;
		}
	}

	$("#meal-ingredients-list").html(ingredients);
	$("#meal-instructions").html(dish["strInstructions"])

	addTextToSpeech(dish["strInstructions"], synth);;
}

function addTextToSpeech(mealIns, synth) {
	$("#text-to-speech").click(function () {
		// when text-to-speech button clicked consecutevly, reset the speechObj to start reading again
		synth.cancel();

		const voices = synth.getVoices();
		let voice = null;
		for (voice of voices) {
			if (voice["voiceURI"] == "Google UK English Male") break;
		}

		const speechObj = new SpeechSynthesisUtterance(mealIns);
		speechObj.voice = voice;
		speechObj.pitch = 0;
		speechObj.rate = 1;
		synth.speak(speechObj);
	})
}