import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import "./styles/reset.css";
import "./styles/font.css";
import "./styles/globals.css";
// Service Worker 등록
import * as serviceWorkerRegistration from "./serviceWorkerRegistration.tsx";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

// 서비스 활동 등록은 prod + load 권장
if (import.meta.env.PROD) {
  window.addEventListener("load", () => {
    serviceWorkerRegistration.register();
  });
}