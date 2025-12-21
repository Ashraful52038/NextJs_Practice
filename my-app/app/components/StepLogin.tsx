'use client';

import { useFormContext } from "@/context/FormContext";
import { UserOutlined } from "@ant-design/icons";
import { Card, Form, Input } from "antd";
import React from "react";

interface StepLoginProps{
    onNext?:()=>void;
}

const StepLogin : React.FC<StepLoginProps>=({onNext}) => {
    const {formData,updateFormData} = useFormContext();
    const [form] = Form.useForm();

    const onFinish = (values:any)=>{
        updateFormData({
            email:values.email,
            password: values.password,
        });
        if(onNext)onNext();
    };

    return (
        <Card title="Login" icon={<UserOutlined/>}>
            <Form
                form={form}
                layout="vertical"
                initialValues={formData}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {required:true, message:"Please enter your email"},
                        {type:'email', message:"Please enter a valid email"}
                    ]}
                >
                    <Input
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e)=>updateFormData({ email: e.target.value})}
                    />
                </Form.Item>
                <Form.Item
                label="Password" name="password" 
                rules={[{required:true, message: 'Please enter your password'}]}>
                    <Input.Password 
                    placeholder="password"
                    value={formData.password}
                    onChange={(e) => updateFormData({ password: e.target.value })}
                    />
                </Form.Item>
            </Form>
        </Card>
    )
}

export default StepLogin;