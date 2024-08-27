import React, {useState} from "react";
import Table from "react-bootstrap/Table";
import recipeStyle from "../css/RecipeTable.module.css"
import Icon from "@mdi/react";
import {mdiPencilOutline} from "@mdi/js";
import RecipeDelete from "./RecipeDelete";
import {Alert} from "react-bootstrap";

function RecipeTableList(props) {

    const [deleteRecipeError, setDeleteRecipeError] = useState('');
    return (
        <>
            {deleteRecipeError &&
                <Alert variant="danger">
                    Error: {deleteRecipeError}
                </Alert>
            }
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
                        <Icon
                            size={2}
                            path={mdiPencilOutline}
                            style={{color: 'orange', cursor: 'pointer'}}
                            onClick={(e) => {
                                props.onEdit(recipe)
                                console.log(recipe)
                            }}
                        />
                        <RecipeDelete
                            recipe={recipe}
                            onError={(error) => setDeleteRecipeError(error)}
                            onDelete={(id) => props.onDelete(id)}
                        />

                    </tr>
                );
            })}
            </tbody>
        </Table>
        </>
    );
}

export default RecipeTableList;