import React, { useEffect, useMemo, useRef } from "react";
import { useCss, k } from "kremling";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import { HighlightJsLineNumbers } from "@openbayes/highlightjs-line-numbers";

hljs.registerLanguage("javascript", javascript);

declare type Props = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  source?: string;
  language?: "javascript";
};

export function CodeBlockOld(props: Props) {
  const { source, language } = props;
  const elRef = useRef();
  const output = useMemo(() => {
    const output = hljs.highlight(source, {
      language: "javascript",
    }).value;
    HighlightJsLineNumbers.lineNumbersBlock(document, output);
    return output;
  }, []);

  console.log(output);

  const scope = useCss(css);
  return <pre {...scope} dangerouslySetInnerHTML={{ __html: output }} />;
}

const css = k`
  .hljs-ln {
    border-collapse: collapse;
    td {
      padding: 0;
    }

    /* for block of numbers */
    td.hljs-ln-numbers {
      user-select: none;

      text-align: center;
      border-right: 1px solid #717171;
      vertical-align: top;
      padding-right: 5px;
    }

    /* for block of code */
    td.hljs-ln-code {
      padding-left: 10px;
    }
  }

  .hljs-ln-n:before {
    content: attr(data-line-number)
  }
`;
