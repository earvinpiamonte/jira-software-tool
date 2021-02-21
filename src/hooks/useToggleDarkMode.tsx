import React from "react";

const useToggleDarkMode = () => {
  const [theme, setTheme] = React.useState(localStorage.theme);
  const newTheme = theme === "dark" ? "light" : "dark";

  React.useEffect(() => {
    if (theme) {
      const $rootElement = document.documentElement;

      if (
        theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        $rootElement.classList.add("dark");
      } else {
        $rootElement.classList.remove("dark");
      }

      localStorage.theme = theme;
    }
  }, [theme]);

  return [newTheme, setTheme] as const;
};

export default useToggleDarkMode;
