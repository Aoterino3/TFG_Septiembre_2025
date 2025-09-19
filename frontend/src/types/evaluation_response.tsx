import type { EvaluationBase } from "./evaluation_base";

export type EvaluationResponseType = EvaluationBase & { correction_summary: string,  score: number }