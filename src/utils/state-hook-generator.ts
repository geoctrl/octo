import { useEffect, useState } from "react";
import { Subscription } from "rxjs";
import { Lipid } from "lipid";

export function stateHookGenerator<T>(stateInstance: Lipid) {
  return function (properties: (keyof T)[]): T {
    let obs: Subscription;
    const [state, setState] = useState(
      Object.fromEntries(
        properties.reduce((acc, key) => {
          acc.push([key, stateInstance.get(key as string)]);
          return acc;
        }, [])
      )
    );
    useEffect(() => {
      obs = stateInstance.on(properties as string[]).subscribe(({ state }) => {
        setState(state);
      });
      return () => obs.unsubscribe();
    }, []);
    return state as T;
  };
}
