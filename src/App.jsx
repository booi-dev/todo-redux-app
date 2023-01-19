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

  const addTodo = function (todo) {
    localStorage.setItem(`${todo.id}`, JSON.stringify(todo))
    setTodos((currTodo) => [todo, ...currTodo]);
  }

  const deleteTodo = function (todoId) {
    setTodos((currTodo) => currTodo.filter((item) => item.id != todoId));
    localStorage.removeItem(todoId)
  }

  const toggleCompleteStatus = function (todoId) {
    setTodos(
      todos.map(todo => {
        if (todo.id === todoId) {
          let updatedTodo = { ...todo, isComplete: !todo.isComplete }
          localStorage.setItem(todoId, JSON.stringify(updatedTodo))
          return updatedTodo;
        }
        return todo;
      })
    );
  }

  const updateTodo = function (updatedTodo) {
    setTodos(
      todos.map(todo => {
        if (todo.id === updatedTodo.id) {
          localStorage.setItem(todo.id, JSON.stringify(updatedTodo))
          return updatedTodo;
        }
        return todo;
      })
    );
  }

  return (
    <div className="App">
      <TodoForm
        addTodo={addTodo}
      />
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        toggleCompleteStatus={toggleCompleteStatus}
        updateTodo={updateTodo}
      />
    </div>
  )
}

export default App