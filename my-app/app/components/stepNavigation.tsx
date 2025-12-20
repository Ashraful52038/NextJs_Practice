import { Button } from "antd";

interface StepNavigationProps {
    current: number;
    totalSteps: number;
    onNext: () => void;
    onPrev: () => void;
    onFinish: () => void;
}

const StepNavigation = ({current , totalSteps , onNext, onPrev, onFinish}: StepNavigationProps) => {
    return(
        <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={onPrev}>
                Back
            </button>
            {current < totalSteps - 1 ? (
                <Button type="primary" onClick={onNext}>
                    Continue
                </Button>
            ) : (
                <Button type="primary" onClick={onFinish}>
                    Complete Order
                </Button>
            )}
        </div>
    );
};
export default StepNavigation;