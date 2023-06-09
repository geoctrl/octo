import React, { forwardRef, ReactNode, useRef, useState } from "react";
import { useCss, k, a } from "kremling";

import { Icon } from "../icon/icon";
import { Button } from "../button/button";
import { mergeRefs } from "../../utils/merge-refs";
import { IconButton } from "../icon-button/icon-button";

export interface InputProps
  extends Omit<
    React.HTMLProps<HTMLInputElement>,
    "onChange" | "value" | "ref"
  > {
  error?: string | boolean;
  iconLeft?: Icons;
  label?: string;
  extraInfo?: ReactNode;
  onChange?: (value: string) => void;
  onClear?: () => void;
  value?: string;
  buttonRight?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function InputComponent(props, ref) {
    const {
      label,
      className,
      onChange,
      error,
      extraInfo,
      iconLeft,
      onClear,
      value,
      required,
      buttonRight,
      ...inputProps
    } = props;
    const innerRef = useRef<HTMLInputElement>();
    const scope = useCss(css);
    const [showExtraInfo, setShowExtraInfo] = useState(false);

    const handleClear = () => {
      onClear();
      innerRef?.current?.focus();
    };

    return (
      <div
        {...scope}
        className={a("input", className)
          .m("input--error", error)
          .m("input--icon-left", iconLeft)
          .m("input--can-clear", onClear)
          .m("input--button-right", buttonRight)}
      >
        {label && (
          <div className="input__label">
            <label className="text-label">
              {label}
              {required && <span>*</span>}
            </label>
            {!!extraInfo && (
              <IconButton
                icon={
                  showExtraInfo ? "circle-xmark-regular" : "circle-info-regular"
                }
                onClick={() => setShowExtraInfo(!showExtraInfo)}
                style={{ marginTop: "-.2rem" }}
              />
            )}
          </div>
        )}
        {showExtraInfo && <div className="input__extra-info">{extraInfo}</div>}
        <div className="input-container">
          <input
            ref={mergeRefs(ref, innerRef)}
            onChange={(e) => onChange?.(e.target.value)}
            value={value || ""}
            {...inputProps}
          />
          {iconLeft && (
            <div className="input__icon-left">
              <Icon name={iconLeft} size={16} />
            </div>
          )}
          {!!value && !!onClear && (
            <div className="input__close-btn">
              <Button
                size="sm"
                iconOnly="xmark-regular"
                onClick={handleClear}
              />
            </div>
          )}
        </div>
        {buttonRight && (
          <div className="input__button-right">{buttonRight}</div>
        )}
        {error && <div className="text-error">{error}</div>}
      </div>
    );
  }
);

const css = k`
  @include generateThemeVariables((
    input-icon-fill: (
      light: $grey-900,
      dark: $grey-900,
    ),
  ));
  
  .input {
    position: relative;

    input {
      border: solid 1px var(--app-border);
      border-radius: $round-md;
      height: $form-size-md;
      box-sizing: border-box;
      padding: 0 $form-padding-md;
      display: block;
      width: 100%;
      transition: box-shadow $form-transition-duration ease;
      background-color: var(--input-bg);
      color: var(--app-text);
      font-size: inherit;
      
      &:focus {
        outline: none;
        box-shadow: none;
      }
    }
    
    &.input--error {
      label {
        color: $vermillion;
      }
      input {
        border-color: $vermillion;
      }
    }

    &.input--icon-left input {
      padding-left: 36px;
    }

    &.input--can-clear input {
      padding-right: 36px;
    }
    
    &.input--button-right {
      display: flex;
      align-items: center;
      
      .input-container {
        flex-grow: 1;

        @include focus-ring-within-extend {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          inset: 0 -.1rem 0 0;
        };
      }
      input {
        border-right: none;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }

  .input-container {
    position: relative;
    @include focus-ring-within {
      border-radius: $round-md;
    };
  }
  
  .input__label {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  
  .input__extra-info {
    font-size: 1.2rem;
    margin-bottom: 1.2rem;
    background-color: $grey-300;
    padding: .8rem;
    border-radius: $round-md;
    line-height: 1.5;
  }

  .input__error {
    font-size: 12px;
    color: var(--color-danger);
    padding-top: 6px;
  }

  .input__icon-left {
    position: absolute;
    top: 0;
    height: $form-size-md;
    width: $form-size-md;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--input-icon-fill);
  }

  .input__close-btn {
    position: absolute;
    height: 36px;
    width: 36px;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .input__button-right {
    button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      
      @include focus-ring-extend {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
`;
