import type { EvaluationResponseType } from "../types/evaluation_response";

export interface EvaluationModel {
    evaluation: EvaluationResponseType | undefined;
    showEvaluation: boolean;
}