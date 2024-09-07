import { ReactElement } from "react";

export type Theme = "light" | "dark";

export interface ThemeConfig {
  name: Theme;
  icon: ReactElement;
}

export interface ThemeState {
  value: Theme;
}
