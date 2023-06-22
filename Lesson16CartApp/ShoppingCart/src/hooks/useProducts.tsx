import {useContext} from 'react'
import ProductsContext from '../context/ProductsProvider'
import { UseProductsContextType } from '../context/ProductsProvider'


//lets make a func that returns the type of UseCartContext that we created
const useProducts = (): UseProductsContextType =>{
    return useContext(ProductsContext)
}

export default useProducts