'use client';

import { useFormContext } from "@/context/FormContext";
import { message, Steps, Typography } from "antd";
import { useState } from "react";
import StepDone from "../components/StepDone";
import StepLogin from "../components/StepLogin";
import StepNavigation from "../components/StepNavigation";
import StepPayment from "../components/StepPayment";
import StepShipping from "../components/StepShipping";

const { Title } = Typography;

const StepFormExample = () => {
    const [current, setCurrent] = useState(0);
     const { formData } = useFormContext();

    const steps = [
        { title: 'Login', component: <StepLogin onNext={()=>validateStep(0)} /> },
        { title: 'Shipping', component: <StepShipping /> },
        { title: 'Payment', component: <StepPayment /> },
        { title: 'Done', component: <StepDone /> },
    ];

    const stepItems = steps.map(step=>({step:step.title}));

    // Step validation logic
    const validateStep = (stepIndex: number)=>{
        switch(stepIndex){
            case 0: //loginValidation
            if(!formData.email || !formData.password ){
                message.error('Please fill on login fields');
                return false;
            }
            if (!/\S+@\S+\.\S+/.test(formData.email)) {
                    message.error('Please enter a valid email');
                    return false;
            }
            return true;

            case 1: //Shipping Validation
            if(!formData.name || !formData.shippingAddress || !formData.phone){
                message.error("please fill all shipping fields");
                return false;
            }
            return true;

            case 2: //Payment validation
            if(!formData.cardNumber || !formData.expiryDate || !formData.cvv){
                message.error("Please fill all payment fields");
                return false;
            }
            return true;

        default:
            return true;
        }
    };

    const next =()=>{
        if(validateStep(current)){
            setCurrent(current+1);
        }
    };

    const prev=()=>{
        if(validateStep(current)){
            setCurrent(current-1);
        }
    };

    const finish=()=>{
        if(validateStep(current)){
            alert("Order Completed!");
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: '50px auto', padding: 20 }}>
            <Title level={2}>Checkout</Title>

            <Steps current={current} items={steps} style={{ marginBottom: 40 }} />
            <div style={{ minHeight: 200, margin: '30px 0' }}>
                {steps[current].component}
            </div>
        <StepNavigation
                current={current}
                totalSteps={steps.length}
                onNext={next}
                onPrev={prev}
                onFinish={finish}
        />
    </div>
    )
}
export default StepFormExample;