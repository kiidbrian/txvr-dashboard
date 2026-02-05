import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('dashboard-root');
if (!container) {
  throw new Error('Dashboard root element not found');
}
container.classList.add("my-dashboard");
createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
