import React from "react";

import { Toggle } from "../../common/toggle/toggle";
import { appState, useAppState } from "../../app-state";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export function ThemeToggle(props: Props) {
  const { className, style } = props;
  const { theme } = useAppState(["theme"]);

  return (
    <Toggle
      className={className}
      style={style}
      onChange={() => {
        appState.set({ theme: theme === "light" ? "dark" : "light" });
      }}
      checked={theme === "dark"}
    />
  );
}
