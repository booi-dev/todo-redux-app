import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import sortArray from './utils/sort';
import TodoForm from "./features/todo/TodoForm";
import TodoList from "./features/todo/TodoList";
import SettingPanel from "./components/SettingPanel";
import useThemeUpdator from './hooks/useThemeUpdator';

import './App.css';

function App() {

  const todoData = useSelector((state) => state.todo.todos);

  const theme = useThemeUpdator();

  const todos = sortArray(todoData);

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
        />
      </div>
    </div>
  );
}

export default App;