import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

import './App.css'

const LOCAL_STORAGE_KEY = "boma_todo_data";

function App() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let todoList = []
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i)
      let item = localStorage.getItem(key)
      let todo = JSON.parse(item)
      todoList.push(todo)
    }
    todoList.sort((a, b) => (a.dateOfCreation < b.dateOfCreation) ? 1 : -1);
    setTodos(todoList)
  }, []);

  const addTodoHandler = function (todo) {
    localStorage.setItem(`${todo.id}`, JSON.stringify(todo))
    setTodos([todo, ...todos]);
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