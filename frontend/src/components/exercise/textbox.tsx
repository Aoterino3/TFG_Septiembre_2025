import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';

interface ExerciseTextboxProps {
    index: number;
    showCorrection: boolean;
    exercise: string;
    small: boolean;
    onAnswer: (answer: string, index: number) => void;
}
const ExerciseTextbox: React.FC<ExerciseTextboxProps> = ({index, showCorrection, exercise, small, onAnswer }) => {
    const textLimit = 150; 
    const [count, setCount] = useState(0);
    const setTextCount = (e) => {
        if (e.target.value.length > textLimit) {
            e.target.value = e.target.value.substring(0, textLimit);
        }
        setCount(e.target.value.length);
        onAnswer(e.target.value, index);
    };
    return (
        <>
            <div>{exercise}</div>
            <TextArea
                readOnly={showCorrection}
                style={{ marginRight: '10pt', width: small?'20%':'100%' }}
                rows={1}
                onChange={setTextCount}
                
            />
            <div> {count}/{textLimit}</div>
        </>
    );
}
export default ExerciseTextbox;