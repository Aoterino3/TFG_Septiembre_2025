import type { CorrectionResponseType } from "../types/correction_response";

export interface CorrectionModel {
    correction: CorrectionResponseType | undefined;
    showCorrection: boolean;
    showSolution: boolean;
    solution: string;
    switchShowSolution: () => void;
}