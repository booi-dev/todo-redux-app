import { useState, useEffect, useCallback } from 'react';
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import SettingPanel from "./components/SettingPanel";
import useThemeUpdator from './hooks/useThemeUpdator';

import './App.css';

function App() {

  const [todos, setTodos] = useState([]);

  const getTodoDataFromStorage = function () {
    const todoList = [];
    const localStorageArr = Object.values(localStorage);
    localStorageArr.forEach(data => {
      const todo = JSON.parse(data);
      todoList.push(todo);
    });

    todoList.sort((a, b) => (a.dateOfCreation < b.dateOfCreation) ? 1 : -1);
    return todoList;
  };

  const todoData = getTodoDataFromStorage();

  useEffect(() => {
    setTodos(todoData);
  }, []);

  const theme = useThemeUpdator();

  const addTodo = useCallback((todo) => {
    localStorage.setItem(`${todo.id}`, JSON.stringify(todo));
    setTodos((currTodo) => [todo, ...currTodo]);
  });

  const deleteTodo = useCallback((todoId) => {
    setTodos((currTodo) => currTodo.filter((item) => item.id !== todoId));
    localStorage.removeItem(todoId);
  });

  const toggleCompleteStatus = useCallback((todoId) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === todoId) {
          const updatedTodo = { ...todo, isComplete: !todo.isComplete };
          localStorage.setItem(todoId, JSON.stringify(updatedTodo));
          return updatedTodo;
        }
        return todo;
      })
    );
  });

  const updateTodo = useCallback((updatedTodo) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === updatedTodo.id) {
          localStorage.setItem(todo.id, JSON.stringify(updatedTodo));
          return updatedTodo;
        }
        return todo;
      })
    );
  });

  const clearAllTodo = useCallback(() => {
    setTodos([]);
  });

  const [hideCompletedTasks, setHideCompletedTasks] = useState(false);

  const toggleCompletedTasks = useCallback(() => {
    setHideCompletedTasks(!hideCompletedTasks);
    if (!hideCompletedTasks) {
      const filteredTodos = todos.filter(todo => todo.isComplete === false);
      setTodos(filteredTodos);
    } else {
      const data = getTodoDataFromStorage();
      setTodos(data);
    }
  });

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
  );
}

export default App;