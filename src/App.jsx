import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

import './App.css'

function App() {

  const initialTodos = [
    {
      id: nanoid(),
      complete: false,
      name: "i'll become the pirate king"
    },
    {
      id: nanoid(),
      complete: true,
      name: "I'll become Hokage"
    },
    {
      id: nanoid(),
      complete: false,
      name: "I'll exterminate all titans"
    }
  ]



  const [todos, setTodos] = useState(initialTodos)

  const addTodoHandler = function (todo) {
    // initialTodos.push(todo)
    setTodos([todo, ...todos])
  }


  return (
    <div className="App">
      <TodoForm
        addTodoHandler={addTodoHandler}
      />
      <TodoList todos={todos} />
    </div>
  )
}

export default App