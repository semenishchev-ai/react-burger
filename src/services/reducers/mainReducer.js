import { ADD_INGREDIENT, DELETE_INGREDIENT, DELETE_INGREDIENT_DETAILS, FETCH_INGREDIENTS, SET_ORDER_NUMBER, SET_INGREDIENT_DETAILS, MOVE_INGREDIENT, CLEAR_CONSTRUCTOR } from "../actions"

const initialState = {
    fetchedIngredients: [],
    ingredientsConstructorList: [],
    currentIngredient: {},
    order: 0,
    isFetched: false,
  }

export const mainReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_INGREDIENTS:
          return {
            ...state,
            fetchedIngredients: action.data.map((elem) => {
              elem.counter = 0;
              return elem;
            }),
            isFetched: action.isFetched,
          };
        case SET_INGREDIENT_DETAILS:
          return {
            ...state,
            currentIngredient: action.item,
          }
        case DELETE_INGREDIENT_DETAILS:
          return {
            ...state,
            currentIngredient: {}
          }
        case SET_ORDER_NUMBER:
          return {
            ...state,
            order: action.number,
          }
        case ADD_INGREDIENT:
          return {
            ...state,
            fetchedIngredients: [...state.fetchedIngredients].map(
              (elem) => {
                return {
                  ...elem,
                  counter: (elem._id === action.item._id && 
                            (elem.type !== "bun" || elem.counter === 0)
                            ? elem.counter + 1 : elem.counter),
                }
              }
            ),
            ingredientsConstructorList: [
              ...state.ingredientsConstructorList,
              { ...action.item,
                currentId: action.id,  
              },
            ]
          }
        case DELETE_INGREDIENT:
          return {
            ...state,
            fetchedIngredients: [...state.fetchedIngredients].map(
              (elem) => {
                return {
                  ...elem,
                  counter: (elem._id === action.item._id 
                            ? elem.counter - 1 : elem.counter),
                }
              }
            ),
            ingredientsConstructorList: [...state.ingredientsConstructorList].filter(
              (elem) => elem.currentId !== action.item.currentId),
          }
        case MOVE_INGREDIENT:
          const newArray = [...state.ingredientsConstructorList];
          const dragIngredient = newArray[action.dragIndex];
          newArray.splice(action.dragIndex, 1);
          newArray.splice(action.hoverIndex, 0, dragIngredient);
          return {
            ...state,
            ingredientsConstructorList: newArray,
          }
        case CLEAR_CONSTRUCTOR:
          return {
            ...state,
            fetchedIngredients: [...state.fetchedIngredients].map(
              (elem) => {
                return {
                  ...elem,
                  counter: 0,
                }
              }
            ),
            ingredientsConstructorList: [],
          }
        default:
          return state;
    }
};
