//often in React we need to render a list 
//lets do this with generics!
import { ReactNode } from "react";

interface ListProps<T>{
    //we want for our items to be an array
    items: T[],
    //we want to render that list of items so that this anonymous func will receive
    //set it to ReactNode bc it has a bunch of types that it can be!
    render:(item: T) => ReactNode
}

//pass in stuff from our ListProps, and it will receive the generic too
//when we are using a generic in an anonymous func, TS has a hard time rec'ing the generic
//so we could extend an empty obj <T extends {}>
//but we will do the below line instead to our T generic
const List = <T,>({ items, render }: ListProps<T>) => {
  return (
    <ul>
        { items.map((item, i) =>(
            <li key={i}>{render(item)}</li>
        )) }
    </ul>
  )
}

export default List
//instead of using a const List, we could do function List, this is just a diff way to do it with an anonymouse function