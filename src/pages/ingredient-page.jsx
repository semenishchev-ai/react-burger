import React from "react";
import IngredientDetails from "../components/ingredients-details/ingredient-details";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./ingredient-page.module.css";

function IngredientPage() {
    const { id } = useParams();
    const ingredients = useSelector((store) => store.mainReducer.fetchedIngredients);
    const dataFetched = useSelector(store =>  store.mainReducer.isFetched);   
    const item = ingredients.find((el) => el._id === id);

    return (
        <>
            {dataFetched && (<div className={styles.section}>
                <p className={styles.text+ ' text text_type_main-medium'}>
                    Детали ингредиента
                </p>
                <IngredientDetails ingredient={item} />
            </div>)}
        </>        
    );
}

export default IngredientPage;