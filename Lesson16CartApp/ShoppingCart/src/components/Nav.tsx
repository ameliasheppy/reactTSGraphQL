type PropsType = {
    viewCart: boolean, 
    setViewCart: React.Dispatch<React.SetStateAction<boolean>>,
}

import React from 'react'

//give same props from App/Header
const Nav = ({viewCart, setViewCart}: PropsType) => {
    const button = viewCart 
    ? <button onClick={() => setViewCart(false)}>View Products</button>
    : <button onClick={() => setViewCart(true)}>View Cart</button>

    const content = (
        <nav className='nav'>
            {button}
        </nav>
    )
  return content
}

export default Nav