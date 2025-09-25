import type { EvaluationResponseType } from "../../domain/models/evaluation_response";

export interface EvaluationModel {
    evaluation: EvaluationResponseType | undefined;
    showEvaluation: boolean;
}