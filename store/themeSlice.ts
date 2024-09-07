import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Theme, ThemeState } from "@/types/theme";

const loadThemeFromLocalStorage = (): Theme => {
  if (typeof window !== "undefined") {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? (storedTheme as Theme) : "light";
  }
  return "light";
};

const initialState: ThemeState = {
  value: loadThemeFromLocalStorage(),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<Theme>) => {
      state.value = action.payload;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
