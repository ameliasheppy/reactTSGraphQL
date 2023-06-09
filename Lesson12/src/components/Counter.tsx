// import {useState} from 'react'
// //we are going to make a simple counter app!
// //we have done it all in here right now. But let's blow this up and do it a diff way. put all of the state stuff into app.tsx and pass something down as props
// const Counter = () => {
//     //we don't have to do a type union below. we could leave off the null if we want to. I am leaving mine for demo purposes
//     const [count, setCount] = useState<number>(1)
//     //gonna guess that we will need to use a state updating func
//     //instead of count++
    
//   return (
//     <div>
//         <h1>
//         Count is {count}
//         </h1>
//         <button onClick={() => setCount(prev => prev + 1)}>Add</button>
//         <button onClick={() => setCount(prev => prev -1)}>Subtract</button>
//     </div>
//   )
// }

// export default Counter

import {ReactNode} from 'react'
//set our type to pass/use
//go hover in app.jsx and it tells us what type to set to
type CounterProps = {
    setCount: React.Dispatch<React.SetStateAction<number>>,
    children: ReactNode
}
const Counter = ({setCount, children}: CounterProps) => {
    //we don't have to do a type union below. we could leave off the null if we want to. I am leaving mine for demo purposes
    //gonna guess that we will need to use a state updating func
    //instead of count++
    //we have out h1 text content in app.tsx. so here we just have to say {children} for it to work
  return (
    <div>
        <h1>{children}</h1>
        <button onClick={() => setCount(prev => prev + 1)}>Add</button>
        <button onClick={() => setCount(prev => prev -1)}>Subtract</button>
    </div>
  )
}

export default Counter



