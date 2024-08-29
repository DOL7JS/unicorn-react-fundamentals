import {Button, Container, Form, Nav, Navbar} from "react-bootstrap";
import Icon from "@mdi/react";
import {mdiMagnify, mdiMinus, mdiPlus} from "@mdi/js";
import {useContext, useMemo, useState} from "react";
import RecipeTableList from "./RecipeTableList";
import RecipeGridList from "./RecipeGridList";
import headerStyle from "../css/Header.module.css"
import navbarStyle from "../css/Navbar.module.css"
import RecipeForm from "./RecipeForm";
import UserContext from "../UserProvider";
import {useNavigate} from "react-router-dom";

function RecipesList(props) {
    const [smallView, setSmallView] = useState(true);
    const [searchBy, setSearchBy] = useState("");
    const [isAdminView, setIsAdminView] = useState(false);
    const {isAuthorized, setIsAuthorized} = useContext(UserContext);
    const [addRecipeShow, setAddRecipeShow] = useState({
        state: false
    });
    const navigate = useNavigate();
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
        return (<Form className={searchFormStyle} onSubmit={handleSearch}>
            <div className={'d-flex'}>
                <Form.Control
                    id={"searchInput"}
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={handleSearchDelete}
                    style={{width: 'auto'}}/>

                <Button
                    style={{marginRight: "8px"}}
                    variant="outline-success"
                    type="submit">
                    <Icon size={1} path={mdiMagnify}/>
                </Button>
            </div>
            {isAuthorized && <div className={headerStyle.recipeButton}>
                <Button
                    variant="outline-primary"
                    className={"".concat(' ', navbarStyle.navigator)}
                    onClick={() => handleAddRecipeShow(null)}
                >
                    <Icon path={mdiPlus} size={1}/>
                    <span>Recipe</span>

                </Button>
            </div>}
        </Form>);
    }

    function getMenuBar() {
        return (<Navbar collapseOnSelect expand="lg">
            <Container fluid>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav" className={'justify-content-between'}>
                    <Nav>
                        <Nav.Link disabled={searchBy}
                                  onClick={() => setSmallView((currentState) => {
                                      return !currentState;
                                  })}>{<Icon size={1} path={smallView ? mdiPlus : mdiMinus}/>}</Nav.Link>
                        <Nav.Link className={'d-none d-sm-block'}
                                  onClick={() => setIsAdminView((currentState) => {
                                      return !currentState
                                  })}>
                            {isAdminView ? 'User view' : 'Admin view'}
                        </Nav.Link>
                        <Nav.Link onClick={() => navigate('/ingredientList')}>Ingredients</Nav.Link>
                        <Nav.Link
                            onClick={() => setIsAuthorized((currentState) => {
                                return !currentState
                            })}
                        >{isAuthorized ? 'Log out' : 'Log in'}</Nav.Link>
                    </Nav>
                    <Nav>
                        {getSearchBar()}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>);
    }

    return (
        <>
            {getMenuBar()}
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
                                    isSmallView={smallView} onEdit={handleAddRecipeShow}/>
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