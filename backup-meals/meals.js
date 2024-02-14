async function getRandom() {
	const response = await fetch('https://www.themealdb.com/api/json/v2/9973533/randomselection.php');
	const data = await response.json();
	const meal = data.meals;
	let mealArray = []
	for (let i = 0; i < 10; i++) {
		mealArray.push(meal[i]);
	}
	listRandom(mealArray);
}

function listRandom(array) {
	const randomMeals = $('#randomMealResults').html(`
        ${array.map(function (meals) {
		return `
                <div class="card me-3 mb-3 text-center" id="${meals.idMeal}" onclick="saveID(this.id)" style="height: fit-content; width: 400px;">
                    <a class="text-decoration-none text-dark" href="meal-results.html">
                        <img class="rounded img-fluid my-1" src="${meals.strMealThumb}" alt="Card image cap">
                        <div class="card-body p-3">
                            <h5 class="card-title">${meals.strMeal}</h5>
                        </div>
                    </a>
                </div>`
	}).join('')}`)
}
getRandom();

function displayResults(meals) {
	const chosenMeal = $('#randomMealResults').html(`
    ${meals.map(function (meals) {
		return `
        <div class="card me-3 mb-3 text-center flip-card-front" id="${meals.idMeal}" onclick="saveID(this.id)" style="height: fit-content; width: 250px;">
            <a class="text-decoration-none text-dark" href="/results.html">
                <img class="rounded img-fluid my-1" src="${meals.strMealThumb}" alt="Card image cap">
                <div class="card-body p-3">
                    <h5 class="card-title">${meals.strMeal}</h5>
                </div>
            </a>
        </div>`
	}).join('')}`)
}

function saveID(id) {
	localStorage.clear('activeMeal')
	let IDstr = id;
	localStorage.setItem('activeMeal', IDstr);
}