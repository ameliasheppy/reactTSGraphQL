import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { CartProvider } from './context/CartProvider.tsx'
import { ProductsProvdier } from './context/ProductsProvider.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ProductsProvdier>
      <CartProvider>
      <App />
      </CartProvider>
    </ProductsProvdier>
  </React.StrictMode>,
)
