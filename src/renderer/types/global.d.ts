type Primitive = string | number | boolean;

declare module "*?raw" {
  const contents: string;
  export = contents;
}
