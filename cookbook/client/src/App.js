import './App.css';
import recipesData from "../src/data/recipes.json";
import Header from "./components/Header";
import RecipesList from "./components/RecipesList";

function App() {
    return (
        <div className="App">
            <Header title={"Best recipes in Unicorn"}/>
            <RecipesList recipeList={recipesData}/>
        </div>
    );
}

export default App;
