import { Layout, Button } from "antd"
import React from "react"
import { correction_status } from "../util/constants"
import type { ExerciseCorrectionModel } from "../models/ExerciseCorrectionModel";
interface ExerciseCorrectionViewProps {
    model: ExerciseCorrectionModel;
}
const ExerciseCorrectionView: React.FC<ExerciseCorrectionViewProps> = ({ model }) => {
    return (<>
        {model.showExerciseCorrection && model.showCorrection && <>
            <Layout>Exercises Correction</Layout>
            {model.corrections.map((correction, index) => (
                <div key={index}>{index + 1}) - {correction.correction} - {correction.definitive_correction == correction_status.correct ? "Ok" : "Error"}</div>
            ))}
        </>}
        <div><Button type="primary" onClick={model.switchShowCorrection} >{model.showCorrection ? 'Hide Correction' : 'Show Correction'}</Button></div>
    </>)
}
export default ExerciseCorrectionView