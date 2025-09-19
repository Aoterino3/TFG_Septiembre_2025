import React from 'react';
import { Button, Layout } from 'antd';
import type { CorrectionModel } from '../models/CorrectionModel';

interface CorrectionViewProps {
    model: CorrectionModel
}

const CorrectionView: React.FC<CorrectionViewProps> = ({ model }) => {
    return (<>
        {model.showCorrection && <>
            <Layout>Correction</Layout><div>{model.correction?.answer}</div>
            <div><Button type="primary" onClick={model.switchShowSolution} >{model.showSolution ? 'Hide Solution' : 'Show Solution'}</Button></div>
        </>}
        {model.showSolution && <>
            <div>{model.solution}</div>
        </>}
    </>)
}
export default CorrectionView;