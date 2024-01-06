import { combineReducers } from "redux";
import { mainReducer } from "./mainReducer";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
    mainReducer,
    authReducer,
});