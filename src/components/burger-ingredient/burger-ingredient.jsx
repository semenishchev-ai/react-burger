import React from "react";
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredient.module.css';
import { useDispatch } from "react-redux";
import { SET_INGREDIENT_DETAILS } from "../../services/actions";
import { useDrag } from "react-dnd";
import { useLocation, useNavigate } from "react-router-dom";

const BurgerIngredient = ({ingredient}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

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
        navigate('/ingredients/' + ingredient._id, {state: {background: location}});        
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
    ingredient: PropTypes.object
}

export default BurgerIngredient;