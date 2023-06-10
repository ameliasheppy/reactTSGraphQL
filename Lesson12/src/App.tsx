import Heading from "./components/Heading";
//destruc section!
import {Section} from "./components/Section"
import Counter from "./components/Counter";
import {useState} from 'react'
import List from "./components/List";
//learn basics of React and get wild!
//

function App() {
//Section needs props/children! title is props, but a default is set, so let's see if that works. remember, children goes in between the tags!!!!
    const [count, setCount] = useState<number>(1)
    //below we are using Count is..as children
  return (
    <><Heading title={"Hello world! Let's pass this as a prop!"} />
    <Counter setCount={setCount}>Count is {count}</Counter>
    <Section>This is my section, which may be children somehow, IDK yet.........</Section>
    <Section title="Gonna do a title here instead of the default">Hey, Section 2 is here!</Section>
    <List items={["Coffee", "Tacos", "Code"]} render={(item:string) => <span className="bold">{item}</span>}/>
    </>
  )
}

export default App
