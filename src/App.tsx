import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { OnboardingProvider } from "./context/OnboardingContext";
import { FactoryStoreProvider } from "./context/FactoryStoreContext";
import { LayoutProvider } from "./context/LayoutContext";
import { router } from "./routes";

export function App() {
  return (
    <AuthProvider>
      <OnboardingProvider>
        <FactoryStoreProvider>
          <LayoutProvider>
            <RouterProvider router={router} />
          </LayoutProvider>
        </FactoryStoreProvider>
      </OnboardingProvider>
    </AuthProvider>
  );
}

export default App;
