import React from "react";
import { useCss, k } from "kremling";
import { Header } from "./components/header/header";
import { ModalServiceOutput } from "./common/modal-service/modal-service-output";
import { Button } from "./common/button/button";
import { search } from "./resources/search";

export function Root() {
  const scope = useCss(css);

  return (
    <div {...scope}>
      <Header />
      <div className="p-32">
        <Button onClick={() => search("test")}>test</Button>
      </div>
      <ModalServiceOutput />
    </div>
  );
}

Root.propTypes = {};

const css = k`
`;
