import React, { useState } from "react"
import type { CorrectionExerciseResponseType } from "../../domain/models/correction_exercise";
import ExerciseCorrectionView from '../views/ExerciseCorrectionView';
import type { ExerciseCorrectionModel } from "../models/ExerciseCorrectionModel";
interface ExerciseCorrectionProps {
    solution: string;
    corrections: CorrectionExerciseResponseType[];
    showExerciseCorrection: boolean;
}
const ExerciseCorrection: React.FC<ExerciseCorrectionProps> = ({ showExerciseCorrection, corrections }) => {
    const [showCorrection, setShowCorrection] = useState(false);
    const switchShowCorrection = () => {
        setShowCorrection(!showCorrection);
    }
    const model: ExerciseCorrectionModel = {
        showExerciseCorrection,
        showCorrection,
        corrections,
        switchShowCorrection
    };
    return <ExerciseCorrectionView model={model} />;
}
export default ExerciseCorrection