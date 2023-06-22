import { ProductType } from "../context/ProductsProvider"
import { ReducerAction, ReducerActionType } from "../context/CartProvider"
import { ReactElement } from 'react'

//product gets a lot of props. give them a type
type PropsType = {
    product: ProductType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType,
    inCart: boolean,

}

const Product = ({ product, dispatch, REDUCER_ACTIONS, inCart}: PropsType): ReactElement => {

    //set this as an href so we can grab the image value and use it as a string
    const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url).href 
    console.log(img)

    const onAddToCart = () => dispatch({ type: REDUCER_ACTIONS.ADD, payload: {...product, qty: 1}})

    const itemInCart = inCart ? 'Item in cart! ✅' : null

    const content = (
        <article className="product">
            <h3>{product.name}</h3>
            <img src={img} alt={product.name} className="product__img" />
            <p>{new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(product.price)}{itemInCart}</p>
            <button onClick={onAddToCart}>Add to Cart</button>
        </article>
    )

  return content
}

export default Product