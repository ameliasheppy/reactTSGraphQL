import Counter from './Counter'
import { CounterProvider } from './context/CounterContext'

import './App.css'

function App() {

  return (
    <>
<CounterProvider >
    <Counter>{(num:number)=><>Current count: {num}</>}</Counter>
        </CounterProvider>
      
  
    </>
  )
}

export default App
