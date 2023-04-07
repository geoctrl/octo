import React, { ReactNode, useContext } from "react";
import { TabContext } from "./tab-context";

type Props = {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id: string | number;
};

export function TabOutlet(props: Props) {
  const { id, children, className, style } = props;
  const { value } = useContext(TabContext);
  if (id !== value) return;
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
