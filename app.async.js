document.getElementById("meal-input").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === 'Enter') {
        document.getElementById("meal-button").click();
    }
});


document.getElementById('meal-button').addEventListener('click', async () => {
    const inputValue = document.getElementById('meal-input');
    //clear search value
    if (inputValue.value == '') {
        document.getElementById('show-meal').innerHTML = `
        <h1 class='mx-auto text-danger'>Opps,No result found.<br>Input a food Name</h1>
        `
    }
    else {
        //fetch data
        // fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue.value}`).then(res => res.json()).then(data => showMeals(data.meals))
        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue.value}`);
            const data = await res.json();
            showMeals(data.meals)
        }
        catch (error) {
            console.log(error)
        }
    }
    inputValue.value = ''
})
//showing meals
const showMeals = meal => {
    const showMeal = document.getElementById('show-meal');
    showMeal.textContent = '';
    //show text if no result found
    if (meal == null) {
        showMeal.innerHTML = `
        <h1 class='mx-auto text-danger'>Opps,No result found</h1>
        `
    }
    //set every content dynamically
    else {
        meal.forEach(meal => {
            const div = document.createElement('div');
            div.classList.add = 'col';
            div.innerHTML = `
                <div onclick='loadDetails(${meal.idMeal})' class="card h-100">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title mh-100">${meal.strMeal}</h5>
                      <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                    </div>
                </div>
            `
            showMeal.appendChild(div);
        })
    }
}
//fetch details of clicked meal
const loadDetails = async mealId => {
    // fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    // .then(res => res.json())
    // .then(meal => showDetails(meal.meals[0]))
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const meal = await res.json();
    showDetails(meal.meals[0]);
}
//show details of clicked meal
const showDetails = meal => {
    const singleMeal = document.getElementById('single-meal');
    singleMeal.textContent = '';
    singleMeal.innerHTML = `
        <div class="card" style="width: 50rem;">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions}</p>
                <div class="text-center"><a href="${meal.strSource}" target="_blanck" class="btn btn-primary">Order Now</a></div>
            </div>
        </div>
    `
}