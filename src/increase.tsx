import { Button, Flex } from "antd";
import { useAppSelector } from "./store/hook"
import { useDispatch } from "react-redux";
import { decreament, increament } from "./store/counter.slice";

export const Increment:React.FC =() => {
    const dispatch = useDispatch();
    const count = useAppSelector((state)  => state.counter.value);
    const theme = useAppSelector((state)=> state.theme.theme);
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
        <Flex justify="center" gap={10}>   
        <Button  aria-label="Decrement value" onClick={()=>dispatch(increament())} >Increase</Button>
        <span>{count}</span>
        <Button  aria-label="Decrement value" onClick={()=> dispatch(decreament())} >Decrease </Button>
        </Flex>
        </div>
    )
}