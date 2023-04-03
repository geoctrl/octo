import fs from "fs";
import path from "path";

module.exports = {
  presets: [
    "@babel/preset-typescript",
    "@babel/preset-react",
    "@babel/preset-env",
  ],
  plugins: [
    [
      "module:kremling-babel-plugin",
      {
        sassOptions: {
          includePaths: ["src/renderer/styles"],
          additionalData: fs.readFileSync(
            path.resolve(__dirname, "src/renderer/styles/entry.scss"),
            "utf-8"
          ),
        },
      },
    ],
  ],
};
