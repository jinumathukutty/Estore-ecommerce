import {
  createSlice,
  configureStore,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import type {
  Product,
  User,
  Categories,
  CartProduct,
  UserAdvanced,
  ProductApiResponse,
} from "../types/types";

interface AppState {
  user: User | null;
  products: Product[];
  categories: Categories[];
  cart: CartProduct[];
  userFullInfo: UserAdvanced | null;
  productResponse: ProductApiResponse | null;
  currency: string;
  language: string;
}

const initialState: AppState = {
  user: null,
  products: [],
  categories: [],
  cart: [],
  userFullInfo: null,
  productResponse: null,
  currency: "AED",
  language: "EN",
};

const slice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setCategories: (state, action: PayloadAction<Categories[]>) => {
      state.categories = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setCart: (state, action: PayloadAction<CartProduct[]>) => {
      state.cart = action.payload;
    },
    setUserFullInfo: (state, action: PayloadAction<UserAdvanced | null>) => {
      state.userFullInfo = action.payload;
    },

    setProductResponse: (
      state,
      action: PayloadAction<ProductApiResponse | null>
    ) => {
      state.productResponse = action.payload;
    },

    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, slice.reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

// 👇 Export types and helpers
export const { actions } = slice;
// export const { setProducts } = slice.actions;
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
