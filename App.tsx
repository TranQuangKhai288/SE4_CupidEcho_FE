// App.tsx
import React from "react";
import { AuthProvider } from "./src/contexts/AuthContext";
import { UserProvider } from "./src/contexts/UserContext";
import { MatchProvider } from "./src/contexts/MatchContext";
import AppNavigator from "./src/navigation/AppNavigation";
import "./global.css";

import { ThemeProvider } from "./src/contexts/ThemeContext";
const App: React.FC = () => {
  console.log(
    "process.env.EXPO_PUBLIC_API_URL",
    process.env.EXPO_PUBLIC_API_URL
  );
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <MatchProvider>
            <AppNavigator />
          </MatchProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
