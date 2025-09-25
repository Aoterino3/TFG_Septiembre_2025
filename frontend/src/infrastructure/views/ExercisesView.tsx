import "../../pages/css/exercises.css";
import React from "react";
import Exercise from "../controllers/ExerciseController"
import { Button, Flex, Skeleton } from "antd";
import ExerciseCorrection from "../controllers/ExerciseCorrectionController";
import type { ExercisesModel } from "../models/ExercisesModel";
interface ExercisesViewProps {
    model: ExercisesModel;
}
const ExercisesView: React.FC<ExercisesViewProps> = ({ model }) => {
    return (
        <>
            <div style={{ fontWeight: 'bold' }}>Exercices</div>
            {model.localItems.map((g) => {
                return (<Exercise key={g.key} data={g} exerciseKey={g.key.toString()} onSolved={model.setSolved} readOnly={g.readonly} />)
            })}
            <Skeleton active loading={model.isExercisesLoading}></Skeleton>
            {model.showContinueButton && <>
                <Flex justify="flex-end" align="center">
                    {model.showEvaluationButton && <Button type="primary" disabled={model.disableSubmit} onClick={model.evaluate}>Show Evaluation</Button>}
                    {!model.showCorrectionButton && <Button type="primary" disabled={model.disableSubmit} onClick={model.nextExercise}>Continue</Button>}
                    {model.showCorrectionButton && <Button type="primary" disabled={model.disableSubmit} onClick={model.correctExercises}>Continue</Button>}
                </Flex>
            </>}
            {model.showExerciseCorrection && <>
                <Skeleton active loading={model.isLoading}>
                    <ExerciseCorrection showExerciseCorrection={model.showExerciseCorrection} corrections={model.corrections} solution={""}></ExerciseCorrection>
                </Skeleton>
            </>}
        </>
    )
}
export default ExercisesView