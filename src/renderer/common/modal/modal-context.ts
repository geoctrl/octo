import { createContext } from "react";

type ModalContextState = {
  onClose?: () => void;
};

export const ModalContext = createContext<ModalContextState>({});
