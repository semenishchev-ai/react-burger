import React from "react";
import PropTypes from 'prop-types';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css'
import BurgerIngredient from "../burger-ingredient/burger-ingredient";

function BurgerIngredients({ingredients, onModalOpen}) {
    const [current, setCurrent] = React.useState('one')

    const bunArray = ingredients.filter((item) => item.type === 'bun');
    const mainArray = ingredients.filter((item) => item.type === 'main');
    const sauceArray = ingredients.filter((item) => item.type === 'sauce');

    return (
        <section className={styles.section}>
            <p className="text text_type_main-large pt-10 pb-5">
                Соберите бургер
            </p>
            <div className={styles.tabs}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.scrollbar}>
                <p className="text text_type_main-medium pt-10 pb-6">
                    Булки
                </p>
                <div className={styles.choose_block}>
                    {bunArray.map((bun) => {
                        return (
                            <BurgerIngredient ingredient={bun} key={bun._id} onModalOpen={onModalOpen}/>
                        )
                    })}
                </div>
                <p className="text text_type_main-medium pt-10 pb-6">
                    Соусы
                </p>
                <div className={styles.choose_block}>
                    {sauceArray.map((sauce) => {
                        return (
                            <BurgerIngredient ingredient={sauce} key={sauce._id} onModalOpen={onModalOpen}/>
                        )
                    })}
                    
                </div>
                <p className="text text_type_main-medium pt-10 pb-6">
                    Начинки
                </p>
                <div className={styles.choose_block}>
                    {mainArray.map((main) => {
                        return (
                            <BurgerIngredient ingredient={main} key={main._id} onModalOpen={onModalOpen}/>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.array,
    onModalOpen: PropTypes.func
}

export default BurgerIngredients;