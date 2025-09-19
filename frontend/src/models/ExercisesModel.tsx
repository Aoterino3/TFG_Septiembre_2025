import type { CorrectionExerciseResponseType } from "../types/correction_exercise";
import type { ExerciseType } from "../types/exercise";
import type { QuestionGroupType } from "../types/question_group";

export interface ExercisesModel {
    localItems: ExerciseType[];
    isExercisesLoading: boolean;
    showContinueButton: boolean;
    showEvaluationButton: boolean;
    disableSubmit: boolean;
    showExerciseCorrection: boolean;
    isLoading: boolean;
    corrections: CorrectionExerciseResponseType[];
    setSolved: (answers: QuestionGroupType) => void;
    correctExercises: () => void;
    nextExercise: () => void;
}