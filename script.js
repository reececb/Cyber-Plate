const recipeUrl = "https://api.edamam.com/search";
const nutritionUrl = " https://api.edamam.com/api/nutrition-data";
const appId = "617129f3";
const appKey = "96f02e5aa28d21c0629922f3930278b6";
function searchRecipes() {
    $("#js-recipes").submit(event => {
        event.preventDefault();
        const userInput = $("#recipe-input").val();
        const quantityInput = $("#quantity-input").val();
        if (quantityInput > 25) {
            $('#scroll-message').show();
            $('#error-container').show();
        }
        else {
            $('#js-error-message').hide();
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
   const queryString = formatQueryParams(params);
   const url = recipeUrl + "?" + queryString;
    

    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })  
    .then(responseJson => displayRecipe(responseJson))
    .catch(err => {
        console.log(err);
        $('#js-error-message').text(`Something went wrong: ${err.message}. Please check your connection, and make sure the search fields were filled out with correct values.`);
        $('#js-error-message').show();
        $('#scroll-message').hide();
        $('#results-header').show();
    });
}

function displayRecipe(data) {
    let recipeHtml = `<h2 id="results-header">Your Recipes</h2>`;
    for (let i = 0; i < data.hits.length; i++){
        recipeHtml += `
        <div class="recipes">
            <ul>
                <li><h3>${data.hits[i].recipe.label}</h3>
                    <img class="recipe-img" alt="Photo of recipe" src="${data.hits[i].recipe.image}">
                    <a class="btn" href="${data.hits[i].recipe.url}" target="_blank">Go to Recipe</a>
                    <p>Recipe From: ${data.hits[i].recipe.source}</p>
                </li>
            </ul>
            ${displayNutrition(data.hits[i].recipe)}
        </div>`
    }
    $('.recipe-results').html(recipeHtml);

}
function displayNutrition(data) {
    const totalCalories = `${data.calories}`/`${data.yield}`;
    const totalFat =  data.totalNutrients.FAT ? `${data.totalNutrients.FAT.quantity}`/`${data.yield}` : "";
    const saturatedFat = data.totalNutrients.FASAT ? `${data.totalNutrients.FASAT.quantity}`/`${data.yield}` : "";
    const cholesterol = data.totalNutrients.CHOLE ? `${data.totalNutrients.CHOLE.quantity}`/`${data.yield}` : "";
    const sodium = data.totalNutrients.NA ? `${data.totalNutrients.NA.quantity}`/`${data.yield}` : "";
    const carbs = data.totalNutrients.CHOCDF ? `${data.totalNutrients.CHOCDF.quantity}`/`${data.yield}` : "";
    const protein = data.totalNutrients.PROCNT ? `${data.totalNutrients.PROCNT.quantity}`/`${data.yield}` : "";
    const vitd = data.totalNutrients.VITD ? `${data.totalNutrients.VITD.quantity}`/`${data.yield}` : "";
    const calcium = data.totalNutrients.CA ? `${data.totalNutrients.CA.quantity}`/`${data.yield}` : "";
    const iron = data.totalNutrients.FE ? `${data.totalNutrients.FE.quantity}`/`${data.yield}` : "";
    const k = data.totalNutrients.K ? `${data.totalNutrients.K.quantity}`/`${data.yield}` : "";
    const dailyFat = data.totalDaily.FAT ? `${data.totalDaily.FAT.quantity}`/`${data.yield}` : "";
    const dailySatFat = data.totalDaily.FASAT ? `${data.totalDaily.FASAT.quantity}`/`${data.yield}` : "";
    const dailyCholesterol = data.totalDaily.CHOLE ? `${data.totalDaily.CHOLE.quantity}`/`${data.yield}` : "";
    const dailySodium = data.totalDaily.NA ? `${data.totalDaily.NA.quantity}`/`${data.yield}` : "";
    const dailyCarbs = data.totalDaily.CHOCDF ? `${data.totalDaily.CHOCDF.quantity}`/`${data.yield}` : "";
    const dailyProtein = data.totalDaily.PROCNT ? `${data.totalDaily.PROCNT.quantity}`/`${data.yield}` : "";
    const dailyVitD = data.totalDaily.VITD ? `${data.totalDaily.VITD.quantity}`/`${data.yield}` : "";
    const dailyCalcium = data.totalDaily.CA ? `${data.totalDaily.CA.quantity}`/`${data.yield}` : "";
    const dailyIron = data.totalDaily.FE ? `${data.totalDaily.FE.quantity}`/`${data.yield}` : "";
    const dailyPotassium = data.totalDaily.K ? `${data.totalDaily.K.quantity}`/`${data.yield}` : "";
    const totalSugar = data.totalNutrients.SUGAR ? `${data.totalNutrients.SUGAR.quantity}`/`${data.yield}` :"";
    const fatUnit = data.totalNutrients.FAT ? `${data.totalNutrients.FAT.unit}` : "";
    const satFatUnit = data.totalNutrients.FASAT ? `${data.totalNutrients.FASAT.unit}` : "";
    const choleUnit = data.totalNutrients.CHOLE ? `${data.totalNutrients.CHOLE.unit}` : "";
    const naUnit = data.totalNutrients.NA ? `${data.totalNutrients.NA.unit}` : "";
    const carbUnit = data.totalNutrients.CHOCDF ? `${data.totalNutrients.CHOCDF.unit}` : "";
    const sugarUnit = data.totalNutrients.SUGAR ? `${data.totalNutrients.SUGAR.unit}` : "";
    const proUnit = data.totalNutrients.PROCNT ? `${data.totalNutrients.PROCNT.unit}` : "";
    const vitdUnit = data.totalNutrients.VITD ? `${data.totalNutrients.VITD.unit}` : "";
    const caUnit = data.totalNutrients.CA ? `${data.totalNutrients.CA.unit}` : "";
    const feUnit = data.totalNutrients.FE ? `${data.totalNutrients.FE.unit}` : "";
    const kUnit = data.totalNutrients.K ? `${data.totalNutrients.K.unit}` : "";

    let nutritionHtml = "";
    nutritionHtml += `
        <section class="performance-facts" id="performance-facts">
            <div class="performance-facts__header">
                <h2 class="performance-facts__title">Nutrition Facts</h2>
            </div>
            <table class="performance-facts__table">
                <thead>
                    <tr>
                        <th colspan="3" class="amps">Amount Per Serving</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th colspan="2" id="lkcal-val-cal">
                            <b>Calories</b>
                        </th>
                        <td class="nob">${Math.round(totalCalories)}</td>
                    </tr>
                    <tr class="thick-row">
                        <td colspan="3" id="daily-value">
                            <b>% Daily Value*</b>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="2">
                            <b>Total Fat</b>
                            ${Math.round(totalFat)}${fatUnit}
                        </th>
                        <td><b>${Math.round(dailyFat)}%</b></td>
                    </tr>
                    <tr>
                        <td class="blank-cell"></td>
                        <th>Saturated Fat ${Math.round(saturatedFat)}${satFatUnit}</th>
                        <td><b>${Math.round(dailySatFat)}%</b></td>
                    </tr>
                    <tr>
                        <th colspan="2">
                            <b>Cholesterol</b>
                            ${Math.round(cholesterol)}${choleUnit}
                        </th>
                        <td><b>${Math.round(dailyCholesterol)}%</b></td>
                    </tr>
                    <tr>
                        <th colspan="2">
                            <b>Sodium</b>
                            ${Math.round(sodium)}${naUnit}
                        </th>
                        <td><b>${Math.round(dailySodium)}%</b></td>
                    </tr>
                    <tr>
                        <th colspan="2">
                            <b>Total Carbohydrate</b>
                            ${Math.round(carbs)}${carbUnit}
                        </th>
                        <td><b>${Math.round(dailyCarbs)}%</b></td>
                    </tr>
                    <tr>
                        <th colspan="2">
                            <b>Total Sugar</b>
                            ${Math.round(totalSugar)}${sugarUnit}
                        </th>
                        <td><b>**</b></td>
                    <tr class="thick-end">
                        <th colspan="2">
                            <b>Protein</b>
                            ${Math.round(protein)}${proUnit}
                        </th>
                        <td><b>${Math.round(dailyProtein)}%</b></td>
                    </tr>
                </tbody>
            </table>
            <table class="performance-facts__table--grid">
                <tbody>
                    <tr>
                    <th>Vitamin D ${Math.round(vitd)}${vitdUnit}</th>
                    <td><b>${Math.round(dailyVitD)}%</b></td>
                    </tr>
                    <tr>
                        <th>Calcium ${Math.round(calcium)}${caUnit}</th>
                        <td><b>${Math.round(dailyCalcium)}%</b></td>
                    </tr>
                    <tr>
                        <th>Iron ${Math.round(iron)}${feUnit}</th>
                        <td>
                            <b>${Math.round(dailyIron)}%</b></td>
                    </tr>
                    <tr class="thin-end">
                        <th>Potassium ${Math.round(k)}${kUnit}</th>
                        <td><b>${Math.round(dailyPotassium)}%</b></td>
                    </tr>
                </tbody>
            </table>
          <p class="small-info" id="small-nutrition-info">*Percent Daily Values are based on a 2000 calorie diet</p>
        </section>`
    return nutritionHtml
}
$(searchRecipes);
