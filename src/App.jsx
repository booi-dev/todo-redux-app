import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { replaceTodo } from './features/todo/todoSlice';
import { getDataFromLS } from './utils/localStorage';
import sortArray from './utils/sort';

import useThemeControl from './app/themeControl';

import TodoForm from "./features/todo/TodoForm";
import TodoList from "./features/todo/TodoList";
import SettingPanel from "./components/SettingPanel";

import './App.css';

function App() {

  const todoData = useSelector((state) => state.todoStore.todos);
  const dispatch = useDispatch();

  const todos = sortArray(todoData);

  const [theme] = useThemeControl();

  const [hideCompletedTasks, setHideCompletedTasks] = useState(false);

  const toggleFilter = useCallback(() => {
    setHideCompletedTasks(!hideCompletedTasks);
    if (!hideCompletedTasks) {
      const filteredTodos = getDataFromLS().filter(todo => todo.isComplete === false);
      dispatch(replaceTodo(filteredTodos));
    } else {
      const data = getDataFromLS();
      dispatch(replaceTodo(data));
    }
  });

  return (
    <div className={`app-container ${theme}`}>
      <div className='App'>
        <TodoForm />
        <TodoList todos={todos} />
        <SettingPanel toggleFilter={toggleFilter} />
      </div>
    </div>
  );
}

export default App;