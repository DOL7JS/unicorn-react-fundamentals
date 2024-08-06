import {Card} from "react-bootstrap";
import recipeStyle from "../css/Recipe.module.css"
import Icon from "@mdi/react";
import {mdiFoodForkDrink} from "@mdi/js";


function Recipe(props) {
    return (
        <Card className={recipeStyle.recipe}>
            <Card.Body className={recipeStyle.recipeColumn}>
                <Icon path={mdiFoodForkDrink} size={1}/>
                <h3 className={recipeStyle.recipeTitle}>{props.recipe.name}</h3>
                <img src={props.recipe.imgUri} alt={props.recipe.name}></img>
                <p>{props.recipe.description}</p>
            </Card.Body>
        </Card>
    );
}

export default Recipe;