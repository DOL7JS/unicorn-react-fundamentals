import {sortRecipeByName} from "./Common";

export function fetchRecipeList(setRecipeLoadCall) {
    fetch(`http://localhost:3000/recipe/list`, {
        method: "GET",
    }).then(async (response) => {
        const responseJson = await response.json();
        if (response.status >= 400) {
            setRecipeLoadCall({state: "error", error: responseJson});
        } else {
            setRecipeLoadCall({state: "success", data: responseJson.sort(sortRecipeByName)});
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

export function fetchDeleteRecipe(setDeleteRecipeCall, onDelete, onError, id) {
    setDeleteRecipeCall({state: 'pending'});

    fetch(`http://localhost:3000/recipe/delete`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id: id})
    }).then(async (respone) => {
        const data = await respone.json();

        if (respone.status >= 400) {
            setDeleteRecipeCall({state: 'error', error: data});

            if (typeof onError === 'function')
                onError(data.errorMessage);

        } else {
            setDeleteRecipeCall({state: 'success', data});

            if (typeof onDelete === 'function') {
                onDelete(id);
            }
        }
    });
}

export function fetchRecipe(setRecipeLoadCall,recipeId){
    setRecipeLoadCall({
        state: "pending",
    });
    fetch(`http://localhost:3000/recipe/get?id=${recipeId}`, {
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

export function fetchCreateUpdateRecipe(setAddRecipeCall,onComplete,handleClose,recipe, payload) {
    fetch(`http://localhost:3000/recipe/${recipe ? 'update' : 'create'}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    }).then(async (respone) => {

        const data = await respone.json();

        if (respone.status >= 400) {
            setAddRecipeCall({state: "error", error: data});
        } else {
            setAddRecipeCall({state: "success", data});
            if (typeof onComplete === 'function') {
                onComplete(data);
            }
            handleClose();
        }
    });


}
