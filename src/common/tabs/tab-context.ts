import { createContext } from "react";

export type TabContextValue = {
  value?: any;
  onChange?: (value?: unknown) => void;
  initialValue?: unknown;
};

export const TabContext = createContext<TabContextValue>({});
