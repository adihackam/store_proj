import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { IProds } from '../../models/IProd';
import { getProducts } from './productUpAPI';
import {deleteProducts} from './productUpAPI';
import { useAppSelector, useAppDispatch } from '../../app/hooks';


const initialState: IProds = {
    prods: []
};


export const getProductsAsync = createAsyncThunk(
  'products/getProducts',
  async (access: string) => {
    const response = await getProducts(access);
    return response.data;
  }
);
export const deleteProductsAsync = createAsyncThunk(
  'products/deleteProducts',
  async (params:any) => {
    await deleteProducts(params.access, params.id);
    const response = await getProducts(params.access);
    return response.data;
  }
);
export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    
    builder.addCase(getProductsAsync.fulfilled, (state, action) => {
      console.log('getProductsAsync fulfilled')
      console.log(action.payload)
      state.prods=action.payload
    });

    builder.addCase(deleteProductsAsync.fulfilled, (state, action) => {
      console.log('delete fulfilled')
      console.log(action.payload)
      state.prods=action.payload
    });
  },
});

export const { } = productsSlice.actions;
export const selectProducts = (state: RootState) => state.products.prods;
export default productsSlice.reducer;
