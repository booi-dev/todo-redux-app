import { useState, useCallback } from 'react';

import useTodoControls from './app/todoControls';
import useThemeControls from './app/themeControls';

import { getDataFromLS } from './utils/localStorage';
import sortArray from './utils/sort';

import TodoForm from "./features/todo/TodoForm";
import TodoList from "./features/todo/TodoList";
import SettingPanel from "./components/SettingPanel";

import './App.css';

function App() {

  const { todoData, resetTodo } = useTodoControls();
  const { theme } = useThemeControls();

  const todos = sortArray(todoData);

  const [hideCompletedTasks, setHideCompletedTasks] = useState(false);

  const toggleFilter = useCallback(() => {
    setHideCompletedTasks(!hideCompletedTasks);
    if (!hideCompletedTasks) {
      const filteredTodos = getDataFromLS().filter(todo => todo.isComplete === false);
      resetTodo(filteredTodos);
    } else {
      const data = getDataFromLS();
      resetTodo(data);
    }
  });

  return (
    <div className={`app-container ${theme}`}>
      <div className='App'>
        <TodoForm />
        <SettingPanel toggleFilter={toggleFilter} />
        <TodoList todos={todos} />
      </div>
    </div>
  );
}

export default App;