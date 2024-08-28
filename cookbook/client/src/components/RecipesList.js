import {Button, Form, Navbar} from "react-bootstrap";
import Icon from "@mdi/react";
import {mdiMagnify, mdiMinus, mdiPlus} from "@mdi/js";
import {useContext, useMemo, useState} from "react";
import RecipeTableList from "./RecipeTableList";
import RecipeGridList from "./RecipeGridList";
import headerStyle from "../css/Header.module.css"
import RecipeForm from "./RecipeForm";
import UserContext from "../UserProvider";

function RecipesList(props) {
    const [smallView, setSmallView] = useState(true);
    const [searchBy, setSearchBy] = useState("");
    const [isAdminView, setIsAdminView] = useState(false);
    const {isAuthorized, setIsAuthorized} = useContext(UserContext);
    const [addRecipeShow, setAddRecipeShow] = useState({
        state: false
    });
    const handleAddRecipeShow = (data) => {
        console.log(data);
        setAddRecipeShow({state: true, data: data})
    };

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
    }, [searchBy, props.recipeList]);

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
            {isAuthorized &&
                <Button
                    style={{float: "right"}}
                    variant="secondary"
                    class="btn btn-success btn-sm"
                    onClick={() => handleAddRecipeShow(null)}
                >
                    <Icon path={mdiPlus} size={1}/>
                    Recipe
                </Button>
            }

            {!isAdminView &&
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
                        onClick={() => setIsAdminView((currentState) => {
                            return !currentState
                        })}>
                        {isAdminView ? 'User view' : 'Admin view'}
                    </Button>
            <Button
                className={"d-none d-md-block"}
                variant="outline-primary"
                onClick={() => setIsAuthorized((currentState) => {
                    return !currentState
                })}>
                {isAuthorized ? 'Log out' : 'Log in'}
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
                show={addRecipeShow.state}
                setAddRecipeShow={setAddRecipeShow}
                ingredients={props.ingredientList}
                onComplete={props.onComplete}
                recipe={addRecipeShow.data}
            ></RecipeForm>
            <div className="container">
                <div className={"d-block d-md-none"}>
                    <RecipeGridList recipeList={filteredRecipeList} ingredientList={props.ingredientList}
                                    isSmallView={smallView}/>
                </div>
                <div className={"d-none d-md-block"}>
                    {isAdminView ?
                        (<RecipeTableList recipeList={filteredRecipeList} isSmallView={smallView}
                                          onEdit={handleAddRecipeShow} onDelete={props.onDelete}/>) :
                        (<RecipeGridList recipeList={filteredRecipeList} ingredientList={props.ingredientList}
                                         isSmallView={smallView} onEdit={handleAddRecipeShow}/>)}
                </div>
            </div>
        </>
    )
        ;
}

export default RecipesList;