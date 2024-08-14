
import {Button, Form, Navbar} from "react-bootstrap";
import Icon from "@mdi/react";
import {mdiMagnify, mdiMinus, mdiPlus} from "@mdi/js";
import {useMemo, useState} from "react";
import RecipeTableList from "./RecipeTableList";
import RecipeGridList from "./RecipeGridList";
import recipeStyle from "../css/Recipe.module.css"
import headerStyle from "../css/Header.module.css"

function RecipesList(props) {
    const [viewType, setViewType] = useState("grid");
    const isGrid = viewType === "grid";
    const [searchBy, setSearchBy] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    function handleSearch(event) {
        event.preventDefault();
        setSearchBy(event.target["searchInput"].value);
    }

    function handleSearchDelete(event) {
        if (!event.target.value) setSearchBy("");
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
    const searchFormStyle = "d-flex".concat(' ',headerStyle.form);
    return (
        <>
            <Navbar bg="light" expand={'s'}>
                <Form inline className={searchFormStyle} onSubmit={handleSearch}>
                    <Form.Control
                        id={"searchInput"}
                        style={{maxWidth: "150px"}}
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={handleSearchDelete}
                    />
                    <Button
                        style={{marginRight: "8px"}}
                        variant="outline-success"
                        type="submit"
                    >
                        <Icon size={1} path={mdiMagnify}/>
                    </Button>
                </Form>
                <Form inline className={headerStyle.form}>
                    {!isAdmin &&
                        <Button className={headerStyle.form}
                            variant="outline-primary"
                            onClick={() =>
                                setViewType((currentState) => {
                                    if (currentState === "grid") return "table";
                                    else return "grid";
                                })
                            }
                        >
                            <Icon size={1} path={isGrid ? mdiPlus : mdiMinus}/>{" "}
                        </Button>}

                    <Button
                        variant="outline-primary"
                        onClick={() =>
                            setIsAdmin((currentState) => {
                                return !currentState
                            })
                        }
                    >
                        {isAdmin ? 'Admin view' : 'User view'}
                    </Button>
                </Form>
            </Navbar>

            <div className={recipeStyle.recipeList}>
                {isAdmin ?
                    (<RecipeTableList recipeList={filteredRecipeList} isSmallView={isGrid}/>) :
                    (<RecipeGridList recipeList={filteredRecipeList} ingredientList={props.ingredientList}
                                     isSmallView={isGrid}/>)}

            </div>
        </>
    );
}

export default RecipesList;