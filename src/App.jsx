import TodoInput from "./TodoInput";
import Todos from "./Todos";

import './App.css'

function App() {

  const initialTodos = [
    {
      id: 1,
      complete: false,
      name: "i'll become the pirate king"
    },
    {
      id: 2,
      complete: true,
      name: "I'll become Hokage"
    },
    {
      id: 3,
      complete: false,
      name: "I'll exterminate all titans"
    }
  ]

  return (
    <div className="App">
      <TodoInput />
      <Todos initialTodos={initialTodos} />
    </div>
  )
}

export default App