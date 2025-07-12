import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './routes/router.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { Toaster as Sonner } from "sonner";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
        <Sonner />
      <RouterProvider router={router} />

      </Provider>
    
  </StrictMode>,
)
