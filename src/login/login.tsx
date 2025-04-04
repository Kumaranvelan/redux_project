import { Button, Card, Form, Input, notification } from "antd";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../environment/environment";
import { useNavigate } from "react-router-dom";

export const Login:React.FC =() => {

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

const handleSubmit =async() =>{
  try {
    setLoading(true);
    const values = await form.validateFields();
    signInWithEmailAndPassword(auth,values?.email,values?.password);
   console.log("LoggedIn Successfully");
   navigate('/content')
  } catch (error) {
    notification.error({
      message:"Error during the login",
      duration:3
    });
  } finally{
    notification.success({
      message:"LoggedIn Successfully",
      duration:3
    });
    form.resetFields();
    setLoading(false);
  }
}

    return(
      <div 
      style={{
        height:"100vh",
        display: "flex",
        justifyContent: "center",
        alignItems:'center',
        backgroundColor: "#f0f2f5", 
        backgroundImage: `url(${require("../assets/images/login.jpg")})`, // ✅ Use require for local image
        backgroundSize: "cover", // ✅ Ensures the image covers the full background
        backgroundPosition: "center", // ✅ Centers the image
      }}
      >  
        <Card style={{width:'400px',padding:'20px'}} >
          <Form form={form} onFinish={handleSubmit} >
            <Form.Item label="Email" name="email">
               <Input/>
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input/>
            </Form.Item>
            <Button htmlType="submit" type="primary" >Submit</Button>
          </Form>
        </Card>
        </div>
    )
}