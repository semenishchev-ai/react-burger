import React, { FC } from "react";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredient.module.css';
import ActionTypes from "../../services/actions";
import { useDrag } from "react-dnd";
import { useLocation, useNavigate } from "react-router-dom";
import { TIngredient } from "../../utils/types";
import { useDispatch } from "../../hooks/useDispatch";

interface IBurgerIngredientProps {
    ingredient: TIngredient;
}

const BurgerIngredient: FC<IBurgerIngredientProps> = ({ingredient}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [, dragRef] = useDrag({
        type: 'constructorItem',
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const onCLick = () => {
        dispatch({
            type: ActionTypes.SET_INGREDIENT_DETAILS,
            item: ingredient,
        })
        navigate('/ingredients/' + ingredient._id, {state: {background: location}});        
    }

    return (
        <div ref={dragRef} className={styles.ingredient} onClick={onCLick}>
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
            (<Counter count={(ingredient.counter ? ingredient.counter : 0)} size="default"/>)}
        </div>
    )
}

export default BurgerIngredient;