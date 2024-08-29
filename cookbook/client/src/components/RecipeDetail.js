import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {getErrorPage, getPendingPage} from "../utils/Common";
import {fetchIngredientList, fetchRecipe} from "../utils/Connection";
import Header from "./Header";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import style from "../css/Navbar.module.css"

function RecipeDetail() {
    const navigate = useNavigate();
    let [searchParams] = useSearchParams();

    const recipeId = searchParams.get("id");
    const [recipeLoadCall, setRecipeLoadCall] = useState({
        state: "pending",
    });
    const [ingredientLoadCall, setIngredientLoadCall] = useState({
        state: "pending",
    });

    function mergedIngredients(recipeData, ingredientsData) {

        return (
            <table className="table table-bordered w-50">
                <thead>
                <tr>
                    <th>Ingredient Name</th>
                    <th>Amount</th>
                    <th>Unit</th>
                </tr>
                </thead>
                <tbody>
                {recipeData.ingredients.map((ingredient) => {
                    const matchedIngredient = ingredientsData.find(i => i.id === ingredient.id);

                    return (
                        <tr key={ingredient.id}> {/* Added key for uniqueness */}
                            <td>{matchedIngredient.name}</td>
                            <td>{ingredient.amount}</td>
                            <td>{ingredient.unit}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        );

    }

    useEffect(() => {
        fetchRecipe(setRecipeLoadCall, recipeId)
        fetchIngredientList(setIngredientLoadCall)

    }, []);

    return (
        <>
            <Header data-testid="recipe-detail-title" title={'Recipe'}></Header>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" style={{textAlign: "center"}}>
                        <Nav>
                            <Nav.Link onClick={() => navigate("/home")}>Home</Nav.Link>
                            <Nav.Link onClick={() => navigate("/recipeList")}>Recipes</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {
                (recipeLoadCall.state === 'error' || ingredientLoadCall.state === 'error') &&
                getErrorPage(recipeLoadCall)
            }
            {
                (recipeLoadCall.state === 'pending' || ingredientLoadCall.state === 'pending') &&
                getPendingPage()
            }
            {recipeLoadCall.state === 'success' && ingredientLoadCall.state === 'success' &&
                    <div className={'m-5'}>
                        <span><b>Name: </b>{recipeLoadCall.data.name}</span>
                        <p><b>Description: </b>{recipeLoadCall.data.description}</p>
                        {mergedIngredients(recipeLoadCall.data, ingredientLoadCall.data)}
                    </div>

            }

        </>
    );
}

export default RecipeDetail