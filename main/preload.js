"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const api = {
    Minimize: () => {
        electron_1.ipcRenderer.send("minimize");
    },
    Maximize: () => {
        electron_1.ipcRenderer.send("maximize");
    },
    Close: () => {
        electron_1.ipcRenderer.send("close");
    },
    ShowWindow: () => {
        electron_1.ipcRenderer.send("showWindow");
    },
    LoadSettings: () => {
        electron_1.ipcRenderer.send("loadSettings");
    },
    SaveSettings: (content) => {
        electron_1.ipcRenderer.send("saveSettings", content);
    },
    on: (channel, callback) => {
        electron_1.ipcRenderer.on(channel, (_, data) => callback(data));
    },
};
electron_1.contextBridge.exposeInMainWorld("Main", api);
