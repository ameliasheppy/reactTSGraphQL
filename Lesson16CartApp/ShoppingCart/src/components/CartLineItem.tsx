import { CartItemType } from "../context/CartProvider";
import { ReducerAction } from "../context/ProductsProvider";
import { ReducerActionType } from "../context/CartProvider";
import { ReactElement } from 'react'

//define the props type for this component
type PropsType = {
    item: CartItemType,
    dispatch:  React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType

}

const CartLineItem = ({item, dispatch, REDUCER_ACTIONS}: PropsType) => {

    const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url).href 
    console.log(img)
    //dont need to memoize bc will be small
    const lineTotal: number = (item.qty * item.price)

    const highestQty: number = 20 > item.qty ? 20 : item.qty

    //again, not expensive calc, dont useMemo
    const optionValues: number[] = [...Array(highestQty).keys()].map(i => i + 1)

    const options: ReactElement[] = optionValues.map(val => {
        return <option key={`opt${val}`} value={val}>{val}</option>
    })

    const onChangeQty = (e: ChangeEvent<HTMLSelectElement>) =>{
        dispatch({
            type: REDUCER_ACTIONS.QUANTITY,
            payload: {...item, qty: Number(e.target.value)}
        })
    }

    const onRemoveFromCart = () => dispatch({
        type: REDUCER_ACTIONS.REMOVE,
        payload: item,
    })

    const content = (
        <li className="cart__item">
            <img src={img} alt={item.name} className="cart__img" />
            <div aria-label="Item Name">{item.name}</div>
            <div aria-label="Price Per Item">
                {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(item.price)}
            </div>

            <label htmlFor="itemQty" className="offscreen">Item Quantity</label>
            <select className="cart__select" 
            name="itemQty" 
            id="itemQty"
            value={item.qty}
            aria-label="Item Quantity"
            onChange={onChangeQty}
            >
                {options}
            </select>
            <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
            {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(lineTotal)}
            </div>

            <button className="cart__button"
            aria-label="Remove Item From Cart"
            title="Remove Item From Cart"
            onClick={onRemoveFromCart}
            >❌</button>
        </li>
    )

  return  content

}

export default CartLineItem