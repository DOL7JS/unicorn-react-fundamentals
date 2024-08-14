import React from "react";
import Table from "react-bootstrap/Table";
import recipeStyle from "../css/RecipeTable.module.css"

function RecipeTableList(props) {
    return (
        <Table>
            <thead>
            <tr>
                <th className={recipeStyle.recipeTable10w}>Název</th>
                <th>Popis</th>
                <th className={recipeStyle.recipeTable10w}>Počet ingrediencí</th>
            </tr>
            </thead>
            <tbody>
            {props.recipeList.map((recipe) => {
                return (
                    <tr key={recipe.id}>
                        <td className={recipeStyle.recipeTableLeftAlign}>{recipe.name}</td>
                        <td className={recipeStyle.recipeTableLeftAlign}>{recipe.description}</td>
                        <td>{recipe.ingredients.length}</td>
                    </tr>
                );
            })}
            </tbody>
        </Table>
    );
}

export default RecipeTableList;