import { Button, Form, Input, message } from "antd"
import { useState } from "react";
import { supabase } from "../supabase";

export const RegisterNo:React.FC =() =>{
    const [form] = Form.useForm();
    const [file, setFile] = useState<File | null>(null);
    
    const handleSubmit = async (values: any) => {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        });
      
        if (authError) {
          message.error('Auth sign-up failed.');
          return;
        }
      
        const userId = authData.user?.id;
      
        if (file) {
          await supabase.storage
            .from('mybucket')
            .upload(`uploads/${file.name}`, file);
        }
      
        await supabase.from('profiles').insert([
          {
            id: userId,
            name: values.name,
            file_path: file ? file.name : null,
          },
        ]);
      
        message.success('Account created successfully!');
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
                <Input/>
            </Form.Item>
           <Button htmlType="submit" type="primary">Submit</Button>

        </Form>
        </>
    )
}