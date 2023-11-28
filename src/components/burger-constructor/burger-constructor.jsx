import { Button, CurrencyIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css'
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { ADD_INGREDIENT, DELETE_INGREDIENT } from "../../services/actions";
import { postOrder } from "../../services/actions/actions";
import ConstructorIngredient from "../constructor-ingredient/constructor-ingredient";

function BurgerConstructor({onModalOpen}) {    
    const dispatch = useDispatch();
    const ingredientsConstructorList = useSelector(store => store.mainReducer.ingredientsConstructorList);

    const onClick = () => {
        dispatch(postOrder(ingredientsConstructorList));
        onModalOpen('', <OrderDetails />)
    }

    const onDropHandler = (item) => {
        if (item.type === 'bun') {
            const bunElem = ingredientsConstructorList.find((elem) => elem.type === 'bun');
            if (bunElem) {
            dispatch({
                type: DELETE_INGREDIENT,
                item: bunElem,
            });
            }
        }
        const currentId = Date.now();
        dispatch({
            type: ADD_INGREDIENT,
            item: item,
            id: currentId,
        });
    };

    const [, dropTarget] = useDrop({
        accept: 'constructorItem',
        drop(item) {
            onDropHandler(item);
        },
    });

    const bunElem = (ingredientsConstructorList.find((elem) => elem.type === 'bun'));

    let sum = 0;

    return (
        <section ref={dropTarget} className={styles.section}>
            <div className={styles.elements}>
                {bunElem && 
                (<div className={styles.border_item}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bunElem.name + " (верх)"}
                        price={bunElem.price}
                        thumbnail={bunElem.image}
                    />
                </div>)}
                <ul className={styles.scrollbar}>
                    {ingredientsConstructorList.map((elem, ind) => {
                        if (elem.type === "bun") {
                            sum += 2 * parseInt(elem.price);
                            return null;
                        }
                        sum += parseInt(elem.price);
                        return (
                            <ConstructorIngredient elem={elem} ind={ind} key={elem.currentId}/>
                        )
                    })}
                </ul>
                {bunElem && 
                (<div className={styles.border_item}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={bunElem.name + " (низ)"}
                        price={bunElem.price}
                        thumbnail={bunElem.image}
                    />
                </div>)}
            </div>
            <div className={styles.bottom}>
                <div className={styles.price_section}>
                    <p className="text text_type_digits-medium">
                        {sum}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button disabled={sum === 0} htmlType="button" type="primary" size="medium" onClick={onClick}>
                    Оформить заказ
                </Button>    
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    onModalOpen: PropTypes.func
}

export default BurgerConstructor;