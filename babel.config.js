const fs = require("fs");
const path = require("path");

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
          includePaths: ["src/styles"],
          additionalData: fs.readFileSync(
            path.resolve(__dirname, "src/styles/entry.scss"),
            "utf-8"
          ),
        },
      },
    ],
  ],
};
