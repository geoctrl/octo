import React, { ReactNode, CSSProperties } from "react";
import { a, k, useCss } from "kremling";

type Props = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function ModalBody(props: Props) {
  const { children, className, style } = props;
  const scope = useCss(css);
  return (
    <div {...scope} className={a("modal-body", className)} style={style}>
      {children}
    </div>
  );
}

const css = k`
  .modal-body {
    padding: 2rem;
    overflow-y: auto;
  }
`;
