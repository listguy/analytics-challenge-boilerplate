import { useEffect, useState } from "react";
type theme = "light" | "dark";

export const useDarkMode = (): any => {
  // | [theme: string, changeTheme: () => void, themeLoaded: boolean] OR (initialValue: theme): [theme, () => void, boolean] did not work both
  const [theme, setTheme] = useState<theme>("light");
  const [themeLoaded, setThemeLoaded] = useState<boolean>(false);

  const setMode = (mode: theme): void => {
    window.localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  const changeTheme = (): void => {
    theme === "light" ? setMode("dark") : setMode("light");
  };

  useEffect(() => {
    const localTheme: theme = window.localStorage.getItem("theme") as theme;
    localTheme && setTheme(localTheme);
    setThemeLoaded(true);
  }, []);

  return [theme, changeTheme, themeLoaded];
};
