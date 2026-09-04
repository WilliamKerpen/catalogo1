import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

import type { RootState, AppDispatch } from "./store";

/**
 * Hook tipado para enviar ações para o Redux.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Hook tipado para ler informações do Redux.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector;