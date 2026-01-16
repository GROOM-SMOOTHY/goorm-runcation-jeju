import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "./styles/reset.css";
import "./styles/font.css";
import "./styles/globals.css";
// Service Worker 등록
import * as serviceWorkerRegistration from "./serviceWorkerRegistration.tsx";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
serviceWorkerRegistration.register();