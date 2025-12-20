import { UserOutlined } from "@ant-design/icons";
import { Card, Form, Input } from "antd";

const StepLogin = () => {
    return (
        <Card title="Login" icon={<UserOutlined/>}>
            <Form layout="vertical">
                <Form.Item label="Email" name="email" rules={[{required:true, type:"email"}]}>
                    <Input placeholder="email@example.com"/>
                </Form.Item>
                <Form.Item label="password" name="password" rules={[{required:true}]}>
                    <Input.Password placeholder="password"/>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default StepLogin;