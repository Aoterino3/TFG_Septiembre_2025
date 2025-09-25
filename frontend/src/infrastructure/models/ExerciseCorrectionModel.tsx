// Modelo de correcci�n de ejercicios para Teacher AI
import type { CorrectionExerciseResponseType } from "../../domain/models/correction_exercise";
export interface ExerciseCorrectionModel {
    corrections: CorrectionExerciseResponseType[];
    showExerciseCorrection: boolean;
    showCorrection: boolean;
    switchShowCorrection: () => void;
}