import ActionTypes from ".";
import { request } from "../../utils/api";
import { TDispatch, TIngredient } from "../../utils/types";

export function fetchIngredients() {
    return function(dispatch: TDispatch) {
        request('/ingredients')
        .then((res) => {
            dispatch({
                type: ActionTypes.FETCH_INGREDIENTS,
                data: res.data,
                isFetched: true,
            })
        })
        .catch(console.error);
    }
}
export function postOrder(orderList: Array<TIngredient>) {
    const idArray = orderList.map((elem) => elem._id);
    return function(dispatch: TDispatch) {
        request('/orders', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ingredients: idArray,
            }),
        })
        .then((res) => {
            dispatch({
                type: ActionTypes.SET_ORDER_NUMBER,
                number: res.order.number,
            })
        })
        .then(() => {
            dispatch({
                type: ActionTypes.CLEAR_CONSTRUCTOR,
            })
        })
        .catch(console.error);
    }
}