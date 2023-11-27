import React from "react";
import PropTypes from 'prop-types';
import BurgerIngredients from "../burger-ingregients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from './main-section.module.css';

function MainSection({ingredients, onModalOpen}) {
    return (
        <main className={styles.section}>
            <BurgerIngredients ingredients={ingredients} onModalOpen={onModalOpen}/>
            <BurgerConstructor ingredients={ingredients} onModalOpen={onModalOpen}/>
        </main>
    )
}

MainSection.propTypes = {
    ingredients: PropTypes.array,
    onModalOpen: PropTypes.func
}

export default MainSection;