import React, { useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { EditorState } from "@codemirror/state";
import { githubLightInit } from "@uiw/codemirror-theme-github";
import { githubDarkInit } from "@uiw/codemirror-theme-github";
import { javascript } from "@codemirror/lang-javascript";
import { useCss, k } from "kremling";

import { useAppState } from "../../app-state";

type CodeBlockProps = {
  source: string;
};

export function CodeBlock(props: CodeBlockProps) {
  const { source } = props;
  const scope = useCss(css);
  const { theme } = useAppState(["theme"]);
  const codeMirrorTheme = useMemo(() => {
    if (theme === "light") {
      return githubLightInit({
        settings: {
          fontFamily: "Hack",
          background: "transparent",
          gutterBackground: "#FFFFFF",
          gutterBorder: "#FFFFFF",
        },
      });
    } else {
      return githubDarkInit({
        settings: {
          fontFamily: "Hack",
          background: "transparent",
          gutterBackground: "transparent",
          gutterBorder: "#141418",
        },
      });
    }
  }, [theme]);

  return (
    <div {...scope} className="code-block">
      <CodeMirror
        value={source}
        theme={codeMirrorTheme}
        extensions={[javascript(), EditorState.readOnly.of(true)]}
      />
    </div>
  );
}

const css = k`
  .code-block {
    background-color: $raisin-400;
    overflow: hidden;
    border-radius: $round-sm;
  }
  
  .cm-activeLineGutter {
    background-color: transparent;
  }
`;
