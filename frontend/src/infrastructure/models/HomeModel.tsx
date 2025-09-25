import type { CorrectionResponseType } from "../../domain/models/correction_response";
import type { EvaluationResponseType } from "../../domain/models/evaluation_response";
import type { ExerciseType } from "../../domain/models/exercise";
import type { ExerciseCorrectionResponseType } from "../../domain/models/exercise_correction";

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