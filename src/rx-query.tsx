import React from "react";

import { useEffect, useState } from "react";
import { Subject } from "rxjs";
import { filter, map } from "rxjs/operators";
import { useQuery } from "@tanstack/react-query";

type QueryKey = any[];
type QueryFn = () => Promise<any>;
type Results = {
  isLoading: boolean;
  isError: boolean;
  data: any;
  error: Error;
};
type Opts = { queryKey: QueryKey; queryFn: QueryFn };
type StreamData = {
  id: string;
  queryFn: QueryFn;
  results: Results;
};

class RxQuery {
  private __sub: Subject<any> = new Subject<any>();
  private __queryMap: Map<string, StreamData> = new Map();

  // PRIVATE
  // ---------------------
  private updateQueryMap(streamData: StreamData) {
    this.__queryMap.set(streamData.id, streamData);
    this.__sub.next(streamData);
  }

  private createQuery(opts: Opts): StreamData {
    const streamData: StreamData = {
      id: JSON.stringify(opts.queryKey),
      queryFn: opts.queryFn,
      results: {
        isLoading: false,
        isError: false,
        data: undefined,
        error: undefined,
      },
    };

    this.updateQueryMap(streamData);
    return streamData;
  }

  private getQueryId(queryKey: QueryKey): string {
    return JSON.stringify(queryKey);
  }

  // PUBLIC
  // ---------------------
  addQuery(opts: Opts): Results {
    const id = this.getQueryId(opts.queryKey);
    let streamData = this.__queryMap.get(id);
    if (!streamData) {
      streamData = this.createQuery(opts);
      this.invalidateCache(opts.queryKey);
    }
    return streamData.results;
  }

  async invalidateCache(queryKey: QueryKey) {
    const id = this.getQueryId(queryKey);
    const streamData = this.__queryMap.get(id);
    streamData.results.isLoading = true;
    this.updateQueryMap(streamData);

    streamData.results.data = await streamData.queryFn();
    streamData.results.isLoading = false;
    this.updateQueryMap(streamData);
  }

  on(opts: { queryKey: QueryKey }) {
    const id = this.getQueryId(opts.queryKey);
    const streamData = this.__queryMap.get(id);
    return this.__sub.asObservable().pipe(
      filter(
        (sd: { id: string; results: Results }) => streamData?.id === sd.id
      ),
      map(({ results }) => results)
    );
  }
}

const rxQuery = new RxQuery();

// hook implementation
function useRxQuery(opts: { a: number; queryKey: QueryKey; queryFn: QueryFn }) {
  const id = JSON.stringify(opts.queryKey);

  const [state, setState] = useState<Results>(() =>
    rxQuery.addQuery({
      queryKey: opts.queryKey,
      queryFn: opts.queryFn,
    })
  );

  useEffect(() => {
    const sub = rxQuery
      .on({ queryKey: opts.queryKey })
      .subscribe((data) => setState({ ...data }));
    return () => {
      sub.unsubscribe();
    };
  }, [id]);

  return state;
}

// hook implementation
export function Test({ a }: { a: number }) {
  const { isLoading, data } = useRxQuery({
    a,
    queryKey: ["hey"],
    queryFn: () => {
      console.log("call endpoint");
      return new Promise((resolve) => {
        setTimeout(() => resolve("sup"), 2000);
      });
    },
  });

  // const { isLoading, data } = useQuery({
  //   queryKey: ["hey"],
  //   queryFn: () => {
  //     console.log("call endpoint");
  //     return new Promise((resolve) => {
  //       setTimeout(() => resolve("sup"), 2000);
  //     });
  //   },
  // });

  return <div>{isLoading ? "loading" : `${data}`}</div>;
}

export function OtherTest({ a }: { a: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 5000);
  }, []);

  if (!show) return null;
  return <Test a={a} />;
}

// call
// subscribe
