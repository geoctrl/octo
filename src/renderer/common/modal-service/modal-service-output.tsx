import React, { useEffect, useState } from "react";
import { Modal } from "../modal/modal";
import { modalStreamIn, modalStreamOut } from "./modal-service";

export function ModalServiceOutput() {
  const [component, setComponent] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    modalStreamIn.subscribe((nextComponent) => {
      setComponent(nextComponent);
      setShow(true);
    });
  }, []);

  const modalResolve = (data: any) => {
    modalStreamOut.next({ id: component.id, data });
    setShow(false);
  };

  const onCloseAnimateComplete = () => {
    setComponent(null);
  };

  const Component = component?.Component || undefined;
  const props = component?.props;
  const modalProps = component?.modalProps;

  return (
    !!Component && (
      <Modal
        show={show}
        {...modalProps}
        onCloseAnimateComplete={onCloseAnimateComplete}
        onClose={() => modalResolve(null)}
      >
        <Component modalResolve={modalResolve} {...props} />
      </Modal>
    )
  );
}
