import React from "react";
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredient.module.css';
import IngredientDetails from "../ingredients-details/ingredient-details";

const BurgerIngredient = ({ingredient, onModalOpen}) => {
    const onCLick = () => {
        onModalOpen('Детали ингредиента', <IngredientDetails ingredient={ingredient}/>)
    }

    return (
        <div className={styles.ingredient} onClick={onCLick}>
            <img className={styles.image} src={ingredient.image} alt={ingredient.name}/>
            <div className={styles.price}>
                <p className="text text_type_digits-default pr-2">
                    {ingredient.price}
                </p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default">
                {ingredient.name}
            </p>
            <Counter count={1} size="default"/>
        </div>
    )
}

BurgerIngredient.propTypes = {
    ingredients: PropTypes.array,
    onModalOpen: PropTypes.func
}

export default BurgerIngredient;