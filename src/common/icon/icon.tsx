import React, { CSSProperties, ForwardedRef, forwardRef } from "react";
import { useCss, a, k } from "kremling";

type IconProps = {
  name: Icons;
  className?: string;
  fill?: string;
  size?: number | string;
  style?: CSSProperties;
};

export const Icon = forwardRef(function IconComponent(
  props: IconProps,
  ref: ForwardedRef<any>
) {
  const scope = useCss(css);
  const { name, className, fill, size, style, ...rest } = props;
  const nameStr = name.toString();
  return (
    <svg
      {...scope}
      ref={ref}
      className={a(`icon ${nameStr}`).a(className)}
      style={{
        ...(size ? { width: `${size}px` } : {}),
        ...(size ? { height: `${size}px` } : {}),
        ...(fill ? { fill } : {}),
        ...(style || {}),
      }}
      viewBox="0 0 24 24"
      {...rest}
    >
      <use href={`#${nameStr}`} xlinkHref={`#${nameStr}`} />
    </svg>
  );
});

const css = k`
  .icon {
    display: inline-block;
    vertical-align: middle;
    fill: currentColor;
    width: 16px;
    height: 16px;
  }
`;
