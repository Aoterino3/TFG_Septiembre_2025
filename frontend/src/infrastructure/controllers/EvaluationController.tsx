import type React from "react";
import type { EvaluationResponseType } from "../../domain/models/evaluation_response";
import EvaluationView from "../views/EvaluationView";
import type { EvaluationModel } from "../models/EvaluationModel";
interface EvaluationProps {
    evaluation: EvaluationResponseType | undefined;
    showEvaluation: boolean;
}
const Evaluation: React.FC<EvaluationProps> = ({ evaluation, showEvaluation }) => {
    const model: EvaluationModel = {
        evaluation,
        showEvaluation
    }
    return <EvaluationView model={model} />;
}
export default Evaluation