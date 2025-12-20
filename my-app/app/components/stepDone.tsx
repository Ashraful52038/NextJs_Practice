import { CheckCircleOutlined } from "@ant-design/icons";
import { Card, Typography } from "antd";

const { Title , Text} = Typography;

const StepDone=()=>{
    return(
        <Card style={{textAlign:'center'}}>
            <CheckCircleOutlined style={{fontSize: '50', color: 'green', marginBottom: '20px'}}/>
            <Title level={3}>Success!</Title>
            <Text>Your order has been placed successfully.</Text>
            <br />
            <Text type="secondary">Order ID: #{Date.now().toString().slice(-6)}</Text>
        </Card>
    );
};

export default StepDone;