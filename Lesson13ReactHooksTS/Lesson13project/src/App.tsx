import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import './App.css'

//declare it with an interface
interface User{
  id:number,
  username:string
}

function App() {
  //ts uses inference to know that a count will be a num, but we can
  //be explicit and say YES it is a num! 
  //If we have to wait on data, we can warn TS and say "this may be null also"
const [count, setCount] = useState<number>(0)
//now lets set it to use a User from our interface
//it will be an array
//but our array may be null, so set it to null as a possibility
const [users,SetUsers] = useState<User[] | null>(null)

//now lets work with a useRef:
//dont need for it to be a union type for null/HTML bc we can use an assertion with ! or a type guard. lets use a type guard
const inputRef = useRef<HTMLInputElement>(null)
//below, lets use some optional chaining!
//this will check to see if something exists and then use it if it does
console.log(inputRef?.current)
console.log(inputRef?.current?.value)
//changing the val of our inputRef will not cause a re-render of the comp
//but when the comp does re-render, like if we click on the button to addTwo, it will cause a re-render and it will log our current to the CL



// const [count, setCount] = useState<number | null>(0)
//we can set the below to an asssertion and pass in an obj
//this is lying to the compiler and saying YOU ARE GETTING A USER FOR SURE!
//if you do this,make sure that the data will load immediately so that TS doesn't error bc it didn't get what you promised
// const [count, setCount] = ussState<User>({} as User)
//could set state to our interface
// const [count, setCount] = useState<User>

//useEffect takes a func and a dep arr
//useEffect doesn't really return a val, it deals with side effects. 
//same with useLayoutEffect
//useEffect will run when the comp mounts
//when using strict mode in dev mode, it will mount twice
//with useEffect, don't forget to add a cleanup function!
//again, what is useEffect for? it is for when we will have a side effect, 
//something that will happen
//a CL is always a SE
//if the user state changes, let's CL something <--a useEffect!
//put users in the dep arr
//thus the useEffect depends on the users, and if the user state changes, then React will call this useEffect
//no TS to apply bc not returning a val! Just making a SE
useEffect(() =>{
console.log('mounting...., will see twice')
console.log('Users: ', users)
return () => console.log("unmounting! will see once!")
}, [users])
//lets use a useCallBack, this will memoize a func so that it's not always recreated.
//hover and you can see that this returns void
//when setting our e to a MouseEvent, we need to specify what type of MouseEvent we are watching for!
//TS loves a specific event. since a submit can also happen with the enter key,
//set the event to a union of HTML...and KeyBoard
//we could pass this into useCallBack as an arg, but it's weird
//e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
const addTwo = useCallback((): void => setCount(prev=> prev + 2), [])

//lets also useMemo here in our app 
//remember useMemo can be though of as calculateExpensiveValues
//useMemo is helpful to manage calcs that would cost a lot, might hold up the whole comp to get the val
//lets do it for the fibo seq
type fibFunc = (n:number) => number

const fib: fibFunc = (n) => {
  if(n < 2) return n
  return fib(n-1) + (n-2)
}
//choose a high num so it takes a minute!
const myNum: number = 22

//pass in dep arr as myNum. That way, if myNum changes, it will use the new num. otherwise it will use the memoized version that's avail
const result = useMemo<number>(() => fib(myNum), [myNum])

//
  return (
    <>
    <h1>{count}</h1>
    <button onClick={addTwo}>Add</button>
    <h2>{result}</h2>
    <input type='text' ref={inputRef}/>
    </>
  )
}

export default App
