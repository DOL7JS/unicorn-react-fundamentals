import './App.css';
import recipeData from "../src/data/recipes.json";
import Header from "./components/Header";
import RecipeList from "./components/RecipesList";

function App() {
    return (
        <div className="App">
            <Header title={"Best recipes in Unicorn"}/>
            <RecipeList recipeList={recipeData}/>
        </div>
    );
}

export default App;
