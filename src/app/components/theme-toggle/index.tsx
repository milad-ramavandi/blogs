import { ThemeContext } from "@/app/context/ThemeContext";
import { IconButton } from "@mui/material";
import { useContext } from "react";


export default function ThemeToggle() {
  const themeContext = useContext(ThemeContext)
  return (
    <IconButton onClick={themeContext?.toggleTheme} className="text-black dark:text-white">
      {themeContext?.theme === "dark" ? "تاریک" : "روشن"}
    </IconButton>
  );
}
