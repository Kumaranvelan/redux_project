import { Button, Form, Input, notification, UploadFile } from "antd"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useSSR } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { auth } from "../environment/environment";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FileUpload } from "../file-upload";
import { fileUploadContactConfig } from "../file-upload/types";


export const Register:React.FC =() =>{

    const [form] = Form.useForm();
    const storage = getStorage();
    const navigate = useNavigate();
    const [loading,setLoading] = useState<boolean>(false);
    const [files, setFiles] = useState<UploadFile[]>([]);
    

    const handleSubmit = async () => {
        try {
          setLoading(true);
          const values = await form.validateFields();
      
          // Register user
          const userCredential = await createUserWithEmailAndPassword(
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
      
          // You could now send `uploadedFiles` to Firestore or your backend for saving
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
          form.resetFields();
          setFiles([]);
          setLoading(false);
        }
      };
      
    return(
        <>
        <Form form={form} onFinish={handleSubmit}>
            <Form.Item label="Name" name="name">
                <Input/>
            </Form.Item>
            <Form.Item label="Email" name="email">
                <Input/>
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input/>
            </Form.Item>
            <Form.Item label="Confirm Password" name="confirmpassword">
                <Input/>
            </Form.Item>
            <Form.Item label="File Upload" name="file">
                <FileUpload
                      fileConfig={fileUploadContactConfig}
                        storage={storage}
                        setNewFileInfoList={setFiles}
                        oldFileInfoList={files}
                />
            </Form.Item>
            <Button htmlType="submit" type="primary" >Submit</Button>

        </Form>
        </>
    )
}