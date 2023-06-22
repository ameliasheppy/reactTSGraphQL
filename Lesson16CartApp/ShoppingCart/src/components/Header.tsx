import Nav from './Nav'
import useCart from '../hooks/useCart';


type PropsType = {
    viewCart: boolean, 
    setViewCart: React.Dispatch<React.SetStateAction<boolean>>,
}

import React from 'react'
//destr the props and set them to a type! 
//the type we defined above...
const Header = ({viewCart, setViewCart}: PropsType) => {
    //lets get the below from the cart context
    const {totalItems, totalPrice} = useCart()

    const content = (
        <header className='header'>
            <div className='header__title-bar'>
                <h1>Acme Co.</h1>
                <div className="header__price-box">
                    <p>Total Items: {totalItems}</p>
                    <p>Total Price: {totalPrice}</p>
                </div>
            </div>
            <Nav viewCart={viewCart} setViewCart={setViewCart}/>
        </header>
    )

  return content

}

export default Header