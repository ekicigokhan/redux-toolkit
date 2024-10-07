import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect } from "react";

const initialState = {
  products: [],
  selectedProduct: {},
  loading: false,
  searchTerm: "",
};

const BASE_URL = "https://fakestoreapi.com";

export const getAllProducts = createAsyncThunk("products", async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
});

export const getProductById = createAsyncThunk("product", async (id) => {
  const response = await axios.get(`${BASE_URL}/products/${id}`);
  return response.data;
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearchTermInHeader: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedProduct = action.payload;
    });
  },
});

export const { setSearchTermInHeader } = productSlice.actions;

export default productSlice.reducer;
