import { Button, CurrencyIcon, ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css'
import OrderDetails from "../order-details/order-details";

function BurgerConstructor({ingredients, onModalOpen}) {    
    const onClick = () => {
        onModalOpen('', <OrderDetails />)
    }

    let sum = 2 * parseInt(ingredients[0].price);

    return (
        <section className={styles.section}>
            <div className={styles.elements}>
                <div className={styles.border_item}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={ingredients[0].name + " (верх)"}
                        price={ingredients[0].price}
                        thumbnail={ingredients[0].image}
                    />
                </div>
                <ul className={styles.scrollbar}>
                    {ingredients.map((elem) => {
                        sum += parseInt(elem.price);
                        return (
                            <li className={styles.middle_item} key={elem._id}>
                                <DragIcon type="primary"/>
                                <ConstructorElement
                                    text={elem.name}
                                    price={elem.price}
                                    thumbnail={elem.image}
                                />
                            </li>
                        )
                    })}
                </ul>
                <div className={styles.border_item}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={ingredients[0].name + " (низ)"}
                        price={ingredients[0].price}
                        thumbnail={ingredients[0].image}
                    />
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.price_section}>
                    <p className="text text_type_digits-medium">
                        {sum}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="medium" onClick={onClick}>
                    Оформить заказ
                </Button>    
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.array,
    onModalOpen: PropTypes.func
}

export default BurgerConstructor;