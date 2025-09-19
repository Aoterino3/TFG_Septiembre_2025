import React from 'react';
import { Button, Input, Flex } from 'antd';
import type { InputRedactionModel } from '../models/InputRedactionModel';
const { TextArea } = Input;

interface InputRedactionViewProps {
    model: InputRedactionModel;
}
const InputRedactionView: React.FC<InputRedactionViewProps> = ({ model }) => {
     return (<>
        {(model.showInputRedaction) && <>
            <div>
                <TextArea key="text" readOnly={model.showCorrection} rows={4} defaultValue={model.content} onChange={e => model.onTextChange(e)} />
            </div>
            <div>
                <Flex justify="space-between">
                    <div> {model.content != undefined && model.count > 0 ? model.count : model.content.length}/{model.textLimit}</div>
                    <Button type="primary" disabled={model.disableSubmit || model.showCorrection} onClick={model.localevaluateText}>Send</Button>
                </Flex>
            </div>
        </>}
    </>);
};

export default InputRedactionView;