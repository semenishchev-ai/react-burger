import React from "react";
import styles from './order-details.module.css';

import doneImagePath from '../../images/done.svg';
import { useSelector } from "react-redux";

function OrderDetails() {
    const orderNumber = useSelector(state => state.mainReducer.order)

    return(
        <div className={styles.details}>
            <p className={styles.number + ' text text_type_digits-large mt-4'}>
                {orderNumber}
            </p>
            <p className='text text_type_main-medium mt-8 mb-15'>
                идентификатор заказа
            </p>
            <img src={doneImagePath} alt='заказ принят'/>
            <p className='text text_type_main-default mt-15 mb-2'>
                Ваш заказ начали готовить
            </p>
            <p className={styles.text_bottom + ' text text_type_main-default mb-15'}>
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    )
}

export default OrderDetails;