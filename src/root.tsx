import React, { useEffect, useState } from "react";
import { useCss, k } from "kremling";

import { Header } from "./components/header/header";
import { ModalServiceOutput } from "./common/modal-service/modal-service-output";
import { Button } from "./common/button/button";
import { search } from "./resources/search";
import { CodeBlockOld } from "./components/code-block/code-block-old";
import { CodeBlock } from "./components/code-block/code-block";
import { useQuery } from "@tanstack/react-query";
import { api } from "./utils/api";
import { OtherTest, Test } from "./rx-query";

export function Root() {
  const scope = useCss(css);
  const [results, setResults] = useState([]);
  const [lastQuery, setLastQuery] = useState("");
  const [str, setStr] = useState("");

  // useEffect(() => {
  //   setTimeout(() => {
  //     setStr("a");
  //   }, 200);
  //   setTimeout(() => {
  //     setStr("ab");
  //   }, 400);
  //   setTimeout(() => {
  //     setStr("abc");
  //   }, 600);
  //   setTimeout(() => {
  //     setStr("abcd");
  //   }, 800);
  //   setTimeout(() => {
  //     setStr("abcde");
  //   }, 1000);
  //   setTimeout(() => {
  //     setStr("abcdef");
  //   }, 1200);
  // }, []);

  const handleSearch = async (query: string) => {
    // setStr(query);
    // setLastQuery(query);
    // const res = await search(query).then((r) => r.data);
    // setResults(res);
  };

  // const { isLoading, isError, isSuccess, data } = useQuery({
  //   queryKey: ["test", str],
  //   queryFn: getTest(str),
  // });

  // console.log(isLoading, isError, isSuccess, data);

  console.log("here");

  return (
    <div {...scope}>
      {/*<Header handleSearch={handleSearch} />*/}

      <div className="p-32">
        <Test a={1} />
      </div>

      <div className="p-32">
        <Test a={2} />
      </div>

      <div className="p-32">
        <OtherTest a={3} />
      </div>

      {/*{lastQuery && (*/}
      {/*  <div className="ph-32 pt-32">*/}
      {/*    <>*/}
      {/*      {results.length} Result(s) for "{lastQuery}"*/}
      {/*    </>*/}
      {/*  </div>*/}
      {/*)}*/}

      {/*<div className="p-32">*/}
      {/*  {results.map((r) => (*/}
      {/*    <div key={r.document.relativeFilePath} className="result">*/}
      {/*      <div className="result-title">{r.document.relativeFilePath}</div>*/}
      {/*      {r.data.map(*/}
      {/*        (block: { lineNumberStart: boolean; content: string }) => (*/}
      {/*          <CodeBlock*/}
      {/*            key={block.lineNumberStart.toString()}*/}
      {/*            source={block.content}*/}
      {/*          />*/}
      {/*        )*/}
      {/*      )}*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</div>*/}

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
