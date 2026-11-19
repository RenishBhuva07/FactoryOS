import { useContext } from "react";
import { FactoryStoreContext } from "./factoryStoreContextDef";
import type { FactoryStoreContextType } from "../types/factoryStore";

export const useFactoryStore = (): FactoryStoreContextType => {
  const context = useContext(FactoryStoreContext);
  if (!context) {
    throw new Error(
      "useFactoryStore must be used within a FactoryStoreProvider",
    );
  }
  return context;
};
