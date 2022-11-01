"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
// Packages
const electron_1 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const height = 600;
const width = 800;
function createWindow() {
    // Create the browser window.
    const window = new electron_1.BrowserWindow({
        width,
        height,
        minWidth: width,
        minHeight: height,
        //  change to false to use AppBar
        frame: false,
        resizable: true,
        fullscreenable: true,
        webPreferences: {
            preload: (0, path_1.join)(__dirname, "preload.js"),
            webSecurity: false,
        },
    });
    const port = process.env.PORT || 3000;
    const url = electron_is_dev_1.default
        ? `http://localhost:${port}`
        : (0, path_1.join)(__dirname, "../src/out/index.html");
    // and load the index.html of the app.
    if (electron_is_dev_1.default) {
        window?.loadURL(url);
    }
    else {
        window?.loadFile(url);
    }
    // Open the DevTools.
    if (electron_is_dev_1.default) {
        window.webContents.openDevTools();
    }
    // For AppBar
    electron_1.ipcMain.on("minimize", () => {
        // eslint-disable-next-line no-unused-expressions
        window.isMinimized() ? window.restore() : window.minimize();
        // or alternatively: win.isVisible() ? win.hide() : win.show()
    });
    electron_1.ipcMain.on("maximize", () => {
        // eslint-disable-next-line no-unused-expressions
        window.isMaximized() ? window.restore() : window.maximize();
    });
    electron_1.ipcMain.on("close", () => {
        window.close();
    });
    electron_1.ipcMain.once("showWindow", () => {
        window.center();
        window.show();
    });
}
function installExtensions() {
    const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS, } = require("electron-devtools-installer");
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];
    extensions.forEach((extension) => {
        installExtension(extension, forceDownload)
            .then((name) => console.log(`Added Extension:  ${name}`))
            .catch((err) => console.log("An error occurred: ", err));
    });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.whenReady().then(() => {
    if (electron_is_dev_1.default) {
        installExtensions();
    }
    createWindow();
    electron_1.app.on("activate", () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        electron_1.app.quit();
});
