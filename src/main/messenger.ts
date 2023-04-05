import { BrowserWindow, ipcMain, nativeTheme } from "electron";
import { actions } from "../shared/messenger";
import { async, Subject } from "rxjs";
import { appState } from "./app-state";

const api = {
  [actions.updateAppState]: async (nextStateDelta: any) => {
    if (nextStateDelta.theme) {
      nativeTheme.themeSource = nextStateDelta.theme;
    }
    appState.set(nextStateDelta);
    return appState.get();
  },
  [actions.initAppState]: async () => {
    return appState.get();
  },
};

ipcMain.handle("__rendererToMain", async (e, eventName, ...args) => {
  return await api[eventName].apply(null, ...args);
});

export const stateStream = new Subject();

export function sendToWindow(
  window: BrowserWindow,
  eventName: string,
  data: any
) {
  window.webContents.send("__mainToRenderer", eventName, data);
}
