import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AppThemeContext, AppThemeProvider } from "../context/AppThemeContext";

function LayoutContent() {
  const { resolvedTheme } = useContext(AppThemeContext);
  const isDark = resolvedTheme === "dark";

  return (
    <SafeAreaProvider>
      <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
        
        {/*Top & bottom safe area handling */}
        <SafeAreaView
          style={{ flex: 1 }}
          edges={["top", "bottom"]}
        >
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaView>

        <StatusBar style={isDark ? "light" : "dark"} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  return (  
    <AppThemeProvider>
      <LayoutContent />
    </AppThemeProvider>
  );
}
