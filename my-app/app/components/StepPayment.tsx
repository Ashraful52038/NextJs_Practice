import { useFormContext } from "@/context/FormContext";
import { CreditCardOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";

interface StepPaymentProps{
    onNext?:()=> void;
}

const StepPayment: React.FC<StepPaymentProps> = ({onNext}) => {
    const { formData, updateFormData } = useFormContext();
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        updateFormData({
            cardNumber: values.cardNumber,
            expiryDate: values.expiryDate,
            cvv: values.cvv,
        });
        if (onNext) onNext();
    };

     // Format card number as user types
    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        
        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCardNumber(e.target.value);
        updateFormData({ cardNumber: formatted.replace(/\s/g, '') });
        form.setFieldsValue({ cardNumber: formatted });
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        updateFormData({ expiryDate: value });
        form.setFieldsValue({ expiryDate: value });
    };


    return(
        <Card title="Payment Information" icon={<CreditCardOutlined/>}>
            <Form 
            form={form}
            layout="vertical"
            initialValues={formData}
            onFinish={onFinish}
            autoComplete="off"
            >
                <Form.Item 
                label="Card Number"
                name="cardNumber"
                rules={[
                    {required:true , message: 'Please enter card number' },
                    { pattern: /^[0-9\s]{13,19}$/, message: 'Invalid card number' }
                ]}
                validateTrigger="onBlur"
                >
                    <Input 
                    placeholder="**** **** **** 3456"
                    maxLength={19}
                    onChange={handleCardNumberChange}
                    />
                </Form.Item>
                <Form.Item 
                label="Expiry Date (MM/YY)"
                name="expiryDate"
                rules={[
                    { required: true, message: 'Please enter expiry date' },
                    { pattern: /^(0[1-9]|1[0-2])\/([0-9]{2})$/, message: 'Format: MM/YY' }
                ]}
                validateTrigger="onBlur">
                    <Input 
                    placeholder="MM/YY"
                    maxLength={5}
                    onChange={handleExpiryChange}
                    />
                </Form.Item>
                <Form.Item 
                label="CVV"
                name="cvv"
                rules={[
                    { required: true, message: 'Please enter CVV' },
                    { pattern: /^[0-9]{3,4}$/, message: '3 or 4 digits required' }
                ]}
                validateTrigger="onBlur"
                >
                    <Input.Password 
                    placeholder="***"
                    maxLength={4}
                    onChange={(e) => updateFormData({ cvv: e.target.value })}
                    />
                </Form.Item>
                <Form.Item style={{ marginTop: 20 }}>
                    <Button type="primary" htmlType="submit" block>
                        Save Payment Details
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}
export default StepPayment;