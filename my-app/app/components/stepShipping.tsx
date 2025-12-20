import { TruckOutlined } from "@ant-design/icons";
import { Card, Form, Input } from "antd";

const StepShipping = () => {
    return (
        <Card title="Shipping Information" icon={<TruckOutlined/>}>
            <Form layout="vertical">
                <Form.Item label="Full Name" rules={[{required:true}]}>
                    <Input placeholder="John Doe"/>
                </Form.Item>
                <Form.Item label="Address" rules={[{required:true}]}>
                    <Input placeholder="123 Main Street"/>
                </Form.Item>
                <Form.Item label="Phone" rules={[{required:true}]}>
                    <Input placeholder="+880 1XXX-XXXXXX"/>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default StepShipping;