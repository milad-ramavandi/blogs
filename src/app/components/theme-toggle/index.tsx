"use client";
import { ThemeContext } from "@/app/context/ThemeContext";
import { useContext } from "react";
import CustomSwitch from "../custom-switch";

export default function ThemeToggle() {
  const themeContext = useContext(ThemeContext);
  return (
    <CustomSwitch
      checked={themeContext?.theme === "dark"}
      onChange={themeContext?.toggleTheme}
    />
  );
}
