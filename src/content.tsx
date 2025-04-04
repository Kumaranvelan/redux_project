import { GithubOutlined, OrderedListOutlined, ShrinkOutlined, TranslationOutlined } from "@ant-design/icons"
import { Button, Card, Flex, notification } from "antd"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "./store/hook";
import { toggleTheme } from "./store/themeSlice";
import { getAuth, signOut } from "firebase/auth";

export const Content:React.FC = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const theme = useAppSelector((state) => state.theme.theme);
   const routeToLanguage =() =>{
      navigate("/language")
   }

   const routeToIncrease =() =>{
      navigate("/increase")
   }
   const routeToTodo =() =>{
      navigate("/todo")
   }

   const routeToForm =() =>{
      navigate("/list")
   }

   const Logout =() =>{
      try{
      const auth = getAuth();
      signOut(auth);
      console.log("logged out")
      notification.success({
         message:"Logged out successfully",
         duration:3
      });
      navigate("/")
   } catch {
      notification.error({
         message:"Error During LoggedOut",
         duration:3
      });
   }
   }
 
   return(
      <>   
         <div style={{float:'right',padding:'20px'}} > 
     <Button onClick={Logout}>
      Logout
     </Button>
     </div>
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
        <Button onClick={() => dispatch(toggleTheme())}>
          Switch to {theme === "light" ? "Dark" : "light"} Mode
        </Button>
        </Card> 
        <Flex justify="center" align="center" gap={10}>
      <ShrinkOutlined onClick={routeToIncrease} />  
      <GithubOutlined onClick={routeToForm} />
      <TranslationOutlined onClick={routeToLanguage}/>
      <OrderedListOutlined onClick={routeToTodo} />
      
   </Flex>    
    </div>
    </>
   )
}