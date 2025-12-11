import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld("api", {
      getUserByPseudoAndByPassword: (pseudo: string, password: string) => ipcRenderer.invoke("get-user-by-pseudo-and-password", pseudo, password),
      createUser: (pseudo: string, password: string) => ipcRenderer.invoke("create-user", pseudo, password),
      openDevTool: () => ipcRenderer.invoke("open-dev-tool")
    });
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

