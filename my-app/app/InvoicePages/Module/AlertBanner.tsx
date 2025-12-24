'use client';

import { InfoCircleOutlined } from "@ant-design/icons";
import { Alert } from "antd";

export default function AlertBanner(){
    return (
        <Alert
            message="PDF Generation Methods Comparison"
            description="Each method has different strengths. Choose based on your requirements for styling, file size, and control."
            type="info"
            showIcon
            icon={<InfoCircleOutlined />}
            className="mb-6"
        />
    );
}