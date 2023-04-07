import React, { ReactNode } from "react";
import { useCss, k, a } from "kremling";

type Props = {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function TabGroup(props: Props) {
  const { children, className, style } = props;
  const scope = useCss(css);
  return (
    <div {...scope} className={a("tab-group", className)} style={style}>
      {children}
    </div>
  );
}

const css = k`
  .tab-group {
    display: flex;
    border-bottom: solid .1rem var(--app-border);
    height: 4.8rem;
    padding-left: .8rem;
    padding-top: .8rem;
    background-color: $grey-200;
  }
`;
