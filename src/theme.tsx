import { Button, Card, Flex, Select } from "antd"
import { useDispatch } from "react-redux"
import { useAppSelector } from "./store/hook";
import { toggleTheme } from "./store/themeSlice";

export const ThemeSwitch =() =>{
    const dispatch = useDispatch();
     const theme = useAppSelector((state) => state.theme.theme);
    
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
        <Flex justify="center" >
      
        <Card>
        <Button onClick={() => dispatch(toggleTheme())}>
          Switch to {theme === "light" ? "Dark" : "light"} Mode
        </Button>

        </Card>
      </Flex>
      </div>
    )
}