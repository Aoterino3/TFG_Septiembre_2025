import "../../pages/css/components.css";
import { useState } from 'react';
import { Radio, type RadioChangeEvent } from 'antd';

interface ExerciseSelectProps {
    index: number;
    showCorrection: boolean;
    exercise: string;
    onAnswer: (value: string, index: number) => void;
    items: string[];
}

const ExerciseSelect: React.FC<ExerciseSelectProps> = ({ index, showCorrection, exercise, onAnswer, items }) => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
    const handleChange = (e: RadioChangeEvent) => {
        setSelectedValue(e.target.value);
        onAnswer(e.target.value, index);
    };
    return (
        <>
            <div>{exercise}</div>
            <Radio.Group block disabled={showCorrection} value={selectedValue} options={items.map(item => ({ label: item, value: item }))} onChange={handleChange} />
        </>
    );
}
export default ExerciseSelect;