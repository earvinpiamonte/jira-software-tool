import React from "react";

const useTheme = () => {
  const [theme, setTheme] = React.useState(localStorage.theme);
  const nextTheme = theme === "dark" ? "light" : "dark";

  const rootElementClassList = document.documentElement.classList;

  theme === "dark"
    ? rootElementClassList.add("dark")
    : rootElementClassList.remove("dark");

  localStorage.theme = theme;

  return [nextTheme, setTheme] as const;
};

export default useTheme;
