import { type  EvaluationBase } from './evaluation_base';
import { type ErrorResponseType } from './error_response';

export type CorrectionResponseType = EvaluationBase & { original_text: string, corrected_text: string, answer: string, errors: ErrorResponseType[] }
