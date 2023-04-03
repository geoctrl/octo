import React, { ReactNode, useContext } from "react";
import { useCss, k, a } from "kremling";

import { TabContext } from "./tab-context";
import { Button } from "../button/button";

type Props = {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id: unknown;
};

export function TabButton(props: Props) {
  const { children, id, className, style } = props;
  const scope = useCss(css);
  const { value, onChange } = useContext(TabContext);
  const active = id === value;
  return (
    <div className={a("tab-button", className).m("tab-button--active", active)}>
      <Button
        {...scope}
        style={style}
        onClick={() => onChange(id)}
        active={active}
        intent={active ? "tertiary" : "tertiary-grey"}
      >
        {children}
      </Button>
    </div>
  );
}

const css = k`
  .tab-button::before {
    content: '';
    position: relative;
  }
`;
