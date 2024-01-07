import React, { FC, ReactElement } from "react";
import BurgerIngredients from "../burger-ingregients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from './main-section.module.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface IMainSectionProps {
    onModalOpen: (header: string, content: ReactElement) => void;
}

const MainSection: FC<IMainSectionProps> = ({onModalOpen}) => {
    return (
        <DndProvider backend={HTML5Backend}>
            <main className={styles.section}>
                <BurgerIngredients />
                <BurgerConstructor onModalOpen={onModalOpen}/>
            </main>
        </DndProvider>
    )
}

export default MainSection;