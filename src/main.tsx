import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@/styles/gobals.scss'
import { BrowserRouter } from 'react-router-dom'
import '@/i18n/index.ts'
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
