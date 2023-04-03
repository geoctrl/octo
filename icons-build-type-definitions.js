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

let output = `declare type Icons = `;
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

fs.writeFile(path.resolve(__dirname, "src/renderer/types/icon.d.ts"), output);
