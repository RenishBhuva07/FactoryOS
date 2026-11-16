import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { OnboardingProvider } from "./context/OnboardingContext";
import { LayoutProvider } from "./context/LayoutContext";
import { router } from "./routes";

export function App() {
  return (
    <AuthProvider>
      <OnboardingProvider>
        <LayoutProvider>
          <RouterProvider router={router} />
        </LayoutProvider>
      </OnboardingProvider>
    </AuthProvider>
  );
}

export default App;
