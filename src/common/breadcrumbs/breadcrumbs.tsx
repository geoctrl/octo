import React, { ReactNode } from "react";
import { useCss, k } from "kremling";

type Props = {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function BreadCrumbs(props: Props) {
  const {} = props;
  const scope = useCss(css);
  return <div {...scope}>breadcrumbs</div>;
}

const css = k`
  
`;
