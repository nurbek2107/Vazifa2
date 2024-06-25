import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialStateFromLocal = () => {
    const storedState = JSON.parse(localStorage.getItem("todos"));
    if (storedState) {
        return storedState;
    } else {
        return {
            todos: [],
            completedCount: 0,
            unCompletedCount: 0,
        };
    }
};

const todosSlice = createSlice({
    name: "todos",
    initialState: initialStateFromLocal(),
    reducers: {
        addTodo: (state, { payload }) => {
            state.todos.push(payload);
            todosSlice.caseReducers.calculateTotal(state);
            localStorage.setItem("todos", JSON.stringify(state));
            toast.success("Todo added successfully!");
        },
        removeTodo: (state, { payload }) => {
            state.todos = state.todos.filter(todo => todo.id !== payload);
            todosSlice.caseReducers.calculateTotal(state);
            localStorage.setItem("todos", JSON.stringify(state));
            toast.success("Todo deleted!");
        },
        changeStatusTodo: (state, { payload }) => {
            const todo = state.todos.find(todo => todo.id === payload);
            if (todo) {
                todo.completed = !todo.completed;
                todosSlice.caseReducers.calculateTotal(state);
                localStorage.setItem("todos", JSON.stringify(state));
                toast.success("Todo status updated!");
            }
        },
        allDeleteTodo: (state) => {
            state.todos = [];
            state.completedCount = 0;
            state.unCompletedCount = 0;
            localStorage.removeItem("todos");
            toast.success("All todos deleted!");
        },
        calculateTotal: (state) => {
            state.completedCount = state.todos.filter(todo => todo.completed).length;
            state.unCompletedCount = state.todos.filter(todo => !todo.completed).length;
        },
    },
});

export const { addTodo, removeTodo, changeStatusTodo, allDeleteTodo } = todosSlice.actions;

export default todosSlice.reducer;
