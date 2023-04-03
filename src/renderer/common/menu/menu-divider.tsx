import React from "react";
import { a } from "kremling";

type MenuDividerProps = {
  className?: string;
  style?: React.CSSProperties;
};

export const MenuDivider = function (props: MenuDividerProps) {
  const { className, style } = props;
  return <div className={a(className, "menu-divider")} style={style} />;
};

MenuDivider.displayName = "MenuDivider";
