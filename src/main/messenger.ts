import { ipcMain, nativeTheme } from "electron";
import { actions } from "../shared/messenger";

type Theme = "light" | "dark" | "system";

const api = {
  [actions.updateTheme]: async (theme: Theme) => {
    nativeTheme.themeSource = theme;
  },
  [actions.updateAppState]: async (nextState: any) => {},
};

ipcMain.handle("__rendererToMain", async (e, eventName, ...args) => {
  return await api[eventName].apply(null, ...args);
});
