import React, {
  ElementType,
  forwardRef,
  ReactNode,
  ComponentProps,
  useMemo,
} from "react";
import { a, k, useCss } from "kremling";
import { Icon } from "../icon/icon";
import { Loader, LoaderProps } from "../loader/loader";

export type ButtonProps = ComponentProps<"button"> & {
  active?: boolean;
  alignText?: "left" | "center";
  as?: ElementType | string;
  asProps?: Record<string, any>;
  block?: boolean | "spread";
  blockIndent?: number;
  children?: ReactNode;
  dropdown?: boolean;
  iconLeft?: Icons;
  iconLeftPadding?: "sm" | "md";
  iconRight?: Icons;
  iconRightPadding?: "sm" | "md";
  iconOnly?: Icons;
  isLoading?: boolean;
  intent?:
    | "primary"
    | "secondary"
    | "secondary-grey"
    | "tertiary"
    | "tertiary-grey"
    | "danger";
  size?: "sm" | "md";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function ButtonComponent(props, ref) {
    const {
      active,
      alignText = "center",
      as,
      asProps,
      block,
      blockIndent,
      children,
      dropdown,
      className,
      disabled,
      iconLeft,
      iconLeftPadding = "md",
      iconRight,
      iconRightPadding = "md",
      iconOnly,
      intent = "tertiary-grey",
      isLoading,
      size = "md",
      ...btnProps
    } = props;
    const Component = as || "button";
    const scope = useCss(css);

    const loaderFill = useMemo<LoaderProps["fill"]>(() => {
      switch (intent) {
        case "primary":
        case "danger":
          return "light";
        case "secondary":
        case "secondary-grey":
        case "tertiary":
        case "tertiary-grey":
          return "darkLight";
      }
    }, [intent]);

    return (
      <Component
        {...scope}
        role="button"
        className={a("button", className)
          .m("button__active", active)
          .m("button__align-left", alignText === "left")
          .m("button__block", block)
          .m("button__block-spread", block === "spread")
          .m("button__disabled", disabled)
          .m("button__dropdown", dropdown)
          .m("button__icon-only", iconOnly)
          .m("button__icon-left-md", iconLeft && iconLeftPadding === "md")
          .m("button__icon-right-md", iconRight && iconRightPadding === "md")
          .m("button__icon-left-sm", iconLeft && iconLeftPadding === "sm")
          .m("button__icon-right-sm", iconRight && iconRightPadding === "sm")
          .m("button__loading", isLoading)
          .m("button__primary", intent === "primary")
          .m("button__secondary", intent === "secondary")
          .m("button__secondary-grey", intent === "secondary-grey")
          .m("button__tertiary", intent === "tertiary")
          .m("button__tertiary-grey", intent === "tertiary-grey")
          .m("button__danger", intent === "danger")
          .m("button__small", size === "sm")
          .m("button__medium", size === "md")}
        disabled={disabled || isLoading}
        {...btnProps}
        {...asProps}
        ref={ref}
      >
        {isLoading && (
          <span className="button__loading">
            <Loader size={size === "md" ? "sm" : "xs"} fill={loaderFill} />
          </span>
        )}
        {iconLeft || iconRight || isLoading ? (
          <span className="btn-content">
            {block && blockIndent && (
              <div
                style={{ width: `${blockIndent * 1.2}rem`, flexShrink: 0 }}
              />
            )}
            {iconLeft && (
              <Icon name={iconLeft} size={size === "sm" ? 14 : 16} />
            )}
            <span className="ellipsis">{children}</span>
            {iconRight && (
              <Icon name={iconRight} size={size === "sm" ? 14 : 16} />
            )}
          </span>
        ) : iconOnly ? (
          <Icon name={iconOnly} size={size === "md" ? 16 : 14} />
        ) : (
          <>{block ? <span className="ellipsis">{children}</span> : children}</>
        )}
        {dropdown && (
          <Icon
            name="caret-down-solid"
            size={12}
            style={{ marginLeft: 8, marginTop: -2 }}
          />
        )}
      </Component>
    );
  }
);

const css = k`
  .button {
    color: var(--app-text);
    font-family: inherit;
    font-weight: 500;
    background-color: inherit;
    border: 0;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    position: relative;
    white-space: nowrap;
    transition: box-shadow $form-transition-duration ease,
    background-color $form-transition-duration ease,
    color $form-transition-duration ease;
    -webkit-font-smoothing: antialiased;
    
    .icon {
      flex-shrink: 0;
    }

    &:hover {
      text-decoration: none;
    }

    &:disabled {
      cursor: default;
    }

    .btn-content {
      display: inline-flex;
      align-items: center;
      vertical-align: middle;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .button__loading {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  // icon-only
  // ---------------------------
  .button__icon-only {
    align-items: center;
    justify-content: center;
  }

  // ALIGN LEFT
  // ---------------------------
  .button__align-left {
    text-align: left;
  }

  // BLOCK
  // ---------------------------
  .button__block {
    display: flex;
    width: 100%;
    
    &.button__block-spread .btn-content {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
    }
  }
  
  // DROPDOWN
  // ---------------------------
  .button__dropdown {
    justify-content: space-between;
  }

  // LOADER
  // ---------------------------
  .button__loading .btn-content {
    opacity: 0;
  }

  // size = "sm"
  .button__small {
    height: $form-size-sm;
    padding: 0 $form-padding-sm;
    font-size: $form-text-sm;
    border-radius: $round-sm;

    @include focus-ring {
      border-radius: $round-sm;
    }

    &.button__icon-left-md {
      padding-left: .6rem;
      svg {
        margin-right: .6rem;
      }
    }
    &.button__icon-right-md {
      padding-right: .6rem;
      svg {
        margin-left: .6rem;
      }
    }
    &.button__icon-left-sm {
      padding-left: .3rem;
      svg {
        margin-right: .3rem;
      }
    }
    &.button__icon-right-sm {
      padding-right: .3rem;
      svg {
        margin-left: .3rem;
      }
    }
    &.button__icon-only {
      height: $form-size-sm;
      width: $form-size-sm;
      padding: 0;
    }
  }

  // size = "md"
  // ---------------------------
  .button__medium {
    height: $form-size-md;
    padding: 0 $form-padding-md;
    font-size: $form-text-md;
    border-radius: $round-md;

    @include focus-ring {
      border-radius: $round-md;
    }

    &.button__icon-left-md {
      padding-left: 1rem;

      > .btn-content > span {
        margin-left: .8rem;
      }
    }
    &.button__icon-right-md {
      padding-right: 1rem;

      > .btn-content > span {
        margin-right: .8rem;
      }
    }
    &.button__icon-left-sm {
      padding-left: .6rem;

      > .btn-content > span {
        margin-left: .4rem;
      }
    }
    &.button__icon-right-sm {
      padding-right: .6rem;

      > .btn-content > span {
        margin-right: .4rem;
      }
    }
    &.button__icon-only {
      height: $form-size-md;
      width: $form-size-md;
      padding: 0;
    }
  }

  // intent="primary"
  // ---------------------------
  @include generateThemeVariables(
    (
      // primary
      button-primary-bg: $blue-crayola,
      button-primary-color: $grey-100,

      button-primary-hover-bg: $blue-crayola-600,
      button-primary-active-bg: $blue-crayola-700,
      button-primary-disabled-bg: (
        light: lighten($blue-crayola, 15%),
        dark: desaturate($blue-crayola, 50%),
      ),
      button-primary-disabled-color: (
        light: rgba($grey-100, .7),
        dark: rgba($grey-100, .5),
      ),
    )
  );

  .button__primary {
    background-color: var(--button-primary-bg);
    color: var(--button-primary-color);

    &:not(:disabled):not(.button__active):not(.button__loading) {
      &:hover {
        background-color: var(--button-primary-hover-bg);
      }

      &:active {
        background-color: var(--button-primary-active-bg);
      }
    }

    &:disabled {
      background-color: var(--button-primary-disabled-bg);
      color: var(--button-primary-disabled-color);
    }

    &.button__active {
      background-color: var(--button-primary-active-bg);
    }
    
    @include focus-ring-extend {
      border-color: $blue-crayola-900;
    }
  }

  // intent="secondary"
  // ---------------------------
  @include generateThemeVariables(
    (
      // secondary
      button-secondary-bg: (
        light: rgba($blue-crayola, .1),
        dark: rgba($blue-crayola, .2),
      ),
      button-secondary-color: (
        light: $blue-crayola,
        dark: $grey-100,
      ),
      button-secondary-hover-bg: (
        light: rgba($blue-crayola, .2),
        dark: rgba($blue-crayola, .3),
      ),
      button-secondary-active-bg: (
        light: rgba($blue-crayola, .3),
        dark: rgba($blue-crayola, .3),
      ),
      button-secondary-disabled-color: (
        light: rgba($blue-crayola, .5),
        dark: rgba($grey-100, .5),
      ),
    )
  );
  .button__secondary {
    background-color: var(--button-secondary-bg);
    color: var(--button-secondary-color);

    &:not(:disabled):not(.button__active):not(.button__loading) {
      &:hover {
        background-color: var(--button-secondary-hover-bg);
      }

      &:active {
        background-color: var(--button-secondary-active-bg);
      }
    }

    &:disabled {
      color: var(--button-secondary-disabled-color);
    }

    &.button__active {
      background-color: var(--button-secondary-active-bg);
    }
  }

  // intent="secondary-grey"
  // ---------------------------
  @include generateThemeVariables(
    (
      // secondary grey
      button-secondary-grey-color: (
        light: $raisin-100,
        dark: $grey-100,
      ),
      button-secondary-grey-border: var(--app-border),
      test: var(--app-border),
      button-secondary-grey-bg: transparent,
      button-secondary-grey-hover-bg: (
        light: rgba($raisin-100, 0.08),
        dark: rgba($grey-100, 0.08),
      ),
      button-secondary-grey-active-bg: (
        light: rgba($raisin-100, 0.15),
        dark: rgba($grey-100, 0.15),
      ),
      button-secondary-grey-disabled-color: (
        light: rgba($raisin-700, .3),
        dark: rgba($grey-700, .5),
      ),
    )
  );
  .button__secondary-grey {
    color: var(--button-secondary-grey-color);
    border: solid .1rem var(--button-secondary-grey-border);
    background-color: var(--button-secondary-grey-bg);

    &:not(:disabled):not(.button__active):not(.button__loading) {
      &:hover {
        background-color: var(--button-secondary-grey-hover-bg);
      }

      &:active {
        background-color: var(--button-secondary-grey-active-bg);
      }
    }

    &:disabled {
      color: var(--button-secondary-grey-disabled-color);
    }

    &.button__active {
      background-color: var(--button-secondary-grey-active-bg);
    }
    
    @include focus-ring-extend {
      inset: -.1rem;
    }
  }

  // intent="tertiary"
  // ---------------------------
  @include generateThemeVariables(
    (
      // tertiary
      button-tertiary-bg: transparent,
      button-tertiary-color: $blue-crayola,
      button-tertiary-hover-bg: (
        light: rgba($blue-crayola, .1),
        dark: rgba($blue-crayola, .2),
      ),
      button-tertiary-active-bg: (
        light: rgba($blue-crayola, .2),
        dark: rgba($blue-crayola, .3),
      ),
      button-tertiary-disabled-color: (
        light: rgba($blue-crayola, .5),
        dark: rgba($blue-crayola, .5),
      ),
    )
  );
  .button__tertiary {
    color: var(--button-tertiary-color);

    &:not(:disabled):not(.button__active):not(.button__loading) {
      &:hover {
        background-color: var(--button-tertiary-hover-bg);
      }

      &:active {
        background-color: var(--button-tertiary-active-bg);
      }
    }

    &:disabled {
      color: var(--button-tertiary-disabled-color);
    }

    &.button__active {
      background-color: var(--button-tertiary-active-bg);
    }
  }

  // intent="tertiaryGrey"
  // ---------------------------
  @include generateThemeVariables(
    (
      button-tertiary-grey-bg: transparent,
      button-tertiary-grey-color: (
        light: $raisin-100,
        dark: $grey-100,
      ),
      button-tertiary-grey-hover-bg: (
        light: rgba($raisin-100, .1),
        dark: rgba($grey-100, .1),
      ),
      button-tertiary-grey-active-bg: (
        light: rgba($raisin-100, .2),
        dark: rgba($grey-100, .2),
      ),
      button-tertiary-grey-disabled-color: (
        light: rgba($raisin-100, .5),
        dark: rgba($grey-900, .5),
      ),
    )
  );
  .button__tertiary-grey {
    color: var(--button-tertiary-grey-color);

    &:not(:disabled):not(.button__active):not(.button__loading) {
      &:hover {
        background-color: var(--button-tertiary-grey-hover-bg);
      }

      &:active {
        background-color: var(--button-tertiary-grey-active-bg);
      }
    }

    &:disabled {
      color: var(--button-tertiary-grey-disabled-color);
    }

    &.button__active {
      background-color: var(--button-tertiary-grey-active-bg);
    }
  }

  // intent="danger"
  // ---------------------------
  @include generateThemeVariables(
    (
      button-danger-bg: $vermillion,
      button-danger-color: $grey-100,
      button-danger-hover-bg: $vermillion-600,
      button-danger-active-bg: $vermillion-700,
      button-danger-disabled-bg: (
        light: lighten($vermillion, 15%),
        dark: desaturate($vermillion, 50%),
      ),
      button-danger-disabled-color: rgba($grey-100, .6),
    )
  );
  .button__danger {
    background-color: var(--button-danger-bg);
    color: var(--button-danger-color);

    @include focus-ring-extend {
      border-color: $vermillion-700;
    }

    &:not(:disabled):not(.button__active):not(.button__loading) {
      &:hover {
        background-color: var(--button-danger-hover-bg);
      }

      &:active {
        background-color: var(--button-danger-active-bg);
      }
    }

    &:disabled {
      background-color: var(--button-danger-disabled-bg);
      color: var(--button-danger-disabled-color);
    }

    &.button__active {
      background-color: var(--button-danger-active-bg);
    }
  }

`;
