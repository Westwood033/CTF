import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("api", {
      getUserByPseudoAndByPassword: (pseudo: string, password: string) => ipcRenderer.invoke("get-user-by-pseudo-and-password", pseudo, password),
      createUser: (pseudo: string, password: string) => ipcRenderer.invoke("create-user", pseudo, password),
      openDevTool: () => ipcRenderer.invoke("open-dev-tool"),
      verify: (flag: string, id: number) => ipcRenderer.invoke("verify", flag, id),
      getFlagByNumber: (id: number) => ipcRenderer.invoke("get-flag-by-number", id),
      confirmFlag: (id: number, flag: string) => ipcRenderer.invoke("confirm", id, flag),
      closeDevTool: () => ipcRenderer.invoke("close-dev-tool"),
    });
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  // @ts-ignore (define in dts)
  window.api = api
}

