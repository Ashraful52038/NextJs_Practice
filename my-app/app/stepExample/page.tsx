'use client';

import { Steps, Typography } from "antd";
import { useState } from "react";
import StepDone from "../components/stepDone";
import StepLogin from "../components/stepLogin";
import StepNavigation from "../components/stepNavigation";
import StepPayment from "../components/stepPayment";
import StepShipping from "../components/stepShipping";

const { Title } = Typography;

const StepFormExample = () => {
    const [current, setCurrent] = useState(0);

    const steps = [
        { title: 'Login', component: <StepLogin /> },
        { title: 'Shipping', component: <StepShipping /> },
        { title: 'Payment', component: <StepPayment /> },
        { title: 'Done', component: <StepDone /> },
    ];

    const next = () => setCurrent(current + 1);
    const prev = () => setCurrent(current - 1);
    const finish = () => alert("Order Completed!");

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