const recipeUrl = "https://api.edamam.com/search";
const nutritionUrl = " https://api.edamam.com/api/nutrition-data";
const appId = "617129f3";
const appKey = "96f02e5aa28d21c0629922f3930278b6";
function searchRecipes() {
    $("#js-recipes").submit(event => {
        event.preventDefault();
        let recipes = document.getElementById("recipe-results");
        let userInput = $("#recipe-input").val();
        let quantityInput = $("#quantity-input").val();
        if (quantityInput > 25) {
            $('#error-container').show();
        }
        else {
            $('#error-container').hide();
            $('#scroll-message').show();
            getRecipeData(userInput, quantityInput);
        }
    });
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
         .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
         return queryItems.join('&');
}

function getRecipeData(userInput, quantityInput) {
   const params = {
       q: userInput,
       to: quantityInput,
       app_id: appId,
       app_key: appKey 
   } 
   let queryString = formatQueryParams(params);
   let url = recipeUrl + "?" + queryString;
    

    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })  
    .then(responseJson => {
        displayRecipe(responseJson);
    });
}

function displayRecipe(data) {
    console.log(data);
    let recipeHtml = "";
    for (let i = 0; i < data.hits.length; i++){
        recipeHtml += `
        <div class="recipes">
            <li><h3>${data.hits[i].recipe.label}</h3>
                <img class="recipe-img" src="${data.hits[i].recipe.image}">
                <a class="btn" href="${data.hits[i].recipe.url}" target="_blank">Go to Recipe</a>
                <p>Recipe From: ${data.hits[i].recipe.source}</p>
            </li>
            ${displayNutrition(data.hits[i].recipe)}
        </div>`
    }
    $('#recipe-results').html(recipeHtml);

}
function displayNutrition(data) {
    console.log(data);
    const totalFat =  Math.round(`${data.totalNutrients.FAT.quantity}`);
    const saturatedFat = Math.round(`${data.totalNutrients.FASAT.quantity}`);
    const cholesterol = Math.round(`${data.totalNutrients.CHOLE.quantity}`);
    const sodium = Math.round(`${data.totalNutrients.NA.quantity}`);
    const carbs = Math.round(`${data.totalNutrients.CHOCDF.quantity}`)
    const protein = Math.round(`${data.totalNutrients.PROCNT.quantity}`);
    const vitd = Math.round(`${data.totalNutrients.VITD.quantity}`);
    const calcium = Math.round(`${data.totalNutrients.CA.quantity}`);
    const iron = Math.round(`${data.totalNutrients.FE.quantity}`);
    const k = Math.round(`${data.totalNutrients.K.quantity}`);
    const dailyFat = Math.round(`${data.totalDaily.FAT.quantity}`);
    const dailySatFat = Math.round(`${data.totalDaily.FASAT.quantity}`);
    const dailyCholesterol = Math.round(`${data.totalDaily.CHOLE.quantity}`);
    const dailySodium = Math.round(`${data.totalDaily.NA.quantity}`);
    const dailyCarbs = Math.round(`${data.totalDaily.CHOCDF.quantity}`);
    const dailyProtein = Math.round(`${data.totalDaily.PROCNT.quantity}`);
    const dailyVitD = Math.round(`${data.totalDaily.VITD.quantity}`);
    const dailyCalcium = Math.round(`${data.totalDaily.CA.quantity}`);
    const dailyIron = Math.round(`${data.totalDaily.FE.quantity}`);
    const dailyPotassium = Math.round(`${data.totalDaily.K.quantity}`);
    let nutritionHtml = "";
    nutritionHtml += `
        <section class="performance-facts" id="performance-facts">
            <div class="performance-facts__header">
                <h1 class="performance-facts__title">Nutrition Facts</h1>
            </div>
            <table class="performance-facts__table">
                <thead>
                    <tr>
                        <th colspan="3" class"amps">Amount Per Recipe</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th colspan="2" id="lkcal-val-cal">
                            <b>Calories</b>
                        </th>
                        <td class="nob">${Math.round(data.calories)}</td>
                    </tr>
                    <tr class="thick-row">
                        <td colspan="3" id="daily-value">
                            <b>% Daily Value*</b>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">
                            <b>Total Fat</b>
                            ${totalFat}${data.totalNutrients.FAT.unit}
                        </th>
                        <td><b>${dailyFat}%</b></td>
                    </tr>
                    <tr>
                        <td class="blank-cell"></td>
                        <th>Saturated Fat ${saturatedFat}${data.totalNutrients.FASAT.unit}</th>
                        <td><b>${dailySatFat}%</b></td>
                    </tr>
                    <tr>
                        <th colspan="2">
                            <b>Cholesterol</b>
                            ${cholesterol}${data.totalNutrients.CHOLE.unit}
                        </th>
                        <td><b>${dailyCholesterol}%</b></td>
                    </tr>
                    <tr>
                        <th colspan="2">
                            <b>Sodium</b>
                            ${sodium}${data.totalNutrients.NA.unit}
                        </th>
                        <td><b>${dailySodium}%</b></td>
                    </tr>
                    <tr>
                        <th colspan="2">
                            <b>Total Carbohydrate</b>
                            ${carbs}${data.totalNutrients.CHOCDF.unit}
                        </th>
                        <td><b>${dailyCarbs}%</b></td>
                    </tr>
                    <tr>
                        <th colspan="2">
                            <b>Total Sugar</b>
                            ${Math.round(data.totalNutrients.SUGAR.quantity)}${data.totalNutrients.SUGAR.unit}
                        </th>
                        <td><b>**</b></td>
                    <tr class="thick-end">
                        <th colspan="2">
                            <b>Protein</b>
                            ${protein}${data.totalNutrients.PROCNT.unit}
                        </th>
                        <td><b>${dailyProtein}%</b></td>
                    </tr>
                </tbody>
            </table>
            <table class="performance-facts__table--grid">
                <tbody>
                    <tr>
                    <th>Vitamin D ${vitd}${data.totalNutrients.VITD.unit}</th>
                    <td><b>${dailyVitD}%</b></td>
                    </tr>
                    <tr>
                        <th>Calcium ${calcium}${data.totalNutrients.CA.unit}</th>
                        <td><b>${dailyCalcium}%</b></td>
                    </tr>
                    <tr>
                        <th>Iron ${iron}${data.totalNutrients.FE.unit}</th>
                        <td>
                            <b>${dailyIron}%</b></td>
                    </tr>
                    <tr class="thin-end">
                        <th>Potassium ${k}${data.totalNutrients.K.unit}</th>
                        <td><b>${dailyPotassium}%</b></td>
                    </tr>
                </tbody>
            </table>
          <p class="small-info" id="small-nutrition-info">*Percent Daily Values are based on a 2000 calorie diet</p>
        </section>





    </section>`
    return nutritionHtml
}
$(searchRecipes);
