import { Button, CurrencyIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, ReactElement } from "react";
import styles from './burger-constructor.module.css'
import OrderDetails from "../order-details/order-details";
import { useDrop } from "react-dnd";
import ActionTypes from "../../services/actions";
import { postOrder } from "../../services/actions/actions";
import ConstructorIngredient from "../constructor-ingredient/constructor-ingredient";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "../../hooks/useDispatch";
import { useSelector } from "../../hooks/useSelector";
import { TIngredient } from "../../utils/types";

interface IBurgerConstructorProps {
    onModalOpen: (header: string, content: ReactElement) => void;
}

const BurgerConstructor: FC<IBurgerConstructorProps> = ({onModalOpen}) => {    
    const dispatch = useDispatch();
    const ingredientsConstructorList = useSelector(store => store.mainReducer.ingredientsConstructorList);
    const isAuthorized = useSelector(store => store.authReducer.isAuthorized);
    const navigate = useNavigate();

    const onClick = () => {
        if (!isAuthorized) {
            navigate('/login');
            return;
        }
        dispatch(postOrder(ingredientsConstructorList));
        onModalOpen('', <OrderDetails />)
    }

    const onDropHandler = (item: TIngredient) => {
        if (item.type === 'bun') {
            const bunElem = ingredientsConstructorList.find((elem) => elem.type === 'bun');
            if (bunElem) {
            dispatch({
                type: ActionTypes.DELETE_INGREDIENT,
                item: bunElem,
            });
            }
        }
        const currentId = Date.now();
        dispatch({
            type: ActionTypes.ADD_INGREDIENT,
            item: item,
            id: currentId,
        });
    };

    const [, dropTarget] = useDrop<TIngredient, void, unknown>({
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
                        price={parseInt(bunElem.price, 10)}
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
                        price={parseInt(bunElem.price, 10)}
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

export default BurgerConstructor;