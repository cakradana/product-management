import { configureStore } from "@reduxjs/toolkit";
import { middleware } from "./middleware";
import productsSlice from "./productsSlice";
import themeSlice from "./themeSlice";

const store = configureStore({
  reducer: {
    products: productsSlice,
    theme: themeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
