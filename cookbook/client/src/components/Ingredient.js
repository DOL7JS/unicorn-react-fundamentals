import ingredientStyle from "../css/Ingredient.module.css"


function IngredientList(props) {

    return (<ul className={ingredientStyle.ingredientList}>
            {props.ingredients.map((ingr) => {
                return <li>{ingr.name} - {ingr.amount} {ingr.unit}</li>
            })}
        </ul>
    );
}

export default IngredientList;