import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {CartUtils} from '../utils/cartUtils';
export interface SaleAbleItem {
    id : string,
    name : string,
    price : number,
    img : string,
    quantity : number 
  }
  

export interface CartItem extends SaleAbleItem {
}

export interface CartItemState {
    cartItems : CartItem[],
}

const initalState : CartItemState = {
    cartItems : [],
}

export const getCartItems = createAsyncThunk(
    'carts/get',
    async (thunkAPI) => {
        const cartItems = await CartUtils.getAllCartItems();
        return cartItems
    },
  );

export const addCartItem = createAsyncThunk(
    'carts/add',
    async (cartItem : CartItem, thunkAPI) => {
        const result = await CartUtils.addItem(cartItem, cartItem.quantity);
        const cartItems = await CartUtils.getAllCartItems();
        return cartItems
    },
  );
  
  export const removeCartItem = createAsyncThunk(
    'carts/remove',
    async (itemId : string, thunkAPI) => {
        const result = await CartUtils.deleteItem(itemId);
        const cartItems = await CartUtils.getAllCartItems();
        return cartItems
    },
  );
  

const cartSlice = createSlice({
    name : 'cartItems',
    initialState: initalState,
    reducers : {
        addItem : (state, action : PayloadAction<CartItem>) => {
        }
    },
    extraReducers: builder => {
        builder.addCase(addCartItem.fulfilled, (state, action) => {
          state.cartItems = action.payload;
        });
        builder.addCase(removeCartItem.fulfilled, (state, action) => {
            state.cartItems = action.payload;
        });
        builder.addCase(getCartItems.fulfilled, (state, action) => {
            state.cartItems = action.payload;
        });
      },
});

// Export actions and reducer
export const {
    /* Other action creators if needed */
  } = cartSlice.actions;
  
export default cartSlice;