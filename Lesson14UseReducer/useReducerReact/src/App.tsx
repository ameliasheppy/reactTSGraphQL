import './App.css'
import Counter from './Counter'

function App() {

//we need to pass in a function as the child!
//so pass in the num func that recieves a num and displays the current count.
  return (
    <>
  <Counter>{(num:number)=><>Current count: {num}</>}</Counter>
    </>
  )
}

export default App

