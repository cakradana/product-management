import { Middleware } from "@reduxjs/toolkit";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const middleware: Middleware = (store) => (next) => (action: any) => {
  const result = next(action);

  if (action.type?.startsWith("products/")) {
    const products = store.getState().products.items;
    localStorage.setItem("products", JSON.stringify(products));
  }

  if (action.type?.startsWith("theme/")) {
    const theme = store.getState().theme.value;
    localStorage.setItem("theme", theme);
  }

  return result;
};
