import { Button, Card, Col, Form, Input, notification, Row, Typography, UploadFile } from "antd"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useSSR } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { auth } from "../environment/environment";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FileUpload } from "../file-upload";
import { fileUploadContactConfig } from "../file-upload/types";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";


export const Register:React.FC =() =>{

    const { Title } = Typography;
    const [form] = Form.useForm();
    const storage = getStorage();
    const navigate = useNavigate();
    const [loading,setLoading] = useState<boolean>(false);
    const [files, setFiles] = useState<UploadFile[]>([]);
    

    const handleSubmit = async () => {
        try {
         
          const values = await form.validateFields();
      setLoading(true);
          // Register user
      await createUserWithEmailAndPassword(
            auth,
            values?.email,
            values?.password
          );
      
          // Optional: Grab file metadata from `files` state
          const uploadedFiles = files.map((file) => ({
            name: file.name,
            url: file.url,
            fileName: file.fileName, // full path in Firebase Storage
            size: file.size,
            type: file.type,
          }));
      
          console.log("Uploaded Files:", uploadedFiles);
      
          notification.success({
            message: "Registered Successfully",
            duration: 3,
          });
      form.resetFields();
          navigate("/content");
        } catch (error: any) {
          notification.error({
            message: "Error During the Registration",
            description: error?.message || "Something went wrong",
            duration: 3,
          });
        } finally {
            navigate("/content");

        }
      };
      
    return(
        <>
       <Row justify="center" style={{ marginTop: 50 }}>
    <Col xs={24} sm={18} md={12} lg={10}>
      <Card
        title={<Title level={3}>Register</Title>}
        bordered={false}
        style={{ borderRadius: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ type: "email", message: "Invalid email!" }, { required: true, message: "Please enter your email" }]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmpassword"
            rules={[{ required: true, message: "Please confirm your password" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm your password" />
          </Form.Item>

          <Form.Item label="File Upload" name="file">
            <FileUpload
              fileConfig={fileUploadContactConfig}
              storage={storage}
              setNewFileInfoList={setFiles}
              oldFileInfoList={files}
            />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary" block loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Col>
  </Row>
        </>
    )
}