import { FC } from "react";
import { Subject } from "rxjs";
import { ulid } from "ulid";
import type { ModalProps } from "../modal/modal";

export const modalStreamOut = new Subject();
export const modalStreamIn = new Subject();

class ModalService {
  private savedModals: Record<string, (data: any) => void> = {};

  constructor() {
    modalStreamOut.subscribe(({ id, data }) => {
      this.savedModals[id](data);
    });
  }

  render = (
    Component: FC,
    props?: Record<any, any>,
    modalProps?: ModalProps
  ) => {
    const id = ulid();
    let promise = new Promise((r) => (this.savedModals[id] = r));
    modalStreamIn.next({ id, Component, props, modalProps });
    return promise;
  };
}

export const modalService = new ModalService();
