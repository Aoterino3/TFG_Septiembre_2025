import type { ExerciseType } from "../types/exercise";

export interface ExerciseModel {
    data: ExerciseType;
    readOnly: boolean;
    setAnswer: (e: string, index: number) => void;
}