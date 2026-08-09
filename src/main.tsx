import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './app/store.ts'
import "./i18n";

if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
  <StrictMode>
    <App />
  </StrictMode>
  </Provider>
  ,

)
