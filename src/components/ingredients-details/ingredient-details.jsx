import React from "react";
import styles from './ingredient-details.module.css';
import { useSelector } from "react-redux";

function IngredientDetails() {
    const ingredient = useSelector(state => state.mainReducer.currentIngredient);

    return(
        <div className={styles.details}>
            <img src={ingredient.image} className={styles.image} alt={ingredient.name}/>
            <h1 className={styles.text_name + ' text text_type_main-medium'}>
                {ingredient.name}
            </h1>
            <ul className={styles.info}>
                <li className={styles.info_item}>
                    <p className='text text_type_main-default'>
                        Калории, ккал
                    </p>
                    <p className='text text_type_digits-default'>
                        {ingredient.calories}
                    </p>
                </li>
                <li className={styles.info_item}>
                    <p className='text text_type_main-default'>
                        Белки, г
                    </p>
                    <p className='text text_type_digits-default'>
                        {ingredient.proteins}
                    </p>
                </li>
                <li className={styles.info_item}>
                    <p className='text text_type_main-default'>
                        Жиры, г
                    </p>
                    <p className='text text_type_digits-default'>
                        {ingredient.fat}
                    </p>
                </li>
                <li className={styles.info_item}>
                    <p className='text text_type_main-default'>
                        Углеводы, г
                    </p>
                    <p className='text text_type_digits-default'>
                        {ingredient.carbohydrates}
                    </p>
                </li>
            </ul>
        </div>
    )
}

export default IngredientDetails;