import {useContext} from 'react'
import CartContext from '../context/CartProvider'
import { UseCartContextType } from '../context/CartProvider'


//lets make a func that returns the type of UseCartContext that we created
const useCart = (): UseCartContextType =>{
    return useContext(CartContext)
}

export default useCart