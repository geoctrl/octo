import React, { useState } from "react";
import { useCss, k } from "kremling";

import { Header } from "./components/header/header";
import { ModalServiceOutput } from "./common/modal-service/modal-service-output";
import { Button } from "./common/button/button";
import { search } from "./resources/search";
import { CodeBlockOld } from "./components/code-block/code-block-old";
import { CodeBlock } from "./components/code-block/code-block";

export function Root() {
  const scope = useCss(css);
  const [results, setResults] = useState([]);
  const [lastQuery, setLastQuery] = useState("");

  const handleSearch = async (query: string) => {
    setLastQuery(query);
    const res = await search(query).then((r) => r.data);
    setResults(res);
  };

  return (
    <div {...scope}>
      <Header handleSearch={handleSearch} />

      {lastQuery && (
        <div className="ph-32 pt-32">
          <>
            {results.length} Result(s) for "{lastQuery}"
          </>
        </div>
      )}

      <div className="p-32">
        {results.map((r) => (
          <div key={r.document.relativeFilePath} className="result">
            <div className="result-title">{r.document.relativeFilePath}</div>
            {r.data.map(
              (block: { lineNumberStart: boolean; content: string }) => (
                <CodeBlock
                  key={block.lineNumberStart.toString()}
                  source={block.content}
                />
              )
            )}
          </div>
        ))}
      </div>

      <ModalServiceOutput />
    </div>
  );
}

Root.propTypes = {};

const css = k`
  .result {
    padding: 1.6rem;
    background-color: $raisin-500;
    margin-bottom: 3.2rem;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    border-radius: $round-md;
  }

  .result-title {
    font-size: 1.6rem;
  }

  // hide editor cursor
  .cm-cursor.cm-cursor-primary { display: none !important }
  .cm-activeLine {
    background-color: transparent !important;
  }
`;
