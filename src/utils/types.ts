import { ThunkAction } from 'redux-thunk';
import { store } from '../index'
import { TActionAuth } from '../services/reducers/authReducer';
import { TActionMain } from '../services/reducers/mainReducer';
import { Action, ActionCreator } from 'redux';

export type TDispatch = typeof store.dispatch;

export type TUserData = {
    name?: string;
    email: string;
    password: string;
}

export type TIngredient = {
    _id: string;
    name: string;
    type: "bun" | "main" | "sauce";
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: string;
    image: string;
    image_mobile: string;
    image_large: string;
    counter?: number;
    currentId?: number;
    ind?: number;
  }

  export type TActions = TActionAuth | TActionMain;
  export type RootState = ReturnType<typeof store.getState>;

  export type TThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TActions>>;
  