import { CaretLeftOutlined, CarryOutOutlined, GithubOutlined, OrderedListOutlined, ProductOutlined, ShrinkOutlined, TranslationOutlined } from "@ant-design/icons"
import { Button, Card, Flex, Modal, notification, Row } from "antd"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "./store/hook";
import { toggleTheme } from "./store/themeSlice";
import { getAuth, signOut } from "firebase/auth";
import { clearSession } from "./store/session";
import { useState } from "react";

export const Content:React.FC = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const theme = useAppSelector((state) => state.theme.theme);
   const [openModal,setOpenModal] = useState(false);

   const handleOpen = () => {
      setOpenModal(true);
   }

   const handleCancel = () =>{
      setOpenModal(false);
   }

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

   const routeToCart =() =>{
      navigate("/cart-management/integrate")
   }


   const Logout =() =>{
      try{
      const auth = getAuth();
      signOut(auth);
      dispatch(clearSession());
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
      <nav
      style={{
         display:'flex',
         justifyContent:"space-between",
         alignItems:"center",
         padding:"20px",
         backgroundColor:theme === "light" ? "#f5f5f5" : "#1f1f1f",
         color: theme === "light" ? "#000" : "#fff",
      }}
      >
         <Card style={{margin:0}} >
           <Button onClick={() => dispatch(toggleTheme())}>
            Switch to {theme === "light" ? " Dark" : "Light"}Mode
           </Button>
         </Card>
         <Flex justify="center" align="center" gap={60}>
             <ShrinkOutlined style={{fontSize:20}} onClick={routeToIncrease}/>
             <GithubOutlined style={{fontSize:20}} onClick={routeToForm}/>
             <TranslationOutlined style={{fontSize:20}} onClick={routeToLanguage}/>
             <OrderedListOutlined style={{fontSize:20}} onClick={routeToTodo}/>
             <CarryOutOutlined style={{fontSize:20 }} onClick={routeToCart} />
         </Flex>
         <Button danger onClick={handleOpen}>
            Logout
         </Button>
      </nav>
      <div 
      style={{
         backgroundColor: theme === "light" ? "#fff":"#000",
         color:theme === "light" ? "#000" : "#fff",
         display:"flex",
         justifyContent:"center",
         alignItems:"center",
         height:"calc(100vh - 80px)",
         transition:"0.3s ease-in-out"
      }}
      >
         <h2>Welcome to Dashboard</h2>
      </div>
      <Modal open={openModal} footer={null}>
         Are You Sure ?
         <Row gutter={[16,32]}>  
         <Button onClick={Logout} >Yes</Button>
         <Button onClick={handleCancel} >No</Button>
         </Row>
      </Modal>
    </>
   )
}