import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx';
import { CssBaseline } from '@mui/material'
import './styles.css';
import { SettingsProvider } from './utils/providers/SettingsProvider.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
