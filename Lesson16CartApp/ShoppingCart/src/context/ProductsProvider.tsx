//make the product type
import { ReactElement, createContext, useState, useEffect } from 'react'

export type ProductType = {
    //our type props will mirror the data.json
    sku:string,
    name: string,
    price:number
}
const initState: ProductType[] = []
//use the above for our initial state
//we want to set our products to an empty array for now
// const initState: ProductType[] = [
//             {
//                 "sku": "item0001",
//                 "name": "Widget",
//                 "price": 9.99
//             },
//             {
//                 "sku": "item0002",
//                 "name": "Premium Widget",
//                 "price": 19.99
//             },
//             {
//                 "sku": "item0003",
//                 "name": "Deluxe Widget",
//                 "price": 29.99
//             }
// ]
//commenting the above out to grab the data with a fetch/promise


//we need to be able to export our products, so lets export
//them in a type of our products array
//this will represent our products
export type UseProductsContextType = { products: ProductType[]}

//set init context state to an empty array!
const initContextState: UseProductsContextType = { products: []}

const ProductsContext = createContext<UseProductsContextType>(initContextState)

//we will use our initState from the top in the context
//but for now lets make a children type and provide it
//the children are optional, and they can be one Element or an [] of multiples!
type ChildrenType = { children?: ReactElement | ReactElement[]}
//childre is what goes between the open/close jsx tags. children is not a prop that we are passing around!
//its technically a prop, just handled diff'ly
//we can pass in iniState from the lexical scope
export const ProductsProvdier = ({ children }: ChildrenType):
ReactElement =>{
    const [products, setProducts] = useState<ProductType[]>(initState)
    //give our useEffects an empty dep arr so that they will only load once, when the page loads
    useEffect(() => {
        const fetchProducts = async (): Promise<ProductType[]> =>{
            const data = await fetch('http://localhost:3500/products').then(res =>{
                return res.json()
            }).catch(err => {
                if (err instanceof Error) console.log(err.message);
            })
            return data
        }
        //we made the func in the useEffect so that it will only load once
        //call the func!
        fetchProducts().then(products => setProducts(products))
    },[])

    return (
        <ProductsContext.Provider value={{ products }}>{children}</ProductsContext.Provider>
    )
}

export default ProductsContext