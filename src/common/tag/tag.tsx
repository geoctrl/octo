import React from "react";
import { useCss, k, a } from "kremling";

export type TagProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  color?:
    | "grey"
    | "blue-crayola"
    | "vermillion"
    | "emerald"
    | "atomic-tangerine"
    | "sun";
};

export function Tag(props: TagProps) {
  const { className, style, children, color = "grey" } = props;
  const scope = useCss(css);
  return (
    <div
      className={a("tag", `tag--${color}`, className)}
      style={style}
      {...scope}
    >
      {children}
    </div>
  );
}

const css = k`
  @include generateThemeVariables((
    tag-grey-bg: $raisin-100,
    tag-grey-color: $grey-100,
    
    tag-blue-crayola-bg: $blue-crayola-700,
    tag-blue-crayola-color: $grey-100,
    
    tag-vermillion-bg: $vermillion-600,
    tag-vermillion-color: $grey-100,
    
    tag-emerald-bg: $emerald-700,
    tag-emerald-color: $grey-100,

    tag-atomic-tangerine-bg: $atomic-tangerine-700,
    tag-atomic-tangerine-color: $grey-100,
  ));
  
  .tag {
    height: 2.2rem;
    border-radius: $round-sm;
    padding: 0 .8rem;
    display: inline-flex;
    align-items: center;
    font-size: 1.2rem;
    cursor: default;
    font-weight: 500;
  }
  
  .tag--grey {
    background-color: var(--tag-grey-bg);
    color: var(--tag-grey-color);
  }

  .tag--blue-crayola {
    background-color: var(--tag-blue-crayola-bg);
    color: var(--tag-blue-crayola-color);
  }

  .tag--vermillion {
    background-color: var(--tag-vermillion-bg);
    color: var(--tag-vermillion-color);
  }

  .tag--emerald {
    background-color: var(--tag-emerald-bg);
    color: var(--tag-emerald-color);
  }

  .tag--atomic-tangerine {
    background-color: var(--tag-atomic-tangerine-bg);
    color: var(--tag-atomic-tangerine-color);
  }
`;
