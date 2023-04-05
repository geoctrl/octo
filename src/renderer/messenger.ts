import { actions } from "../shared/messenger";
import { appState } from "./app-state";

export const send = (eventName: keyof typeof actions, ...data: any[]) => {
  return api.sendMessage(eventName, data);
};

document.addEventListener("__preloadToMessenger", (e: CustomEvent) => {
  const { eventName, data } = e.detail;
  if (eventName === "updateAppState") {
    appState.set(data);
  }
});
