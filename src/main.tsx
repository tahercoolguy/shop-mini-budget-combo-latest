/**
 * Mock Shop app WebView API when running in browser (e.g. localhost).
 * The SDK's NavigationManager uses window.minisEvents; in the Shop app this is
 * injected by the host. Without this mock, the app would throw when opening in a browser.
 */
if (typeof window !== 'undefined' && !(window as unknown as { minisEvents?: unknown }).minisEvents) {
  let listenerIdCounter = 0
  ;(window as unknown as { minisEvents: { on: (e: string, cb: () => void) => number; off: (id: number) => void } }).minisEvents = {
    on(_event: string, _callback: () => void) {
      return ++listenerIdCounter
    },
    off(_listenerId: number) {},
  }
}

import {createRoot} from 'react-dom/client'
import './index.css'
import {MinisContainer} from '@shopify/shop-minis-react'

import {App} from './App'

// StrictMode disabled to avoid NavigationManager race with React Router effects (flushPassiveEffects).
// Re-enable when SDK or React Router compatibility is resolved.
createRoot(document.getElementById('root')!).render(
  <MinisContainer>
    <App />
  </MinisContainer>
)
