import { useEffect, useRef, useState } from "react";
import ThemeContext from "./themeContext";

const transitionDuration = 260;

function ThemeProvider({ children }) {
  const transitionTimeoutRef = useRef(null);
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === "light" ? "light" : "dark",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    try {
      window.localStorage.setItem("portfolio-theme", theme);
    } catch (error) {
      console.warn("Unable to persist the selected portfolio theme:", error);
    }

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.content = theme === "light" ? "#FAF8F4" : "#030000";
    }
  }, [theme]);

  useEffect(
    () => () => {
      window.clearTimeout(transitionTimeoutRef.current);
      delete document.documentElement.dataset.themeTransition;
    },
    [],
  );

  const toggleTheme = () => {
    window.clearTimeout(transitionTimeoutRef.current);
    document.documentElement.dataset.themeTransition = "true";
    transitionTimeoutRef.current = window.setTimeout(() => {
      delete document.documentElement.dataset.themeTransition;
    }, transitionDuration);

    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
