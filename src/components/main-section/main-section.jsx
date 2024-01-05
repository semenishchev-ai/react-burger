import React from "react";
import PropTypes from 'prop-types';
import BurgerIngredients from "../burger-ingregients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from './main-section.module.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function MainSection({onModalOpen}) {
    return (
        <DndProvider backend={HTML5Backend}>
            <main className={styles.section}>
                <BurgerIngredients />
                <BurgerConstructor onModalOpen={onModalOpen}/>
            </main>
        </DndProvider>
    )
}

MainSection.propTypes = {
    onModalOpen: PropTypes.func
}

export default MainSection;