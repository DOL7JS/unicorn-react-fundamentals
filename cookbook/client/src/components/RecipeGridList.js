import React from "react";
import Recipe from "./Recipe";

function RecipeGridList(props) {
    return props.recipeList.map((recipe) => {
        const mergedIngredients = recipe.ingredients.map(ingredient => {
            const matchedIngredient = props.ingredientList.find(i => i.id === ingredient.id);
            return {
                ...ingredient,
                name: matchedIngredient ? matchedIngredient.name : 'Unknown Ingredient'
            };
        });
        return (<Recipe key={recipe.id} recipe={recipe} ingredients={mergedIngredients} isSmallView={props.isSmallView}/>)

    });
}

export default RecipeGridList;