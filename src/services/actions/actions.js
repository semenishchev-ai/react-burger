import { CLEAR_CONSTRUCTOR, FETCH_INGREDIENTS, SET_ORDER_NUMBER } from ".";
import { request } from "../../utils/api";

export function fetchIngredients() {
    return function(dispatch) {
        request('/ingredients')
        .then((res) => {
            dispatch({
                type: FETCH_INGREDIENTS,
                data: res.data,
                isFetched: true,
            })
        })
        .catch(console.error);
    }
}

export function postOrder(orderList) {
    const idArray = orderList.map((elem) => elem._id);
    return function(dispatch) {
        request('/orders', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                ingredients: idArray,
            }),
        })
        .then((res) => {
            dispatch({
                type: SET_ORDER_NUMBER,
                number: res.order.number,
            })
        })
        .then(() => {
            dispatch({
                type: CLEAR_CONSTRUCTOR,
            })
        })
        .catch(console.error);
    }
}