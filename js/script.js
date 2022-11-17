const searchBtn=document.getElementById('search-btn');
const mealList=document.getElementById('meal');
const mealDetailsCotent=document.querySelector('.meal-details-content');
const recipeCloseBtn=document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click',getMealList);
mealList.addEventListener('click',getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsCotent.parentElement.classList.remove('showRecipe');
});

// get meal list that matches with ingredients
function getMealList(){
    let searchInputTxt=document.getElementById('search-input').value.trim();
    //console.log(searchInputTxt.length);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        let html="";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                <div class="meal-item" data-id = "${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="food">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>
                </div>
                `;
            });
            mealList.classList.remove('notFound');
        }else{
            html="Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML=html;
    });
}

// get recpie of the meal
function getMealRecipe(e){
    e.preventDefault();
    //console.log(e.target);
    if(e.target.classList.contains('recipe-btn')){
        let mealItem=e.target.parentElement.parentElement;
        //console.log(mealItem);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal=meal[0];
    let html=`
    <h2 class="recipe-title">
        ${meal.strMeal}
    </h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-meal-img">
        <img src="${meal.strMealThumb}" alt="">
    </div>
    <div class="recipe-link">
        <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
    </div>
    `;
    
    mealDetailsCotent.innerHTML=html;
    mealDetailsCotent.parentElement.classList.add('showRecipe');
}



















// {"meals":[
//     {"strMeal":"Chick-Fil-A Sandwich",
//     "strMealThumb":"https:\/\/www.themealdb.com\/images\/media\/meals\/sbx7n71587673021.jpg",
//     "idMeal":"53016"},
//     {"strMeal":"Chicken Couscous","strMealThumb":"https:\/\/www.themealdb.com\/images\/media\/meals\/qxytrx1511304021.jpg","idMeal":"52850"},{"strMeal":"Chicken Fajita Mac and Cheese","strMealThumb":"https:\/\/www.themealdb.com\/images\/media\/meals\/qrqywr1503066605.jpg","idMeal":"52818"},{"strMeal":"Chicken Ham and Leek Pie","strMealThumb":"https:\/\/www.themealdb.com\/images\/media\/meals\/xrrtss1511555269.jpg","idMeal":"52875"},{"strMeal":"Chicken Quinoa Greek Salad","strMealThumb":"https:\/\/www.themealdb.com\/images\/media\/meals\/k29viq1585565980.jpg","idMeal":"53011"},{"strMeal":"General Tso's Chicken","strMealThumb":"https:\/\/www.themealdb.com\/images\/media\/meals\/1529444113.jpg","idMeal":"52951"},{"strMeal":"Honey Balsamic Chicken with Crispy Broccoli & Potatoes","strMealThumb":"https:\/\/www.themealdb.com\/images\/media\/meals\/kvbotn1581012881.jpg","idMeal":"52993"},{"strMeal":"Katsu Chicken curry","strMealThumb":"https:\/\/www.themealdb.com\/images\/media\/meals\/vwrpps1503068729.jpg","idMeal":"52820"},{"strMeal":"Rappie Pie","strMealThumb":"https:\/\/www.themealdb.com\/images\/media\/meals\/ruwpww1511817242.jpg","idMeal":"52933"
// }]};