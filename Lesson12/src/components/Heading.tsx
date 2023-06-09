
//what types/props will we use?

import { ReactElement } from "react"

//define it and then use it in the comp func
type HeadingProps = {title:string}
//destructure and throw it in below
//hover on Heading and it says that it is a JSX Element
//be we can be even more specific and say that we want to use a React Ele
//we can just let React infer that it is a JSX ele if we want tho. 
//but lets be extra and type it for practice!
const Heading = ({title}: HeadingProps):ReactElement => {
  return (
    <h1>{title}</h1>
  )
}

export default Heading