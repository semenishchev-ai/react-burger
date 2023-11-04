import React from "react";
import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';

function IngredientDetails({ingredient}) {
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

IngredientDetails.propTypes = {
    ingredient: PropTypes.object
}

export default IngredientDetails;