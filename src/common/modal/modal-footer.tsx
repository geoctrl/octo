import React, { ReactNode, CSSProperties } from "react";
import { useCss, k, a } from "kremling";

type Props = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function ModalFooter(props: Props) {
  const { children, className, style } = props;
  const scope = useCss(css);
  return (
    <div {...scope} className={a("modal-footer", className)} style={style}>
      {children}
    </div>
  );
}

const css = k`
  .modal-footer {
    display: flex;
    align-items: center;
    gap: .8rem;
    padding: 0 2rem 2rem 2rem;
    justify-content: flex-end;
  }
`;
