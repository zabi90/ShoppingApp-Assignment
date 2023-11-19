import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
    id : number,
    color : string,
    name : string,
    price : number,
    img : string
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
    return response.data;
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
            id : state.products.length,
            name : action.payload.name,
            color : action.payload.color,
            img : action.payload.img,
            price : action.payload.price
        });
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
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
