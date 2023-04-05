import { ipcRenderer } from "electron";

ipcRenderer.on("__mainToRenderer", (e, eventName: string, data) => {
  const event = new CustomEvent("__preloadToMessenger", {
    detail: { eventName, data },
  });
  document.dispatchEvent(event);
});

export const api = {
  sendMessage(eventName: string, ...data: any[]) {
    return ipcRenderer.invoke("__rendererToMain", eventName, ...data);
  },
};
