import ingredientStyle from "../css/Ingredient.module.css"
import {fetchIngredientList} from "../utils/Connection";
import {useEffect, useState} from "react";
import {Card, Nav, Navbar, Container} from "react-bootstrap";
import {getPendingPage} from "../utils/Common";
import Header from "./Header";
import {mdiIdentifier} from "@mdi/js";
import Icon from "@mdi/react";


function IngredientList(props) {

    const isIngredientsInRecipe = !!props.ingredients;
    const [ingredientLoadCall, setIngredientLoadCall] = useState({
        state: "pending",
    });

    useEffect(() => {
        if(!isIngredientsInRecipe){
            fetchIngredientList(setIngredientLoadCall);
        }
    }, []);
    const showPending = ingredientLoadCall.state === 'pending' && !isIngredientsInRecipe;
    return (
        <>
            {showPending && getPendingPage()}
            <>
                {!isIngredientsInRecipe && ingredientLoadCall.state === 'success' && (
                    <>
                        <Header title={'Ingredients in Unicorn'}/>
                        <Navbar bg="light" expand="sm" className="bg-body-tertiary">
                            <Container fluid>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                                <Navbar.Collapse id="basic-navbar-nav" style={{textAlign: "center"}}>
                                <Nav>
                                        <Nav.Link href="/home">Home</Nav.Link>
                                        <Nav.Link href="/recipeList">Recipes</Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                        {ingredientLoadCall.data.map((ingr) => (
                            <Card key={ingr.id}>
                                <Card.Body>
                                    <Card.Title>{ingr.name}</Card.Title>
                                    <Card.Text><Icon path={mdiIdentifier} size={1}/>: {ingr.id}</Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </>
                )}
            </>
            {
                isIngredientsInRecipe && <ul className={ingredientStyle.ingredientList}>
                    {props.ingredients.map((ingr) => {
                        return <li key={ingr.id}>{ingr.name} - {ingr.amount} {ingr.unit}</li>
                    })}
                </ul>
            }
        </>

    )
        ;
}

export default IngredientList;