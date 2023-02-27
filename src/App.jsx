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

  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  console.log(todos);

  const [getDataFromLS, addDataToLS, deleteDataFromLS] = useLocalStorage();

  const theme = useThemeUpdator();

  // const [todos, setTodos] = useState(todoData);

  const handleAddTodo = useCallback((todo) => {
    addDataToLS(todo);
    dispatch(addTodo(todo));
  });

  const handleDeleteTodo = useCallback((todo) => {
    deleteDataFromLS(todo);
    dispatch(deleteTodo(todo));
  });

  const toggleCompleteStatus = useCallback((todoId) => {
    // setTodos(
    //   todos.map(todo => {
    //     if (todo.id === todoId) {
    //       const updatedTodo = { ...todo, isComplete: !todo.isComplete };
    //       localStorage.setItem(todoId, JSON.stringify(updatedTodo));
    //       return updatedTodo;
    //     }
    //     return todo;
    //   })
    // );
  });

  const updateTodo = useCallback((updatedTodo) => {
    // setTodos(
    //   todos.map(todo => {
    //     if (todo.id === updatedTodo.id) {
    //       localStorage.setItem(todo.id, JSON.stringify(updatedTodo));
    //       return updatedTodo;
    //     }
    //     return todo;
    //   })
    // );
  });

  const clearAllTodo = useCallback(() => {
    // setTodos([]);
  });

  const [hideCompletedTasks, setHideCompletedTasks] = useState(false);

  const toggleCompletedTasks = useCallback(() => {
    setHideCompletedTasks(!hideCompletedTasks);
    if (!hideCompletedTasks) {
      const filteredTodos = todos.filter(todo => todo.isComplete === false);
      // setTodos(filteredTodos);
    } else {
      const data = getDataFromLS();
      // setTodos(data);
    }
  });

  useEffect(() => {


  }, []);

  return (
    <div className={`app-container ${theme}`}>
      <div className='App'>
        <TodoForm
          handleAddTodo={handleAddTodo}
        />
        <TodoList
          todos={todos}
          handleDeleteTodo={handleDeleteTodo}
          // toggleCompleteStatus={toggleCompleteStatus}
          updateTodo={updateTodo}
        />
        <SettingPanel
          // toggleCompletedTasks={toggleCompletedTasks}
          todoList={todos}
        // handleDeleteTodo={handleDeleteTodo}
        // clearAllTodo={clearAllTodo}
        />
      </div>
    </div>
  );
}

export default App;