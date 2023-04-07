const {
  regular,
  solid,
  light,
  sharpRegular,
  sharpSolid,
  brands,
} = require("./icons");
const path = require("path");
const fs = require("fs").promises;
const prettier = require("prettier");

let output = `// auto-generated icon type definitions from /icons-build-type-definitions.js
declare type Icons = `;
const iconNames = [];

regular.forEach((icon) => {
  iconNames.push(`"${icon}-regular"`);
});

solid.forEach((icon) => {
  iconNames.push(`"${icon}-solid"`);
});

light.forEach((icon) => {
  iconNames.push(`"${icon}-light"`);
});

brands.forEach((icon) => {
  iconNames.push(`"${icon}-brands"`);
});

sharpRegular.forEach((icon) => {
  iconNames.push(`"${icon}-sharp-regular"`);
});

sharpSolid.forEach((icon) => {
  iconNames.push(`"${icon}-sharp-solid"`);
});

output += `${iconNames.join(" | ")};\n`;

output = prettier.format(output, { parser: "babel" });

fs.writeFile(path.resolve(__dirname, "src/types/icon.d.ts"), output);
