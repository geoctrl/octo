import React from "react";
import { ModalHeader } from "../../common/modal/modal-header";
import { ModalBody } from "../../common/modal/modal-body";
import { Input } from "../../common/input/input";
import { ModalFooter } from "../../common/modal/modal-footer";
import { Button } from "../../common/button/button";

type Props = {
  modalResolve?: (data: any) => void;
};

export function CreateProjectModal(props: Props) {
  const { modalResolve } = props;
  return (
    <>
      <ModalHeader>Create Project</ModalHeader>
      <ModalBody>
        <Input label="Name" autoFocus />
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => modalResolve(false)}>Cancel</Button>
        <Button intent="primary" onClick={() => modalResolve(true)}>
          Submit
        </Button>
      </ModalFooter>
    </>
  );
}
