import { ipcRenderer, contextBridge } from "electron";

declare global {
  interface Window {
    Main: typeof api;
  }
}

const api = {
  Minimize: () => {
    ipcRenderer.send("minimize");
  },
  Maximize: () => {
    ipcRenderer.send("maximize");
  },
  Close: () => {
    ipcRenderer.send("close");
  },
  ShowWindow: () => {
    ipcRenderer.send("showWindow");
  },
  LoadSettings: () => {
    ipcRenderer.send("loadSettings");
  },
  SaveSettings: (content: string) => {
    ipcRenderer.send("saveSettings", content);
  },
  on: (channel: string, callback: (data: any) => void) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },
};

contextBridge.exposeInMainWorld("Main", api);