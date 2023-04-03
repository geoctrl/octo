import React from "react";
import { useCss, k, a } from "kremling";

type Props = {
  checked: boolean;
  className?: string;
  onChange: (isChecked: boolean) => void;
  size?: "sm" | "md";
  style?: React.CSSProperties;
};

export function Toggle(props: Props) {
  const { onChange, checked, size = "md", className, style } = props;
  const scope = useCss(css);
  return (
    <div
      {...scope}
      style={style}
      className={a("toggle", className).a(`--${size}`).m("--active", checked)}
      onClick={() => onChange(!checked)}
    >
      <input type="checkbox" onChange={() => {}} checked={checked} />
    </div>
  );
}

Toggle.propTypes = {};

const css = k`
  $space: .4rem;

  @include generateThemeVariables((
    toggle-bg: (light: rgba($raisin-900, .3), dark: rgba($raisin-500, .3)),
    toggle-handle-off: (light: $grey-100, dark: $grey-900),
    toggle-handle-on: $grey-100,
  ));


  .toggle {
    display: inline-flex;
    vertical-align: middle;
    background-color: var(--toggle-bg);
    position: relative;
    cursor: pointer;
    transition: background-color ease 200ms;

    input {
      display: none;
    }

    &::after {
      content: '';
      border-radius: 50%;
      background-color: var(--toggle-handle-off);
      position: absolute;
      transition: transform ease 200ms;
      top: $space;
      left: $space;
    }

    &.--active {
      background-color: $blue-crayola;
      &::after {
        background-color: var(--toggle-handle-on);
      }
    }

    &.--sm {
      $width: 3.6rem;
      $height: 2rem;
      $circle-scale: $height - ($space * 2);
      $translate: $width - ($space * 2) - $circle-scale;
      width: $width;
      height: $height;
      border-radius: 2rem;

      &::after {
        width: 1.2rem;
        height: 1.2rem;
      }

      &.--active::after {
        transform: translateX($translate);
      }
    }

    &.--md {
      $width: 4.4rem;
      $height: 2.4rem;
      $circle-scale: $height - ($space * 2);
      $translate: #{$width - ($space * 2) - $circle-scale};
      width: $width;
      height: $height;
      border-radius: 2rem;

      &::after {
        width: 1.6rem;
        height: 1.6rem;
      }

      &.--active::after {
        transform: translateX($translate);
      }
    }
  }
`;
