import React, { forwardRef } from "react";
import { useFloatingParentNodeId, FloatingTree } from "@floating-ui/react";

import { MenuComponent, MenuComponentProps } from "./menu-component";

type MenuProps = Omit<MenuComponentProps, "renderTrigger" | "label"> & {
  renderTrigger: MenuComponentProps["renderTrigger"];
};

export const Menu = forwardRef<
  HTMLButtonElement,
  MenuProps & React.HTMLProps<HTMLButtonElement>
>((props, ref) => {
  const parentId = useFloatingParentNodeId();

  if (parentId == null) {
    return (
      <FloatingTree>
        <MenuComponent {...props} ref={ref} />
      </FloatingTree>
    );
  }

  return <MenuComponent {...props} ref={ref} />;
});

Menu.displayName = "Menu";
