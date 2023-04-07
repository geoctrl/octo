import { Lipid } from "lipid";
import { stateHookGenerator } from "./utils/state-hook-generator";

type AppStateType = {
  theme: Theme;
};

const lsKey = "__octo_data";
let localStorageData: Record<string, any> = {};
try {
  localStorageData = JSON.parse(localStorage.getItem(lsKey)) || {};
} catch (e) {}
updateTheme(localStorageData.theme || "light");

const saveToLocalStorageKeys: (keyof AppStateType)[] = ["theme"];
const defaultAppState: AppStateType = {
  theme: localStorageData.theme || "light",
};

class AppState extends Lipid {
  constructor(props: AppStateType) {
    super(props);
  }

  onSetAfter = (appState: AppStateType, delta: AppStateType) => {
    if (delta.theme) {
      updateTheme(delta.theme);
    }

    const updateLocalStorage: Record<string, any> = {};
    saveToLocalStorageKeys.forEach((key) => {
      if (delta[key]) {
        updateLocalStorage[key] = delta[key];
      }
    });
    let currentLocalStorage = {};
    try {
      currentLocalStorage = JSON.parse(localStorage.getItem(lsKey));
    } catch (e) {}

    localStorage.setItem(
      lsKey,
      JSON.stringify({
        ...currentLocalStorage,
        ...updateLocalStorage,
      })
    );
  };
}

export const appState = new AppState(defaultAppState);
export const useAppState = stateHookGenerator<AppStateType>(appState);

function updateTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}
