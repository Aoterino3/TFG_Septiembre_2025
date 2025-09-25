import type { ExerciseType } from "../../domain/models/exercise";

export interface ExerciseModel {
    data: ExerciseType;
    readOnly: boolean;
    setAnswer: (e: string, index: number) => void;
}