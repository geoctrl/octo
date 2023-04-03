import React, { Children, ReactElement } from "react";

type SwitchProps = {
  expression?: any;
  children?: any;
};

export function Switch(props: SwitchProps): any {
  const { expression, children } = props;
  const _children = Children.toArray(children) as ReactElement[];
  let defaultChild = null;
  let result = null;

  for (let i = 0; i < _children.length; i++) {
    const child = _children[i];
    if (!child?.props) continue;

    const value = child?.props?.value;
    const _default = !!child?.props?.default;
    const values = Array.isArray(value) ? value : [value];
    const match = values.some((v) => v === expression);

    if (_default) {
      if (defaultChild) {
        throw Error(`[Switch] Only one default case allowed.`);
      }
      defaultChild = child;
    }

    if (match) {
      result = child;
      break;
    }
  }

  if (!result && defaultChild) {
    result = defaultChild;
  }

  return result;
}

type CaseProps = {
  value?: unknown | unknown[];
  default?: boolean;
  children?: any;
};

export function Case({ children }: CaseProps): any {
  return children;
}
