import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { useColorScheme as useSystemScheme } from "react-native";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  resolvedTheme: "light" | "dark";
}

export const AppThemeContext = createContext<ThemeContextType>({
  themeMode: "system",
  setThemeMode: () => {},
  resolvedTheme: "light",
});

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemTheme = useSystemScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>("system");

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const saved = await AsyncStorage.getItem("theme_mode");
    if (saved === "light" || saved === "dark" || saved === "system") {
      setThemeModeState(saved);
    }
  };

  const setThemeMode = async (mode: ThemeMode) => {
    setThemeModeState(mode);
    await AsyncStorage.setItem("theme_mode", mode);
  };

  const resolvedTheme =
    themeMode === "system"
      ? systemTheme === "dark"
        ? "dark"
        : "light"
      : themeMode;

  return (
    <AppThemeContext.Provider
      value={{ themeMode, setThemeMode, resolvedTheme }}
    >
      {children}
    </AppThemeContext.Provider>
  );
};
