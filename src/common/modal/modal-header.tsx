import React, { ReactNode, CSSProperties, useContext } from "react";
import { useCss, k, a } from "kremling";
import { ModalContext } from "./modal-context";
import { Button } from "../button/button";

type Props = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  showCloseBtn?: boolean;
  actions?: ReactNode;
};

export function ModalHeader(props: Props) {
  const { children, className, style, showCloseBtn = true, actions } = props;
  const scope = useCss(css);
  const { onClose } = useContext(ModalContext);
  return (
    <div {...scope} className={a("modal-header", className)} style={style}>
      <h2>{children}</h2>
      <div className="modal-header__actions">
        {actions}
        {showCloseBtn && <Button iconOnly="xmark-regular" onClick={onClose} />}
      </div>
    </div>
  );
}

const css = k`
  .modal-header {
    padding: 2rem 2rem 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    h2 {
      margin-bottom: 0;
    }
  }
  
  .modal-header__actions {
    display: flex;
    align-items: center;
    gap: .8rem;
  }
`;
