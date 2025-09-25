import { Layout } from "antd";
import type React from "react";
import type { EvaluationModel } from "../models/EvaluationModel";

interface EvaluationViewProps {
    model: EvaluationModel;
}

const EvaluationView: React.FC<EvaluationViewProps> = ({ model }) => {
    return (
        model.showEvaluation && <><div></div>
            <Layout style={{ fontWeight: 'bold' }}> Evaluation </Layout>
            <div>{model.evaluation?.correction_summary}</div>
            <div>{model.evaluation?.evaluation}</div>
            <div style={{ fontWeight: 'bold' }}>Score: {model.evaluation?.score}</div>
        </>
    )
}
export default EvaluationView