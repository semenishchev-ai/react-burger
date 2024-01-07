import { useDispatch as hookDispatch } from "react-redux";
import { TDispatch } from "../utils/types";

export const useDispatch = () => hookDispatch<TDispatch>(); 