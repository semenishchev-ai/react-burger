import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { DELETE_INGREDIENT, MOVE_INGREDIENT } from "../../services/actions";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-ingredient.module.css";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from 'prop-types';

const ConstructorIngredient = ({elem, ind}) => {
    const ref = useRef(null);
    const dispatch = useDispatch();

    const moveItem = (dragIndex, hoverIndex) => {
        dispatch({
            type: MOVE_INGREDIENT,
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
        hover: (item, monitor) => {
            if (item.ind === ind) {
                return;
            }
            const boundingClientRect = ref.current?.getBoundingClientRect();
            const hoverCenterY = (boundingClientRect.bottom - boundingClientRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
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

    const onDeleteHandler = (elem) => {
        dispatch({
            type: DELETE_INGREDIENT,
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
                price={elem.price}
                thumbnail={elem.image}
            />
        </li>
    );
}

ConstructorIngredient.propTypes = {
    elem: PropTypes.object,
    ind: PropTypes.number
}

export default ConstructorIngredient;