import React from "react";
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredient.module.css';
import IngredientDetails from "../ingredients-details/ingredient-details";
import { useDispatch } from "react-redux";
import { SET_INGREDIENT_DETAILS } from "../../services/actions";
import { useDrag } from "react-dnd";

const BurgerIngredient = ({ingredient, onModalOpen}) => {
    const dispatch = useDispatch();

    const [{isDrag}, dragRef] = useDrag({
        type: 'constructorItem',
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const onCLick = () => {
        dispatch({
            type: SET_INGREDIENT_DETAILS,
            item: ingredient,
        })
        onModalOpen('Детали ингредиента', <IngredientDetails/>)
    }

    return (
        !isDrag &&
        (<div ref={dragRef} className={styles.ingredient} onClick={onCLick}>
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
            {ingredient.counter !== 0 && 
            (<Counter count={ingredient.counter} size="default"/>)}
        </div>)
    )
}

BurgerIngredient.propTypes = {
    ingredient: PropTypes.object,
    onModalOpen: PropTypes.func
}

export default BurgerIngredient;