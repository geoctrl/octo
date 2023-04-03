import React, { useEffect } from "react";

import { Toggle } from "../../common/toggle/toggle";
import { appState, useAppState } from "../../app-state";
import { send } from "../../messenger";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export function ThemeToggle(props: Props) {
  const { className, style } = props;
  const { theme } = useAppState(["theme"]);

  useEffect(() => {
    send("updateTheme", theme);
  }, [theme]);

  return (
    <Toggle
      className={className}
      style={style}
      onChange={() => {
        console.log("here");
        appState.set({ theme: theme === "light" ? "dark" : "light" });
      }}
      checked={theme === "dark"}
    />
  );
}
