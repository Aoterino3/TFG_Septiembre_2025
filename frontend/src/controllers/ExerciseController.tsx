import React, { useState } from "react"
import type { ExerciseType } from "../types/exercise"
import type { QuestionGroupType } from "../types/question_group"
import ExerciseView from "../views/ExerciseView";
import type { ExerciseModel } from "../models/ExerciseModel";
interface ExerciceProps {
    exerciseKey: string;
    data: ExerciseType;
    onSolved: (answers: QuestionGroupType) => void;
}
const Exercise: React.FC<ExerciceProps> = ({ exerciseKey, data, onSolved }) => {
    const [showCorrection, setShowCorrection] = useState(false);
    const setAnswer = (e: string, index: number) => {
        if (data.exercises != undefined) {
            data.exercises[index].answer = e;
        }
        const callBack: QuestionGroupType = { questions: data.exercises, key: parseInt(exerciseKey), type: data.type };
        onSolved(callBack);

    }
    const model: ExerciseModel = {
        showCorrection,
        data,
        setAnswer
    };
    return <ExerciseView model={model} />;
}
export default Exercise