import { Stack } from "expo-router";
import "./global.css";
import {useFonts} from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen'; // Keep this import
import GlobalProvider from "@/lib/global-provider";

export default function RootLayout() {
  // Add fontError to handle potential font loading failures gracefully
  const [fontsLoaded, fontError] = useFonts({
    "Rubik-Bold": require('../assets/fonts/Rubik-Bold.ttf'),
    "Rubik-ExtraBold": require('../assets/fonts/Rubik-ExtraBold.ttf'),
    "Rubik-Light": require('../assets/fonts/Rubik-Light.ttf'),
    "Rubik-Medium": require('../assets/fonts/Rubik-Medium.ttf'),
    "Rubik-Regular": require('../assets/fonts/Rubik-Regular.ttf'),
    "Rubik-SemiBold": require('../assets/fonts/Rubik-SemiBold.ttf'),
  });

  useEffect(() => {
    // Hide the splash screen only when fonts are loaded OR if there was an error
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]); // Depend on both states

  // Return null while waiting for fonts OR if an error occurred (to avoid rendering an incomplete UI)
  if (!fontsLoaded ) {
    return null;
  }

  return (
  <GlobalProvider>
  <Stack screenOptions = {{headerShown:false}} />
  </GlobalProvider>
  );

}