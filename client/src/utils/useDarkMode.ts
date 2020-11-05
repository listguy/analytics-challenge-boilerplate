import { any } from "bluebird";
import { useEffect, useState } from "react";

export const useDarkMode = (): // | [theme: string, changeTheme: () => void, themeLoaded: boolean]
any => {
  const [theme, setTheme] = useState("light");
  const [themeLoaded, setThemeLoaded] = useState(false);

  const setMode = (mode: string): void => {
    window.localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  const changeTheme = (): void => {
    theme === "light" ? setMode("dark") : setMode("light");
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
    setThemeLoaded(true);
  }, []);

  return [theme, changeTheme, themeLoaded];
};
