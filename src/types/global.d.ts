declare module "flexsearch" {
  export const Index: any;
}

declare const api: typeof import("../api").api;

type Theme = "light" | "dark" | "system";

type AppStateType = {
  term?: string;
  termRule?: string;
  theme?: Theme;
};
