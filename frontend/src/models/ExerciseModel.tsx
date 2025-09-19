import type { ExerciseType } from "../types/exercise";

export interface ExerciseModel {
    showCorrection: boolean;
    data: ExerciseType;
    setAnswer: (e: string, index: number) => void;
}