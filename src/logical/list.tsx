import { CheckOutlined, CloseOutlined, DeleteOutlined, FileDoneOutlined, FileExcelOutlined } from "@ant-design/icons";
import { Form, Input, Select, Button, Table, message } from "antd"
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import { useEffect, useState } from "react"
import { FormProps } from "react-router-dom";

interface Formprops {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    gender: string;
    Profilepriority: string;
    Profilestatus: string;
}

export const ListPage: React.FC = () => {
    const [form] = Form.useForm();
    const port = "http://localhost:3000/api/user"
    const [formData, setFormData] = useState<Formprops[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [editingUser,setEditingUsers ] = useState<Formprops | null>(null);


    const columns: ColumnsType<Formprops> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Mobile",
            dataIndex: "mobile",
            key: "mobile",
        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",
            render:(text) => {
                if(text === "MALE"){
                    return <span style={{color:"springgreen"}} >Male</span>
                } else if (text === "FEMALE") {
                    return <span style={{color:"blue"}}>Female </span>
                }
            }
        },
        {
            title: "Profile Priority",
            dataIndex: "Profilepriority",
            key: "Profilepriority",
            render:(text) => {
                if(text === "HIGH") {
                    return <span style={{color:"red"}} >High</span>
                } else if(text === "LOW") {
                    return <span style={{color:"teal"}}>Low </span>
                }
            }
        },
        {
            title: "Profile Status",
            dataIndex: "Profilestatus",
            key: "Profilestatus",
            render:(text) =>{
                if(text === "COMPLETE") {
                    return<span> <FileDoneOutlined /> {" "} Complete</span>
                } else if(text === "INCOMPLETE") {
                    return <span> <FileExcelOutlined /> {" "} Incomplete</span>
                }
            }
        },
        {
            title: "Action",
            render:(_,record) =>
               <>
                 <Button 
                type="link" 
                onClick={() => handleEdit(record)}
            >
                Edit
            </Button>
               <DeleteOutlined onClick={()=>handleDelete(record._id)} />
               </>
            
        }
    ];

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${port}`);
            setFormData(data);
        } catch (error) {
            message.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);
    
    const handleEdit =(user:Formprops) =>{
        setEditingUsers(user);
        form.setFieldsValue(user);
    }

    const onFinish = async (values: Formprops) => {
        try {
            if (editingUser) {
                // Update existing user
                const { data } = await axios.put(`${port}/${editingUser._id}`, values);
                setFormData((prevData) =>
                    prevData.map(user => (user._id === editingUser._id ? data.user : user))
                );
                message.success("User updated successfully!");
            } else {
                // Create new user
                const { data } = await axios.post(`${port}`, values);
                setFormData([...formData, data.user]);
                message.success("User added successfully!");
            }
            
            form.resetFields();
            setEditingUsers(null); // Reset editing state after submission
    
        } catch (error :any) {
            message.error("Error during user creation/update", error);
        }
    };
    

    const handleDelete = async (id:string) => {
        console.log(id,"deletion ID")
        try{
            await axios.delete(`http://localhost:3000/api/user/${id}`)
            setFormData(formData.filter(user=> user._id !== id))
            message.success("User deleted successfully")
        } catch (error:any) {
            message.error("error during the delete of UserData")
        }
    }

    return (
        <>
            <Form onFinish={onFinish} form={form} >
                <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter your name" }]}>
                    <Input placeholder="Enter Your Name" />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email" }]}>
                    <Input placeholder="Enter Your Email" />
                </Form.Item>
                <Form.Item label="Mobile" name="mobile" rules={[{ required: true, message: "Please enter your mobile number" }]}>
                    <Input placeholder="Enter Your Mobile Number" />
                </Form.Item>
                <Form.Item label="Gender" name="gender" rules={[{ required: true, message: "Please select your gender" }]}>
                    <Select>
                        <Select.Option value="MALE">Male</Select.Option>
                        <Select.Option value="FEMALE">Female</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Profile Priority" name="Profilepriority" rules={[{ required: true, message: "Please select profile priority" }]}>
                    <Select>
                        <Select.Option value="HIGH">High</Select.Option>
                        <Select.Option value="LOW">Low</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Profile Status" name="Profilestatus" rules={[{ required: true, message: "Please select profile status" }]}>
                    <Select>
                        <Select.Option value="COMPLETE">Complete</Select.Option>
                        <Select.Option value="INCOMPLETE">Incomplete</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                    {editingUser ? "Update" : "Submit"}
                    </Button>
                </Form.Item>
            </Form>

            <Table dataSource={formData} columns={columns} loading={loading} rowKey="_id" />
        </>
    );
}
