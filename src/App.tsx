import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { OnboardingProvider } from "./context/OnboardingContext";
import { FactoryStoreProvider } from "./context/FactoryStoreContext";
import { LayoutProvider } from "./context/LayoutContext";
import { SplashProvider, useSplash } from "./context";
import { SplashScreen } from "./components/common/SplashScreen";
import { router } from "./routes";

function AppContent() {
  const { isSplashActive, dismissSplash } = useSplash();

  return (
    <>
      {isSplashActive && <SplashScreen onComplete={dismissSplash} />}
      <div
        className="w-full h-full"
        aria-hidden={isSplashActive}
        inert={isSplashActive ? true : undefined}
      >
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export function App() {
  return (
    <AuthProvider>
      <OnboardingProvider>
        <FactoryStoreProvider>
          <LayoutProvider>
            <SplashProvider>
              <AppContent />
            </SplashProvider>
          </LayoutProvider>
        </FactoryStoreProvider>
      </OnboardingProvider>
    </AuthProvider>
  );
}

export default App;
