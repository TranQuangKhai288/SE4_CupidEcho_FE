// App.tsx
import React from "react";
import { AuthProvider } from "./src/contexts/AuthContext";
import { UserProvider } from "./src/contexts/UserContext";
import { MatchProvider } from "./src/contexts/MatchContext";
import AppNavigator from "./src/navigation/AppNavigation";
import { OverlayProvider } from "stream-chat-react-native";
import { BottomSheetProvider } from "./src/contexts/BottomSheetContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "./src/contexts/ThemeContext";
import "./global.css";
const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <OverlayProvider>
          <ThemeProvider>
            <AuthProvider>
              <UserProvider>
                <MatchProvider>
                  <BottomSheetProvider>
                    <AppNavigator />
                  </BottomSheetProvider>
                </MatchProvider>
              </UserProvider>
            </AuthProvider>
          </ThemeProvider>
        </OverlayProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
