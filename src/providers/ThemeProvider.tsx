import React from "react";

type ThemeContextTypes = {
  nextTheme: string;
  setTheme: (theme: string) => void;
};

export const ThemeContext = React.createContext({} as ThemeContextTypes);

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = React.useState(localStorage.theme ?? "light");
  const nextTheme = theme === "dark" ? "light" : "dark";

  React.useEffect(() => {
    const rootElementClassList = document.documentElement.classList;

    theme === "dark"
      ? rootElementClassList.add("dark")
      : rootElementClassList.remove("dark");

    localStorage.theme = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ nextTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
