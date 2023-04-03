import type IForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
const IcosetWebpackPlugin = require("@icoset/icoset-webpack-plugin");
import {
  regular,
  solid,
  light,
  sharpRegular,
  sharpSolid,
  brands,
} from "./icons";
import path from "path";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const icons = [
  ...regular.map((r) => ({ [`${r}-regular`]: `regular/${r}.svg` })),
  ...solid.map((s) => ({ [`${s}-solid`]: `solid/${s}.svg` })),
  ...light.map((s) => ({ [`${s}-light`]: `light/${s}.svg` })),
  ...sharpRegular.map((s) => ({
    [`${s}-sharp-regular`]: `sharp-regular/${s}.svg`,
  })),
  ...sharpSolid.map((s) => ({ [`${s}-sharp-solid`]: `sharp-solid/${s}.svg` })),
  ...brands.map((s) => ({ [`${s}-brands`]: `brands/${s}.svg` })),
];

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: "webpack-infrastructure",
  }),
  new IcosetWebpackPlugin({
    icosetOptions: {
      directory: path.resolve(
        __dirname,
        "node_modules/@fortawesome/fontawesome-pro/svgs"
      ),
      icons,
    },
  }),
];
