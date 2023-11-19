import {configureStore,} from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import cartSlice from './cartSlice';
import productSlice from './productSlice';


export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    product : productSlice.reducer
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector