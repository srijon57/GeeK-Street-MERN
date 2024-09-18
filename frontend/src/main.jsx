import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <SnackbarProvider
        maxSnack={3}
        style={{ zIndex: 999999 }}
    >
      <CartProvider>
        <AuthProvider>     
            <App />
        </AuthProvider>
        </CartProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
