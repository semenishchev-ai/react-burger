import { FETCH_INGREDIENTS, SET_ORDER_NUMBER } from ".";

const getUrl = "https://norma.nomoreparties.space/api/ingredients";
const postUrl = "https://norma.nomoreparties.space/api/orders";

export function fetchIngredients() {
    return function(dispatch) {
        fetch(getUrl)
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
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
        fetch(postUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                ingredients: idArray,
            }),
        })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((res) => {
            dispatch({
                type: SET_ORDER_NUMBER,
                number: res.order.number,
            })
        })
        .catch(console.error);
    }
}