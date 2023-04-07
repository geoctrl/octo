import React from "react";
import { useCss, k, a } from "kremling";

declare type Props = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function MenuTitle(props: Props) {
  const { children, className, style } = props;
  const scope = useCss(css);
  return (
    <div {...scope} className={a("menu-title", className)} style={style}>
      {children}
    </div>
  );
}

const css = k`
  .menu-title {
    font-size: 1.2rem;
    font-weight: 700;
    padding: .8rem .8rem .4rem .8rem;
    cursor: default;
    user-select: none;
  }
`;
