import { ulid } from "ulid";
import { KeyboardEvent } from "react";

class KeydownEventStack {
  #stack: { id: string; callback: () => void }[] = {};

  constructor() {
    window.addEventListener("keydown", this.#next, true);
  }

  #next = (e: KeyboardEvent) => {
    if (this.#stack[e.key] && this.#stack[e.key].length) {
      const { callback } = this.#stack[e.key][this.#stack[e.key].length - 1];
      callback(e);
    }
  };

  add = ({ keys, callback }) => {
    const id = uuid();
    keys.forEach((key) => {
      this.#stack[key] = this.#stack[key] || [];
      this.#stack[key].push({ id, callback });
    });
    return {
      remove: () => {
        keys.forEach((key) => {
          this.#stack[key] = this.#stack[key].filter((s) => s.id !== id);
        });
      },
    };
  };
}

export const keydownEventStack = new KeydownEventStack();
