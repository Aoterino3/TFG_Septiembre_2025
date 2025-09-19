import React, { useState } from "react"
import type { CorrectionResponseType } from "../types/correction_response";
import CorrectionView from "../views/CorrectionView";
import type { CorrectionModel } from "../models/CorrectionModel";
interface CorrectionProps {
    correction: CorrectionResponseType | undefined;
    showCorrection: boolean;
}
const Correction: React.FC<CorrectionProps> = ({ correction, showCorrection }) => {
    const [showSolution, setShowSolution] = useState(false);
    const [solution, setSolution] = useState("");
    const switchShowSolution = () => {
        if (solution.length === 0) {
            setSolution(correction?.corrected_text ?? "");
        }
        setShowSolution(!showSolution);
    }
    const model: CorrectionModel = {
        correction,
        showCorrection,
        showSolution,
        solution,
        switchShowSolution
    };
    return <CorrectionView model={model} />;
}
export default Correction
