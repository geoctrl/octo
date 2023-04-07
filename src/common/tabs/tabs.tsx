import React, { ReactNode, useMemo, useState } from "react";

import { TabContext } from "./tab-context";

type TabsUncontrolledProps = {
  children?: ReactNode;
  value?: never;
  onChange?: never;
  initialValue: unknown;
};

type TabsControlledProps = {
  children?: ReactNode;
  value: unknown;
  onChange: (value: unknown) => void;
  initialValue?: never;
};

export type TabsProps = TabsControlledProps | TabsUncontrolledProps;

export function Tabs(props: TabsProps) {
  const { children, value, onChange, initialValue } = props;
  const [internalTab, setInternalTab] = useState<unknown>(initialValue);

  const handleOnChange = (value: string) => {
    if (onChange) {
      onChange(value);
    } else {
      console.log("set value", value);
      setInternalTab(value);
    }
  };

  const handledValue = useMemo(() => {
    if (onChange) return value;
    return internalTab;
  }, [internalTab, onChange]);

  return (
    <TabContext.Provider
      value={{ value: handledValue, onChange: handleOnChange, initialValue }}
    >
      {children}
    </TabContext.Provider>
  );
}
