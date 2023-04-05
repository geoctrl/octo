import { Lipid } from "lipid";
import { stateHookGenerator } from "./utils/state-hook-generator";
import { send } from "./messenger";

class AppState extends Lipid {
  next(state: AppStateType) {
    send("updateAppState", state);
  }
  onSetAfter = (appState: AppStateType, delta: AppStateType) => {
    if (delta.theme) {
      updateTheme(delta.theme);
    }
  };
}

export const appState = new AppState();
export const useAppState = stateHookGenerator<AppStateType>(appState);

function updateTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}
