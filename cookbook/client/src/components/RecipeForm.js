import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useState} from "react";
import Icon from "@mdi/react";
import {mdiPlus} from "@mdi/js";

function RecipeForm({show, setAddRecipeShow, ingredients}) {
    const [validated, setValidated] = useState(false);
    const [defaultFormData, setDefaultFormData] = useState({
        name: "",
        description: ""
    });
    const [recipeFormData, setRecipeFormData] = useState({
        name: "",
        description: ""
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
            console.log(newData);
            return newData;
        });
    };

    const ingredientList = () => {
        const options = [];
        for (let i = 0; i < 3; i++) {
            options.push(<Row>
                    <Col
                        className={"col-6"}
                    >
                        <Form.Control
                            as="select"
                            onChange={(e) => setIngredientField(i, "id", e.target.value)}
                        >
                            {ingredients.map((ingredient, index) => (
                                <option key={index} value={ingredient.id}>
                                    {ingredient.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Col>
                    <Col
                        className={"col-3"}
                    >
                        <Form.Control
                            type="number"
                            min={0}
                            value={ingredientsFormData.amount}
                            onChange={(e) => setIngredientField(i, "amount", e.target.value)}
                        />
                    </Col>
                    <Col
                        className={"col-3"}
                    >
                        <Form.Control
                            className={"col-3"}
                            type="text"
                            value={ingredientsFormData.unit}
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
        const payload = {
            ...recipeFormData,
            "ingredients": ingredientsFormData
        };
        if (!form.checkValidity()) {
            setValidated(true);
            return;
        }
        handleClose()

        console.log(recipeFormData);
        console.log(ingredientsFormData);
        console.log(payload);
    };
    const handleClose = () => {
        setAddRecipeShow(false)
        setRecipeFormData(defaultFormData);
        setIngredientsFormData([]);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
                <Modal.Header closeButton>
                    <Modal.Title>New recipe</Modal.Title>
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
                            Zadejte název
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
                            Zadejte popis
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Ingredients</Form.Label>

                        {ingredientList()}
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="submit"
                        style={{float: "right"}}
                        variant="secondary"
                        class="btn btn-success btn-sm"
                        // onClick={handleSubmit}
                    >
                        <Icon path={mdiPlus} size={1}/>
                        Add recipe
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
        ;

}

export default RecipeForm;