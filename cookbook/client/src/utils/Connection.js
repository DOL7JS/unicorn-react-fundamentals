export function fetchRecipeList(setRecipeLoadCall) {
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
}


export function fetchIngredientList(setIngredientLoadCall){
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
}