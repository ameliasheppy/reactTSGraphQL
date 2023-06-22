import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";
import { UseProductsContextType } from "../context/ProductsProvider";
import { ReactElement } from 'react'
import Product from "./Product";


//we can get the following from the useCart
const ProductList = () => {
  const { dispatch, REDUCER_ACTIONS, cart } = useCart()
  const { products} = useProducts()

  let pageContent: ReactElement | ReactElement[] = <p>Loading.....</p>

  if (products?.length){
    pageContent = products.map(product => {
      const inCart: boolean = cart.some(item => item.sku === product.sku)
//the below is what will be returned as we map through the products
      return (
        <Product key={product.sku} 
        product={product}
        dispatch={dispatch}
        REDUCER_ACTIONS={REDUCER_ACTIONS}
        inCart={inCart}
        />
      )
    })
  }

  const content = (
    <main className="main main--products">
      {pageContent}
    </main>
  )

  return content
}

export default ProductList