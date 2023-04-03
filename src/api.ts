import { ipcRenderer } from "electron";

export const api = {
  sendMessage(eventName: string, ...data: any[]) {
    return ipcRenderer.invoke("__rendererToMain", eventName, ...data);
  },
};
