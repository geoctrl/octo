import React, { ComponentProps } from "react";
import { useCss, k, a } from "kremling";
import { Icon } from "../icon/icon";

type Props = ComponentProps<"button"> & {
  icon?: Icons;
};

export function IconButton(props: Props) {
  const { className, icon, ...buttonProps } = props;
  const scope = useCss(css);
  return (
    <button {...scope} className={a("icon-button", className)} {...buttonProps}>
      <Icon name={icon} />
    </button>
  );
}

const css = k`
  .icon-button {
    display: inline-flex;
    height: 2rem;
    width: 2rem;
    padding: 0;
    margin: 0;
    border: none;
    background-color: transparent;
    position: relative;
    align-items: center;
    justify-content: center;
    
    @include focus-ring {
      border-radius: 2rem;
    }
  }
`;
