import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core'
import { theme } from './utils/theme.ts';
import Router from './Router.tsx'

// Global styles
import "./assets/css/global.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider theme={theme} forceColorScheme="dark">
        <Router />
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>
)
