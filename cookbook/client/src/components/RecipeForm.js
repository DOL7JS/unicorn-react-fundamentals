import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import Icon from "@mdi/react";
import {mdiMinus, mdiPlus} from "@mdi/js";
import ingredientStyle from "../css/Ingredient.module.css"

function RecipeForm({show, setAddRecipeShow, ingredients, onComplete, recipe}) {
    const [validated, setValidated] = useState(false);
    const [noIngredients, setNoIngredients] = useState(1);
    const [defaultFormData, setDefaultFormData] = useState({
        name: "",
        description: ""
    });
    const [recipeFormData, setRecipeFormData] = useState(defaultFormData);
    const [addRecipeCall, setAddRecipeCall] = useState({
        state: 'inactive'
    });
    const [ingredientsFormData, setIngredientsFormData] = useState([]);
    const setField = (name, val) => {
        return setRecipeFormData((formData) => {
            const newData = {...formData};
            newData[name] = val;
            return newData;
        });
    };

    const setIngredientField = (index, name1, val) => {
        if (name1 == null) {
            return;
        }
        return setIngredientsFormData((formData) => {
            const newData = {...formData};
            newData[index] = {...newData[index], [name1]: val};
            return newData;
        });
    };
    const plusNoIngredients = () => {
        setNoIngredients((value) => {
                return value + 1
            }
        )
    }
    const minusNoIngredients = () => {
        setNoIngredients((value) => {
                if (value > 1) {
                    return value - 1
                }
                return value;
            }
        )
    }
    useEffect(() => {
        if (recipe) {
            console.log(recipe)
            setRecipeFormData({name: recipe.name, description: recipe.description})
            setIngredientsFormData(recipe.ingredients)
            setNoIngredients(recipe.ingredients?.length > 0 ? recipe.ingredients?.length : noIngredients)
        } else {
            console.log('NOT RECIPE')
        }
    }, [recipe]);
    const ingredientList = () => {
        const options = [];
        for (let i = 0; i < noIngredients; i++) {
            options.push(<Row className={"mt-1"}>
                    <Col
                        className={"col-6"}
                    >
                        <Form.Control
                            as="select"
                            type={"select"}
                            minLength={1}
                            value={ingredientsFormData[i]?.id}
                            required
                            onChange={(e) => setIngredientField(i, "id", e.target.value)}
                        >
                            <option hidden disabled selected value={""}></option>
                            {ingredients.map((ingredient, index) => (
                                <option key={index} value={ingredient.id}>
                                    {ingredient.name}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Please select a valid option.
                        </Form.Control.Feedback>
                    </Col>
                <Col
                    className={"col-3"}
                    >
                        <Form.Control
                            required
                            type="number"
                            min={0}
                            value={ingredientsFormData[i]?.amount}
                            onChange={(e) => setIngredientField(i, "amount", parseInt(e.target.value))}
                        />
                    </Col>
                    <Col
                        className={"col-3"}
                    >
                        <Form.Control
                            required
                            className={"col-3"}
                            type="text"
                            value={ingredientsFormData[i]?.unit}
                            onChange={(e) => setIngredientField(i, "unit", e.target.value)}
                        />
                    </Col>
                </Row>
            );
        }
        return options;
    }
    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();
        console.log(ingredientsFormData)

        const ingredientsArray = Object.values(ingredientsFormData);
        console.log(ingredientsArray)

        const payload = {
            id: recipe ? recipe.id : null,
            ...recipeFormData,
            "ingredients": ingredientsArray
        };
        if (!form.checkValidity()) {
            setValidated(true);
            return;
        }

        setAddRecipeCall({state: 'pending'});
        const res = await fetch(`http://localhost:3000/recipe/${recipe ? 'update' : 'create'}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.status >= 400) {
            setAddRecipeCall({state: "error", error: data});
        } else {
            setAddRecipeCall({state: "success", data});
            if (typeof onComplete === 'function') {
                onComplete(data);
            }
            handleClose();
        }


    };
    const handleClose = () => {
        console.log("Close form")
        setAddRecipeShow({state: false, data: null})
        setRecipeFormData(defaultFormData);
        setIngredientsFormData([]);
        setNoIngredients(1);
        setValidated(false);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
                <Modal.Header closeButton>
                    <Modal.Title>{recipe ? 'Edit recipe' : 'New recipe'} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={recipeFormData.name}
                            onChange={(e) => setField("name", e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Invalid name
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={recipeFormData.description}
                            onChange={(e) => setField("description", e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Invalid description
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col><Form.Label>Ingredients</Form.Label></Col>
                            <Col className={"col-2"}><Button
                                className={ingredientStyle.ingredientButton}
                                onClick={plusNoIngredients}><Icon size={1}
                                                                  path={mdiPlus}></Icon></Button>

                                <Button disabled={noIngredients === 1} className={ingredientStyle.ingredientButton}
                                        style={{backgroundColor: "red"}}
                                        onClick={minusNoIngredients}>
                                    <Icon size={1} path={mdiMinus}></Icon>
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col
                                className={"col-6".concat(' ', ingredientStyle.ingredientListDescription)}><small>Name</small></Col>
                            <Col className={"col-3".concat(' ', ingredientStyle.ingredientListDescription)}
                                 style={{color: "grey"}}><small>Amount</small></Col>
                            <Col className={"col-3".concat(' ', ingredientStyle.ingredientListDescription)}
                                 style={{color: "grey"}}><small>Unit</small></Col>
                        </Row>

                        {ingredientList()}
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="submit"
                        style={{float: "right"}}
                        variant="secondary"
                        class="btn btn-success btn-sm"
                    >
                        <Icon path={mdiPlus} size={1}/>
                        {recipe ? 'Edit recipe' : 'Add recipe'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
        ;

}

export default RecipeForm;