//get all local and api food data and input into DOM
function getData() {
// get HTML element to inject food data
    let foodList = document.querySelector('#foodList');
//clear element
    foodList.innerHTML = "";
// fetch local food data    
fetch('http://localhost:8088/food')
        .then(response => response.json())
        .then(parsedFoods => {
//console.table represents data in console as table
            console.table(parsedFoods);
//loop over local food data, grab barcode and use it to fetch API data
            parsedFoods.forEach(food => {
                fetch(
                    `https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`
                )
                .then(APIfoods => APIfoods.json())
                .then(parsedAPIfoods => {
//target HTML element and inject DOM element created by foodFactory function
                    foodList.innerHTML += foodFactory(food, parsedAPIfoods);
                });
            });
        });

}
// input local and API food data to create DOM element
function foodFactory(localFood, apiFood){
    return `
    <div class="food_list">
    <h2>${localFood.name}</h2>
    <h3>${localFood.ethnicity}</h3>
    <p>${localFood.category}</p>
    <p>Country: ${apiFood.product.countries}</p>
    <p>Calories/serving: ${apiFood.product.nutriments.energy_serving}</p>
    <p>Fat: ${apiFood.product.nutriments.fat_serving}</p>
    <p class="ingredients"> Ingredients: ${apiFood.product.ingredients_text}</p>
    </div>
    `;
}

const getDataBtn = document.getElementById("btn-getData");
getDataBtn.addEventListener("click", () => getData());