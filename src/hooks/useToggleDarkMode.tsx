import React from "react";

const useToggleDarkMode = () => {
  const [theme, setTheme] = React.useState(localStorage.theme);
  const newTheme = theme === "dark" ? "light" : "dark";

  React.useEffect(() => {
    if (theme) {
      // On page load or when changing themes, best to add inline in `head` to avoid FOUC
      if (
        theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      localStorage.theme = theme;
    }
  }, [theme]);

  return [newTheme, setTheme] as const;
};

export default useToggleDarkMode;
