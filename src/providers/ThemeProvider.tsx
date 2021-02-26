import React from "react";

type ThemeContextTypes = {
  theme: string;
  nextTheme: string;
  setTheme: (theme: string) => void;
};

export const ThemeContext = React.createContext({} as ThemeContextTypes);

const ThemeProvider: React.FC<{ defaultTheme?: string }> = ({
  children,
  defaultTheme,
}) => {
  const [theme, setTheme] = React.useState(
    localStorage.theme ?? defaultTheme ?? "light"
  );
  const nextTheme = theme === "dark" ? "light" : "dark";

  React.useEffect(() => {
    const rootElementClassList = document.documentElement.classList;

    theme === "dark"
      ? rootElementClassList.add("dark")
      : rootElementClassList.remove("dark");

    localStorage.theme = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, nextTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
