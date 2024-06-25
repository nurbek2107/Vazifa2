import { Button, Input, Checkbox } from "@material-tailwind/react";
import "./App.css";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  removeTodo,
  changeStatusTodo,
  allDeleteTodo,
} from "./features/todoSlice";

export default function Example() {
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const { todos, completedCount, unCompletedCount } = useSelector(
    (state) => state.todos
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const usernameValue = usernameRef.current.value.trim();
    const emailValue = emailRef.current.value.trim();
    const phoneValue = phoneRef.current.value.trim();

    if (usernameValue && emailValue && phoneValue) {
      dispatch(
        addTodo({
          id: Math.random(),
          text: usernameValue,
          phone: phoneValue,
          email:emailValue,
          completed: false,
        })
      );
      toast.success("Added successfully");

      // Clear input fields
      usernameRef.current.value = "";
      emailRef.current.value = "";
      phoneRef.current.value = "";
    } else {
      toast.error("Please enter all fields.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-8">Todo List - {todos.length}</h1>
      <div className="flex gap-10 items-start">
        <div className="w-[515px]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input inputRef={usernameRef} label="Username" />
            <Input inputRef={emailRef} label="Email" type="email" />
            <Input inputRef={phoneRef} label="Phone" type="tel" />

            <Button type="submit">Add Todo</Button>
          </form>
          <div className="flex items-center gap-2 mt-5">
            <h4>Completed: {completedCount}</h4>
            <h4>Uncompleted: {unCompletedCount}</h4>
            <Button onClick={() => dispatch(allDeleteTodo())}>
              Delete all
            </Button>
          </div>
        </div>

        <div className="-mt-4  w-full">
          {todos.map((todo, index) => (
            <div
              key={todo.id}
              className={`flex items-center justify-between gap-10 mt-4 border-2 p-2 rounded cursor-pointer transition ease-in-out delay-150 ${
                todo.completed ? "completed" : ""
              }`}
            >
              <h1>{index + 1}</h1>
              <h4>{todo.text}</h4>
              <h4>{todo.email}</h4>
              <h4>{todo.phone}</h4>
              <div className="flex items-center gap-5">
                <Checkbox
                  onClick={() => dispatch(changeStatusTodo(todo.id))}
                  checked={todo.completed}
                  ripple={false}
                  readOnly
                  className="h-5 w-5 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                />
                <Button onClick={() => dispatch(removeTodo(todo.id))}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
