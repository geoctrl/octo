import { Lipid } from "lipid";
import { stateStream } from "./messenger";

const defaultState: AppStateType = {
  term: "",
  termRule: "",
  theme: "dark",
};

class AppState extends Lipid {
  onSetAfter = (nextState: AppStateType) => {
    stateStream.next(nextState);
  };
}

export const appState = new AppState(defaultState);
