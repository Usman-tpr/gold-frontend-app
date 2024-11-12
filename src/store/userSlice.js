import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";

import axios from '../functions/axios'
import { PRODUCT, USER } from "./URLCONSTANT";


const initialState = {
    data: [],
    loading: false,
    message: null,
    error: null,
    statusCode: null,
    token: localStorage.getItem("Gold_token"),
    role: localStorage.getItem("role"),
    signout: false,
};

// *********** RTK Middleware Stare here ***********


// signup
export const Signup = createAsyncThunk(
    "Signup",
    async (signup_details, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${USER}/register`, signup_details);
            localStorage.setItem("Gold_token" , res.data.token)
            return {
                data: res.data,
                statusCode: res.status,
            };
        } catch (err) {
            return rejectWithValue({
                error: err.response.data,
                statusCode: err.response.status,
            });
        }
    }
);

// Product post
export const productPost = createAsyncThunk(
    "productPost",
    async (product_details, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${PRODUCT}/add`, product_details);
            return {
                data: res.data,
                statusCode: res.status,
            };
        } catch (err) {
            return rejectWithValue({
                error: err.response.data,
                statusCode: err.response.status,
            });
        }
    }
);

// getProducts
export const getProducts = createAsyncThunk(
    "getProducts",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${PRODUCT}/my-products`);
            return {
                data: res.data,
                statusCode: res.status,
            };
        } catch (err) {
            return rejectWithValue({
                error: err.response.data,
                statusCode: err.response.status,
            });
        }
    }
);
// search product
export const searchProduct = createAsyncThunk(
    "searchProduct",
    async (query, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${PRODUCT}/search?q=${query}`);
            return {
                data: res.data,
                statusCode: res.status,
            };
        } catch (err) {
            return rejectWithValue({
                error: err.response.data,
                statusCode: err.response.status,
            });
        }
    }
);

// *********** RTK Middleware End here ***********

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      clearMessage: (state) => {
        state.message = null;
        state.error = null;
        state.statusCode = null;
      },
      resetSignout: (state) => {
        state.signout = false;
      },
      signoutUser: (state) => {
        // localStorage.clear();
        state.token = null;
        state.role = null;
        state.signout = true;
      },
    },
    extraReducers: (builder) => {

        //   *********** user Add-Cases Start Here    ***********
        builder
        .addCase(Signup.pending, (state) => {
            state.loading = true;
        })
        .addCase(Signup.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.message = payload.data?.message;
            state.data = payload.data;
            state.statusCode = payload.statusCode;

            localStorage.setItem("token", payload.data.token);

        })
        .addCase(Signup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.error?.message;
            state.statusCode = action.payload?.statusCode;
        })
      .addCase(productPost.pending, (state) => {
          state.loading = true;
      })
      .addCase(productPost.fulfilled, (state, { payload }) => {
          state.loading = false;
          state.message = payload.data?.message;
          state.statusCode = payload.statusCode;

      })
      .addCase(productPost.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload?.error?.message;
          state.statusCode = action.payload?.statusCode;
      })
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
    })
    .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload
    })
    .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error?.message;
    })
    .addCase(searchProduct.pending, (state) => {
        state.loading = true;
    })
    .addCase(searchProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload
    })
    .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error?.message;
    })

            //   ***********    user Add-Cases End Here    ***********

    }
});

export const { clearMessage, resetSignout, signoutUser } = userSlice.actions;
export default userSlice.reducer;
