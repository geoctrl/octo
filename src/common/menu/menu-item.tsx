import React, { ReactNode } from "react";

import { MenuComponent, MenuComponentProps } from "./menu-component";
import { Icon } from "../icon/icon";
import { k } from "kremling";

type MenuItemProps = MenuComponentProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string | ReactNode;
    iconLeft?: Icons;
    active?: boolean;
  };

export const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ label, iconLeft, active, ...props }, ref) => {
    const renderItem = ({ isSubMenu, ...refProps }: any) => (
      <button
        {...props}
        {...refProps}
        role="menuitem"
        disabled={props.disabled}
        className="menu-item"
      >
        <span>
          {iconLeft && (
            <Icon name={iconLeft} size={16} className="menu-item-icon-left" />
          )}
          {label}
        </span>
        {active && <Icon name="circle-check-solid" className="sub-menu-icon" />}
        {isSubMenu && (
          <Icon className="sub-menu-icon" name="angle-right-solid" size={14} />
        )}
      </button>
    );

    if (props.children) {
      return <MenuComponent {...props} ref={ref} renderItem={renderItem} />;
    }
    return renderItem({ ref, isSubMenu: false });
  }
);

MenuItem.displayName = "MenuItem";
