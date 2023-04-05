import { app, BrowserWindow, session } from "electron";
import "./messenger";
import { sendToWindow, stateStream } from "./messenger";
import { appState } from "./app-state";
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

import { search } from "./search";
import path from "path";
import os from "os";

// search.run(path.resolve(os.homedir(), "projects/doculand")).then((res) => {
//   console.log("res", res);
// });

search
  .searchFile(
    "*StorageKeys",
    path.resolve(os.homedir(), "projects/doculand/src/app-state.ts")
  )
  .then((res) => {});

// search().then((files) => console.log(files.length));

//
// // Handle creating/removing shortcuts on Windows when installing/uninstalling.
// if (require("electron-squirrel-startup")) {
//   app.quit();
// }
//
// const createWindow = (): void => {
//   // session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
//   //   callback({
//   //     responseHeaders: {
//   //       ...details.responseHeaders,
//   //       "Content-Security-Policy": ["script-src 'self'"],
//   //     },
//   //   });
//   // });
//
//   // Create the browser window.
//   const mainWindow = new BrowserWindow({
//     height: 1200,
//     width: 1200,
//     webPreferences: {
//       preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
//     },
//     titleBarStyle: "hiddenInset",
//     trafficLightPosition: {
//       x: 20,
//       y: 20,
//     },
//   });
//
//   // and load the index.html of the app.
//   mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
//
//   // Open the DevTools.
//   mainWindow.webContents.openDevTools();
//
//   mainWindow.once("ready-to-show", () => {
//     // send app state to renderer on change
//     stateStream.subscribe((nextState) => {
//       updateAppState(mainWindow, nextState);
//     });
//   });
// };
//
// function updateAppState(window: BrowserWindow, state: any) {
//   sendToWindow(window, "updateAppState", state);
// }
//
// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.on("ready", createWindow);
//
// // Quit when all windows are closed, except on macOS. There, it's common
// // for applications and their menu bar to stay active until the user quits
// // explicitly with Cmd + Q.
// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });
//
// app.on("activate", () => {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });
//
// // In this file you can include the rest of your app's specific main process
// // code. You can also put them in separate files and import them here.
