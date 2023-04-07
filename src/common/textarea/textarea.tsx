import React, { ChangeEvent, ComponentProps, useEffect, useRef } from "react";
import { a, k, useCss } from "kremling";

type TextareaProps = Omit<ComponentProps<"textarea">, "value" | "onChange"> & {
  className?: string;
  label?: string;
  onChange?: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void;
  style?: React.CSSProperties;
  value?: string;
};

export function Textarea(props: TextareaProps) {
  const { className, label, style, onChange, value, rows = 2, ...rest } = props;
  const scope = useCss(css);
  const textareaRef = useRef<HTMLTextAreaElement>();
  useEffect(() => {
    textareaRef.current.style.height = "0";
    const size = (textareaRef.current.scrollHeight + 2) / 10;
    textareaRef.current.style.height = `${size < 6 ? 6 : size}rem`;
  }, [value]);

  return (
    <div {...scope} className={a("textarea", className)}>
      <label className="text-label">{label}</label>
      <div className="textarea-container">
        <textarea
          ref={textareaRef}
          style={style}
          onChange={(e) => onChange(e.target.value, e)}
          value={value}
          rows={rows}
          {...rest}
        />
      </div>
    </div>
  );
}

const css = k`
  .textarea {
    textarea {
      color: var(--input-grow-color);
      background-color: var(--input-bg);
      border-radius: $round-md;
      border: solid 1px var(--app-border);
      font-weight: inherit;
      font-size: inherit;
      vertical-align: baseline;
      min-height: 3.2rem;
      line-height: 1.2;
      max-width: 100%;
      width: 100%;
      display: block;
      padding: $form-padding-md;
      resize: none;

      &:focus {
        outline: none;
        box-shadow: none;
      }
    }
    
    .textarea-container {
      position: relative;
      @include focus-ring-within {
        border-radius: $round-md;
      }
    }
  }
`;
