import { useFormContext } from "@/context/FormContext";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Card, Descriptions, Typography } from "antd";

const { Title , Text} = Typography;

const StepDone=()=>{
    const { formData, resetFormData } = useFormContext();

    const handleReset = () => {
        resetFormData();
        window.location.reload(); // Or navigate to first step
    };

    return(
        <Card style={{textAlign:'center'}}>
            <CheckCircleOutlined style={{fontSize: '50', color: 'green', marginBottom: '20px'}}/>
            <Title level={3}>Order Confirmed!</Title>
            <Text type="secondary">Thank you for your order. Here is your submitted information:</Text>
            <br />
            <div style={{ marginTop: 30, textAlign: 'left' }}>
                <Descriptions
                column={1} 
                bordered 
                size="small"
                style={{ maxWidth: 400, margin: '0 auto' }}
                >
                    <Descriptions.Item label="Email">{formData.email || 'Not provided'}</Descriptions.Item>
                    <Descriptions.Item label="Name">{formData.name || 'Not provided'}</Descriptions.Item>
                    <Descriptions.Item label="Address">{formData.shippingAddress || 'Not provided'}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{formData.phone || 'Not provided'}</Descriptions.Item>
                    <Descriptions.Item label="Card Number">
                        {formData.cardNumber ? `**** **** **** ${formData.cardNumber.slice(-4)}` : 'Not provided'}
                    </Descriptions.Item>
                </Descriptions>
            </div>
            <div style={{ marginTop: 30 }}>
                <Button type="primary" onClick={handleReset}>
                    Start New Order
                </Button>
            </div>
            <div style={{ marginTop: 20 }}>
                <pre style={{ 
                    textAlign: 'left', 
                    background: '#f5f5f5', 
                    padding: 16, 
                    borderRadius: 4,
                    fontSize: 12,
                    maxHeight: 200,
                    overflow: 'auto'
                }}>
                    {JSON.stringify(formData, null, 2)}
                </pre>
            </div>
        </Card>
    );
};

export default StepDone;