import {Button, Card} from "react-bootstrap";
import recipeStyle from "../css/Recipe.module.css"
import Icon from "@mdi/react";
import {mdiFoodForkDrink} from "@mdi/js";
import IngredientList from "./Ingredient";
import {useState} from "react";


function Recipe(props) {

    const className = props.isSmallView ? recipeStyle.recipe.concat(' ', recipeStyle.recipeSmall) : recipeStyle.recipe;
    const descriptionStyle = props.isSmallView ? recipeStyle.description.concat(' ', recipeStyle.descriptionSmall) : recipeStyle.description;
    const [showIngredients, setShowIngredients] = useState(false);
    const buttonStyle = showIngredients ? "btn-secondary" : "btn-primary";
    return (
        <Card className={className}>
            <Card.Body className={recipeStyle.recipeColumn}>
                <Icon path={mdiFoodForkDrink} size={1}/>
                <h3 className={recipeStyle.recipeTitle}>{props.recipe.name}</h3>
                <img src={props.recipe.imgUri} alt={props.recipe.name}></img>
                <p className={descriptionStyle}>{props.recipe.description}</p>
                {!props.isSmallView &&
                    <Button className={buttonStyle} onClick={() => {
                        setShowIngredients((current) => !current)
                    }}>Ingredience</Button>}
                {(showIngredients || props.isSmallView) &&
                    <IngredientList ingredients={props.ingredients}></IngredientList>}

            </Card.Body>
        </Card>
    );
}

export default Recipe;