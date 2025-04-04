import { Button, Card, Input } from "antd"
import { RootState } from "./store/store";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, toggleTodo } from "./store/todoSlice";
import { useState } from "react";
import { useAppSelector } from "./store/hook";

export const TodoList:React.FC =() =>{

    const dispatch = useDispatch();
    const [text,setText] = useState("")
    const theme = useAppSelector((state)=> state.theme.theme);

    const todo = useSelector((state: RootState) => state.todo.todos);
    const handleTodo =() =>{
        if(text.trim()) {
          dispatch(addTodo(text));
          setText("")
        }
      }

    return(
        <div  style={{
            backgroundColor: theme === "light" ? "#fff" : "black",
            color: theme === "light" ? "#000" : "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            transition: "0.3s ease-in-out",
          }}>
          <Card>
         <Input
         type="text"
          value={text}
          onChange={(e)=>setText(e.target.value)}
          placeholder="Enter the Todo"
         />
         <Button onClick={handleTodo}> Add Todo </Button>
         <ul>
        {todo.map((todo:any) => (
          <li key={todo.id}>
            <span
              onClick={() => dispatch(toggleTodo(todo.id))}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch(deleteTodo(todo.id))}>❌</button>
          </li>
        ))}
      </ul>
        </Card>
        </div>
    )
}