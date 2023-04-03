import React from "react";
import { useCss, k } from "kremling";
import { Header } from "./components/header/header";
import { ModalServiceOutput } from "./common/modal-service/modal-service-output";

export function Root() {
  const scope = useCss(css);
  return (
    <div {...scope}>
      <Header />

      <ModalServiceOutput />
    </div>
  );
}

Root.propTypes = {};

const css = k`
`;
