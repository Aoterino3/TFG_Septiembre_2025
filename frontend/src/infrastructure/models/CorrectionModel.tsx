import type { CorrectionResponseType } from "../../domain/models/correction_response";

export interface CorrectionModel {
    correction: CorrectionResponseType | undefined;
    showCorrection: boolean;
    showSolution: boolean;
    solution: string;
    switchShowSolution: () => void;
}