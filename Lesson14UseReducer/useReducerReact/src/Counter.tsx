// import { ReactNode, useState } from 'react';

// //define our children type. 
// //it takes in a num and then returns a ReactNode
// type ChildrenType = {
//     children: (num: number) => ReactNode
// }

// //counter recieves the children and then does stuff with them
// //we set our count to start at 1

// const Counter = ({ children }: ChildrenType) =>{
//     const [count, setCount] = useState<number>(1)

//     const increment = () => setCount(prev => prev + 1)
//     const decrement = () => setCount(prev => prev -1)

//     return(
//         <>
//         <h1>{children(count)}</h1>
//         <div>
//             <button onClick={increment}>+</button>
//             <button onClick={decrement}>-</button>
//         </div>
//         </>
//     )
// }

// export default Counter

//                  LET'S REFACTOR!!!!!
//useState is often used instead of useReducer bc it is easy to use
//But useReducer is powerful, and can help us learn how to manage global state and work with vars for it
import { ChangeEvent, ReactNode, useReducer } from 'react';

//counter recieves the children and then does stuff with them
//we set our count to start at 1

//ts infers our initial state, but lets set it!
//we set it to an obj of 0
const initState = { count: 0, text: '' }

//now lets use an enum here. we could just set it to a str literal with the prop name/val, but let's do this for learning purposes
//check it out, an enum does not have an equal sign
const enum REDUCER_ACTION_TYPE {
    INCREMENT,
    DECREMENT,
    NEW_INPUT,
}
//now let's make a type that will set our reducer action
type ReducerAction = {
    type: REDUCER_ACTION_TYPE,
    payload?: string,
}

//set the state of the reducer to the initState
//a reducer func pretty much holds a giant switch statement
const reducer = (state: typeof initState, action: ReducerAction): typeof initState => {
    switch (action.type){
        case REDUCER_ACTION_TYPE.INCREMENT:
            return {...state, count: state.count + 1}
        case REDUCER_ACTION_TYPE.DECREMENT:
            return {...state, count: state.count - 1}
        case REDUCER_ACTION_TYPE.NEW_INPUT:
            //below we can add a null coalescing operator after the payload to handle if nothing is there
            return {...state, text: action.payload ?? ''}
        default:
            throw new Error("You have a error, nerd!")
    }
}


//define our children type. 
//it takes in a num and then returns a ReactNode
//put it right before the comp and now we're ready to pull use Reducer into the comp instead of useState
type ChildrenType = {
    children: (num: number) => ReactNode
}


const Counter = ({ children }: ChildrenType) =>{
    // const [count, setCount] = useState<number>(1)
    const [state, dispatch] = useReducer(reducer, initState)

    //check it out, now we are dispatching these action types
    const increment = () => dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT})
    const decrement = () => dispatch({ type:REDUCER_ACTION_TYPE.DECREMENT})
//count is a part of state, so when we use it below for our children, we need to refer it as state.count
//we are getting the state from the useReducer hook
    const handleTextInput = (e: ChangeEvent<HTMLInputElement>) => {
        //put in our func body, specify the payload
        dispatch({ type: REDUCER_ACTION_TYPE.NEW_INPUT, payload: e.target.value })
    }
    return(
        <>
        <h1>{children(state.count)}</h1>
        <div>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
        <input type='text' onChange={handleTextInput}/>
        <h2>{state.text}</h2>
        </>
    )
}

export default Counter