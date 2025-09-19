// Modelo de corrección de ejercicios para Teacher AI
import type { CorrectionExerciseResponseType } from "../types/correction_exercise";
export interface ExerciseCorrectionModel {
    corrections: CorrectionExerciseResponseType[];
    showExerciseCorrection: boolean;
    showCorrection: boolean;
    switchShowCorrection: () => void;
}