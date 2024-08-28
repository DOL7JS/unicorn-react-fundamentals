import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Header from "./components/Header";
import RecipeList from "./components/RecipesList";
import {useEffect, useState} from "react";
import {getErrorPage, getPendingPage, sortRecipeByName} from "./utils/Common";
import {fetchIngredientList, fetchRecipeList} from "./utils/Connection";

function App() {
    const [recipeLoadCall, setRecipeLoadCall] = useState({
        state: "pending",
    });
    const [ingredientLoadCall, setIngredientLoadCall] = useState({
        state: "pending",
    });

    useEffect(() => {
        fetchRecipeList(setRecipeLoadCall);
        fetchIngredientList(setIngredientLoadCall);
    }, []);

    const handleRecipeAdded = (recipe) => {
        if (recipeLoadCall.state === "success") {
            let recipeList = [...recipeLoadCall.data];
            if (recipe.id) {
                recipeList = recipeList.filter((r) => r.id !== recipe.id);
            }
            setRecipeLoadCall({
                state: "success",
                data: [...recipeList, recipe].sort(sortRecipeByName)
            });
        }
    }
    const handleRecipeDeleted = (recipe) => {
        console.log("DELETING")
        if (recipeLoadCall.state === "success") {
            setRecipeLoadCall({
                state: "success",
                data: recipeLoadCall.data.filter((r) => r.id !== recipe.id).sort(sortRecipeByName)
            });
        }
    }
    function getContent() {
        const pendingRequest = recipeLoadCall.state === 'pending' || ingredientLoadCall.state === 'pending';
        const successRequest = recipeLoadCall.state === 'success' && ingredientLoadCall.state === 'success';
        const errorRequest = recipeLoadCall.state === 'error' || ingredientLoadCall.state === 'error';
        if (errorRequest) {
            return getErrorPage(recipeLoadCall);
        } else if (pendingRequest) {
            return getPendingPage();
        } else if (successRequest) {
            return (<>
                <Header title={"Best recipes in Unicorn"}/>
                <RecipeList onComplete={handleRecipeAdded}
                            onDelete={handleRecipeDeleted}
                            recipeList={recipeLoadCall.data}
                            ingredientList={ingredientLoadCall.data}/>
            </>);
        }
        return null;
    }

    return (
        <div className="App">{getContent()}</div>
    );
}

export default App;
