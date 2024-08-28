import {Button, Card, Col, Row} from "react-bootstrap";
import recipeStyle from "../css/Recipe.module.css"
import Icon from "@mdi/react";
import {mdiFoodForkDrink, mdiPencilOutline} from "@mdi/js";
import IngredientList from "./IngredientList";
import {useContext, useState} from "react";
import UserContext from "../UserProvider";

function Recipe(props) {

    const cardStyle = props.isSmallView ? recipeStyle.recipe.concat(' ', recipeStyle.recipeSmall) : recipeStyle.recipe;
    const descriptionStyle = props.isSmallView ? recipeStyle.description.concat(' ', recipeStyle.descriptionSmall) : recipeStyle.description;
    const [showIngredients, setShowIngredients] = useState(false);
    const buttonStyle = showIngredients ? "btn-secondary" : "btn-primary";
    const {isAuthorized} = useContext(UserContext);
    function getIngredientsButton() {
        return <>{!props.isSmallView &&
            <Button className={recipeStyle.ingredientButton.concat(' ', buttonStyle)} onClick={() => {
                setShowIngredients((current) => !current)
            }}>Ingredience</Button>}

        </>;
    }

    function getIngredients() {
        if (!showIngredients && !props.isSmallView) {
            return null;
        }

        return (
            <>
                {!props.isSmallView && <hr />}
                <IngredientList ingredients={props.ingredients} />
            </>
        );
    }
    return (
        <Card className={cardStyle}>
            <Card.Body className={recipeStyle.recipeColumn}>
                <Row>
                    <Col>
                        <Icon path={mdiFoodForkDrink} size={1}/>
                    </Col>
                    <Col>
                        {isAuthorized &&
                            <Icon
                                size={0.8}
                                path={mdiPencilOutline}
                                style={{color: 'orange', cursor: 'pointer'}}
                                onClick={(e) => {
                                    props.onEdit(props.recipe)
                                    console.log(props.recipe)
                                }}
                            />}

                    </Col>
                </Row>

                <Card.Title className={recipeStyle.recipeTitle}>{props.recipe.name}</Card.Title>
                <Card.Img src={props.recipe.imgUri} alt={props.recipe.name}></Card.Img>
                {getIngredientsButton()}
                <Card.Text className={descriptionStyle}>{props.recipe.description}</Card.Text>
                {getIngredients()}
            </Card.Body>
        </Card>
    );
}

export default Recipe;