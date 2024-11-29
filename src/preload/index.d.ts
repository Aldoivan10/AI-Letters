import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      setValues: (music: boolean, say: boolean) => Promise<void>
      onToggleMusic: (callback: (val: boolean) => void) => void
      onToggleSay: (callback: (val: boolean) => void) => void
      showBoardConfig: (callback: () => void) => void
    }
  }

  type SVGargs = {
    type?: 'svg' | 'circle' | 'g' | 'ellipse'
    className?: string
    width?: string
    height?: string
    fill?: string
    transform?: string
    aspectRatio?: string
  }
}
