import { createContext } from "react";
import type { FactoryStoreContextType } from "../types/factoryStore";

export const FactoryStoreContext = createContext<
  FactoryStoreContextType | undefined
>(undefined);
