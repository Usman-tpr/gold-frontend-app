import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../functions/axios';
import { PRODUCT, USER } from "./URLCONSTANT";

const initialState = {
    homeProducts: [],
    singleProduct: null,
    cart: [],
    myDeals: [],
    categories: [],
    subCategories: [],
    cartResponse:[],
    loading: false,
    message: null,
    error: null,
    statusCode: null,
    token: localStorage.getItem("Gold_token"),
    role: localStorage.getItem("role"),
    signout: false,
};

// *********** RTK Middleware Start Here ***********

// getHomeProducts
export const getHomeProducts = createAsyncThunk(
    "getHomeProducts",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${PRODUCT}/get-homepage-products`);
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

// single product
export const getSingleProductBySlug = createAsyncThunk(
    "getSingleProductBySlug",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${PRODUCT}/${data}`);
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

// create deal
export const createDeal = createAsyncThunk(
    "createDeal",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`deal/create-deal`, data);
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

// get my deals
export const getMyDeals = createAsyncThunk(
    "getMyDeals",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`deal/my-deals`);
            return {
                myDeals: res.data,
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

// delete deals
export const deleteDeals = createAsyncThunk(
    "deleteDeals",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`deal/${id}`);
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

// get categories
export const getCategories = createAsyncThunk(
    "getCategories",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`category/getAll`);
            return {
                categories: res.data,
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

// get subcategories
export const getSubCategories = createAsyncThunk(
    "getSubCategories",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`subCategory/get/${id}`);
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

// add to cart
export const addToCart = createAsyncThunk(
    "addToCart",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.post(`product/add-to-cart`, { productId: id });
            return {
                cartResponse: res.data,
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

// get my carts
export const getMyCarts = createAsyncThunk(
    "getMyCarts",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`product/get-my-carts`);
            return {
                cart: res.data,
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

// *********** RTK Middleware End Here ***********

const frontendSlice = createSlice({
    name: "frontend",
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
            state.token = null;
            state.role = null;
            state.signout = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHomeProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getHomeProducts.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.homeProducts = payload.data;
            })
            .addCase(getHomeProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error?.message;
            })
            .addCase(getSingleProductBySlug.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSingleProductBySlug.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.singleProduct = payload.data;
            })
            .addCase(getSingleProductBySlug.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error?.message;
            })
            .addCase(createDeal.pending, (state) => {
                state.loading = true;
            })
            .addCase(createDeal.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.message = payload.data?.message;
                state.statusCode = payload?.statusCode;
            })
            .addCase(createDeal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error?.message;
            })
            .addCase(getMyDeals.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMyDeals.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.myDeals = payload;
            })
            .addCase(getMyDeals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error?.message;
            })
            .addCase(deleteDeals.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteDeals.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.message = payload?.data?.message;
            })
            .addCase(deleteDeals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error?.message;
            })
            .addCase(getCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCategories.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.categories = payload.categories;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error?.message;
            })
            .addCase(getSubCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSubCategories.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.subCategories = payload.data;
            })
            .addCase(getSubCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error?.message;
            })
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCart.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.cartResponse = payload;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error?.message;
            })
            .addCase(getMyCarts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMyCarts.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.cart = payload.cart;
            })
            .addCase(getMyCarts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error?.message;
            });
    },
});

export const { clearMessage, resetSignout, signoutUser } = frontendSlice.actions;
export default frontendSlice.reducer;
