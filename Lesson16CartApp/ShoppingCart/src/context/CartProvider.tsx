import { ReactElement, createContext, useMemo, useReducer } from "react"

//make a cart item type
export type CartItemType = {
    sku: string, 
    name: string, 
    price: number,
    qty: number
}

type CartStateType = { cart: CartItemType[] }

const initCartState: CartStateType = { cart: [] }
//now we need to make a cart reducer action type bc our cart will need a reducer
//use an enum

const REDUCER_ACTION_TYPE =  {
    ADD: "ADD",
    REMOVE: "REMOVE",
    QUANTITY: "QUANTITY",
    SUBMIT: "SUBMIT",
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
    type: string, 
    payload?: CartItemType,
}

//start the reducer, it will return the type CartStateType
const reducer = (state: CartStateType, action: ReducerAction): CartStateType =>{
    switch (action.type){
        case REDUCER_ACTION_TYPE.ADD: {
            //set up a type guard!
            if(!action.payload){
                throw new Error('action.payload missing in ADD action')
            }
            //add action needs something from the payload, so destr what we want out@
            const { sku, name, price } = action.payload

            //make a filtered cart with all of the items that we are not updating
            const filteredCart: CartItemType[] = state.cart.filter (item => item.sku !== sku)

            //make sure the item we are udpating exists!
            const itemExists: CartItemType | undefined = state.cart.find(item => item.sku !== sku)

            //see if the item exists is true and add one to it!
            //or it will just be the number 1 if nothing has been added to it
            const qty: number = itemExists ? itemExists.qty + 1 : 1

            //always grab the state! you want to just maintain the state, so grab all of it and return it
            return { ...state, cart: [...filteredCart, {sku, name, price, qty}]}
        }
        case REDUCER_ACTION_TYPE.REMOVE: {
            if(!action.payload){
                throw new Error('action.payload missing in ADD action')
            }
                //add action needs something from the payload, so destr what we want out@
                const { sku } = action.payload

                //make a filtered cart with all of the items that we are not updating
                const filteredCart: CartItemType[] = state.cart.filter (item => item.sku !== sku)

                return { ...state, cart: [...filteredCart] }
        }
        case REDUCER_ACTION_TYPE.QUANTITY: {
            if(!action.payload){
                throw new Error('action.payload missing in ADD action')
            }
                //add action needs something from the payload, so destr what we want out@
                const { sku, qty  } = action.payload

                  //make sure the item we are udpating exists!
                  const itemExists: CartItemType | undefined = state.cart.find(item => item.sku === sku)

                  if (!itemExists){
                    //if it doesn't exist, throw an error!
                    //dont go further if no item match
                    throw new Error('Item must exist to update qty!')
                  }

                const updatedItem: CartItemType = { ...itemExists, qty}

                //make a filtered cart with all of the items that we are not updating
                const filteredCart: CartItemType[] = state.cart.filter (item => item.sku !== sku)

                return { ...state, cart: [...filteredCart, updatedItem]}
        }
        //arent really sending to the server, we are just emptying the cart with this, set it to []
        case REDUCER_ACTION_TYPE.SUBMIT: {
            return { ...state, cart: [] }
        }
        //default for if things don't go as planned
        default: 
        throw new Error('Unidentified reducer action type!')
    }
}
//create a context!
const useCartContext = (initCartState: CartStateType) =>{
    //use the reducer we just made
    const [state, dispatch] = useReducer(reducer, initCartState)

    //define reducer actions that look like the reducer action type
    //memoize the reducer action type so it always has the same referential qty when we pass it into a comp in the future
    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTION_TYPE
    }, [])

    //dont need the : number bc TS can infer that it is a number!
    const totalItems: number = state.cart.reduce((previousValue, cartItem) => {
        return previousValue + cartItem.qty
        //give it the inital value of 0!
    }, 0)

    const totalPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(
        state.cart.reduce((previousValue, cartItem) =>{
            return previousValue + (cartItem.qty * cartItem.price)
        }, 0)
        //total price is a string, with it's $
        //now lets sort the cart!
    )
        const cart = state.cart.sort((a, b) => {
            //extract the last 4 chars to ge tthe nums
            const itemA = Number(a.sku.slice(-4))
            const itemB = Number(b.sku.slice(-4))
            return itemA - itemB
            //this will put the cart in order so item a is always above the other!
        })

        // dispatch is great bc it maintains it's ref quality and won't trigger a re-render
        //useMemo helps when we are passing as props!
        return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart}
}

//create our context now!
export type UseCartContextType = ReturnType<typeof useCartContext>
//hover over the above type and see all of it's info!
//set initial state for context
const initCartContextState: UseCartContextType = {
    //below are just the initial states to pass into our context!
    dispatch: () => {},
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE, 
    totalItems: 0, 
    totalPrice: '', 
    cart: [],
}
//now lets create the context!
export const CartContext = createContext<UseCartContextType>(initCartContextState)
//lets make the children type. it is pretty much the same as the products children, so we could make this in a file and control it for both from that file

//be an ele or arr of ele
type ChildrenType = { children?: ReactElement | ReactElement[] }
export const CartProvider = ({ children }: ChildrenType): ReactElement => {
    //get out val from lexical scope above!
    return (
        <CartContext.Provider value={useCartContext(initCartState)}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext