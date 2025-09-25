import type { CorrectionExerciseResponseType } from "../../domain/models/correction_exercise";
import type { ExerciseType } from "../../domain/models/exercise";
import type { QuestionGroupType } from "../../domain/models/question_group";

export interface ExercisesModel {
    localItems: ExerciseType[];
    isExercisesLoading: boolean;
    showContinueButton: boolean;
    showEvaluationButton: boolean;
    disableSubmit: boolean;
    showExerciseCorrection: boolean;
    showCorrectionButton: boolean;
    isLoading: boolean;
    corrections: CorrectionExerciseResponseType[];
    setSolved: (answers: QuestionGroupType) => void;
    correctExercises: () => void;
    nextExercise: () => void;
    evaluate: () => void;
}