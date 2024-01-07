import React from "react";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css'
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import { useSelector } from "../../hooks/useSelector";

function BurgerIngredients() {
    const [current, setCurrent] = React.useState('one')

    const ingredients = useSelector(store => store.mainReducer.fetchedIngredients);
    const bunArray = ingredients.filter((item) => item.type === 'bun');
    const mainArray = ingredients.filter((item) => item.type === 'main');
    const sauceArray = ingredients.filter((item) => item.type === 'sauce');

    const scrollWindow = document.getElementById('scroll_window');
    const buns = document.getElementById('one');
    const sauces = document.getElementById('two');
    const main = document.getElementById('three');

    const onScrollListener = () => {
        if (scrollWindow) {
            if (!buns || !sauces || !main) {
                setCurrent("one");
                return;
            }
            const distBuns = Math.abs(scrollWindow.getBoundingClientRect().top - buns.getBoundingClientRect().top);
            const distSauces = Math.abs(scrollWindow.getBoundingClientRect().top - sauces.getBoundingClientRect().top);
            const distMain = Math.abs(scrollWindow.getBoundingClientRect().top - main.getBoundingClientRect().top);

            const minDist = Math.min(distBuns, distSauces, distMain);
            switch (minDist) {
                case distBuns:
                    setCurrent("one");
                    return;
                case distSauces:
                    setCurrent("two");
                    return;
                case distMain:
                    setCurrent("three");
                    return;
                default:
                    return;
            }
        } else {
            return;
        }
    }

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
            <div className={styles.scrollbar} onScroll={onScrollListener} id="scroll_window">
                <p className="text text_type_main-medium pt-10 pb-6" id="one">
                    Булки
                </p>
                <div className={styles.choose_block}>
                    {bunArray.map((bun) => {
                        return (
                            <BurgerIngredient ingredient={bun} key={bun._id}/>
                        )
                    })}
                </div>
                <p className="text text_type_main-medium pt-10 pb-6" id="two">
                    Соусы
                </p>
                <div className={styles.choose_block}>
                    {sauceArray.map((sauce) => {
                        return (
                            <BurgerIngredient ingredient={sauce} key={sauce._id}/>
                        )
                    })}
                    
                </div>
                <p className="text text_type_main-medium pt-10 pb-6" id="three">
                    Начинки
                </p>
                <div className={styles.choose_block}>
                    {mainArray.map((main) => {
                        return (
                            <BurgerIngredient ingredient={main} key={main._id}/>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default BurgerIngredients;