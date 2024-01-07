import { TypedUseSelectorHook, useSelector as hookSelect } from "react-redux";
import { RootState } from "../utils/types";

export const useSelector: TypedUseSelectorHook<RootState> = hookSelect;