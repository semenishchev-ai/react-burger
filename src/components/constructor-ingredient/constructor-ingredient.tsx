import React, { FC, useRef } from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-ingredient.module.css";
import { useDrag, useDrop } from "react-dnd";
import ActionTypes from "../../services/actions";
import { TIngredient } from "../../utils/types";
import { useDispatch } from "../../hooks/useDispatch";

interface IConstructorIngredientProps {
    elem: TIngredient;
    ind: number;
}

const ConstructorIngredient: FC<IConstructorIngredientProps> = ({elem, ind}) => {
    const ref = useRef<HTMLLIElement>(null);
    const dispatch = useDispatch();

    const moveItem = (dragIndex: number, hoverIndex: number) => {
        dispatch({
            type: ActionTypes.MOVE_INGREDIENT,
            dragIndex: dragIndex,
            hoverIndex: hoverIndex,
        });
    }

    const [{ isDragging }, dragRef] = useDrag({
        type: 'constructorElement',
        item: {elem, ind},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, dropRef] = useDrop({
        accept: 'constructorElement',
        hover: (item: TIngredient, monitor) => {
            if (item.ind === ind || item.ind === undefined) {
                return;
            }
            const boundingClientRect = ref.current?.getBoundingClientRect();
            if (!boundingClientRect) {
                return;
            }
            const hoverCenterY = (boundingClientRect.bottom - boundingClientRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            if (!clientOffset) {
                return;
            }
            const hoverClientY = clientOffset.y - boundingClientRect.top;
            if (item.ind < ind && hoverClientY < hoverCenterY) {
                return;
            }
            if (item.ind > ind && hoverClientY > hoverCenterY) {
                return;
            }
            moveItem(item.ind, ind);
            item.ind = ind;
        },
    });

    const onDeleteHandler = (elem: TIngredient) => {
        dispatch({
            type: ActionTypes.DELETE_INGREDIENT,
            item: elem,
        });
    } 

    dragRef(dropRef(ref));

    const opacity = isDragging ? 0 : 1;
    
    return (
        <li ref={ref} className={styles.middle_item} key={elem.currentId} style={{opacity}}>
            <DragIcon type="primary"/>
            <ConstructorElement
                handleClose={() => onDeleteHandler(elem)}
                text={elem.name}
                price={parseInt(elem.price, 10)}
                thumbnail={elem.image}
            />
        </li>
    );
}

export default ConstructorIngredient;