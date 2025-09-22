import type { CorrectionResponseType } from "../types/correction_response";
import type { EvaluationResponseType } from "../types/evaluation_response";
import type { ExerciseType } from "../types/exercise";
import type { ExerciseCorrectionResponseType } from "../types/exercise_correction";

export interface HomeViewModel {
    showIntroduction: boolean;
    showCorrection: boolean;
    showFinalCorrection: boolean;
    showExercises: boolean;
    isCorrectionLoading: boolean;
    isExercisesLoading: boolean;
    isEvaluationLoading: boolean;
    showFinalEvaluation: boolean;
    showEvaluation: boolean;

    introduction: string[];
    correction: CorrectionResponseType | undefined;
    evaluation: EvaluationResponseType | undefined;
    exercisesCorrection: ExerciseCorrectionResponseType | undefined;

    items: ExerciseType[];
    correctedText: string;
    originalText: string;

    setItems: (items: ExerciseType[]) => void;
    evaluateText: (content: string, finalVersion?: boolean) => void;
    setFinalEvaluation: (content: ExerciseCorrectionResponseType | undefined) => void;
}