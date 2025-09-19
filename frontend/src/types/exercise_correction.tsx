
import { type EvaluationBase } from './evaluation_base'
import { type CorrectionExerciseResponseType } from './correction_exercise'

export type ExerciseCorrectionResponseType = EvaluationBase & { feedback_summary: string, correction_summary: string, continue_practice: boolean, corrections: CorrectionExerciseResponseType[] }
export type ExerciseCorrectionRequestType = { original_statment: string, student_answer: string, correct_answer: string }
