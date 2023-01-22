import { useState, useEffect, useContext } from 'react'
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import SettingPanel from "./components/SettingPanel"
import { useTheme, useUpdateTheme } from './components/ThemeContext';

import './App.css'

function App() {

  const lightTheme = useTheme()
  console.log(lightTheme)

  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState('dark');

  // setTheme('light')

  const getTodoDataFromStorage = function () {
    let todoList = []
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i)
      let item = localStorage.getItem(key)
      let todo = JSON.parse(item)
      todoList.push(todo)
    }
    todoList.sort((a, b) => (a.dateOfCreation < b.dateOfCreation) ? 1 : -1);
    return todoList;
  }

  let todoData = getTodoDataFromStorage()

  useEffect(() => {
    setTodos(todoData);
  }, []);

  useEffect(() => {
    console.log("use effect calls")
    lightTheme ? setTheme('light') : setTheme('dark')
  }, [lightTheme])

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

  const clearAllTodo = function () {
    setTodos([])
  }

  const [hideCompletedTasks, setHideCompletedTasks] = useState(false)

  const toggleCompletedTasks = function () {
    setHideCompletedTasks(!hideCompletedTasks)
    if (!hideCompletedTasks) {
      let filteredTodos = todos.filter(todo => {
        return todo.isComplete === false;
      })
      setTodos(filteredTodos)
    } else {
      let todoData = getTodoDataFromStorage()
      setTodos(todoData)
    }
  }

  return (
    <div className={`app-container ${theme}`}>
      <div className='App'>
        <TodoForm
          addTodo={addTodo}
        />
        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          toggleCompleteStatus={toggleCompleteStatus}
          updateTodo={updateTodo}
        />
        <SettingPanel
          toggleCompletedTasks={toggleCompletedTasks}
          todoList={todos}
          deleteTodo={deleteTodo}
          clearAllTodo={clearAllTodo}
        />
      </div>
    </div>
  )
}

export default App