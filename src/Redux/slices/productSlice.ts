/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import axios from "axios";

export interface Product {
  name: string;
  category: string;
  value: number;
  quantity: number;
  price: number; 
}

const axiosInstance = axios.create({
  baseURL: "https://dev-0tf0hinghgjl39z.api.raw-labs.com",
  headers: {
    "Content-Type": "application/json",
  },
});

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const getProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  "product/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/inventory");
      return response.data as Product[];
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to fetch products";
      return rejectWithValue(errorMessage);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((product) => product.name === action.payload.name);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
      });
  },
});

export const { setProducts, updateProduct } = productSlice.actions;

const persistConfig = {
  key: "product",
  storage,
};

const persistedProductReducer = persistReducer(persistConfig, productSlice.reducer);

export default persistedProductReducer;
