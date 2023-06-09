//for funsies. let's write this as old fashioned code
//bc I will for sure be using old fashioned code sometimes and need to know what is up!
// import React from 'react'

// const Section: React.FC<{title: string}> = ({children, title}) =>{
//     return (
//         <section>
//             <h2>{title}</h2>
//             <p>{children}</p>
//         </section>
//     )
// }

//but this is what we do now!
import {ReactNode} from "react"

//set our type!
type SectionProps = {
    title?: string,
    //ReactNode can be a lot! hover to see
    children: ReactNode
}
//children are not props..
//children is something that we add to an h2
//destru what we give
//type it to the above
//we are giving a default val for if a title is not provided bc title is ?
export const Section = ({children, title= "My default title!"}: SectionProps) =>{
    return (
        <section>
            <h2>{title}</h2>
            <p>{children}</p>
        </section>
    )
}