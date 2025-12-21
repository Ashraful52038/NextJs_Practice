import { CreditCardOutlined } from "@ant-design/icons";
import { Card, Form, Input } from "antd";

const StepPayment = () => {
    return(
        <Card title="Payment Information" icon={<CreditCardOutlined/>}>
            <Form layout="vertical">
                <Form.Item label="Card Number" rules={[{required:true}]}>
                    <Input placeholder="**** **** **** 3456"/>
                </Form.Item>
                <Form.Item label="Expiry Date" >
                    <Input placeholder="MM/YY"/>
                </Form.Item>
                <Form.Item label="CVV" >
                    <Input placeholder="***"/>
                </Form.Item>
            </Form>
        </Card>
    )
}
export default StepPayment;