import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// /const router = createBrowserRouter(routes);

// //Initial entry point of the react application. Render routerprovider inside global state and notification state
// /createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//         <RouterProvider router={router} />
//   </StrictMode>
// )
