import React from "react";
import Recipe from "./Recipe";

function RecipeGridList(props) {
    return (
        <div className="row">
            {props.recipeList.map((recipe) => {
        const mergedIngredients = recipe.ingredients.map(ingredient => {
            const matchedIngredient = props.ingredientList.find(i => i.id === ingredient.id);
            return {
                ...ingredient,
                name: matchedIngredient ? matchedIngredient.name : 'Unknown Ingredient'
            };
        });
                return (
                    <div className={"col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3"}
                         style={{paddingBottom: "16px"}}
                    ><Recipe key={recipe.id} recipe={recipe} ingredients={mergedIngredients}
                             isSmallView={props.isSmallView}/>
                    </div>)

            })}
        </div>)
        ;
}

export default RecipeGridList;