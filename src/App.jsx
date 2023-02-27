import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, clearTodo } from './features/todo/todoSlice';
import useLocalStorage from './hooks/useLocalStorage';
import sortArray from './utils/sort';

import TodoForm from "./features/todo/TodoForm";
import TodoList from "./features/todo/TodoList";
import SettingPanel from "./components/SettingPanel";
import useThemeUpdator from './hooks/useThemeUpdator';

import './App.css';

function App() {

  const todoData = useSelector((state) => state.todo.todos);

  const dispatch = useDispatch();
  const [getDataFromLS, , , , , clearDataLS] = useLocalStorage();

  const theme = useThemeUpdator();

  const todos = sortArray(todoData);

  const clearAllTodo = useCallback(() => {
    dispatch(clearTodo());
    clearDataLS();
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

  return (
    <div className={`app-container ${theme}`}>
      <div className='App'>
        <TodoForm />
        <TodoList todos={todos} />
        <SettingPanel
          // toggleCompletedTasks={toggleCompletedTasks}
          // todoList={todos}
          // handleDeleteTodo={handleDeleteTodo}
          clearAllTodo={clearAllTodo}
        />
      </div>
    </div>
  );
}

export default App;