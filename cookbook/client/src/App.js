import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Header from "./components/Header";
import RecipeList from "./components/RecipesList";
import {useEffect, useState} from "react";
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";
import styles from "./css/States.module.css";

function App() {
    const [recipeLoadCall, setRecipeLoadCall] = useState({
        state: "pending",
    });
    const [ingredientLoadCall, setIngredientLoadCall] = useState({
        state: "pending",
    });

    useEffect(() => {
        fetch(`http://localhost:3000/recipe/list`, {
            method: "GET",
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setRecipeLoadCall({state: "error", error: responseJson});
            } else {
                setRecipeLoadCall({state: "success", data: responseJson});
            }
        });
        fetch(`http://localhost:3000/ingredient/list`, {
            method: "GET",
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setIngredientLoadCall({state: "error", error: responseJson});
            } else {
                setIngredientLoadCall({state: "success", data: responseJson});
            }
        });
    }, []);

    function getContent() {
        const pendingRequest = recipeLoadCall.state === 'pending' || ingredientLoadCall.state === 'pending';
        const successRequest = recipeLoadCall.state === 'success' && ingredientLoadCall.state === 'success';
        const errorRequest = recipeLoadCall.state === 'error' || ingredientLoadCall.state === 'error';
        if (errorRequest) {
            return (
                <div className={styles.error}>
                    <div>Nepodařilo se načíst data o receptech.</div>
                    <br/>
                    <pre>{JSON.stringify(recipeLoadCall.error, null, 2)}</pre>
                </div>);
        } else if (pendingRequest) {
            return (<div className={styles.loading}>
                <Icon size={2} path={mdiLoading} spin={true}/>
            </div>);
        } else if (successRequest) {
            return (<>
                <Header title={"Best recipes in Unicorn"}/>
                <RecipeList recipeList={recipeLoadCall.data} ingredientList={ingredientLoadCall.data}/>
            </>);
        }
        return null;
    }

    return (
        <div className="App">{getContent()}</div>
    );
}

export default App;
