import { actions } from "../shared/messenger";

export const send = (eventName: keyof typeof actions, ...data: any[]) => {
  return api.sendMessage(eventName, data);
};
