import { useState } from 'react';
import { input_types } from '../util/constants';
import InputRedactionView from '../views/InputRedactionView';
import type { InputRedactionModel } from '../models/InputRedactionModel';

interface InputRedactionProps {
    type: string;
    showCorrection: boolean;
    showInputRedaction: boolean;
    evaluateText: (content: string, isFinalVersion: boolean) => void;
}

const InputRedaction: React.FC<InputRedactionProps> = ({ type, showCorrection, showInputRedaction, evaluateText }) => {
    const textLimit = 1000; // Maximum number of characters allowed in the text area

    const [disableSubmit, setDisableSubmit] = useState(false);
    const [content, setContent] = useState("");
    const [count, setCount] = useState(0);

    const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length > textLimit - 1)
            e.target.value = e.target.value.substring(0, textLimit);
        setContent(e.target.value);
        if (content != undefined)
            setTextCount(content.length)
    }

    const setTextCount = (e: number) => {
        setCount(e);
        setDisableSubmit(count > textLimit - 1);
    }
    const localevaluateText = () => {
        evaluateText(content, (type === input_types.input_final_redaction));
    }
    const model: InputRedactionModel = {
        showCorrection,
        showInputRedaction,
        content,
        textLimit,
        count,
        disableSubmit,
        onTextChange,
        localevaluateText
    }
    return <InputRedactionView model={model} />;
}

export default InputRedaction;