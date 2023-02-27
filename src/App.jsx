import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo } from './features/todo/todoSlice';
import useLocalStorage from './hooks/useLocalStorage';
import sortArray from './utils/sort';


import TodoForm from "./features/todo/TodoForm";
import TodoList from "./features/todo/TodoList";
import SettingPanel from "./components/SettingPanel";
import useThemeUpdator from './hooks/useThemeUpdator';

import './App.css';

function App() {

  const todoDataFromStore = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  const [getDataFromLS, addDataToLS, deleteDataFromLS] = useLocalStorage();

  const dataFromLS = getDataFromLS();

  const [todos, setTodos] = useState(dataFromLS);

  console.log(dataFromLS);

  // const getTodoDataFromStorage = function () {
  //   const todoList = [];
  //   const localStorageArr = Object.values(localStorage);

  //   localStorageArr.forEach(data => {
  //     const todo = JSON.parse(data);
  //     todoList.push(todo);
  //   });

  //   todoList.sort((a, b) => (a.dateOfCreation < b.dateOfCreation) ? 1 : -1);
  //   return todoList;
  // };


  const theme = useThemeUpdator();

  const handleAddTodo = useCallback((todo) => {
    // localStorage.setItem(`${todo.id}`, JSON.stringify(todo));
    addDataToLS(todo);
    setTodos((currTodo) => [todo, ...currTodo]);
  });

  const handleDeleteTodo = useCallback((todo) => {
    // setTodos((currTodo) => currTodo.filter((item) => item.id !== todoId));
    deleteDataFromLS(todo);
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
      const data = getDataFromLS();
      setTodos(data);
    }
  });

  useEffect(() => {
    setTodos(dataFromLS);
    // dispatch(addTodo());
  }, [dataFromLS]);

  return (
    <div className={`app-container ${theme}`}>
      <div className='App'>
        <TodoForm
          handleAddTodo={handleAddTodo}
        />
        <TodoList
          todos={todos}
          handleDeleteTodo={handleDeleteTodo}
          toggleCompleteStatus={toggleCompleteStatus}
          updateTodo={updateTodo}
        />
        <SettingPanel
          toggleCompletedTasks={toggleCompletedTasks}
          todoList={todos}
          handleDeleteTodo={handleDeleteTodo}
          clearAllTodo={clearAllTodo}
        />
      </div>
    </div>
  );
}

export default App;