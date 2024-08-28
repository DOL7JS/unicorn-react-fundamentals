import {useState} from "react";
import Icon from "@mdi/react";
import {mdiTrashCanOutline} from "@mdi/js";
import Confirmation from "./Confirmation";
import {fetchDeleteRecipe} from "../utils/Connection";

export default function RecipeDelete({ recipe, onDelete, onError }) {
    const [deleteRecipeCall, setDeleteRecipeCall] = useState({
        state: 'inactive'
    });

    const handleDelete = async () => {
        if (deleteRecipeCall.state === 'pending')
            return
        fetchDeleteRecipe(setDeleteRecipeCall,onDelete, onError, recipe.id);
    }

    return (
        <Confirmation
            title="Smazat známku"
            message="Opravdu si přejete smazat známku?"
            confirmText="Smazat"
            onConfirm={handleDelete}
        >
            <div>
                <Icon
                    path={mdiTrashCanOutline}
                    style={{ cursor: 'pointer', color: 'red' }}
                    size={0.8}
                ></Icon>
            </div>
        </Confirmation>
    )
}