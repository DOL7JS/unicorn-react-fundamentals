import {Button, Form, Navbar} from "react-bootstrap";
import Icon from "@mdi/react";
import {mdiMagnify, mdiMinus, mdiPlus} from "@mdi/js";
import {useMemo, useState} from "react";
import RecipeTableList from "./RecipeTableList";
import RecipeGridList from "./RecipeGridList";
import recipeStyle from "../css/Recipe.module.css"
import headerStyle from "../css/Header.module.css"

function RecipesList(props) {
    const [smallView, setSmallView] = useState(true);
    const [searchBy, setSearchBy] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

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
                    style={{maxWidth: "150px"}}
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
        return <Form inline className={headerStyle.form}>
                {!isAdmin &&
                    <Button className={headerStyle.form}
                            disabled={searchBy}
                            variant="outline-primary"
                            onClick={() => setSmallView((currentState) => {
                                console.log(!currentState)
                                return !currentState;
                            })}>
                        <Icon size={1} path={smallView ? mdiPlus : mdiMinus}/>{" "}
                    </Button>}

                    <Button
                        variant="outline-primary"
                        onClick={() => setIsAdmin((currentState) => {
                            return !currentState
                        })}>
                        {isAdmin ? 'User view' : 'Admin view'}
                    </Button>
        </Form>;
    }

    const recipeListStyle = smallView ? recipeStyle.recipeListSmall : recipeStyle.recipeList;
    return (
        <>
            <Navbar bg="light" expand={'s'}>
                {getSearchBar()}
                {getMenuBar()}
            </Navbar>
            <div className={recipeListStyle}>
                {isAdmin ?
                    (<RecipeTableList recipeList={filteredRecipeList} isSmallView={smallView}/>) :
                    (<RecipeGridList recipeList={filteredRecipeList} ingredientList={props.ingredientList}
                                     isSmallView={smallView}/>)}
            </div>
        </>
    );
}

export default RecipesList;