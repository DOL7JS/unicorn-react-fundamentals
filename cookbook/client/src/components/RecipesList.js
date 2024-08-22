import {Button, Form, Navbar} from "react-bootstrap";
import Icon from "@mdi/react";
import {mdiMagnify, mdiMinus, mdiPlus} from "@mdi/js";
import {useMemo, useState} from "react";
import RecipeTableList from "./RecipeTableList";
import RecipeGridList from "./RecipeGridList";
import headerStyle from "../css/Header.module.css"
import RecipeForm from "./RecipeForm";

function RecipesList(props) {
    const [smallView, setSmallView] = useState(true);
    const [searchBy, setSearchBy] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [addRecipeShow, setAddRecipeShow] = useState(false);
    const handleAddRecipeShow = () => setAddRecipeShow(true);

    function handleSearch(event) {
        event.preventDefault();
        setSearchBy(event.target["searchInput"].value);
        if (event.target["searchInput"].value) {
            setSmallView(false);
        }
    }

    function handleSearchDelete(event) {
        if (!event.target.value) {
            setSearchBy("");
        }
    }

    const filteredRecipeList = useMemo(() => {
        return props.recipeList.filter((recipe) => {
            return (
                recipe.name
                    .toLocaleLowerCase()
                    .includes(searchBy.toLocaleLowerCase()) ||
                recipe.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
            );
        });
    }, [searchBy]);

    function getSearchBar() {
        const searchFormStyle = "d-flex".concat(' ',headerStyle.form);
        return (<Form inline className={searchFormStyle} onSubmit={handleSearch}>
                <Form.Control
                    id={"searchInput"}
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={handleSearchDelete}/>
                <Button
                    style={{marginRight: "8px"}}
                    variant="outline-success"
                    type="submit">
                    <Icon size={1} path={mdiMagnify}/>
                </Button>
        </Form>);
    }

    function getMenuBar() {
        return <Form inline className={headerStyle.form.concat(' ', "d-flex")}>
            <Button
                style={{float: "right"}}
                variant="secondary"
                class="btn btn-success btn-sm"
                onClick={handleAddRecipeShow}
            >
                <Icon path={mdiPlus} size={1}/>
                Recipe
            </Button>
                {!isAdmin &&
                    <><Button
                        style={{marginTop: "10px"}}
                        className={"w-100 d-sm-none"}
                        disabled={searchBy}
                        variant="outline-primary"
                        onClick={() => setSmallView((currentState) => {
                            return !currentState;
                        })}>
                        <Icon size={1} path={smallView ? mdiPlus : mdiMinus}/>{" "}
                    </Button>
                        <Button
                            style={{marginRight: "10px"}}
                            className={"d-none d-sm-block"}
                            disabled={searchBy}
                            variant="outline-primary"
                            onClick={() => setSmallView((currentState) => {
                                return !currentState;
                            })}>
                        <Icon size={1} path={smallView ? mdiPlus : mdiMinus}/>{" "}
                        </Button></>}

                    <Button
                        className={"d-none d-md-block"}
                        variant="outline-primary"
                        onClick={() => setIsAdmin((currentState) => {
                            return !currentState
                        })}>
                        {isAdmin ? 'User view' : 'Admin view'}
                    </Button>
        </Form>;
    }

    return (
        <>
            <Navbar bg="light" collapseOnSelect expand="sm">
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse style={{justifyContent: "space-between"}}>
                {getSearchBar()}
                {getMenuBar()}
                </Navbar.Collapse>
            </Navbar>
            <RecipeForm
                show={addRecipeShow}
                setAddRecipeShow={setAddRecipeShow}
                ingredients={props.ingredientList}
            ></RecipeForm>
            <div className="container">
                <div className={"d-block d-md-none"}>
                    <RecipeGridList recipeList={filteredRecipeList} ingredientList={props.ingredientList}
                                    isSmallView={smallView}/>
                </div>
                <div className={"d-none d-md-block"}>
                    {isAdmin ?
                        (<RecipeTableList recipeList={filteredRecipeList} isSmallView={smallView}/>) :
                        (<RecipeGridList recipeList={filteredRecipeList} ingredientList={props.ingredientList}
                                         isSmallView={smallView}/>)}
                </div>
            </div>
        </>
    )
        ;
}

export default RecipesList;