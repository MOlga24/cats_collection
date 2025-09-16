 import {  TypedUseSelectorHook,  
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { itemsSlice } from './slices/itemsSlice';
 export type RootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  items: itemsSlice.reducer,

});


export const store = configureStore({
    reducer: rootReducer
});
export const useDispatch: () => AppDispatch = dispatchHook;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;