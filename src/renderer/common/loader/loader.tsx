import React from "react";
import { useCss, k, a } from "kremling";

export type LoaderProps = {
  className?: string;
  style?: React.CSSProperties;
  size?: "xs" | "sm" | "md" | "lg";
  fill?: "light" | "dark" | "lightDark" | "darkLight";
};

export function Loader(props: LoaderProps) {
  const { className, style, size = "md", fill = "darkLight" } = props;
  const scope = useCss(css);
  return (
    <div
      {...scope}
      className={a("loader", className)
        .m("loader__xs", size === "xs")
        .m("loader__sm", size === "sm")
        .m("loader__md", size === "md")
        .m("loader__lg", size === "lg")
        .m("loader__light", fill === "light")
        .m("loader__dark", fill === "dark")
        .m("loader__light-dark", fill === "lightDark")
        .m("loader__dark-light", fill === "darkLight")}
      style={{ ...style }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 38 4"
        preserveAspectRatio="xMidYMid"
      >
        <g transform="translate(4 2)">
          <circle cx="0" cy="0" r="4">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-0.375s"
              calcMode="spline"
              keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
              values="0;1;0"
              keyTimes="0;0.5;1"
              dur="1s"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
        </g>
        <g transform="translate(14 2)">
          <circle cx="0" cy="0" r="4">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-0.25s"
              calcMode="spline"
              keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
              values="0;1;0"
              keyTimes="0;0.5;1"
              dur="1s"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
        </g>
        <g transform="translate(24 2)">
          <circle cx="0" cy="0" r="4">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="-0.125s"
              calcMode="spline"
              keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
              values="0;1;0"
              keyTimes="0;0.5;1"
              dur="1s"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
        </g>
        <g transform="translate(34 2)">
          <circle cx="0" cy="0" r="4">
            <animateTransform
              attributeName="transform"
              type="scale"
              begin="0s"
              calcMode="spline"
              keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
              values="0;1;0"
              keyTimes="0;0.5;1"
              dur="1s"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
        </g>
      </svg>
    </div>
  );
}

const css = k`
  @include generateThemeVariables((
    loader-light-fill: $grey-100,
    loader-dark-fill: $raisin-500,
    loader-light-dark-fill: (
      light: $grey-100,
      dark: $raisin-500,
    ),
    loader-dark-light-fill: (
      light: $raisin-500,
      dark: $grey-100,
    ),
  ));
  
  .loader {
    display: inline-block;
    vertical-align: middle;

    &.loader__xs svg {
      width: 2.55rem;
      height: .6rem;
    }

    &.loader__sm svg {
      width: 3.4rem;
      height: .8rem;
    }

    &.loader__md svg {
      width: 5.1rem;
      height: 1.2rem;

    }

    &.loader__lg svg {
      width: 6.8rem;
      height: 1.6rem;
    }

    &.loader__light circle {
      fill: var(--loader-light-fill);
    }
    &.loader__dark circle {
      fill: var(--loader-dark-fill);
    }
    &.loader__light-dark circle {
      fill: var(--loader-light-dark-fill);
    }
    &.loader__dark-light circle {
      fill: var(--loader-dark-light-fill);
    }
  }
`;
