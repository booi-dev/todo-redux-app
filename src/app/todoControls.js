import { useSelector, useDispatch } from 'react-redux';
import { reset, add, update, remove, toggleComplete } from '../features/todo/todoSlice';

function useTodoControls() {
    const todoData = useSelector((state) => state.todoStore.todos);
    const dispatch = useDispatch();

    const addTodo = (t) => {
        console.log('add store', t);
        dispatch(add(t));
    };

    const updateTodo = (t) => {
        console.log('update store', t);
        dispatch(update(t));
    };

    const deleteTodo = (t) => {
        console.log('delete store', t);
        dispatch(remove(t));
    };

    const resetTodo = (t = []) => {
        console.log('reseting store');
        dispatch(reset(t));
    };

    const switchComplete = (t) => {
        console.log('toggle store', t);
        dispatch(toggleComplete(t));
    };

    return {
        todoData,
        addTodo,
        updateTodo,
        deleteTodo,
        resetTodo,
        switchComplete
    };

}

export default useTodoControls;