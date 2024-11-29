import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {
  onToggleMusic: (callback: (val: boolean) => void) =>
    ipcRenderer.on('toggle-music', (_event, value) => callback(value)),
  onToggleSay: (callback: (val: boolean) => void) =>
    ipcRenderer.on('toggle-say', (_event, value) => callback(value)),
  showBoardConfig: (callback: () => void) =>
    ipcRenderer.on('show-board-config', (_event) => callback()),
  setValues: (music: boolean, say: boolean) => ipcRenderer.send('set-values', music, say)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
