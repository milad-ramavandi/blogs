import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import { createContext, useEffect, useState } from "react";

interface ThemeContextType {
  theme: PaletteMode;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProviderCustom = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<PaletteMode>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as PaletteMode;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
