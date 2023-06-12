//this is where we will hold our context, which will greatly 
//cut down on the complexity of the useReducer from the Lesson 14
import { ChangeEvent,  useReducer, createContext, ReactElement, useCallback, useContext } from 'react';
//lets give our initial state a type to use!
type StateType = {
    count: number, 
    text: string
}

//counter recieves the children and then does stuff with them
//we set our count to start at 1

//ts infers our initial state, but lets set it!
//we set it to an obj of 0
const initState:StateType = { count: 0, text: '' }

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
const reducer = (state: StateType, action: ReducerAction): typeof initState => {
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

//lets make a custom hook to hold all of our state and logic!
//then we can reuse this context
const useCounterContext = (initState: StateType) =>{
    const [state, dispatch] = useReducer(reducer, initState)

    //check it out, now we are dispatching these action types
    const increment = useCallback(() => dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT}), [])
    const decrement = useCallback(() => dispatch({ type:REDUCER_ACTION_TYPE.DECREMENT}), [])
    //count is a part of state, so when we use it below for our children, we need to refer it as state.count
    //we are getting the state from the useReducer hook
    const handleTextInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        //put in our func body, specify the payload
        dispatch({ type: REDUCER_ACTION_TYPE.NEW_INPUT, payload: e.target.value })
}, [])
return {state, increment, decrement, handleTextInput}
}


//instead of exporting the func, we will use it as context. 
//define stuff first!
//set type with a util type
//hover to see what makes up the type
//if we didn't use a util type, we'd have to type out the type that the hover shows!
type UseCounterContextType = ReturnType<typeof useCounterContext>

//need to pass in the init context state!
///define it. don't confuse it with the type! the init state has vals!
//notice, it is a type. so use a capital U!
const initContextState: UseCounterContextType = {
    //set the initial vals, NOT THE TYPES!!!!
    state: initState,
    //these are the init vals, NOT THE TYPE!
    increment: () => {},
    decrement: () => {},
    handleTextInput: (e: ChangeEvent<HTMLInputElement>) => {},
}

export const CounterContext = createContext<UseCounterContextType>(initContextState)
//every context needs a provider to provide the data and logic that it contains!
//this way it can provide it to the rest of the app!
//some call it a dataProvider
//anything ending in Provider is working with the context!
//our children must have a type! children can be optional
type ChildrenType = {
    children?: ReactElement | undefined
}
//look above! useCounterContext has all of the things we want to pass as vals below. 
//feed them the initState
export const CounterProvider = ({
    children
}: ChildrenType): ReactElement =>{
    return (
        <CounterContext.Provider value={useCounterContext(initState)}>
            {children}
        </CounterContext.Provider>
    )
}

//make a type to hand off info
//we can pass the data here, but a lot of other code bases have the data in a custom Hooks folder
type UseCounterHookType = {
    count: number,
    increment: () => void,
    decrement: () => void,
}

//now we need to use our counter hook as an export
export const useCounter = (): UseCounterHookType =>{
    const {state: {count}, increment, decrement } = useContext(CounterContext)
    //we will only need what applies to the counter type, nothing with the text
    return { count, increment, decrement}
}

type UseCounterTextHookType = {
    //lets make a payload example
    text: string, 
    handleTextInput: (e: ChangeEvent<HTMLInputElement>) => void,
}

export const userCounterText = (): UseCounterTextHookType => {
    const {state: {text}, handleTextInput} = useContext(CounterContext)
    return {text, handleTextInput}

}