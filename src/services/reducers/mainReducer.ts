import { TIngredient } from "../../utils/types";
import ActionTypes from "../actions"

const initialState = {
    fetchedIngredients: [],
    ingredientsConstructorList: [],
    currentIngredient: {},
    order: 0,
    isFetched: false,
  }

export type TActionMain = {
  type: ActionTypes;
  data: Array<TIngredient>;
  isFetched?: boolean;
  item: TIngredient;
  number?: number;
  id?: number;
  dragIndex?: number;
  hoverIndex?: number; 
}


export const mainReducer = (state = initialState, action: TActionMain) => {
    switch(action.type) {
        case ActionTypes.FETCH_INGREDIENTS:
          return {
            ...state,
            fetchedIngredients: action.data.map((elem) => {
              elem.counter = 0;
              return elem;
            }),
            isFetched: action.isFetched,
          };
        case ActionTypes.SET_INGREDIENT_DETAILS:
          return {
            ...state,
            currentIngredient: action.item,
          }
        case ActionTypes.DELETE_INGREDIENT_DETAILS:
          return {
            ...state,
            currentIngredient: {}
          }
        case ActionTypes.SET_ORDER_NUMBER:
          return {
            ...state,
            order: action.number,
          }
        case ActionTypes.ADD_INGREDIENT:
          return {
            ...state,
            fetchedIngredients: [...state.fetchedIngredients].map(
              (elem: TIngredient) => {
                return {
                  ...elem,
                  counter: (elem._id === action.item._id && 
                            (elem.type !== "bun" || elem.counter === 0)
                            ? (elem.counter ? elem.counter : 0) + 1 : elem.counter),
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
        case ActionTypes.DELETE_INGREDIENT:
          return {
            ...state,
            fetchedIngredients: [...state.fetchedIngredients].map(
              (elem: TIngredient) => {
                return {
                  ...elem,
                  counter: (elem._id === action.item._id 
                            ? (elem.counter ? elem.counter : 0) - 1 : elem.counter),
                }
              }
            ),
            ingredientsConstructorList: [...state.ingredientsConstructorList].filter(
              (elem: TIngredient) => elem.currentId !== action.item.currentId),
          }
        case ActionTypes.MOVE_INGREDIENT:
          const newArray = [...state.ingredientsConstructorList];
          const dragIngredient = newArray[(action.dragIndex ? action.dragIndex : 0)];
          newArray.splice((action.dragIndex ? action.dragIndex : 0), 1);
          newArray.splice((action.hoverIndex ? action.hoverIndex : 0), 0, dragIngredient);
          return {
            ...state,
            ingredientsConstructorList: newArray,
          }
        case ActionTypes.CLEAR_CONSTRUCTOR:
          return {
            ...state,
            fetchedIngredients: [...state.fetchedIngredients].map(
              (elem: TIngredient) => {
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
