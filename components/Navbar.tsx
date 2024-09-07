"use client";

import { AppDispatch, RootState } from "@/store/store";
import { changeTheme } from "@/store/themeSlice";
import { ThemeConfig } from "@/types/theme";
import { Menu, Moon, Sun } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Navbar = () => {
  const theme = useSelector((state: RootState) => state.theme.value);
  const dispatch: AppDispatch = useDispatch();

  const themeConfig: ThemeConfig[] = [
    { name: "light", icon: <Sun /> },
    { name: "dark", icon: <Moon /> },
  ];

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const currentIndex = themeConfig.findIndex(
      (config) => config.name === theme
    );

    const nextIndex = (currentIndex + 1) % themeConfig.length;
    dispatch(changeTheme(themeConfig[nextIndex].name));
  };

  const themeIcon = () => {
    return themeConfig.find((config) => config.name === theme)?.icon;
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-square btn-ghost lg:hidden"
        >
          <Menu className="inline-block" />
        </label>
      </div>
      <div className="flex justify-between w-full">
        <div className="text-xl font-semibold px-4">Pokemon Store</div>
        <button onClick={toggleTheme} className="btn btn-circle btn-ghost">
          {themeIcon()}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
