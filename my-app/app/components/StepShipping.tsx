'use client';

import { useFormContext } from "@/context/FormContext";
import { TruckOutlined } from "@ant-design/icons";
import { Card, Form, Input } from "antd";

interface StepShippingProps{
    onNext?:()=>void;
}

const StepShipping:React.FC<StepShippingProps>= ({onNext}) => {
    const { formData, updateFormData } = useFormContext();
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        updateFormData({
            name: values.name,
            shippingAddress: values.address,
            phone: values.phone,
        });
        if (onNext) onNext();
    };
    
    return (
        <Card title="Shipping Information" icon={<TruckOutlined/>}>
            <Form 
                layout="vertical"
                form={form}
                initialValues={formData}
                onFinish={onFinish}
            >
                <Form.Item 
                label="Full Name"
                name="name"  
                rules={[{required:true , message: 'Please enter your full name'}]}
                >
                    <Input 
                    placeholder="John Doe" value={formData.name}
                    onChange={(e) => updateFormData({ name: e.target.value })}
                    />
                </Form.Item>
                <Form.Item 
                label="Address" name="address" 
                rules={[{required:true,message: 'Please enter your address' }]}>
                    <Input.TextArea
                    placeholder="123 Main Street"
                    rows={3}
                    value={formData.shippingAddress}
                    onChange={(e) => updateFormData({ shippingAddress: e.target.value })}/>
                </Form.Item>
                <Form.Item label="Phone" name="phone"  
                rules={[{required:true,message: 'Please enter your phone number'}]}>
                    <Input placeholder="+880 1XXX-XXXXXX"
                    value={formData.phone}
                    onChange={(e) => updateFormData({ phone: e.target.value })}/>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default StepShipping;