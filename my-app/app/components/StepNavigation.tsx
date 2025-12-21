import { Button } from "antd";

interface StepNavigationProps {
    current: number;
    totalSteps: number;
    onNext: () => void;
    onPrev: () => void;
    onFinish: () => void;
}

const StepNavigation :React.FC <StepNavigationProps> =({
    current, 
    totalSteps, 
    onNext, 
    onPrev, 
    onFinish 
})=> {
    return(
        <div style={{ marginTop: 30,
            display: 'flex', 
            justifyContent: 'space-between' 
            ,padding: '20px 0',
            borderTop: '1px solid #f0f0f0'}}>
            <button onClick={onPrev} 
            disabled={current === 0}
            size="large">
                ← Back
            </button>
            {current < totalSteps - 1 ? (
                <Button type="primary" onClick={onNext} size="large">
                    Continue →
                </Button>
            ) : (
                <Button type="primary" onClick={onFinish} size="large">
                    Complete Order
                </Button>
            )}
        </div>
    );
};
export default StepNavigation;