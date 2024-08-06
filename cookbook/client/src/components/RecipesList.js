import Recipe from "./Recipe";
import recipeStyle from "../css/Recipe.module.css"

function RecipesList(props) {
    return (
        <div className={recipeStyle.recipeContainer}>
            <div className={recipeStyle.recipeList}>
                {props.recipeList.map((recipe) => {
                    return (<Recipe key={recipe.id} recipe={recipe}/>)
                })}
            </div>
        </div>
    );
}

export default RecipesList;