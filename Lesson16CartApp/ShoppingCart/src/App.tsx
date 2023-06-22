import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import ProductList from './components/ProductList';
//we will use useState to toggle between the views


function App() {
  // const [viewCart, setViewCart] = useState(false) <ts infers bool, 
  //but lets be more specific and type it!
  const [viewCart, setViewCart] = useState<boolean>(false)
  
  const pageContent = viewCart ? <Cart /> : <ProductList />
  //lets make our content and pass through props.
  const content = (
    <>
    <Header viewCart={viewCart}  setViewCart={setViewCart}/>
    {pageContent}
    <Footer viewCart={viewCart}/>
    </>
  )
  return content
}

export default App
