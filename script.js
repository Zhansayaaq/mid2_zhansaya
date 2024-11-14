const apiKey = 'f829d656f7d347548cc00e584c080b1f';  

async function searchRecipes() {
    const query = document.getElementById('searchInput').value;
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${apiKey}`);
    const data = await response.json();
    displayRecipes(data.results);
}

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipesContainer');
    recipesContainer.innerHTML = '';
    
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <button onclick="showRecipeDetails(${recipe.id})">Подробнее</button>
        `;
        
        recipesContainer.appendChild(recipeCard);
    });
}

async function showRecipeDetails(id) {
    const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`);
    const recipe = await response.json();

    const modalContent = `
        <h2>${recipe.title}</h2>
        <p>${recipe.summary}</p>
        <h3>Ингредиенты:</h3>
        <ul>
            ${recipe.extendedIngredients.map(ing => `<li>${ing.original}</li>`).join('')}
        </ul>
        <h3>Инструкции:</h3>
        <p>${recipe.instructions}</p>
    `;

    // Функция для открытия модального окна с информацией
    openModal(modalContent);
}

function openModal(content) {
    // Логика для показа модального окна с переданным контентом
}
