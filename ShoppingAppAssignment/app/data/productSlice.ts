import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import { CartItem, SaleAbleItem } from './cartSlice';
import {CartUtils} from '../utils/cartUtils';

export interface Product extends SaleAbleItem{
    color : string,
}

export interface ProductState {
    products : Product[],
    status: string, //idle, success, loading, error
    error: string, // null | string
}

const initalState : ProductState = {
    products : [],
    status: 'idle', //idle, success, loading, error
    error: '', // null | string
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get(
      'https://my-json-server.typicode.com/benirvingplt/products/products',
    );

    response.data.forEach((product : Product) => {
      product.id = product.id.toString()
    });

    const mappedItem = await CartUtils.mapCartItems(response.data as CartItem[]);
    return mappedItem;
  },
);

// Define the product slice
const productSlice = createSlice({
  name: 'products',
  initialState: initalState,
  reducers: {
    // Other reducers for product manipulation can go here if needed
    addProduct : (state, action : PayloadAction<Product>) => {
        state.products.push({
            id : state.products.length.toString(),
            name : action.payload.name,
            color : action.payload.color,
            img : action.payload.img,
            price : action.payload.price,
            quantity : 1,
        });
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload as Product[];
      state.status = 'success';
    });

    builder.addCase(fetchProducts.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = 'error';
    });
  },
});

// Export actions and reducer
export const {
  /* Other action creators if needed */
  addProduct
} = productSlice.actions;

export default productSlice;
