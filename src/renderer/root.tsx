import React, { useEffect, useState } from "react";
import { useCss, k } from "kremling";
import { Header } from "./components/header/header";
import { ModalServiceOutput } from "./common/modal-service/modal-service-output";
import { appState, useAppState } from "./app-state";
import { send } from "./messenger";

export function Root() {
  const scope = useCss(css);
  const [init, setInit] = useState(false);

  useEffect(() => {
    send("initAppState").then((state) => {
      appState.set(state, { emit: false });
      setInit(true);
    });
  }, []);

  return (
    init && (
      <div {...scope}>
        <Header />
        <ModalServiceOutput />
      </div>
    )
  );
}

Root.propTypes = {};

const css = k`
`;
